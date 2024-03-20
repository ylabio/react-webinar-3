import {memo, useState} from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import InputForm from '../input-form'

function LoginCard(props) {
  const cn = bem('LoginCard');
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = () => {
    props.onLogin({login, password})
  }

  const onChangeInput = (value, setValue) => {
    setValue(value)
  }

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <h2>{props.t('account.login')}</h2>
        <form name={'login-form'} className={cn('form')}>
          <InputForm title={props.t('login.login')} type={'text'} name={'login'} value={login} onChange={(e) => onChangeInput(e.target.value, setLogin)}/>
          <InputForm title={props.t('login.password')} type={'password'} name={'password'} value={password} onChange={(e) => onChangeInput(e.target.value,setPassword)}/>
          {props.error && (
            <div className={cn('error')}>
              {props.error.message}
            </div>
          )}
          <button type={'submit'} form={'login-form'} onClick={onLogin}>{props.t('account.login')}</button>
        </form>
      </div>
    </div>
  );
}

LoginCard.propTypes = {

};

LoginCard.defaultProps = {

}

export default memo(LoginCard);
