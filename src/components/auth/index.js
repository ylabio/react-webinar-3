import {memo, useState} from 'react';
import './style.css';
import {cn as bem} from '@bem-react/classname';


function Auth({error, onAuth, t}) {
    const cn = bem('Auth');
    const [Login,setLogin] = useState()
    const [Password,setPassword] = useState()
    

  return (
    <div className={cn('container')}>  
        <h1>{t('auth')}</h1>
        <label className={cn('input')}>{t('login')}
            <input onChange={(event) => setLogin(event.target.value)}/>
        </label>
        <label className={cn('input')}>{t('password')}
            <input type="password" onChange={(event) => setPassword(event.target.value)}/>
        </label>   
        {error ? (<span className={cn('error')}>{error?.data.issues[0]?.message}</span>) : ('')}
        <button onClick={() => onAuth(Login,Password)}>{t('submit')}</button>  
    </div>
  );
}

export default memo(Auth);