import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Head({ title}) {
  const cn = bem('Head');

  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <h1>{title}</h1>        
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
