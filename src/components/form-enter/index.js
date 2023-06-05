import React, {useEffect, useState} from 'react'
import {cn as bem} from '@bem-react/classname';
import './style.css'

const FormEnter = ({onClickLogin, error, resetError, t}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const cn = bem('FormEnter');

    useEffect(() => {
        setLogin('');
        setPassword('');
        return (() => resetError())
    }, [])

    function onChangeLogin(e) {
        setLogin(e.target.value);
    }

    function onChangePassword(e) {
        setPassword(e.target.value);
    }

    function onSubmitForm(e) {
        e.preventDefault();
        onClickLogin({
            login,
            password
        });
    }

    return (
        <form className='FormEnter'>
            <h2>{t('form.enter')}</h2>
            <label htmlFor='login'>{t('form.login')}</label>
            <input className={cn('input')} type='text' value={login} onChange={onChangeLogin} id='login' />
            <label htmlFor='pass'>{t('form.password')}</label>
            <input className={cn('input')} type='password' value={password} onChange={onChangePassword} id='pass' />
            {error && <p className={cn('error')}>{error}</p>}
            <button className={cn('btn')} onClick={onSubmitForm}>Войти</button>
        </form>
    )
}

export default FormEnter
