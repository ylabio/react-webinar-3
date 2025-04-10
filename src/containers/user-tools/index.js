import { memo, useCallback, useMemo, useState } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import SideLayout from '../../components/side-layout';
import UserActions from '../../components/user-actions'
import { useNavigate } from 'react-router-dom'

/**
 * Контейнер с компонентами информации о пользователе
 */
function UserTools() {
  const navigate = useNavigate()

  const store = useStore();

  const select = useSelector(state => ({
    userAuth: state.user.isAuth,
    username: state.user.data?.username
  }));

  const callbacks = {
    // Переход на страницу авторизации
    onLogin: useCallback(() => navigate('/login')),
    // @todo Сброс авторизации
    onLogout: useCallback(() => {
      store.actions.user.resetAuth()
      navigate('/')
    }) 
  };

  // Функция для локализации текстов
  const { t } = useTranslate();

  return (
    <SideLayout side="end">
      <UserActions 
        username={select.username} 
        isAuth={select.userAuth} 
        onClick={select.userAuth ? callbacks.onLogout : callbacks.onLogin}
        title={select.userAuth 
          ? t("userActions.logout") 
          : t("userActions.login")
        }
        />
    </SideLayout>
  );
}

export default memo(UserTools);
