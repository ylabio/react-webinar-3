import React,{memo,useCallback,useEffect,useMemo, useState} from 'react';
import { Link } from 'react-router-dom';
import LoginMenuLayout from '../../components/login-menu-layout';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';

const LoginMenu = () => {
    const store = useStore()
    const select = useSelector(state => ({
        token: state.login.token,
        exception: state.login.exception,
        profileInfo:state.login.profileInfo
      }));
    
    const callbacks = {
        onExit: useCallback(() => store.actions.login.exit(),[store])
    }

    return (
        <LoginMenuLayout token={select.token} onExit={callbacks.onExit} loginPage={'/login'} linkProfile={'/profile'} 
        profileName={select.profileInfo.result?.profile.name}/>
    );
};

export default memo(LoginMenu);