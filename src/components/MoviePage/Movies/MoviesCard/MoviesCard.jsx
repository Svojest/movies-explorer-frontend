import React from 'react';
import './MoviesCard.css';

const MoviesCard = ({ card, onCardButton, showSavedCards, isSavedCard }) => {
	const { nameRU, duration, trailerLink, image } = card;

	let isSaved = isSavedCard;

	function formatDuration(duration) {
		return Math.floor(duration / 60) + 'ч ' + (duration % 60) + 'м';
	}

	function handleCardButton() {
		onCardButton(card);
	}

	return (
		<li className='movies-card'>
			<a href={trailerLink} target='_blank' rel='noreferrer'>
				<img
					src={showSavedCards ? image : 'https://api.nomoreparties.co' + image.url}
					alt={nameRU}
					className='movies-card__poster'
				/>
			</a>
			<div className='movies-card__container'>
				<div className='movies-card__info'>
					<p className='movies-card__title'>{nameRU}</p>
					<p className='movies-card__duration'>{formatDuration(duration)}</p>
				</div>
				{showSavedCards ? (
					<button
						type='button'
						className='button movies-card__delete'
						onClick={handleCardButton}
					></button>
				) : (
					<button
						type='button'
						className={`button ${
							isSaved ? ' movies-card__save' : 'movies-card__notsave'
						}`}
						onClick={handleCardButton}
					></button>
				)}
			</div>
		</li>
	);
};

export default MoviesCard;
