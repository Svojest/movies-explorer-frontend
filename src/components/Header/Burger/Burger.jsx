import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Burger.css';
import close from '../../../images/close.svg';


const Burger = ({ isVisible, onClose }) => {
    
	return (
		<div className={`burger ${isVisible && 'burger_visible'}`}>
			<div className='burger__container'>
				<img src={close} alt='close' className='burger__close' onClick={onClose}/>
				<nav className='burger__nav'>
					<ul className='burger__nav-list'>
						<li className='header__nav-item'>
							<NavLink
								to='/'
								exact
								className='burger__nav-link'
								activeClassName='burger__nav-link_active'
							>
								Главная
							</NavLink>
						</li>
						<li className='header__nav-item'>
							<NavLink
								to='/movies'
								className='burger__nav-link'
								activeClassName='burger__nav-link_active'
							>
								Фильмы
							</NavLink>
						</li>
						<li className='header__nav-item'>
							<NavLink
								to='/saved-movies'
								className='burger__nav-link'
								activeClassName='burger__nav-link_active'
							>
								Сохранённые фильмы
							</NavLink>
						</li>
					</ul>
				</nav>
				<Link to='/profile' className='header__profile burger__profile'>
					Аккаунт
					<i className='header__profile-icon'></i>
				</Link>
			</div>
		</div>
	);
};

export default Burger;
