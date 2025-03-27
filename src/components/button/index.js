import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Button({ type = 'add', onClick = () => {} }) {
  const buttonClass = type === 'delete' ? 'Delete' : 'Primary';
  const children = type === 'delete' ? 'Удалить' : 'Добавить';

  return (
    <button className={'Button' + ` ${buttonClass}`} onClick={() => onClick()}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['add', 'delete']).isRequired,
};

export default React.memo(Button);
