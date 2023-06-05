import { cn as bem } from '@bem-react/classname';
import PropTypes from "prop-types";
import {memo, useCallback} from "react";
import FormField from "../form-field";
import Input from "../input";
import Error from '../error';
import './style.css';

function LoginForm(props) {
  const cn = bem('LoginForm');

  const renders = {
    renderLoginInput: useCallback(() => {
      return <Input value={props.fields.login} onChange={(value) => props.onChangeField('login', value)} />
    }, [props.fields.login]),
    renderPasswordInput: useCallback(() => {
      return <Input value={props.fields.password} onChange={(value) => props.onChangeField('password', value)} />
    }, [props.fields.password])
  }

  const callbacks = {
    onSubmit: (e) => {
      e.preventDefault();
      props.onSubmit();
    }
  }

  return (
    <form className={cn()} onSubmit={callbacks.onSubmit}>
      <span className={cn('title')}>Вход</span>
      <FormField renderInput={renders.renderLoginInput} label={'Логин'} />
      <FormField renderInput={renders.renderPasswordInput} label={'Пароль'} />
      {props.error && <Error issues={props.error} />}
      <button disabled={props.isLoading} className={cn('submit')} type='submit'>Войти</button>
    </form>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  fields: PropTypes.shape({
    login: PropTypes.string,
    password: PropTypes.string
  }).isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string
  })),
  onChangeField: PropTypes.func
}

LoginForm.defaultArgs = {
  error: null,
  onChange: () => {},
  onSubmit: () => {}
}

export default memo(LoginForm);