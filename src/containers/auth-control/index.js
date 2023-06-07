import {memo, useCallback, useEffect} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import AuthTool from '../../components/auth-tool';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/spinner';

function AuthControl() {

  const store = useStore();

  const navigate = useNavigate()

  const select = useSelector(state => ({   
    userName:  state.user.userData.name,
    isAuth: state.user.isAuth, 
    error: state.user.error,
    waiting: state.user.waiting 
  }));
 
  const callbacks = {
    // Переход на страницу авторизации
    handleOnClick: useCallback(() => {     
      navigate('/login')      
    }, [store]),      
    // Выход из аккаунта
    logout:  useCallback(() => store.actions.user.logout(), [store]),   
  }  

  const {t} = useTranslate();

  return (
    <Spinner active={select.waiting}>
      <AuthTool 
        link={`/login`} 
        handleOnClick={callbacks.handleOnClick} 
        isAuth={select.isAuth} 
        userName={select.userName}
        logout={callbacks.logout}
      />      
    </Spinner>
  );
}

export default memo(AuthControl);
