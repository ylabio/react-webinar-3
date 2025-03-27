import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const Controls = ({ onClick, buttonText }) => {
  const cn = bem('Controls');
  return (
    <div className={cn()}>
      <button
        className={buttonText === 'Добавить' ? cn('button') : cn('button_delete')}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

Controls.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default React.memo(Controls);
