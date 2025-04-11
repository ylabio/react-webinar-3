import './style.css';
import Input from '../input';
import { useEffect, useState } from 'react';
import Button from '../button';
import { authUser } from '../../services';
import {useNavigate} from "react-router-dom";

function AuthForm() {
  const [login, setLogin] = useState('test');
  const [password, setPassword] = useState('123456');
  const [isError, setIsError] = useState(false);
  const [errorMsq, setErrorMsq] = useState('');

  const navigate = useNavigate();

  const onSubmit = async () => {
    const res = await authUser(login, password);
    console.log('FORM', res);
    if (res.error) {
      setIsError(true);
      setErrorMsq(res.error.data.issues[0].message);
    } else {
      navigate('/');
      setIsError(false);
    }
  };

  useEffect(() => {
    console.log(login);
  }, [login]);
  return (
    <div className="AuthForm">
      <h1 className="AuthForm-title">Вход</h1>
      <form className={`AuthForm-form${isError ? ' error' : ''}`} action="">
        <label>
          <h4>Логин</h4>
          <Input
            value={login}
            onChange={setLogin}
            placeholder={'Введите логин'}
            delay={0}
            theme={'small'}
          />
        </label>
        <label className={`AuthForm-pass${isError ? ' error' : ''}`}>
          <h4>Пароль</h4>
          <Input
            value={password}
            onChange={setPassword}
            placeholder={'Введите пароль'}
            delay={0}
            theme={'small'}
          />
        </label>
        {isError && <div className="AuthForm-error">{errorMsq}</div>}
        <Button style="primary" title={'Войти'} onClick={onSubmit}></Button>
      </form>
    </div>
  );
}

export default AuthForm;
