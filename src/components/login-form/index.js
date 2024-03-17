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
    <form onSubmit={props.onClick} className={cn()}>
      <h3 className={cn('title')}>{props.t('login.enter')}</h3>
      <div>
        <h5>{props.t('login.loginName')}</h5>
        <Input theme={cn('input')} value={props.loginName} onChange={props.setLoginName}/>
      </div>
      <div>
        <h5>{props.t('login.password')}</h5>
        <Input value={props.password} onChange={props.setPassword} />
      </div>
      {!props.isValid && <h4 className={cn('error-message')}>{props.errorMessage}</h4>}
      <button type='submit'>{props.t('login.enter')}</button>
    </form>
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
