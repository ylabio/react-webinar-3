import React,{memo,useCallback,useState} from 'react';
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
    

    const select = useSelector(state => ({
        exception: state.login.exception
      }));

    const callbacks = {
        onEnter: useCallback((log,pass) => store.actions.login.login(log,pass)),
        clearException: useCallback(() => store.actions.login.clearException())
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
            navigateLink={-1}
            exception={select.exception}
            clearException={callbacks.clearException}
            />
        </PageLayout>
    );
};

export default memo(LoginPage);