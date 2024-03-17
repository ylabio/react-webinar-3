import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function AuthForm(props) {
	const {t, data, error, onInputChange, onSubmit} = props;
  const cn = bem('AuthForm');

  return (
    <form className={cn()} onSubmit={onSubmit}>
      <h2 className={cn('title')}>{t('auth.login')}</h2>
      <label className={cn('label')}>
        {t('auth.form.login')}
        <input type='text'
						   id="login"
							 name='login'
							 value={data.login}
							 onChange={(e) => onInputChange("login", e.target.value)}/>
      </label>
      <label className={cn('label')}>
        {t('auth.form.password')}
        <input type='password'
							 id="password"
							 name='password'
							 value={data.password}
							 onChange={(e) => onInputChange("password", e.target.value)}/>
      </label>
			{error && <p className={cn('error')}>{error}</p>}
      <button type="submit">{t('auth.form.btn')}</button>
    </form>
  )
}

AuthForm.propTypes = {
  data: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  t: PropTypes.func.isRequired,
};

AuthForm.defaultProps = {
  onSubmit: () => {},
	onInputChange: () => {}
}

export default memo(AuthForm);