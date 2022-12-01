import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import burger from '../../images/burger.svg';
import Burger from './Burger/Burger';

const Header = ({ loggedIn }) => {
	const [isVisibleMenu, setIsVisibleMenu] = useState(false);
	const route = useLocation();

	function handleVisibleMenu() {
		setIsVisibleMenu(!isVisibleMenu);
	}

	return (
		<header className={'header header' + (route.pathname === '/' ? ' ' : '-main')}>
			<div className='header__container'>
				<Link to='/'>
					<img src={logo} alt='Logo' className='header__logo' />
				</Link>
				<nav className='header__nav'>
					<ul className='header__nav-list'>
						{loggedIn && (
							<>
								<li className='header__nav-item'>
									<NavLink
										to='/movies'
										className='header__nav-link'
										activeClassName='header__nav-link_active'
									>
										Фильмы
									</NavLink>
								</li>
								<li className='header__nav-item'>
									<NavLink
										to='/saved-movies'
										className='header__nav-link'
										activeClassName='header__nav-link_active'
									>
										Сохранённые фильмы
									</NavLink>
								</li>
							</>
						)}
					</ul>
					<ul className='header__nav-list'>
						{!loggedIn && (
							<>
								<li className='header__nav-item'>
									<NavLink
										to='/signup'
										className='header__nav-link header__signup'
									>
										Регистрация
									</NavLink>
								</li>
								<li className='header__nav-item'>
									<NavLink
										to='/signin'
										className='header__nav-link header__signin'
									>
										Войти
									</NavLink>
								</li>
							</>
						)}
						{loggedIn && (
							<>
								<li className='header__nav-item'>
									<NavLink to='/profile' className='header__profile'>
										Аккаунт
										<i className='header__profile-icon'></i>
									</NavLink>
								</li>
								<li className='header__nav-item' onClick={handleVisibleMenu}>
									<img src={burger} alt='menu' className='header__burger'></img>
								</li>
							</>
						)}
					</ul>
				</nav>
			</div>
			<Burger isVisible={isVisibleMenu} onClose={handleVisibleMenu} />
		</header>
	);
};

export default Header;
