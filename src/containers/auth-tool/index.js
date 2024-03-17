import { memo, useCallback } from "react";
import SideLayout from "../../components/side-layout";
import { Link, useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import AuthLogged from "../../components/auth-logged";

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
        <SideLayout side={"end"} padding={"small"}>
            { select.token ?
                <AuthLogged path={'/profile'} onExit={callbacks.exit} buttonText={t('logout')} username={select.userName}/>
                :
                <Link to={"/login"}>
                    <button>{t('enter')}</button>
                </Link>
            }
        </SideLayout>
    )
}

export default memo(AuthTool)