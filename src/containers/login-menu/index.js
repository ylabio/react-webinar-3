import { memo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import './style.css';
import useTranslate from '../../hooks/use-translate';

function LoginMenu() {
    const { t } = useTranslate();
    const store = useStore();
    useEffect(() => {
        callbacks.onToken();
    }, [])
    const callbacks = {
        onToken: useCallback(() => store.actions.profile.getUser()),
        onLogout: useCallback(() => store.actions.profile.logout())
    };

    const select = useSelector(state => ({
        auth: state.profile.auth,
        user: state.profile.user,
        loading: state.profile.loading,
    }));

    return (
        <div className='Login-menu'>
            {select.auth
                ?
                <>
                    <Link to='/profile' className='Login-menu-title'>{select.user?.profile.name}</Link>
                    <button className='Login-menu-button' onClick={callbacks.onLogout}>{t('login.logout')}</button>
                </>
                :
                <Link to='/login'><button className='Login-menu-button'>{t('login.loginButton')}</button></Link>}
        </div>
    );
}

export default memo(LoginMenu);