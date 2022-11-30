import React from 'react';
import './SearchForm.css';

const SearchForm = () => {
	return (
		<section className='search-form'>
			<form action='#' method='POST' name='search-form' className='search-form__container'>
				<div className='search-form__bar'>
					<i className='search-form__icon'></i>
					<input
						type='text'
						name='search-movie'
						id='searchMovie'
						minLength='2'
						className='search-form__input'
						placeholder='Фильм'
					/>
					<button type='submit' className='search-form__submit'>
						Найти
					</button>
				</div>
				<label className='search-form__filter-checkbox'>
					<input className='search-form__filter-checkbox_hidden' type='checkbox'></input>
					<span className='search-form__filter-checkbox_slider'></span>
					<span className='search-form__filter-checkbox_text'>Короткометражки</span>
				</label>
			</form>
      <div className='search-form__line'></div>
		</section>
	);
};

export default SearchForm;
