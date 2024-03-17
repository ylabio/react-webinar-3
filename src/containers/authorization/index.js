import {memo, useCallback} from 'react';
import {useLocation, useNavigate, Link} from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import AuthorizationTool from '../../components/authorization-tool';
import SideLayout from '../../components/side-layout';

/**
 * Контейнер с компонентами авторизации
 */
function Authorization() {

  const store= useStore();

  const select = useSelector(state => ({
    isAuthorized: state.authorization.isAuthorized,
    user: state.authorization.user
  }));

  const callbacks = {
    onLogin: useCallback(() => {
      navigate('/login', {state: {goBackLink: location.pathname}});
    }, []),
    onLogout: useCallback(() => store.actions.authorization.signOut(), [])
  }
  // Функция для локализации текстов
  const {t} = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <SideLayout side='end' padding='medium'>
      {select.isAuthorized ? <Link key={select.user?.name} to='/'>{select.user?.username}</Link> : ''}
      <AuthorizationTool
        onClick={select.isAuthorized ? callbacks.onLogout : callbacks.onLogin}
        buttonTitle={select.isAuthorized ? t('authorization.logout') : t('authorization.login')}
      />
    </SideLayout>
  )
}

export default memo(Authorization);