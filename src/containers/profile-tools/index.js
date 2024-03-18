import { memo, useCallback } from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import { Link, redirect, useNavigate } from "react-router-dom";
import useInit from "../../hooks/use-init";


function ProfileTools() {
  const store = useStore();

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
        redirect('/login');
      }
    }, [store])
  }

  return (
    <SideLayout side='end' padding='small'>
      <Link to='/profile'>{select.user ? select.user.username : ''}</Link>
      <Link to={!select.user ? '/login' : ''}>
        <button onClick={callbacks.buttonClick}>{select.user ? t('auth.logout') : t('auth.login')}</button>
      </Link>
    </SideLayout>
  );
}

export default memo(ProfileTools);