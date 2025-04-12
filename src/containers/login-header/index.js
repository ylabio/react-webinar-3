import LoginHeader from "../../components/login-header";
import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { Outlet } from "react-router-dom";

function LoginHeaderContainer({children}){
    const store = useStore();
    const select = useSelector(state =>({
    user: state.user.user,
    isLogin: state.auth.isLogin}))

    const logOut = useCallback(()=> {store.actions.auth.resetUser(); store.actions.user.resetUser()},[store])

    return (
        <>
        <LoginHeader logout={logOut} userName={select.user.name} isLogin={select.isLogin}/>
         <Outlet/>
        </>
    )
}

export default memo(LoginHeaderContainer)