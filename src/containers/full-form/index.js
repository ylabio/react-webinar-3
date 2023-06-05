import {memo, useCallback, useMemo} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from '../../hooks/use-translate';
import { useNavigate } from 'react-router-dom';

import LoginForm from '../../components/login-form';
import Spinner from '../../components/spinner';

function FullForm() {

    const store = useStore();

    const { t } = useTranslate()

    const navigate = useNavigate()
  
    const select = useSelector(state => ({
        loginValue: state.auth.loginValue,
        passwordValue: state.auth.passwordValue,
        serverError: state.auth.serverError,
        isLoggedIn: state.auth.isLoggedIn,
        waiting: state.auth.waiting,
    }));

    const callbacks = {

        onLoginChange: useCallback(newLogin => store.actions.auth.setLoginValue(newLogin), [store]),

        onPasswordChange: useCallback(newPassword => store.actions.auth.setPasswordValue(newPassword), [store]),

        onSubmit: useCallback(async (event, login, password) => {
          event.preventDefault();

          let res = await store.actions.auth.SignIn(login, password);

          if (res) navigate("/")
        
          
        }, [store]),

    };

  
    return (
        <Spinner active={select.waiting}>
            <LoginForm title={"auth.enter"}
                       loginValue={select.loginValue}
                       passwordValue={select.passwordValue}
                       onLoginChange={callbacks.onLoginChange}
                       onPasswordChange={callbacks.onPasswordChange}
                       serverError={select.serverError}
                       onSubmit={callbacks.onSubmit}
                       t={t}/>
        </Spinner>
    );
}

export default memo(FullForm);
