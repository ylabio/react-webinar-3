import React, { useCallback } from 'react';

import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';

import FormLayout from '../../components/form-layout';
import FormInput from '../../components/form-input';
import Button from '../../components/button';
import ErrorMessage from '../../components/error-message';

import { useNavigate } from 'react-router-dom';

function AuthForm() {
    const store = useStore();
    const navigate = useNavigate();

    const { login, password, error } = useSelector(state => state.auth);

    const callbacks = {
        // Ввод логина
        onLoginChange: useCallback(value => store.actions.auth.setLogin(value), [store]),
        //Ввод пароля
        onPasswordChange: useCallback(value => store.actions.auth.setPassword(value), [store]),
        //Авторизация
        onAuth: useCallback(async () => {
            const authStatus = await store.actions.auth.authorizate();
            if (authStatus) {
                navigate('/profile');
            }
        }, [store]),
    };

    return (
        <FormLayout title={'Вход'}>
            <FormInput
                title={'Логин'}
                value={login}
                placeholder={'Логин'}
                onChange={callbacks.onLoginChange}
            />
            <FormInput
                title={'Пароль'}
                type='password'
                value={password}
                placeholder={'Введите пароль'}
                onChange={callbacks.onPasswordChange}
            />
            <ErrorMessage text={error} />
            <Button style={'primary'} title={'Войти'} onClick={callbacks.onAuth} />
        </FormLayout>
    )
}

export default React.memo(AuthForm);