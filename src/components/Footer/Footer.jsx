import React from 'react';
import './Footer.css';

const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className='footer'>
			<div className='footer__container'>
				<h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>

				<div className='footer__navigation'>
					<ul className='footer__navigation-links'>
						<li className='footer__navigation-link'>
							<a
								href='https://practicum.yandex.ru/'
								className='footer__link'
								target='__blank'
							>
								Яндекс.Практикум
							</a>
						</li>
						<li className='footer__navigation-link'>
							<a
								href='https://github.com/Svojest'
								className='footer__link'
								target='__blank'
							>
								Github
							</a>
						</li>
					</ul>
					<p className='footer__copyright'>{`© ${year}`}</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
