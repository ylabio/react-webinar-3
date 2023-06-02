import { memo, useState } from "react"
import InputLogin from "../../components/input-login"
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css'

function LoginForm({error, login, t}){
  const cn = bem('LoginForm');
  
  const [form, setForm] = useState({login: "", password: ""});
  
  const onSubmitHandler = async (e) =>{
    e.preventDefault();
    login(form);
  }

  return (
  <form onSubmit={onSubmitHandler} className={cn()}>
    <InputLogin name='login' value={form} onChange={setForm} type='text' t={t} placeholder="логин"/>
    <InputLogin name='password' onChange={setForm} value={form} type='password' t={t} placeholder="пароль"/>
    {error && <div className={cn('error')}>{error}</div>}
    <button type="submit" className={cn('button')}>{t('enter')}</button>
  </form>)  
}

LoginForm.propTypes = {
  error: PropTypes.string,
  login: PropTypes.func,
  t: PropTypes.func
}

export default memo(LoginForm)