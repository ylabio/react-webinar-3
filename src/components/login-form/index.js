import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LoginForm({
    login,
    password,
    onChangeLogin,
    onChangePassword,
    onSubmit,
    errorText,
}) {

    const cn = bem('LoginForm');

    return (
        <form
            className={cn()}
            onSubmit={
                event => {
                    event.preventDefault();
                    onSubmit(login, password);
                }
            }>
            <span className={cn('title')}>Вход</span>
            <label htmlFor="login">Логин</label>
            <input id="login" type="text" value={login} onChange={event => onChangeLogin(event.target.value)}/>
            <label htmlFor="password">Пароль</label>
            <input id="password" type="password" value={password} onChange={event => onChangePassword(event.target.value)}/>
            <span>{errorText}</span>
            <button className={cn('button')} type="submit">Войти</button>
        </form>
    );
};

LoginForm.propTypes = {
    login: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onChangeLogin: PropTypes.func.isRequired,
    onChangePassword: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    errorText: PropTypes.string
};

export default memo(LoginForm);