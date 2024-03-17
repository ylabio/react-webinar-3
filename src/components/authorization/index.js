import React from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Authorization(props) {
  const cn = bem('Authorization');

  return (
    <div className={cn()}>
      <button>Вход</button>
    </div>
  );
}

export default Authorization;