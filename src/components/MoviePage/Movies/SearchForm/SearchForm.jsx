import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './SearchForm.css';

const SearchForm = ({ onSubmitSearch, isLoading, onFilterShort }) => {
	const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');
	const [searchShorts, setSearchShorts] = useState(
		JSON.parse(localStorage.getItem('searchShorts') || false)
	);
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === '/saved-movies') {
			setSearchQuery('');
		}
		if (location.pathname !== '/saved-movies') {
			setSearchQuery(localStorage.getItem('searchQuery'));
			setSearchShorts(JSON.parse(localStorage.getItem('searchShorts')));
		}
	}, [location.pathname]);

	function handleFilterChange(e) {
		onFilterShort(e.target.checked);
		setSearchShorts(e.target.checked);
		JSON.stringify(localStorage.setItem('searchShorts', !searchShorts));
	}

	function handleOnChange(e) {
		setSearchQuery(e.target.value);
	}

	function handleOnSubmit(e) {
		e.preventDefault();
		onSubmitSearch(searchQuery);
		localStorage.setItem('searchQuery', searchQuery);
	}

	return (
		<section className='search-form'>
			<form name='search-form' className='search-form__container' onSubmit={handleOnSubmit}>
				<div className='search-form__bar'>
					<i className='search-form__icon'></i>
					<input
						type='text'
						name='search'
						id='searchMovie'
						className='search-form__input'
						placeholder='Фильм'
						value={searchQuery}
						onChange={handleOnChange}
						disabled={isLoading}
					/>
					{searchQuery === '' && (
						<span className='search-form__error'>Нужно ввести ключевое слово</span>
					)}
					<button
						type='submit'
						className={
							isLoading ? 'search-form__submit_disable' : 'search-form__submit'
						}
					>
						Найти
					</button>
				</div>
				<label className='search-form__filter-checkbox'>
					<input
						className='search-form__filter-checkbox-hidden'
						type='checkbox'
						checked={searchShorts}
						onChange={handleFilterChange}
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
