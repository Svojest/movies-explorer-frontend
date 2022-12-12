import React from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import { useEffect } from 'react';

const Movies = ({
	cards,
	onCardButton,
	searchQuery,
	handleSearch,
	isSearchCompleted,
	isSearchRunning,
	isError,
	onReset,
}) => {
	// Сброс поиска
	useEffect(() => {
		onReset();
	}, []);

	return (
		<section className='movies'>
			<SearchForm
				searchQuery={searchQuery}
				searchShorts={false}
				handleSearch={handleSearch}
				isResetSaved={true}
				isSearchRunning={isSearchRunning}
				isSearchCompleted={isSearchCompleted}
			/>
			<MoviesCardList
				cards={cards}
				onCardButton={onCardButton}
				showSavedCards={true}
				isError={isError}
				isSearchRunning={false}
				isSearchCompleted={isSearchCompleted}
			/>
		</section>
	);
};

export default Movies;
