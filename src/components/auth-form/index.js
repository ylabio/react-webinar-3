import {memo, useCallback, useEffect, useState} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function AuthForm(props) { 
 
  const cn = bem('AuthForm');

  return (  
    <div className={cn()}>
        <h2 className={cn('title')}>Вход</h2>       
        <label htmlFor="login" className={cn('label')}>Логин
            <input 
                type="text" 
                id="login" 
                className={cn('input')} 
                value={props.value.login} 
                onChange={e => props.setValue({ ...props.value, login: e.target.value })}
            />          
        </label>
        <label htmlFor="password" className={cn('label')}>Пароль
            <input 
                type="text" 
                id="password" 
                className={cn('input')} 
                value={props.value.password} 
                onChange={e => props.setValue({ ...props.value, password: e.target.value })}
            />            
        </label>  
        <span className={cn('error')}>{props.error}</span>
        <button className={cn('button')} onClick={() => props.login(props.value)}>Войти</button>                   
    </div>   
  )
}

AuthForm.propTypes = {
  value: PropTypes.object,
  setValue: PropTypes.func,
  error: PropTypes.string,
  login: PropTypes.func
}

AuthForm.defaultProps = {
  setValue: () => {},  
  login: () => {}  
}

export default memo(AuthForm);
