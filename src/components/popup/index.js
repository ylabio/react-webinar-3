import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Popup({ children, title, openPopupFlag }) {
  const cn = bem('Popup');

  if (!openPopupFlag) return null;

  return (
    <div className={cn()}>
      <div className={cn('wrapper')}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}

Popup.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  openPopupFlag: PropTypes.bool,
};

export default React.memo(Popup);
