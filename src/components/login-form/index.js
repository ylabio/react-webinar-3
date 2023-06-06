import React, { memo, useState } from "react";
import 'style.css'
import { cn as bem, cn } from "@bem-react/classname";
import { useNavigate } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";

function LoginForm(props) {

    const cn = bem('LoginForm');
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const {t} = useTranslate()

    const onSubmit = (e) => {
        e.preventDefault();
        props.signIn(login, password)
        setLogin('')
        setPassword('')
    }
    
    return (
        <div className={cn()}>
                <h2>{props.title}</h2>
                <form onSubmit={onSubmit}>
                    <div className={cn('login')}>
                        <label htmlFor="name">{t('login')}</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                    </div>
                    <div className={cn('password')}>
                        <label htmlFor="password">{t('password')}</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className={cn('error-block')}>
                        <span className={cn('error-text')}>{props.error ? props.error : ''}</span>
                    </div>
                    <button type="submit">{t('signIn')}</button>
                </form>
            </div>

    )
}

export default memo(LoginForm);