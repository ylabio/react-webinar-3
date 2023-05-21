import React from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Head({title, children}){
  const cn = bem('Head');

  return (
    <div className={cn()}>
      <div className={cn('top')}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node
};

export default React.memo(Head);
