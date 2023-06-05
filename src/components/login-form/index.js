import { memo, useState } from "react";
import PropTypes from 'prop-types';
import './style.css';
import Spinner from "../spinner";


function LoginForm({ onLogin, onToken, error, loading, t }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const login = (e) => {
        e.preventDefault();
        onLogin(username, password);
        onToken();
    }

    if (loading) return <Spinner active={true}>{t('loading')}</Spinner>
    return (
        <div className='Login'>
            <h2 className='Login-title'>{t('login.title')}</h2>
            <form className='Login-form'>
                <h4 className='Login-input-title'>{t('login.loginInput')}</h4>
                <input type='text' className='Login-input' onChange={(e) => setUsername(e.target.value)} />
                <h4 className='Login-input-title'>{t('login.passwordInput')}</h4>
                <input type='password' className='Login-input' onChange={(e) => setPassword(e.target.value)} />
                {error && <p className='Login-error'>{error}</p>}
                <button className='Login-button' onClick={(e) => login(e)}>{t('login.formButton')}</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    onLogin: PropTypes.func,
    onToken: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    loading: PropTypes.bool,
  };
  
  LoginForm.defaultProps = {
    onLogin: () => {},
    onToken: () => {},
  }
  


export default memo(LoginForm);
