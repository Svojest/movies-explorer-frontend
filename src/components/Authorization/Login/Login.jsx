import React from 'react';
import Authorization from '../Authorization';
import { useForm } from 'react-hook-form';

const Login = ({ handleLogin }) => {
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
	} = useForm({ mode: 'onChange' });

	const onSubmit = ({ email, password }) => {
		handleLogin(email, password);
		reset();
	};
	return (
		<Authorization
			headerText='Рады видеть!'
			buttonText='Войти'
			navLink='/signup'
			text='Еще не зарегистрированы?'
			navText='Регистрация'
			onSubmit={handleSubmit(onSubmit)}
			isValid={isValid}
		>
			<fieldset className='authorization__fieldset'>
				<label className='authorization__label'>
					E-mail
					<input
						className={`authorization__field ${
							errors?.email && 'authorization__field_error'
						} `}
						type='text'
						id='email-field'
						name='email'
						placeholder='pochta@yandex.ru'
						{...register('email', {
							required: 'Это обязательное поле',
							pattern: {
								value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g,
								message: 'Некорректный email-адрес',
							},
						})}
					/>
					<span className='authorization__error'>
						{errors?.email && errors?.email?.message}
					</span>
				</label>
				<label className='authorization__label'>
					Пароль
					<input
						className={`authorization__field ${
							errors?.password && 'authorization__field_error'
						} `}
						type='password'
						id='password-field'
						name='password'
						placeholder='Пароль'
						{...register('password', {
							required: 'Это обязательное поле',
						})}
					/>
					<span className='authorization__error'>
						{errors?.password && errors?.password?.message}
					</span>
				</label>
			</fieldset>
		</Authorization>
	);
};

export default Login;
