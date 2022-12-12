import React, { useEffect, useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { getCount } from '../../../../utils/constants';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = ({
	cards,
	savedCards,
	showSavedCards,
	onCardButton,
	isSearchRunning,
	isSearchCompleted,
	isError,
}) => {
	const [extraPortion, setExtraPortion] = useState(3);
	const [currentCount, setCurrenCount] = useState(0);
	const [renderCards, setRenderCards] = useState([]);

	function renderExtraPortion() {
		const count = Math.min(cards.length, currentCount + extraPortion);
		const extraCards = cards.slice(currentCount, count);
		setRenderCards([...renderCards, ...extraCards]);
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
		const count = Math.min(cards.length, sizePortion.first);
		setRenderCards(cards.slice(0, count));
		setCurrenCount(count);
	}, [cards]);

	function handleMoreCards() {
		renderExtraPortion();
	}

	return (
		<section className='movies-card-list'>
			<ul className='movies-card-list__container'>
				{renderCards.map((card) => (
					<MoviesCard
						key={card.id || card.movieId}
						card={card}
						onCardButton={onCardButton}
						isSavedCard={
							showSavedCards ? true : savedCards.some((i) => i.movieId === card.id)
						}
						showSavedCards={showSavedCards}
					/>
				))}
			</ul>
			{currentCount < cards.length && (
				<button className='movies-card-list__more' onClick={handleMoreCards}>
					Ещё
				</button>
			)}
			{isSearchCompleted === true &&
				(cards.length === 0 ? (
					<p className='movies-card__message'>Ничего не найдено</p>
				) : (
					''
				))}

			{isError ? (
				<p className='movies-card__message'>
					Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер
					недоступен. Подождите немного и попробуйте ещё раз'
				</p>
			) : (
				isSearchRunning && <Preloader />
			)}
		</section>
	);
};

export default MoviesCardList;
