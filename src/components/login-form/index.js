import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function LoginForm({onSubmit, onChange, formData, isSending, errorMessage, t}) {
  const cn = bem('LoginForm');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('login.title')}</h2>
      <form>
        <div className={cn('field')}>
          <label className={cn('label')} htmlFor='login' >{t('login.form.login')}</label>
          <input className={cn('input')}
                 type='text'
                 name="login"
                 onChange={onChange}
                 value={formData.login}
          />
        </div>
        <div className={cn('field')}>
          <label className={cn('label')} htmlFor='password'>{t('login.form.password')}</label>
          <input className={cn('input')}
                 type='password'
                 name="password"
                 onChange={onChange}
                 value={formData.password}
          />
        </div>
        <div className={cn('error')}>
          {errorMessage && <span>{errorMessage}</span>}
        </div>
        <button type='submit'
                onClick={onSubmit}
                disabled={isSending}
        >
          {t('login.form.button')}
        </button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  formData: PropTypes.exact({
    login: PropTypes.string,
    password: PropTypes.string,
  }),
  errorMessage: PropTypes.string,
  isSending: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func
};

LoginForm.defaultProps = {
  t: (text) => text
}

export default memo(LoginForm);
