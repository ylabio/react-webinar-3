import { cn as bem } from "@bem-react/classname";
import React from 'react';
import { Link } from 'react-router-dom';
import useLanguage from "../../localization/use-language";
import './style.css';

function Menu() {
  const cn = bem('Menu');

  const ln = useLanguage();

  return (
    <div className={cn()}>
      <Link to='/' className={cn('link')}>{ln('toMain')}</Link>
    </div>
  );
};

export default React.memo(Menu);