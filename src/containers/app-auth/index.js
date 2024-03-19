import {memo, useCallback} from "react";
import {Link, useLocation} from "react-router-dom";
import AuthTool from "../../components/auth-tool";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function AppAuth() {
  const {t} = useTranslate();

  const location = useLocation();

  const store = useStore();

  const select = useSelector(state => ({
    auth: state.auth.auth,
    user: state.auth.user
  }));

  const callbacks = {
    logOut: useCallback(store.actions.auth.logOut, [store]),
  }

  return (
    <AuthTool>
      {!select.auth
        ? 
        <Link to='/login' state={location.pathname}>
          <button>{t('auth.login')}</button>
        </Link>
       :
        <>
          <Link to={`/profile`}>
            <p>{select.user}</p>
          </Link>
          <button onClick={callbacks.logOut}>{t('auth.logout')}</button>
        </>
      }
    </AuthTool>
  )
}

export default memo(AppAuth);