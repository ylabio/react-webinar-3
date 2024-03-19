import {memo, useCallback} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import SideLayout from '../../components/side-layout';
import Button from '../../components/button';
import LinkCustom from '../../components/link-custom';

function AuthPanel() {  
  const { t } = useTranslate();
  const navigate = useNavigate();
  const store = useStore();
  const location = useLocation();

  const select = useSelector(state => ({    
    user: state.auth.user,
    token: state.auth.token,
  }));  

  const callbacks = {
    onNavigateToLoginPage: useCallback(() => navigate('/login', { state: { from: location.pathname } }), []),
    onLogout: useCallback(() => store.actions.auth.logout(), [])
  }
  
  return (
    <SideLayout side='end' padding='medium'>
      {select.token ? <LinkCustom to={'/profile'}>{select?.user?.profile?.name}</LinkCustom> : ''}
      {select.token ? <Button onClick={callbacks.onLogout}>{t('logout')}</Button> 
                   : <Button onClick={callbacks.onNavigateToLoginPage}>{t('login')}</Button>}
    </SideLayout>     
  )

}

export default memo(AuthPanel);
