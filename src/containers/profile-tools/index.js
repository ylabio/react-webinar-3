import { memo, useCallback } from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import { Link, redirect, useNavigate } from "react-router-dom";
import useInit from "../../hooks/use-init";


function ProfileTools() {
  const store = useStore();
  const navigate = useNavigate();

  const { t } = useTranslate();

  const select = useSelector(state => ({
    token: state.profile.token,
    user: state.profile.user
  }));

  useInit(() => {
    if (select.token) {
      store.actions.profile.setUser()
    }
  })

  const callbacks = {
    buttonClick: useCallback(() => {
      if (select.user) {
        store.actions.profile.logOut();
      } else {
        navigate('/login');
      }
    }, [store, navigate, select.user])
  }

  return (
    <SideLayout side='end' padding='small'>
      <Link to='/profile'>{select.user ? select.user.username : ''}</Link>
      <button onClick={callbacks.buttonClick}>{select.user ? t('auth.logout') : t('auth.login')}</button>
    </SideLayout>
  );
}

export default memo(ProfileTools);