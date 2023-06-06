import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function AuthorizationForm(props) {
  const cn = bem('AuthorizationForm');
  return (
    <form onSubmit={(e) => props.onAuth(e)} className={cn()}>
      <h2 className={cn('title')}>{props.t('login')}</h2>
      <div className={cn('wrapper')}> 
      <div className={cn('field')}>
        <label htmlFor="login">{props.t('userLogin')}</label>
        <input id="login" type="text" name="name"/>
      </div>
      <div className={cn('field')}>
        <label htmlFor="password">{props.t('password')}</label>
        <input id="password" type="password" name="password"/>
      </div>
      </div>
      <p className={cn('error')}>
        {!!props.error && props.error}
      </p>
      <button className={cn('btn')}>{props.t('signIn')}</button>
    </form>
  );
}

AuthorizationForm.propTypes = {
  onAuth: PropTypes.func,
  error: PropTypes.string,
  t: PropTypes.func
}

AuthorizationForm.defaultProps = {
  error: null,
  onAuth: () => {},
  t: () => {},
}

export default memo(AuthorizationForm);
