import {memo, useCallback, useMemo} from 'react';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import SideLayout from '../../components/side-layout';
import ToggleLogin from '../../components/toggle-login';
import LinkProfile from '../../components/link-profile';
import Spinner from '../../components/spinner';

/**
 * Контейнер с авторизацией пользователя, вход или выход из аккаунта
 */

function AuthLogin () {

  const {t} = useTranslate();

  const select = useSelector(state => ({
    authLogin: state.login.authLogin,
    name: state.login.profile.name,
    waiting: state.login.waiting
  }));

  const store = useStore();

  const callbacks = {
    // Отмена авториазции пользователя
    signOutUser: useCallback(() => store.actions.login.signOutUser(), [store]),
  }
  
  if (!select.authLogin) {
    return (
      <SideLayout side='end' padding='small'>
        <Spinner active={select.waiting}>
          <ToggleLogin authLogin={select.authLogin} signIn={t('authlogin.signIn')} link={'/login'}/>
        </Spinner>
      </SideLayout>
    );
  }
  return (
    <Spinner active={select.waiting}>
      <SideLayout side='end' padding='small'>
        <LinkProfile name={select.name} link={'/profile'}/>
        <ToggleLogin authLogin={select.authLogin} signOut={t('authlogin.signOut')} link={'/login'} signOutUser={callbacks.signOutUser}/>
      </SideLayout>
    </Spinner>  
  );
 
}

export default memo(AuthLogin);