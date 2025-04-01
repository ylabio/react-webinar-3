import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function EmptyState({ text }) {
  const cn = bem('EmptyState');

  return (
    <div className={cn()}>
      <p className={cn('text')}>{text}</p>
    </div>
  );
}

EmptyState.propTypes = {
  text: PropTypes.string.isRequired,
};

export default React.memo(EmptyState); 