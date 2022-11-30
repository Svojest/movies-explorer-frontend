import React from 'react';
import './MoviesCard.css';

const MoviesCard = ({ poster, title, saved, duration, onClick, isSave }) => {
	const moviesCardButton = saved ? 'movies-card__unsave' : 'movies-card__notsave';

	return (
		<li className='movies-card'>
			<img src={poster} alt={title} className='movies-card__poster' />
			<div className='movies-card__container'>
				<div className='movies-card__info'>
					<p className='movies-card__title'>{title}</p>
					<p className='movies-card__duration'>{duration}</p>
				</div>
				<button type='button' className={`${moviesCardButton} button`} onClick={onClick}></button>
			</div>
		</li>
	);
};

export default MoviesCard;
