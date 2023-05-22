import React from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title, classNames = [], children }) {
  const cn = bem('Head');
  return (
    <div className={cn(null, [...classNames])}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  classNames: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
};

Head.defaultProps = {
  classNames: [],
};

export default React.memo(Head);
