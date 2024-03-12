import React, { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';

function Menu ({ t }) {
  const cn = bem('Menu');  

  return (
    <div className={cn()}>
      <Link to={"/"}>{t('mainPage')}</Link>      
    </div>
  );
};

export default memo(Menu);