import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Button({title, buttonFunction}) {
  return (
    <button className='Button' onClick={buttonFunction}>
      {title}
    </button>
  )
};

Button.propTypes = {
  title: PropTypes.string,
  buttonFunction: PropTypes.func,
};

Button.defaultProps = {
  title: 'Кнопка',
  buttonFunction: () => {},
};

export default React.memo(Button);