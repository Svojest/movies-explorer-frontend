import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import poster from '../../../../images/poster1.png';
import poster1 from '../../../../images/poster2.png';

const MoviesCardList = ({ saved }) => {
	
	return (
		<section className='movies-card-list'>
			<ul className='movies-card-list__container'>
				<MoviesCard title='33 слова о дизайне' duration='1ч 47м' poster={poster} saved={saved}/>
				<MoviesCard title='33 слова о дизайне' duration='1ч 47м' poster={poster1} saved={saved} />
				<MoviesCard title='33 слова о дизайне' duration='1ч 47м' poster={poster} saved={saved} />
				<MoviesCard title='33 слова о дизайне' duration='1ч 47м' poster={poster1} saved={saved} />
				<MoviesCard title='33 слова о дизайне' duration='1ч 47м' poster={poster} saved={saved} />
				<MoviesCard title='33 слова о дизайне' duration='1ч 47м' poster={poster1} saved={saved} />
				<MoviesCard title='33 слова о дизайне' duration='1ч 47м' poster={poster} saved={saved} />
			</ul>
      <button className='movies-card-list__more'>Ещё</button>
		</section>
	);
};

export default MoviesCardList;
