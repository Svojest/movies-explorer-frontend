import React from 'react';
import Authorization from '../Authorization';

const Register = () => {
	return (
		<Authorization
			headerText='Добро пожаловать!'
			buttonText='Зарегистрироваться'
			navLink='/signin'
			text='Уже зарегистрированы?'
			navText='Войти'
		>
			<fieldset className='authorization__fieldset'>
				<label className='authorization__label'>
					Имя
					<input
						className='authorization__field'
						type='text'
						id='name-field'
						name='name'
						placeholder='Виталий'
						required
					/>
					<span className='authorization__error'></span>
				</label>
				<label className='authorization__label'>
					E-mail
					<input
						className='authorization__field'
						type='text'
						id='email-field'
						name='email'
						placeholder='pochta@yandex.ru'
						required
					/>
					<span className='authorization__error'></span>
				</label>
				<label className='authorization__label'>
					Пароль
					<input
						className='authorization__field'
						type='password'
						id='password-field'
						name='password'
						placeholder='Пароль'
						required
					/>
					<span className='authorization__error'>Что-то пошло не так...</span>
				</label>
			</fieldset>
		</Authorization>
	);
};

export default Register;
