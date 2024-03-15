import {memo} from "react";
import {Link} from "react-router-dom";
import AuthTool from "../../components/auth-tool";
import useTranslate from "../../hooks/use-translate";
import useAuth from "../../hooks/use-auth";

function AppAuth() {
  const {t} = useTranslate();

  const {isAuthorized, user, logOut} = useAuth();

  return (
    <AuthTool>
      {!isAuthorized
        ? 
        <Link to={`/login`}>
          <button>{t('auth.login')}</button>
        </Link>
       :
        <>
          <Link to={`/profile`}>
            <p>{user && user.profile.name}</p>
          </Link>
          <button onClick={logOut}>{t('auth.logout')}</button>
        </>
      }
    </AuthTool>
  )
}

export default memo(AppAuth);