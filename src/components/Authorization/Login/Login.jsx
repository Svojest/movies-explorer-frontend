import React from 'react';

import Authorization from '../Authorization';

const Login = () => {
	return (
		<Authorization
			headerText='Рады видеть!'
			buttonText='Войти'
			navLink='/signup'
			text='Еще не зарегистрированы?'
			navText='Регистрация'
		>
			<fieldset className='authorization__fieldset'>
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

export default Login;
