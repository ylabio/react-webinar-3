import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export const ItemButton = React.memo(({
  textButton = '',
  onClick = () => {}
}) => {
  const buttonClass = textButton === 'Удалить' ? 'Delete-button' : 'Add-button';
  return (
    <div className={`${buttonClass} Item-actions`}>
      <button onClick={onClick}>{textButton}</button>
    </div>
  )
})

ItemButton.propTypes = {
  textButton: PropTypes.string,
  onClick: PropTypes.func,
}
