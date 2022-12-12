import React, { useContext, useEffect } from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../context/currentUserContext';
import { useState } from 'react';
import useFormAndValidation from '../../hook/useFormAndValidation';

const Profile = ({ handleUpdateUser, handleSignOut }) => {
	const { values, isErrors, isValid, handleChange, setValues, setIsValid } =
		useFormAndValidation();

	const [isActive, setIsActive] = useState(false);
	const currentUser = useContext(CurrentUserContext);

	const onSubmit = (e) => {
		e.preventDefault();
		handleUpdateUser(values.name, values.email);
		setIsActive(false);
	};

	// Если текужщие значения одинаковы с конектном, диактивировать кнопку submit
	useEffect(() => {
		if (currentUser.name === values.name && currentUser.email === values.email) {
			setIsValid(false);
		}
	}, [setIsValid, values, currentUser]);

	// Активировать поля для редактирования
	function handleEdit() {
		setIsActive(true);
	}
	// Загрузка значений из контекста
	useEffect(() => {
		if (currentUser) {
			setValues({
				name: currentUser.name,
				email: currentUser.email,
			});
		}
	}, [setValues, currentUser]);

	return (
		<section className='profile'>
			<div className='profile__container'>
				<form action='/' className='profile__form' method='POST' onSubmit={onSubmit}>
					<h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
					<fieldset className='profile__fieldset'>
						<label className='profile__label'>
							Имя
							<input
								type='text'
								value={values.name || ''}
								onChange={handleChange}
								name='name'
								className={`profile__input ${
									isActive ? 'profile__text_active' : 'profile__text'
								}`}
								id='name-field'
								minLength='2'
								required
								disabled={!isActive}
							/>
						</label>
						<span className='profile__error'>
							{isErrors.name ? 'Это обязательное поле' : ''}
						</span>
						<label className='profile__label'>
							E-email
							<input
								type='email'
								value={values.email || ''}
								onChange={handleChange}
								name='email'
								id='email-field'
								className={`profile__input ${
									isActive ? 'profile__text_active' : 'profile__text'
								}`}
								required
								disabled={!isActive}
							/>
						</label>
						<span className='profile__error'>{isErrors.email || ''}</span>
					</fieldset>
					<div className='profile__actions'>
						{isActive ? (
							<button
								className={`profile__actions-text ${
									!isValid ? 'profile__edit_disabled' : 'profile__edit'
								}`}
								type='submit'
								disabled={!isValid}
							>
								Сохранить
							</button>
						) : (
							<>
								<button
									className={`profile__actions-text profile__edit'
								}`}
									type='button'
									onClick={handleEdit}
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
							</>
						)}
					</div>
				</form>
			</div>
		</section>
	);
};

export default Profile;
