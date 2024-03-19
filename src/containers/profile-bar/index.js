import {memo, useCallback} from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import useStore from "../../hooks/use-store";
import useProfile from '../../hooks/use-profile';
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import { Link } from "react-router-dom";

/**
 * Контейнер с именем пользователя и кнопкой входа / выхода
 */
function ProfileBar() {

  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const profile = useProfile();

  const callbacks = {
    onClickLogin: (e) => {
      if (location.pathname !== '/login/') {
        navigate('/login/', {state: {isNotStartPage: true}});
      }
    },
    onClickLogout: useCallback(() => store.actions.profile.logout(), [store]),
  }

  const {t} = useTranslate();

  return (
    <SideLayout side='end' padding='small' border='bottom'>
      { profile.data && <Link to={'/profile/'}>{ profile.data.profile.name }</Link> }
      { profile.data 
        ? <button key='btnLogout' onClick={callbacks.onClickLogout}>{t('profile.logout')}</button>
        : <button key='btnLogin' onClick={callbacks.onClickLogin}>{t('profile.login')}</button>
      }
    </SideLayout>
  )

}

export default memo(ProfileBar);