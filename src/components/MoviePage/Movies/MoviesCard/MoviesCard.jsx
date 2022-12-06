import React from 'react';
import './MoviesCard.css';

const MoviesCard = ({ savedMovies, movie, onBookmarkClick, isSavedMovie }) => {
	const { nameRU, duration, trailerLink, image } = movie;
	let isSaved = isSavedMovie(movie);

	function formatDuration(duration) {
		return Math.floor(duration / 60) + 'ч ' + (duration % 60) + 'м';
	}

	function handleBookmarkClick(evt) {
		evt.preventDefault();
		onBookmarkClick(movie, !isSaved);
	}

	function handleOnDelete() {
		onBookmarkClick(movie, false);
	}

	return (
		<li className='movies-card'>
			<a href={trailerLink} target='_blank' rel='noreferrer'>
				<img src={image} alt={nameRU} className='movies-card__poster' />
			</a>
			<div className='movies-card__container'>
				<div className='movies-card__info'>
					<p className='movies-card__title'>{nameRU}</p>
					<p className='movies-card__duration'>{formatDuration(duration)}</p>
				</div>

				{savedMovies ? (
					<button
						type='button'
						className='button movies-card__unsave'
						onClick={handleOnDelete}
					></button>
				) : (
					<button
						type='button'
						className={`button ${
							isSaved ? 'movies-card__save' : 'movies-card__notsave'
						}`}
						onClick={handleBookmarkClick}
					></button>
				)}
			</div>
		</li>
	);
};

export default MoviesCard;
