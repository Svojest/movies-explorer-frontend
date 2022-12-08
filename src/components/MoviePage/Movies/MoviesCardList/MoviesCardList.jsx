import React, { useEffect, useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { getCount } from '../../../../utils/constants';

const MoviesCardList = ({ savedMovies, movies, onBookmarkClick, isSavedMovie }) => {
	const [extraPortion, setExtraPortion] = useState(3);
	const [currentCount, setCurrenCount] = useState(0);
	const [renderMovies, setRenderMovies] = useState([]);

	function renderExtraPortion() {
		const count = Math.min(movies.length, currentCount + extraPortion);
		const extraMovies = movies.slice(currentCount, count);
		setRenderMovies([...renderMovies, ...extraMovies]);
		setCurrenCount(count);
	}

	function handleResize() {
		const windowSize = window.innerWidth;
		const sizePortion = getCount(windowSize);
		setExtraPortion(sizePortion.extra);
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		const windowSize = window.innerWidth;
		const sizePortion = getCount(windowSize);
		setExtraPortion(sizePortion.extra);
		const count = Math.min(movies.length, sizePortion.first);
		setRenderMovies(movies.slice(0, count));
		setCurrenCount(count);
	}, [movies]);

	function handleMoreCards() {
		renderExtraPortion();
	}
	return (
		<section className='movies-card-list'>
			<ul className='movies-card-list__container'>
				{renderMovies.map((movie) => (
					<MoviesCard
						savedMovies={savedMovies}
						key={movie.id}
						movie={movie}
						onBookmarkClick={onBookmarkClick}
						isSavedMovie={isSavedMovie}
					/>
				))}
			</ul>
			{currentCount < movies.length && (
				<button className='movies-card-list__more' onClick={handleMoreCards}>
					Ещё
				</button>
			)}
		</section>
	);
};

export default MoviesCardList;
