import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
	return (
		<section className='portfolio'>
			<div className='portfolio__container'>
				<h2 className='portfolio__title'>Портфолио</h2>
				<ul className='portfolio__links-list'>
					<li className='portfolio__link-item'>
						<a
							href='https://github.com/Svojest/how-to-learn'
							className='portfolio__link'
							target='_blank' rel="noreferrer"
						>
							Статичный сайт
						</a>
					</li>
					<li className='portfolio__link-item'>
						<a
							href='https://svojest.github.io/russian-travel/'
							className='portfolio__link'
							target='_blank' rel="noreferrer"
						>
							Адаптивный сайт
						</a>
					</li>
					<li className='portfolio__link-item'>
						<a
							href='https://svojest.github.io/mesto-react/'
							className='portfolio__link'
							target='_blank' rel="noreferrer"
						>
							Одностраничное приложение
						</a>
					</li>
				</ul>
			</div>
		</section>
	);
};

export default Portfolio;
