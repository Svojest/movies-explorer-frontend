import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../context/currentUserContext';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../LandingPage/Main/Main';
import Movies from '../MoviePage/Movies/Movies';
import Register from '../Authorization/Register/Register';
import Login from '../Authorization/Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';

import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';

const DEFAULT_LOGGED_IN = JSON.parse(window.localStorage.getItem('loggedIn'));

function App() {
	const [currentUser, setCurrentUser] = useState([]);
	const [loggedIn, setLoggedIn] = useState(DEFAULT_LOGGED_IN);

	const [isLoading, setIsLoading] = useState(false);
	const [loadingError, setLoadingError] = useState('');
	const [initialMovies, setInitialMovies] = useState([]);
	const [savedMovies, setSavedMovies] = useState([]);
	const [cacheMovies, setCacheMovies] = useState([]);
	const [filterMovies, setFilterMovies] = useState([]);
	const [filterSavedMovies, setFilterSavedMovies] = useState([]);
	const [query, setQuery] = useState('');
	const [text, setText] = useState('');

	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
		window.localStorage.setItem('loggedIn', loggedIn);
	}, [loggedIn]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			mainApi
				.checkToken(token)
				.then((res) => {
					if (res) {
						setLoggedIn(true);
						getUserInfo();
					}
				})
				.catch((err) => {
					console.log(err);
					setLoggedIn(true);
					localStorage.removeItem('token');
					history.push('/');
				});
		}
	}, [history]);
	

	function handleRegister(email, name, password) {
		mainApi
			.register(email, name, password)
			.then((res) => {
				if (res) {
					handleLogin(email, password);
				}
			})
			.catch((err) => console.log(err));
	}

	function handleLogin(email, password) {
		mainApi
			.login(email, password)
			.then((res) => {
				if (res.token) {
					localStorage.setItem('token', res.token);
					setLoggedIn(true);
					getUserInfo();
					history.push('/movies');
				}
			})
			.catch((err) => console.log(err));
	}
	function handleSignOut() {
		setLoggedIn(false);
		localStorage.removeItem('token');
		localStorage.removeItem('initialMovies');
		localStorage.removeItem('savedMovies');
		localStorage.removeItem('cacheMovies');
		localStorage.removeItem('savedMovies');
		localStorage.removeItem('searchQuery');
		localStorage.removeItem('searchShorts');
		setInitialMovies([]);
		setSavedMovies([]);
		setCacheMovies([]);
		setFilterMovies([]);
		setFilterSavedMovies([]);
		history.push('/');
	}
	function handleUpdateUser(userInfo) {
		mainApi
			.setUserInfo(userInfo)
			.then((res) => {
				setCurrentUser(res);
				setText('Изменено!');
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function getUserInfo() {
		mainApi
			.getUserInfo()
			.then((resUserInfo) => {
				setCurrentUser(resUserInfo);
			})
			.catch((err) => console.log(err));
	}

	function getInitialMovies() {
		moviesApi
			.getMovies()
			.then((data) => {
				const initialArray = data.map((item) => {
					const imageURL = item.image ? item.image.url : '';
					return {
						...item,
						image: `https://api.nomoreparties.co${imageURL}`,
						trailer: item.trailerLink,
					};
				});
				localStorage.setItem('initialMovies', JSON.stringify(initialArray));

				setInitialMovies(initialArray);
			})
			.catch((err) => {
				localStorage.removeItem('initialMovies');
				console.log(err);
			});
	}

	function getSavedMovies() {
		mainApi
			.getMovies()
			.then((data) => {
				const savedArray = data.map((item) => {
					return { ...item, id: item.movieId };
				});
				localStorage.setItem('savedMovies', JSON.stringify(savedArray));

				setSavedMovies(savedArray);
			})
			.catch((err) => {
				localStorage.removeItem('savedMovies');
				console.log(err);
			});
	}

	function getCacheMovies() {
		mainApi.getMovies().then((data) => {
			const cacheArray = data.map((item) => {
				return { ...item, id: item.movieId };
			});
			localStorage.setItem('cacheMovies', JSON.stringify(cacheArray));
			setCacheMovies(cacheArray);
		});
	}

	useEffect(() => {
		const initial = JSON.parse(localStorage.getItem('initialMovies'));
		if (initial) {
			setInitialMovies(initial);
		} else {
			getInitialMovies();
		}
		const cache = JSON.parse(localStorage.getItem('cacheMovies'));
		if (cache) {
			setCacheMovies(cache);
		} else {
			getCacheMovies();
		}
		const saved = JSON.parse(localStorage.getItem('savedMovies'));
		if (saved) {
			setSavedMovies(saved);
		} else {
			getSavedMovies();
		}
	}, []);

	function isSavedMovie(movie) {
		// debugger
		return savedMovies.some((item) => item.id === movie.id);
	}

	function filter(movies, searchQuery) {
		const moviesByQuery = movies.filter((item) => {
			const strRu = String(item.nameRU).toLowerCase();
			const strEn = String(item.nameEN).toLowerCase();
			const searchStr = searchQuery.toLowerCase().trim();

			return strRu.indexOf(searchStr) !== -1 || strEn.indexOf(searchStr) !== -1;
		});
		if (moviesByQuery.length === 0) {
			setLoadingError('Ничего не найдено');
		} else {
			setLoadingError('');
		}
		return moviesByQuery;
	}

	function onSubmitSearch(query) {
		setIsLoading(true);
		setTimeout(() => {
			setQuery(query);
			setFilterMovies(filter(initialMovies, query));
			localStorage.setItem('cacheMovies', JSON.stringify(filter(initialMovies, query)));
			setIsLoading(false);
		}, 500);
	}

	function onSubmitSearchSaved(query) {
		setIsLoading(true);
		setTimeout(() => {
			setQuery(query);
			setFilterSavedMovies(filter(savedMovies, query));
			setIsLoading(false);
		}, 500);
	}

	function onBookmarkClick(movie, isMarked) {
		if (isMarked) {
			addMovie(movie);
		} else {
			deleteMovie(movie);
		}
	}

	function deleteMovie(movie) {
		const movieId = savedMovies.find((item) => item.id === movie.id)._id;
		mainApi
			.deleteMovie(movieId)
			.then((res) => {
				if (res) {
					const newArray = savedMovies.filter((item) => item.movieId !== res.movieId);
					setSavedMovies(newArray);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function addMovie(movie) {
		mainApi
			.addMovie(movie)
			.then((res) => {
				setSavedMovies([...savedMovies, { ...res, id: res.movieId }]);
			})
			.catch((err) => {});
	}

	useEffect(() => {
		localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
	}, [query, savedMovies]);

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
						isLoading={isLoading}
						loadingError={loadingError}
						component={Movies}
						savedMovies={false}
						movies={cacheMovies.length === 0 ? filterMovies : cacheMovies}
						onSubmitSearch={onSubmitSearch}
						onBookmarkClick={onBookmarkClick}
						isSavedMovie={isSavedMovie}
					/>
					<ProtectedRoute
						path='/saved-movies'
						loggedIn={loggedIn}
						isLoading={isLoading}
						loadingError={loadingError}
						component={Movies}
						savedMovies={true}
						movies={savedMovies}
						onSubmitSearch={onSubmitSearchSaved}
						onBookmarkClick={onBookmarkClick}
						isSavedMovie={isSavedMovie}
					/>
					<ProtectedRoute
						path='/profile'
						component={Profile}
						loggedIn={loggedIn}
						handleUpdateUser={handleUpdateUser}
						handleSignOut={handleSignOut}
						textUpdated={text}
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

				{(location.pathname === '/' ||
					location.pathname === '/movies' ||
					location.pathname === '/saved-movies') && <Footer />}
			</main>
		</CurrentUserContext.Provider>
	);
}

export default App;
