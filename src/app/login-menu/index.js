import { memo, useCallback, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LoginMenu() {
  const store = useStore();
  const cn = bem('LoginMenu');

  const select = useSelector(state => ({
    auth: state.authorization,
  }));

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Обработка перехода на главную
    onNavigate: useCallback(
      item => {
        if (item.key === 1) store.actions.catalog.resetParams();
      },
      [store],
    ),
  };

  // Функция для локализации текстов
  const { t } = useTranslate();

  return (
    <div className={cn()}>
      <div className={cn('container')}>
        {select.auth.isLogin ? (
          <>
            <Link className={cn('profile')} to="/profile">
              {select.auth.userData.username}
            </Link>
            <Link className={cn('link')} to="/login">
              Выход
            </Link>
          </>
        ) : (
          <Link className={cn('link')} to="/login">
            Вход
          </Link>
        )}
      </div>
    </div>
  );
}

export default memo(LoginMenu);
