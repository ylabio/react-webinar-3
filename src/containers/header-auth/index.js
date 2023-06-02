import {memo} from 'react'
import AuthButton from '../../components/auth-button'
import SideLayout from '../../components/side-layout'
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import { Link } from 'react-router-dom';

function HeaderAuth() {
  const store = useStore();

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
    username: state.auth.userData?.name
  }));

  const handleLogout = () => {
    store.actions.auth.onLogout()
  }

  const {t} = useTranslate();

  return (
    <SideLayout side="end" padding="t10_r20" border="bottom" gap="small">
        {select?.isAuth && <AuthButton url='/profile' t={t} value={select.username} isLink={true} />}
        {select?.isAuth ? <button onClick={handleLogout}>{t('authHeader.logout')}</button> : <AuthButton url='/login' t={t} value='authHeader.login'/>}
    </SideLayout>
  )
}

export default memo(HeaderAuth)