import React, { useState } from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import './Movies.css';

const Movies = ({
	handleSearch,
	searchQuery,
	searchShorts,
	isSearchCompleted,
	savedCards,
	onCardButton,
	isSearchRunning,
	isError,
	cards,
	isSavedCards,
}) => {
	return (
		<section className='movies'>
			<SearchForm
				searchQuery={searchQuery}
				searchShorts={searchShorts}
				handleSearch={handleSearch}
				isClearedOnMount={false}
				isSearchRunning={isSearchRunning}
				isSearchCompleted={isSearchCompleted}
			/>
			<MoviesCardList
				cards={cards}
				savedCards={savedCards}
				showSavedCards={false}
				isSavedCards={isSavedCards}
				onCardButton={onCardButton}
				isError={isError}
				isSearchRunning={isSearchRunning}
				isSearchCompleted={isSearchCompleted}
			/>
		</section>
	);
};

export default Movies;
