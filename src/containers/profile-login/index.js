import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import SideLayout from '../../components/side-layout';
import LoginCard from '../../components/login-card';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/spinner';
import useTranslate from '../../hooks/use-translate';

function ProfileLogin() {
    const store = useStore();
    const {t} = useTranslate();

    useEffect(() =>{
        store.actions.auth.clearLoginErrors();
    },[])
    
    const select = useSelector(state => ({
        loginErrors: state.auth.loginErrors,
        waiting : state.auth.waiting
    }));

    const [userData,setUserData] = useState({
        login :"",
        password :""
    })

    const callbacks = { 
        // Ввод данных
        onFormChange: useCallback((name,value) => setUserData(prev => ({...prev,[name]:value}))),
        // Сабмит формы
        onFormSubmit: useCallback(() => store.actions.auth.authentication(userData) ),
      }

    return (
        <Spinner active = {select.waiting}>
        <SideLayout padding="medium">
                <LoginCard user = {userData} onFormChange = {callbacks.onFormChange} onSubmit = {callbacks.onFormSubmit} errors = {select.loginErrors} t={t}/>
        </SideLayout>
        </Spinner>
    )
}

export default ProfileLogin