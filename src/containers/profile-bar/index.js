import {memo, useCallback} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import { Link } from "react-router-dom";

/**
 * Контейнер с именем пользователя и кнопкой входа / выхода
 */
function ProfileBar() {

  const store = useStore();
  
  const select = useSelector(state => ({
    user: state.profile.user
  }));

  const callbacks = {
    onClickLogin: (e) => window.location='/login/',
    onClickLogout: useCallback(() => store.actions.profile.logout(), [store]),
  }

  const {t} = useTranslate();

  console.log(select)

  return (
    <SideLayout side='end' padding='small' border='bottom'>
      { select.user && <Link to={'/profile/'}>{ select.user.profile.name }</Link> }
      { select.user 
        ? <button key='btnLogout' onClick={callbacks.onClickLogout}>{t('profile.logout')}</button>
        : <button key='btnLogin' onClick={callbacks.onClickLogin}>{t('profile.login')}</button>
      }
    </SideLayout>
  )

}

export default memo(ProfileBar);