import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';

function Controls({action, calcText, text}) {
  return (
    <div className='Controls'>
      <div>В корзине:<span className='Controls-calc'>{calcText}</span></div>
      <Button onClickFunc={action} text={text}/>
    </div>
  )
}

Controls.propTypes = {
  action: PropTypes.func,
  calcText: PropTypes.string,
  text: PropTypes.string
};

Controls.defaultProps = {
  action: () => {},
  calcText: '',
  text: ''
}

export default React.memo(Controls);
