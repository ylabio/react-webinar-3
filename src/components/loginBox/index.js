import {memo} from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LoginBox({ onLogin, loginError }) {
    const cn = bem('LoginBox');
    return (
        <div className={cn()}>
            <form className={cn('form')} onSubmit={onLogin}>
                <span className={cn('title')} >{'Вход'}</span>
                <span className={cn('input-name')} >{'Логин'}</span>
                <input className={cn('name')} type="text" name="username" />
                <span className={cn('input-password')} >{'Пароль'}</span>
                <input className={cn('password')} type="password" name="password" />
                {loginError && <p className={cn('error')}>{loginError}</p>}
                <button className={cn('button')} type="submit">Войти</button>
            </form>
          
        </div>
    );
}

export default memo(LoginBox);


