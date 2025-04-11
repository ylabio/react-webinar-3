import { memo } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';


function Form(props) {
  return (
    <div className="Form">
      <h1>{props.title}</h1>
      <form onSubmit={props.onSubmit}>
        <div className="field">
          <label>{props.loginLabel}</label>
          <input
            type="text"
            value={props.loginValue}
            onChange={e => props.onLoginChange(e.target.value)}
            placeholder={props.placeholderLog}
            required
          />
        </div>
        <div className="field">
          <label>{props.pswLabel}</label>
          <input
            type="password"
            value={props.passwordValue}
            onChange={e => props.onPasswordChange(e.target.value)}
            placeholder={props.placeholderPsw}
            required
          />
        </div>
        <div className="issues">{props.issues}</div>
        <Button type="submit" style="primary" title={props.loginBtn} />
      </form>
    </div>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  labelLogin: PropTypes.string.isRequired,
  issues: PropTypes.string,
  loginValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  onLoginChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired
};

export default memo(Form);