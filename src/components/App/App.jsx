import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../LandingPage/Main/Main';
import Movies from '../MoviePage/Movies/Movies';
import Register from '../Authorization/Register/Register';
import Login from '../Authorization/Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

import { Route, Switch } from 'react-router-dom';
import Profile from '../Profile/Profile';
import SavedMovies from '../MoviePage/Movies/SavedMovies/SavedMovies';

const App = () => {
	return (
		<main className='page'>
			<Switch>
				<Route exact path='/'>
					<Header loggedIn={false} />
					<Main />
					<Footer />
				</Route>
				<Route path='/movies'>
					<Header loggedIn={false} />
					<Movies />
					<Footer />
				</Route>
				<Route path='/saved-movies'>
					<Header loggedIn={false} />
					<SavedMovies />
					<Footer />
				</Route>
				<Route path='/profile'>
					<Header loggedIn={false} />
					<Profile name='Виталий' email='pochta@yandex.ru' />
				</Route>
				<Route path='/signup'>
					<Register />
				</Route>
				<Route path='/signin'>
					<Login />
				</Route>
				<Route path='*'>
					<NotFoundPage />
				</Route>
			</Switch>
		</main>
	);
};

export default App;
