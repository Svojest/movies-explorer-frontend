import React from 'react';
import './AboutProject.css';

const AboutProject = () => {
	return (
		<section className='project'>
			<div className='project__container'>
				<h2 className='project__heading heading'>О проекте</h2>
				<div className='project__wrapper'>
					<div className='project__container-info'>
						<p className='project__title'>Дипломный проект включал 5 этапов</p>
						<p className='project__subtitle'>
							Составление плана, работу над бэкендом, вёрстку, добавление
							функциональности и финальные доработки.
						</p>
					</div>

					<div className='project__container-info'>
						<p className='project__title'>На выполнение диплома ушло 5 недель</p>
						<p className='project__subtitle'>
							У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
							соблюдать, чтобы успешно защититься.
						</p>
					</div>
				</div>

				<div className='project__container-data'>
					<p className='project__data project__box green'>1 неделя</p>
					<p className='project__data project__box'>4 недели</p>
					<p className='project__data opacity'>Back-end</p>
					<p className='project__data opacity'>Front-end</p>
				</div>
			</div>
		</section>
	);
};

export default AboutProject;
