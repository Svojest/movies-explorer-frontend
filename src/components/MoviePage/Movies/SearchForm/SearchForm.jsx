import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './SearchForm.css';

const SearchForm = ({
	searchQuery,
	searchShorts,
	handleSearch,
	isResetSaved,
	isSearchRunning,
	isSearchCompleted,
}) => {
	const [currentSearchQuery, setCurrentSearchQuery] = useState(searchQuery || '');
	// Проверка валидации у input
	const [isValid, setIsValid] = useState(false);

	useEffect(() => {
		if (isResetSaved) {
			setCurrentSearchQuery('');
		}
	}, []);

	// Обработчик нажатия submit
	function handleSubmit(e) {
		e.preventDefault();
		if (currentSearchQuery.length) {
			handleSearch(currentSearchQuery, searchShorts);
		} else {
			setIsValid(true);
		}
	}

	// Обработчик checkbox
	function handleShortsChange(value) {
		if (isSearchCompleted) {
			if (currentSearchQuery.length) {
				handleSearch(currentSearchQuery, value);
			}
		}
	}

	return (
		<section className='search-form'>
			<form name='search-form' className='search-form__container' onSubmit={handleSubmit}>
				<div className='search-form__bar'>
					<i className='search-form__icon'></i>
					<input
						type='text'
						name='search'
						id='searchMovie'
						className='search-form__input'
						placeholder='Фильм'
						value={currentSearchQuery}
						onChange={(e) => setCurrentSearchQuery(e.target.value)}
					/>
					{isValid && (
						<span className='search-form__error'>Нужно ввести ключевое слово</span>
					)}
					<button
						type='submit'
						className={
							isSearchRunning ? 'search-form__submit_disable' : 'search-form__submit'
						}
					>
						Найти
					</button>
				</div>
				<label className='search-form__filter-checkbox'>
					<input
						className='search-form__filter-checkbox-hidden'
						name='searchShorts'
						type='checkbox'
						defaultChecked={searchShorts}
						onChange={(e) => handleShortsChange(e.target.checked)}
					></input>
					<span className='search-form__filter-checkbox-slider'></span>
					<span className='search-form__filter-checkbox-text'>Короткометражки</span>
				</label>
			</form>
			<div className='search-form__line'></div>
		</section>
	);
};

export default SearchForm;
