import React from 'react';
import './NotFoundPage.css'
import { NavLink } from 'react-router-dom';

const NotFoundPage = () => {
	return (
		<section className='not-found-page'>
			<div className='not-found-page__container'>
				<h1 className='not-found-page__title'>404</h1>
				<p className='not-found-page__subtitle'>Страница не найдена</p>
			</div>
			<NavLink to='/' className='not-found-page__back'>
				Назад
			</NavLink>
		</section>
	);
};

export default NotFoundPage;
