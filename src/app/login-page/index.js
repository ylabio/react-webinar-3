import React,{memo,useCallback,useEffect,useState} from 'react';
import PageLayout from '../../components/page-layout';
import LoginLayout from '../../components/login-layout';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useLocation,useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [logValue, setLogValue] = useState('');
    const [passValue, setPassValue] = useState('');

    const store = useStore();
    // const location = useLocation();
    
    // const navigateLink = localStorage.getItem('page');
    
    // console.log(navigateLink);
    
    const select = useSelector(state => ({
        exception: state.login.exception,
        state: state.login.isAuth
      }));

    const callbacks = {
        onEnter: useCallback((log,pass) => store.actions.login.login(log,pass),[store]),

        clearException: useCallback(() => store.actions.login.clearException(),[store]),

    }
    
    const {t} = useTranslate();

    return (
        <PageLayout>
            <LoginLayout 
            title={t('title')}
            logValue={logValue}
            passValue={passValue}
            setLogValue={setLogValue}
            setPassValue={setPassValue}
            onEnter={callbacks.onEnter}
            // navigateLink={navigateLink}
            exception={select.exception}
            clearException={callbacks.clearException}
            isAuth={select.isAuth}
            />
        </PageLayout>
    );
};

export default memo(LoginPage);