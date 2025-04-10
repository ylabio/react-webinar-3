import LoginHeader from "../../components/login-header";
import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';

function LoginHeaderContainer(){
    const store = useStore();
    const select = useSelector(state =>({
    user: state.user.user,
    isLogin: state.user.isLogin}))

    const logOut = useCallback(()=> store.actions.user.resetUser(),[store])

    return (
        <>
        <LoginHeader logout={logOut} userName={select.user.name} isLogin={select.isLogin}/>
        </>
    )
}

export default memo(LoginHeaderContainer)