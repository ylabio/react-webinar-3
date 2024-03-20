import {memo, useCallback} from 'react';
import {useLocation, useNavigate, Link} from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import SideLayout from '../../components/side-layout';

const AuthHeader = () => {
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
      {select.token ? <Link style={{textDecoration: 'underline', color: '#0087e9', fontSize: '13px', padding: '20px'}}
                         to={'/profile'}>{select?.user?.profile?.name}</Link> : ''}
      {select.token ? <button onClick={callbacks.onLogout}>{t('logout')}</button> 
                   : <button onClick={callbacks.onNavigateToLoginPage}>{t('login')}</button>}
    </SideLayout>     
  )
};

export default memo(AuthHeader);