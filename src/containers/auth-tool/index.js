import { memo, useCallback } from "react";
import SideLayout from "../../components/side-layout";
import { Link, useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import AuthLogged from "../../components/auth-logged";
import AuthUnlogged from "../../components/auth-unlogged";

function AuthTool() {
    const store = useStore()
    const { t } = useTranslate();

    const select = useSelector(state => ({
        token: state.user.token,
        userName: state.user.user.username
    }));

    const navigate = useNavigate()

    const callbacks = {
        // Выход из аккаунта
        exit: useCallback(() => {
            store.actions.user.logOut()
            navigate('/login')
        }, [store]),
    }

    return (
        <SideLayout side={"end"} padding={"small"} border={"bottom"}>
            { select.token ?
                <AuthLogged path={'/profile'} onExit={callbacks.exit} buttonText={t('logout')} username={select.userName}/>
                :
                <AuthUnlogged path={'/login'} buttonText={t('enter')} />
            }
        </SideLayout>
    )
}

export default memo(AuthTool)