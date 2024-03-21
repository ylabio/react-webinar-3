import {memo, useCallback, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";

function LoginCard({t, error, login, openLogin}) {

    const cn = bem('LoginCard');

    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    useEffect(() => {
        openLogin();
    }, [])

    return (
        <div className={cn()}>
            <h1>{t('logincard.login')}</h1>
            <div className={cn('field')}>
                <label htmlFor='login'>{t('logincard.user')}</label>
                <input id='login' value={user} onChange={e => setUser(e.target.value)}/>
            </div>
            <div className={cn('field')}>
                <label htmlFor='password'>{t('logincard.password')}</label>
                <input id='password' type='password' value={pass} onChange={e => setPass(e.target.value)}/>
            </div>
            {error && error.map(err => <div className={cn('field', {color:'red'})}>{err.message}</div>)}
            <button onClick={
                () => {
                    login({user, pass})
                }
            }>{t('logincard.loginbtn')}</button>
        </div>
    )
}

export default memo(LoginCard);