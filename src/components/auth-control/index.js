import { cn as bem } from '@bem-react/classname';
import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import './style.css';

function AuthControl({name,id, exit, t}) {
  const navigate = useNavigate()
  const cn = bem('AuthControl');
  return (
    name 
      ? (<div className={cn('container')}>
        <Link to={`/profile`}>{name}</Link>
      <button onClick={() => exit()}>{t('signout')}</button>
  </div>) 
      : (<div className={cn('container')}>
      <button onClick={() => navigate('/login')}>{t('signin')}</button>
  </div>) 
    
    
  );
}

export default memo(AuthControl);