export const loginInputs = [
	{
		label: 'Логин',
		id: 'login',
		type: 'text',
    autoComplite: 'username',
		validationConfig: {
			required: 'Введите логин',
			minLength: {
				value: 2,
				message: 'Введите не менее 2 символов',
			},
			maxLength: {
				value: 30,
				message: 'Введите менее 30 символов',
			},
		},
	},
	{
		label: 'Пароль',
		id: 'password',
		type: 'password',
    autoComplite: 'current-password',
		validationConfig: {
			required: 'Введите пароль',
		},
	},
];