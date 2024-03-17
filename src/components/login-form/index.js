import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import Input from "../input";
import SideLayout from "../../components/side-layout";
import './style.css';

function LoginForm(props) {
  const cn = bem('LoginForm');
  return (
    <SideLayout side='start' padding='medium'>
    <div className={cn()}>
      <h3 className={cn('title')}>{props.t('login.enter')}</h3>
      <div className={cn()}>
        <h5>{props.t('login.loginName')}</h5>
        <Input theme={cn('input')} value={props.loginName} onChange={props.setLoginName} />
      </div>
      <div className={cn()}>
        <h5>{props.t('login.password')}</h5>
        <Input value={props.password} onChange={props.setPassword} />
      </div>
      {!props.isValid && <h4 className={cn('error-message')}>{props.errorMessage}</h4>}
      <button onClick={props.onClick}>{props.t('login.enter')}</button>
      </div>
    </SideLayout>
  );
}

LoginForm.propTypes = {
  setLoginName: PropTypes.func,
  setPassword: PropTypes.func,
  t: PropTypes.func
};

LoginForm.defaultProps = {
  setLoginName: () => {
  },
  setPassword: () => {
  },
  t: (text) => text
}

export default memo(LoginForm);
