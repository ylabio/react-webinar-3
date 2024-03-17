import React from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link} from "react-router-dom";

function Authorization(props) {
  const cn = bem('Authorization');

  return (
    <div className={cn()}>
      <Link className={cn('link')} to={'/login'}>Вход</Link>
    </div>
  );
}

export default Authorization;