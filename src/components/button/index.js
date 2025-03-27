import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Button({ onClick, type = 'primary' }) {
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
  type: PropTypes.oneOf(['primary', 'delete']).isRequired,
};

Button.defaultProps = {
  onClick: () => {},
  type: 'primary',
};

export default React.memo(Button);
