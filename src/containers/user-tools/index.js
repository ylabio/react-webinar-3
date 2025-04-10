import { memo, useCallback, useMemo, useState } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Menu from '../../components/menu';
import BasketTool from '../../components/basket-tool';
import SideLayout from '../../components/side-layout';
import UserActions from '../../components/user-actions'
import { cn as bem } from '@bem-react/classname';
import { useNavigate } from 'react-router-dom'

/**
 * Контейнер с компонентами информации о пользователе
 */
function UserTools() {
  const cn = bem('UserTools')
  const navigate = useNavigate()

  const [userAuth, setUserAuth] = useState(true)

  const store = useStore();

  const select = useSelector(state => ({
    // amount: state.basket.amount,
    // sum: state.basket.sum,
    // lang: state.locale.lang,
  }));

  const callbacks = {
    // Открытие модалки корзины
    // onLogout: useCallback(() => store.actions.modals.open('basket'), [store])
    // Переход на страницу авторизации
    onLogin: useCallback(() => navigate('/login')),
    // 
    onLogout: useCallback(() => setUserAuth(false))
  
    
  };

  // Функция для локализации текстов
  const { t } = useTranslate();

  const options = {
    menu: useMemo(() => [{ key: 1, title: t('menu.main'), link: '/' }], [t]),
  };

  const testUser = {
    name: 'User_2',
    title: 'Заголовок'
  }

  return (
    <SideLayout side="end">
      <UserActions 
        user={testUser} 
        isAuth={userAuth} 
        onClick={userAuth ? callbacks.onLogout : callbacks.onLogin}/>
    </SideLayout>
  );
}

export default memo(UserTools);
