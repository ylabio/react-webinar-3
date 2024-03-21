import { memo, useCallback, useEffect } from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import { Link, redirect, useNavigate } from "react-router-dom";
import useInit from "../../hooks/use-init";
import "./style.css"
import Spinner from "../../components/spinner";


function ProfileTools() {
  const store = useStore();
  const navigate = useNavigate();

  const { t } = useTranslate();

  const select = useSelector(state => ({
    token: state.session.token,
    user: state.session.user,
    waiting: state.session.waiting
  }));

  const callbacks = {
    buttonClick: useCallback(() => {
      if (select.token) {
        store.actions.session.logOut();
        store.actions.profile.clearData();
      } else {
        navigate('/login');
      }
    }, [store, navigate, select.user, select.token])
  }

  return (
    <div className="ProfileTools">
      <Spinner active={select.waiting}>
        <SideLayout side='end' padding='small'>
          <Link to='/profile'>{select.token ? select.user.profile?.name : ''}</Link>
          <button onClick={callbacks.buttonClick}>{select.token ? t('auth.logout') : t('auth.login')}</button>
        </SideLayout>
      </Spinner>
    </div>
  );
}

export default memo(ProfileTools);