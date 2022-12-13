import React from 'react';
import './Techs.css';

const Techs = () => {
	return (
		<section className='techs'>
			<div className='techs__container container'>
				<h2 className='techs__heading heading'>Технологии</h2>
				<p className='techs__title'>7 технологий</p>
				<p className='techs__subtitle'>
					На курсе веб-разработки мы освоили технологии, которые применили в дипломном
					проекте.
				</p>

				<ul className='techs__container-boxs'>
					<li className='techs__box'>
						<p className='techs__box-text'>HTML</p>
					</li>
					<li className='techs__box'>
						<p className='techs__box-text'>CSS</p>
					</li>
					<li className='techs__box'>
						<p className='techs__box-text'>JS</p>
					</li>
					<li className='techs__box'>
						<p className='techs__box-text'>React</p>
					</li>
					<li className='techs__box'>
						<p className='techs__box-text'>Git</p>
					</li>
					<li className='techs__box'>
						<p className='techs__box-text'>Express.js</p>
					</li>
					<li className='techs__box'>
						<p className='techs__box-text'>mongoDB</p>
					</li>
				</ul>
			</div>
		</section>
	);
};

export default Techs;
