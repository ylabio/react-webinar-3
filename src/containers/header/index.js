import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import HeaderLayout from '../../components/header-layout';
import HeaderLink from '../../components/header-link';

/**
 * Шапка с навигацией
 */

function Header () {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    isLoggedIn: state.user.isLoggedIn,
    userData: state.user.userData
  }));


  const callbacks = {
    // Выход
    onLogOut: useCallback(
      () => {
         store.actions.user.logOutUser();
      },
      [store],
    ),

    //Будем очищать строку ошибки авторизации при нажатии на вход
    onClear: useCallback(
      () => {
        store.actions.user.clearError();
      },
      [store],
    ),
  };

  return (
    <HeaderLayout>
        {select.isLoggedIn ?
        <>
          <HeaderLink title={select.userData.name} type="link" link='/profile' style='main' />
          <HeaderLink title={t('header.logout')} type="link" onClick={callbacks.onLogOut} link='/' />
        </>
        :
        <HeaderLink title={t('header.login')} type="link" link='/login' onClick={callbacks.onClear}/>
        }
    </HeaderLayout>
  )
}


export default memo(Header);