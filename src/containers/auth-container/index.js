import { memo, useCallback, useEffect } from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import { Link, useNavigate } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";

/**
 * Контейнер входа/выхода из профиля
 */
function AuthContainer() {
  const store = useStore();
  const navigate = useNavigate()
  const {t} = useTranslate();

  const select = useSelector(state => ({
    userName: state.authorization.userName,
    token: state.authorization.token
  }))

  const callbacks = {
    onSignIn: useCallback(() => {navigate('/login')}, []),
    onSignOut: useCallback(() => {store.actions.authorization.signOut()}, []),
  }

  useEffect(() => {
    if (select.token) {
      store.actions.authorization.checkAuth(select.token);
    }
  }, [select.token]);

  return (
    <SideLayout side='end' padding='medium_additionally' border='bottom'>
      { select.token && <Link to={'/profile'}>{select.userName}</Link> }
      {
        select.token
          ? <button onClick={callbacks.onSignOut}>{t('signout')}</button>
          : <button onClick={callbacks.onSignIn}>{t('signin')}</button>
      }
    </SideLayout>
  )
}


export default memo(AuthContainer);