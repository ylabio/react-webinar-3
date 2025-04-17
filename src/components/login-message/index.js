import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

import { Link } from 'react-router-dom';



function LoginMessage() {
    
  const cn = bem('LoginMessage');
  return (
    <div className={cn()}>
      <Link to={'/login'} className={cn('link')}>Войдите</Link>, чтобы иметь возможность комментировать
    </div>
  );
}

export default memo(LoginMessage);
