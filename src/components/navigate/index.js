import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import './style.css';

const Navigate = () => {
  const cn = bem('Navigate');
  return <div className={cn()}>
    <Link to={`/`}>
      Главная
    </Link>
  </div>;
};

export default Navigate;