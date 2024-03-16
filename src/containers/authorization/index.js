import {memo, useCallback} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import AuthorizationTool from '../../components/authorization-tool';
import SideLayout from '../../components/side-layout';

/**
 * Контейнер с компонентами авторизации
 */
function Authorization() {
  const callbacks = {
    onLogin: useCallback(() => {
      navigate('/login', {state: {goBackLink: location.pathname}});
    }, [])
  }
  // Функция для локализации текстов
  const {t} = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <SideLayout side='end' padding='medium'>
      <AuthorizationTool onLogin={callbacks.onLogin} buttonTitle={t('authorization.login')}/>
    </SideLayout>
  )
}

export default memo(Authorization);