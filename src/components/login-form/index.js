import { memo, useCallback, useState } from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css'
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    
    const initialState = {
        login: '',
        password: ''
    }

    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();

    const store = useStore();

    const select = useSelector(state => ({
        authError: state.auth.error,
        waiting: state.auth.waiting
      }));
    
    const {t} = useTranslate();

    const callbacks = {
    logIn: useCallback((login, password) => store.actions.auth.logInUser(login, password), [store])
    }


    const cn = bem('LoginForm');

    const changeInput = (event) => {
        setFormData({
            ...formData,
            [event.currentTarget.id]: event.currentTarget.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        callbacks.logIn(formData.login, formData.password);
        setFormData(initialState);
        // navigate('/profile');
    }

    return(
        <div className={cn()}>
            <form className={cn('form')}>
                <p>Вход</p>
                <div className={cn('input')}>
                    <label>Логин</label>
                    <input id='login' onChange={changeInput} type="text"></input>
                </div>
                <div className={cn('input')}>
                    <label>Пароль</label>
                    <input id='password' onChange={changeInput} type="password"></input>
                </div>
                <div className={cn('error')}>{select.authError}</div>
                <button onClick={handleSubmit}>Войти</button>
            </form>
        </div>
    )
}

export default memo(LoginForm)