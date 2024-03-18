import { memo, useCallback, useEffect, useState } from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css'
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/use-auth";

const LoginForm = () => {
    
    const initialState = {
        login: '',
        password: ''
    }

    const [formData, setFormData] = useState(initialState);

    const store = useStore();

    const navigate = useNavigate();

    const select = useSelector(state => ({
        authError: state.auth.error,
        userInfo: state.auth.userData,
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const success = await callbacks.logIn(formData.login, formData.password);
        setFormData(initialState);
        if (success) navigate("/profile");
    }

    useAuth([]);

    return(
        <div className={cn()}>
            <form className={cn('form')}>
                <p>{t('auth.signingIn')}</p>
                <div className={cn('input')}>
                    <label>{t('auth.login')}</label>
                    <input id='login' onChange={changeInput} type="text" value={formData.login}></input>
                </div>
                <div className={cn('input')}>
                    <label>{t('auth.password')}</label>
                    <input id='password' onChange={changeInput} type="password" value={formData.password}></input>
                </div>
                <div className={cn('error')}>{select.authError}</div>
                <button onClick={handleSubmit}>{t('auth.signIn')}</button>
            </form>
        </div>
    )
}

export default memo(LoginForm)