import {memo, useState} from "react";
import {cn as bem} from '@bem-react/classname';
import useSelector from '../../hooks/use-selector'
import './style.css';
import useTranslate from '../../hooks/use-translate'
import InputForm from '../input-form'

function LoginCard(props) {
  const cn = bem('LoginCard');
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const select = useSelector(state => ({
    error: state.users.error
  }));
  const onLogin = () => {
    props.onLogin({login, password})
  }

  const {t} = useTranslate();
  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <h2>{t('account.login')}</h2>
        <form name={'users-form'} className={cn('form')}>
          <InputForm title={t('login.login')} type={'text'} name={'login'} value={login} onChange={(e) => setLogin(e.target.value)}/>
          <InputForm title={t('login.password')} type={'password'} name={'password'} value={password} onChange={(e) => setPassword(e.target.value)}/>
          {select.error && (
            <div className={cn('error')}>
              {select.error.message}
            </div>
          )}
          <button type={'submit'} form={'users-form'} onClick={onLogin}>{t('account.login')}</button>
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
