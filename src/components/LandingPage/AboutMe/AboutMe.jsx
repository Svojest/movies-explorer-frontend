import React from 'react';
import './AboutMe.css';

const AboutMe = () => {
	return (
		<section className='about'>
			<div className='about__container'>
				<h2 className='about__heading heading'>Студент</h2>
				<div className='about__container-info'>
					<div className='about__image'></div>
					<div className='about__info'>
						<p className='about__title'>Михаил</p>
						<p className='about__subtitle'>Фронтенд-разработчик, 23 года</p>
						<p className='about__description'>
							Я родился в Красноярске, закончил географический факультет с углублением
							GIS в СФУ. Я люблю путешествовать, сейчас живу с женой и собакой в
							Грузии. После института занялся программированием. Занимаюсь
							фриланс-заказами и в поиске интересных проектов.
						</p>
						<a href='https://github.com/Svojest' className='about__link link' target='__blank'>
							Github
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutMe;
