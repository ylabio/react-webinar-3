import React, { useCallback } from 'react';

import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';

import FormLayout from '../../components/form-layout';
import FormInput from '../../components/form-input';
import Button from '../../components/button';

import { useNavigate } from 'react-router-dom';

function AuthForm() {
    const store = useStore();
    const navigate = useNavigate();

    const callbacks = {
        // Ввод логина
        onLoginChange: useCallback(value => store.actions.auth.setLogin(value), [store]),
        //Ввод пароля
        onPasswordChange: useCallback(value => store.actions.auth.setPassword(value), [store]),
        //Авторизация
        onAuth: useCallback(async () => {
            const authStatus = await store.actions.auth.authorizate();
            if (authStatus) {
                navigate('/');
            }
        }, [store]),
    };

    return (
        <FormLayout title={'Вход'}>
            <FormInput
                title={'Логин'}
                value={''}
                placeholder={'Логин'}
                onChange={callbacks.onLoginChange}
            />
            <FormInput
                title={'Пароль'}
                type='password'
                value={''}
                placeholder={'Введите пароль'}
                onChange={callbacks.onPasswordChange}
            />
            <Button style={'primary'} title={'Войти'} onClick={callbacks.onAuth} />
        </FormLayout>
    )
}

export default React.memo(AuthForm);