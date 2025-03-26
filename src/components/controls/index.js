import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ type = 'add', onClick = () => { } }) {

  const buttonStyle = {
    add: 'add-button',
    delete: 'delete-button',
  }[type]

  if (type === 'add') {
    return (
      <div className='Controls ' onClick={onClick}>
        <button className={buttonStyle}>Добавить</button>
      </div >
    )
  }

  return (
    <div className='Controls ' onClick={onClick}>
      <button className={buttonStyle}>Удалить</button>
    </div >
  );
}

Controls.propTypes = {
  type: PropTypes.oneOf(['add', 'delete']).isRequired,
  onClick: PropTypes.func,
};

export default React.memo(Controls);
