import React, { useContext, useEffect } from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../context/currentUserContext';
import { useForm } from 'react-hook-form';

const Profile = ({ handleUpdateUser, handleSignOut }) => {
	const currentUser = useContext(CurrentUserContext);
	const {
		register,
		formState: { errors, isValid },
		setValue,
		handleSubmit,
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			name: currentUser.name,
			email: currentUser.email,
		},
	});

	const onSubmit = (newUserInfo) => {
		handleUpdateUser(newUserInfo);
	};

	useEffect(() => {
		setValue('name', currentUser.name);
		setValue('email', currentUser.email);
	}, [currentUser]);
	return (
		<section className='profile'>
			<div className='profile__container'>
				<form
					action='/'
					className='profile__form'
					method='POST'
					onSubmit={handleSubmit(onSubmit)}
				>
					<h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
					<fieldset className='profile__fieldset'>
						<label className='profile__label'>
							Имя
							<input
								type='text'
								name='name'
								id='name-field'
								className={`profile__input ${
									errors?.name && 'profile__input_error'
								}`}
								{...register('name', {
									required: 'Поле обязательно к заполнению',
								})}
							/>
						</label>
						<span className='profile__error'>
							{errors?.name && errors?.name?.message}
						</span>
						<label className='profile__label'>
							E-email
							<input
								type='text'
								name='email'
								id='email-field'
								className={`profile__input ${
									errors?.email && 'profile__input_error'
								}`}
								{...register('email', {
									required: 'Это обязательное поле',
									pattern: {
										value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g,
										message: 'Некорректный email-адрес',
									},
								})}
							/>
						</label>
						<span className='profile__error'>
							{errors?.email && errors?.email?.message}
						</span>
					</fieldset>
					<div className='profile__actions'>
						<button
							className={`profile__actions-text profile__edit ${
								!isValid && 'profile__edit_disabled'
							}`}
							type='submit'
						>
							Редактировать
						</button>
						<button
							className='profile__actions-text profile__logout'
							type='button'
							onClick={handleSignOut}
						>
							Выйти из аккаунта
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default Profile;
