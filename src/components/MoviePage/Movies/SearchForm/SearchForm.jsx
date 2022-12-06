import React, { useEffect, useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ onSubmitSearch, isLoading, onFilterShort }) => {
	const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');
	const [searchShorts, setSearchShorts] = useState(
		JSON.parse(localStorage.getItem('searchShorts')) || false
	);

	function handleFilterChange(e) {
		onFilterShort(e.target.checked);
	}

	function handleOnChange(e) {
		setSearchQuery(e.target.value);
	}

	function handleOnSubmit(e) {
		e.preventDefault();
		onSubmitSearch(searchQuery);
		localStorage.setItem('searchQuery', searchQuery);
		localStorage.setItem('searchShorts', JSON.stringify(searchShorts));
	}

	return (
		<section className='search-form'>
			<form name='search-form' className='search-form__container' onSubmit={handleOnSubmit}>
				<div className='search-form__bar'>
					<i className='search-form__icon'></i>
					<input
						type='text'
						name='search-movie'
						id='searchMovie'
						minLength='2'
						className='search-form__input'
						placeholder='Фильм'
						required
						onChange={handleOnChange}
						disabled={isLoading}
					/>
					<button type='submit' className='search-form__submit'>
						Найти
					</button>
				</div>
				<label className='search-form__filter-checkbox'>
					<input
						className='search-form__filter-checkbox-hidden'
						type='checkbox'
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
