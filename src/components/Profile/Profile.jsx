import React from 'react';
import './Profile.css';

const Profile = ({ name, email }) => {
	return (
		<section className='profile'>
			<div className='profile__container'>
				<h1 className='profile__title'>{`Привет, ${name}!`}</h1>
				<div className='profile__info'>
					<div className='profile__info-line'>
						<p className='profile__info-name'>Имя</p>
						<p className='profile__info-text'>{name}</p>
					</div>
					<div className='profile__info-line'>
						<p className='profile__info-name'>E-mail</p>
						<p className='profile__info-text'>{email}</p>
					</div>
				</div>
			</div>
			<div className='profile__actions'>
				<p className='link profile__edit'>Редактировать</p>
				<p className='link profile__logout'>Выйти из аккаунта</p>
			</div>
		</section>
	);
};

export default Profile;
