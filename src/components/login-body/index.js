import {memo, useState} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function LoginBody({t,onLogin,error,loginText}) {

  let [login,setLogin]=useState('')
  let [password,setPassword]=useState('')

  function sendForm(){
    onLogin({login,password})
  }

  const cn = bem('LoginBody');
  return (
    <div className={cn()}>
     <h2 className={cn('title')}>{loginText.title}</h2>
     <div className={cn('area')}>
      <label htmlFor="login">{loginText.login}</label>
      <input id="login" type="text" value={login} onChange={(e)=>setLogin(e.currentTarget.value)}/>
     </div>
     <div className={cn('area')}>
      <label htmlFor="password">{loginText.password}</label>
      <input id="password" type="password" value={password} onChange={(e)=>setPassword(e.currentTarget.value)}/>
     </div>
     {error&&<p className={cn('error')}>{error}</p>}
     <button onClick={sendForm}>{loginText.button}</button>
    </div>
  );
}

LoginBody.propTypes = {
  t: PropTypes.func,
  onLogin: PropTypes.func,
  error:PropTypes.string
};

LoginBody.defaultProps = {
  t: (text) => text,
  onLogin:(data)=>{}
}

export default memo(LoginBody);
