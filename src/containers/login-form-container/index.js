import { memo, useCallback, useState } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import LoginForm from "../../components/login-form";
import useSelector from "../../hooks/use-selector";

function LoginFormContainer() {
	const store = useStore();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const select = useSelector(state => ({
    error: state.user.error
  }));

	const callbacks = {
		// Смена значения поля имени пользователя
		onChangeUserName: useCallback(e => setUsername(e.target.value), []),
		// Смена значения поля пароля
		onChangePassword: useCallback(e => setPassword(e.target.value), []),
		// Вход
		onLogin: useCallback((data) => store.actions.user.login(data), [store]),
	}

	// Функция для локализации текстов
	const { t } = useTranslate();

	return (
		<SideLayout side='start' padding='medium'>
			<LoginForm username={username} password={password} error={select.error} callbacks={callbacks} t={t} />
		</SideLayout>
	);
}

export default memo(LoginFormContainer);
