import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../context/currentUserContext';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../LandingPage/Main/Main';
import Movies from '../MoviePage/Movies/Movies';
import SavedMovies from '../MoviePage/SavedMovies/SavedMovies';
import Register from '../Authorization/Register/Register';
import Login from '../Authorization/Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import Popup from '../Popup/Popup';

import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';

function App() {
	const history = useHistory();
	const location = useLocation();
	const [loggedIn, setLoggedIn] = useState(null);
	const [currentUser, setCurrentUser] = useState([]);
	const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');
	const [searchSavedQuery, setSearchSavedQuery] = useState('');
	const [searchShorts, setSearchShorts] = useState(
		JSON.parse(localStorage.getItem('searchShorts')) || ''
	);
	const [cards, setCards] = useState([]);
	const [savedCards, setSavedCards] = useState([]);
	const [savedCardsCache, setSavedCardsCache] = useState([]);
	const [isSearchRunning, setIsSearchRunning] = useState(false);
	const [isSearchCompleted, setIsSearchCompleted] = useState(false);
	const [isSearchSavedCompleted, setIsSearchSavedCompleted] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [popupText, setPopupText] = useState('');

	useEffect(() => {
		window.localStorage.setItem('loggedIn', loggedIn);
	}, [loggedIn]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		//
		if (token) {
			checkToken(token);
		} else {
			setLoggedIn(false);
		}
	}, []);

	// Проверка token
	function checkToken(token) {
		if (token) {
			mainApi
				.checkToken(token)
				.then((res) => {
					if (res) {
						setLoggedIn(true);
						getUserInfo();
					} else {
						handleSignOut();
					}
				})
				.catch((err) => {
					console.log(err);
					handleSignOut();
				});
		} else {
			handleSignOut();
		}
	}

	function handleRegister(email, name, password) {
		mainApi
			.register(email, name, password)
			.then((res) => {
				if (res) {
					handleLogin(email, password);
				}
			})
			.catch((err) => {
				console.log(err);
				openPopup('Что-то пошло не так, попробуйте ещё.');
			});
	}

	function handleLogin(email, password) {
		mainApi
			.login(email, password)
			.then((res) => {
				if (res.token) {
					openPopup('Вы успешно авторизованы');
					localStorage.setItem('token', res.token);
					setLoggedIn(true);
					getUserInfo();
					history.push('/movies');
				}
			})

			.catch((err) => {
				console.log(err);
				openPopup('Что-то пошло не так, попробуйте ещё.');
			});
	}

	// Обновление информации пользователя
	function handleUpdateUser(name, email) {
		openPopup('Информация обновлена');
		mainApi
			.setUserInfo({ name, email })
			.then((res) => {
				if (res) {
					setCurrentUser(res);
					openPopup('Информация обновлена');
				}
			})
			.catch((err) => {
				console.log(err);
				openPopup('Что-то пошло не так');
			});
	}

	// Загрузка начальной информации
	function getUserInfo() {
		mainApi
			.getUserInfo()
			.then((resUserInfo) => {
				setCurrentUser(resUserInfo);
				// Получаем сохранённые фильмы из localStorage
				const savedMoviesCacheJSON = localStorage.getItem('savedMoviesCache');
				if (savedMoviesCacheJSON) {
					const savedMoviesCache = JSON.parse(savedMoviesCacheJSON);
					if (savedMoviesCache.length) {
						setSavedCards(savedMoviesCache);
						setSavedCardsCache(savedMoviesCache);
					} else {
						// Если что-то пошло не так, получаем сохранённые фильмы из MainApi
						localStorage.removeItem('savedMoviesCache');
						loadSavedMovies();
					}
				} else {
					// Если localStorage пуст, получаем сохранённые фильмы из MainApi
					loadSavedMovies();
				}
				// Если в запросе есть текст, выполняем поиск по запросу
				if (searchQuery.length) {
					startSearch(searchQuery, searchShorts);
				}
			})
			.catch((err) => {
				openPopup(
					'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
				);
				console.log(err);
			});
	}

	// Поиск фильмов по запросу
	function searchMovies(query) {
		return new Promise(function (resolve, reject) {
			// Если фильмы уже есть в localStorage
			const moviesCacheJSON = localStorage.getItem('moviesCache');
			if (moviesCacheJSON) {
				const moviesCache = JSON.parse(moviesCacheJSON);
				if (moviesCache.length) {
					resolve(
						moviesCache.filter((movie) =>
							movie.nameRU.toLowerCase().includes(query.toLowerCase())
						)
					);
				} else {
					// Если что-то пошло не так
					localStorage.removeItem('moviesCache');
					reject();
				}
			} else {
				// Если фильмов нет в localStorage
				moviesApi
					.getMovies()
					.then((resMovies) => {
						// Сохраняем фильмы для последующих поисков
						localStorage.setItem('moviesCache', JSON.stringify(resMovies));
						resolve(
							resMovies.filter((movie) =>
								movie.nameRU.toLowerCase().includes(query.toLowerCase())
							)
						);
					})
					.catch((err) => {
						reject(err);
					});
			}
		});
	}

	// Запуск поиска с прелоадером
	function startSearch(newQuery, newShorts) {
		setIsSearchRunning(true);
		setIsError(false);
		setIsSearchCompleted(false);
		searchMovies(newQuery)
			.then((searchResult) => {
				// Фильтрация по состоянию чекбокса
				if (newShorts === true) {
					searchResult = searchResult.filter(function (movie) {
						return movie.duration <= 40;
					});
				}
				setIsSearchRunning(false);
				setIsSearchCompleted(true);
				// Условие ограничено /movies, чтобы сделать отдельное сообщение поиска для /saved-movies
				if (location.pathname === '/movies') {
					if (searchResult.length === 0) {
						openPopup('Ничего не найдено');
					}
				}
				// Отображаем карточки
				setCards(searchResult);
			})
			.catch((err) => {
				console.log(err);
				setIsError(true);
			});
	}
	// Обработчик кнопки поиска в /movies
	function handleSearch(newQuery, newShorts) {
		setSearchQuery(newQuery);
		setSearchShorts(newShorts);

		startSearch(newQuery, newShorts);

		localStorage.setItem('searchQuery', newQuery);
		localStorage.setItem('searchShorts', JSON.stringify(newShorts));
	}
	// Обработчик кнопки поиска в /saved-movies
	function handleSavedSearch(newQuery, newShorts) {
		setSearchSavedQuery(newQuery);
		setIsError(false);
		setIsSearchSavedCompleted(false);

		searchMovies(newQuery, newShorts);
		let searchResult = savedCardsCache.filter((movie) => {
			return movie.nameRU.toLowerCase().includes(newQuery.toLowerCase());
		});
		if (newShorts === true) {
			searchResult = searchResult.filter(function (movie) {
				return movie.duration <= 40;
			});
		}
		setIsSearchSavedCompleted(true);
		if (searchResult.length === 0) {
			openPopup('Ничего не найдено');
		}
		setSavedCards(searchResult);
	}

	// Загрузка сохранённых фильмов
	function loadSavedMovies() {
		mainApi
			.getMovies()
			.then((resMovies) => {
				setSavedCardsCache(resMovies);
				setSavedCards(resMovies);
				setSearchSavedQuery('');
				localStorage.setItem('savedMoviesCache', JSON.stringify(resMovies));
			})
			.catch((err) => {
				console.log(err);
			});
	}

	// Добавление карточки в сохранённые
	// Пришлось сделать вагон из ключей, чтобы были корректные изоображения
	function addMovie({
		country,
		director,
		duration,
		year,
		description,
		image,
		trailerLink,
		id,
		nameRU,
		nameEN,
	}) {
		mainApi
			.addMovie({
				country: country,
				director: director,
				duration: duration,
				year: year,
				description: description,
				image: 'https://api.nomoreparties.co' + image.url,
				trailerLink: trailerLink,
				thumbnail: 'https://api.nomoreparties.co' + image.formats.thumbnail.url,
				movieId: id,
				nameRU: nameRU,
				nameEN: nameEN,
			})
			.then((res) => {
				setSavedCards([...savedCards, { ...res, id: res.movieId }]);
				const newSavedCardsCache = [...savedCardsCache, { ...res, id: res.movieId }];
				setSavedCardsCache(newSavedCardsCache);
				localStorage.setItem('savedMoviesCache', JSON.stringify(newSavedCardsCache));
				setSearchSavedQuery('');
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function deleteMovie(card) {
		const movieId = savedCards.find((item) => item.id === card.id)._id;
		mainApi
			.deleteMovie(movieId)
			.then((res) => {
				if (res) {
					setSavedCards(savedCards.filter((savedCards) => savedCards._id !== movieId));
					const newSavedCardsCache = savedCardsCache.filter(
						(savedCards) => savedCards._id !== movieId
					);
					setSavedCardsCache(newSavedCardsCache);
					localStorage.setItem('savedMoviesCache', JSON.stringify(newSavedCardsCache));
					setSearchSavedQuery('');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}
	// Обработчик нажатия кнопки у карточки
	function handleCardButton(card) {
		// Для /saved-movies фильмы содержат movieId, а в /movies id
		const movieId = card.movieId || card.id;
		const savedCard = savedCardsCache.find((item) => item.movieId === movieId);
		if (savedCard && savedCard.movieId) {
			deleteMovie(savedCard);
		} else {
			addMovie(card);
		}
	}

	// Закрытие и открытие Popup
	function openPopup(text) {
		setPopupText(text);
		setIsPopupOpen(true);
	}
	function closeAllPopups() {
		setIsPopupOpen(false);
	}

	// Сброс состояний для /saved-movies
	function resetSavedCards() {
		setSavedCards(savedCardsCache);
		setSearchSavedQuery('');
		setPopupText('');
		setIsPopupOpen(false);
	}

	function handleSignOut() {
		setLoggedIn(false);
		setIsSearchRunning(false);
		setIsSearchCompleted(false);
		setIsSearchSavedCompleted(false);
		setIsError(false);
		setIsPopupOpen(false);
		setPopupText('');
		setCurrentUser([]);
		setCards([]);
		setSavedCards([]);
		setSavedCardsCache([]);
		setSearchQuery('');
		setSearchSavedQuery('');
		setSearchShorts(false);
		localStorage.removeItem('token');
		localStorage.removeItem('searchQuery');
		localStorage.removeItem('searchShorts');
		localStorage.removeItem('moviesCache');
		localStorage.removeItem('savedMoviesCache');
		history.push('/');
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<main className='page'>
				{(loggedIn || location.pathname === '/') && <Header loggedIn={loggedIn} />}
				<Switch>
					<Route exact path='/'>
						<Main />
					</Route>
					<ProtectedRoute
						path='/movies'
						loggedIn={loggedIn}
						cards={cards}
						savedCards={savedCardsCache}
						onCardButton={handleCardButton}
						searchQuery={searchQuery}
						searchShorts={searchShorts}
						handleSearch={handleSearch}
						isSearchRunning={isSearchRunning}
						isSearchCompleted={isSearchCompleted}
						isError={isError}
						component={Movies}
					/>
					<ProtectedRoute
						path='/saved-movies'
						component={SavedMovies}
						loggedIn={loggedIn}
						cards={savedCards}
						onCardButton={handleCardButton}
						searchQuery={searchSavedQuery}
						handleSearch={handleSavedSearch}
						isSearchCompleted={isSearchSavedCompleted}
						isError={isError}
						onReset={resetSavedCards}
					/>
					<ProtectedRoute
						path='/profile'
						component={Profile}
						loggedIn={loggedIn}
						handleUpdateUser={handleUpdateUser}
						handleSignOut={handleSignOut}
					/>
					<Route path='/signup'>
						{loggedIn === true ? (
							<Redirect to='/' />
						) : (
							<Register handleRegister={handleRegister} />
						)}
					</Route>
					<Route path='/signin'>
						{loggedIn === true ? (
							<Redirect to='/' />
						) : (
							<Login handleLogin={handleLogin} />
						)}
					</Route>
					<Route path='*'>
						<NotFoundPage />
					</Route>
				</Switch>
				<Popup text={popupText} isOpen={isPopupOpen} onClose={closeAllPopups} />
				{(location.pathname === '/' ||
					location.pathname === '/movies' ||
					location.pathname === '/saved-movies') && <Footer />}
			</main>
		</CurrentUserContext.Provider>
	);
}

export default App;
