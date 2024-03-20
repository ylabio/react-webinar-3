import { memo, useCallback, useEffect } from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import { Link, redirect, useNavigate } from "react-router-dom";
import useInit from "../../hooks/use-init";
import "./style.css"


function ProfileTools() {
  const store = useStore();
  const navigate = useNavigate();

  const { t } = useTranslate();

  const select = useSelector(state => ({
    token: state.profile.token,
    user: state.profile.user
  }));

  useEffect(() => {
    if (select.token) {
      store.actions.profile.setUser()
    }
  }, [store])

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
    <div className="ProfileTools">
      <SideLayout side='end' padding='small'>
        <Link to='/profile'>{select.user ? select.user.profile.name : ''}</Link>
        <button onClick={callbacks.buttonClick}>{select.user ? t('auth.logout') : t('auth.login')}</button>
      </SideLayout>
    </div>
  );
}

export default memo(ProfileTools);