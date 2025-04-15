import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import HeaderLayout from '../../components/header-layout';
import HeaderLink from '../../components/header-link';
import { useLocation } from 'react-router-dom';

/**
 * Шапка с навигацией
 */

function Header () {
  const store = useStore();
  const { t } = useTranslate();
  const location = useLocation();

  const select = useSelector(state => ({
    isLoggedIn: state.auth.isLoggedIn,
    userData: state.user.userData,
    waiting: state.user.waiting,
  }));


  const callbacks = {
    // Выход
    onLogOut: useCallback(
      () => {
         store.actions.auth.logOutUser();
      },
      [store],
    ),

    //Будем очищать прошлую ошибку авторизации при повторном посещении страницы авторизации
    onClear: useCallback(
      () => {
        store.actions.auth.clearError();
      },
      [store],
    ),
  };

  if (select.isLoggedIn && select.waiting) {
    return <p>Данные загружаются</p>
  }

  return (
    <HeaderLayout>
        {select.isLoggedIn ?
        <>
          <HeaderLink title={select.userData.name} type="link" link='/profile' style='main' />
          <HeaderLink title={t('header.logout')} type="link" onClick={callbacks.onLogOut} link='/' />
        </>
        :
        <HeaderLink
          title={t('header.login')}
          type="link"
          link='/login'
          onClick={callbacks.onClear}
          from={{ from: location}}
          />
        }
    </HeaderLayout>
  )
}


export default memo(Header);