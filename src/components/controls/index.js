import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const Controls = ({ onClick, buttonText, reversed = false }) => {
  const cn = bem('Controls');

  const buttonClass = reversed
    ? cn('button', { reversed: true })
    : buttonText === 'Добавить'
      ? cn('button')
      : cn('button_delete');

  return (
    <div className={cn()}>
      <button className={buttonClass} onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
};

Controls.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  reversed: PropTypes.bool,
};

export default React.memo(Controls);
