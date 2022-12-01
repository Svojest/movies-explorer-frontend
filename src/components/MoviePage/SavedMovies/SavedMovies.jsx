import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm'

import React from 'react';

const SavedMovies = () => {
	return (
		<section className='saved-movies'>
			<SearchForm />
			<MoviesCardList saved={true}/>
		</section>
	);
};

export default SavedMovies;
