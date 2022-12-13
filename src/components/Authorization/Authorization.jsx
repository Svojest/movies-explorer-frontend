import React, { Children } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Authorization.css';

const Authorization = ({
	children,
	headerText,
	buttonText,
	navLink,
	text,
	navText,
	onSubmit,
	isValid,
}) => {
	return (
		<section className='authorization'>
			<div className='authorization__header'>
				<Link to='/' className='authorization__logo'>
					<img src={logo} alt='Логотип' />
				</Link>
				<h1 className='authorization__title'>{headerText}</h1>
			</div>
			<form className='authorization__form' action='/' method='POST' onSubmit={onSubmit}>
				{children}
				<div className='authorization__actions'>
					<button
						className={`authorization__button ${
							!isValid && 'authorization__button_disabled'
						}`}
						type='submit'
					>
						{buttonText}
					</button>
					<p className='authorization__question'>
						{text}
						<NavLink to={navLink} className='authorization__link'>
							{navText}
						</NavLink>
					</p>
				</div>
			</form>
		</section>
	);
};

export default Authorization;
