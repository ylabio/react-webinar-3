import PropTypes from 'prop-types';
import './style.css';

function LoginForm({userData, setUserData, onSubmit, error, t}) {
  
  return (
    <form className='LoginForm' onSubmit={onSubmit}>
        <h2 className='LoginForm-title'>{t('auth.entry')}</h2>
        <label className='LoginForm-label'>
          {t('auth.login')}
          <input type='text'
            value={userData.login}
            onChange={(e) => setUserData({...userData, login: e.target.value})} 
            required 
          />
        </label>
        <label className='LoginForm-label'>
          {t('auth.password')}
          <input type='password'
            value={userData.password}
            onChange={(e) => setUserData({...userData, password: e.target.value})} 
            required
          />
        </label>
        {error.isError && <p className='LoginForm-error'>{error.message}</p>}
        <button type='submit'>{t('auth.signIn')}</button>
      </form>
  );
}

LoginForm.propTypes = {
  userData: PropTypes.shape({
    login: PropTypes.string,
    password: PropTypes.string
  }),
  setUserData: PropTypes.func,
  onSubmit: PropTypes.func,
  error: PropTypes.shape({
    message: PropTypes.string,
    isError: PropTypes.bool
  }),
  t: PropTypes.func
}

export default LoginForm;
