import React from 'react'
import PropTypes from 'prop-types';
import './style.css';

function Controls({onOpenCart, textBtn, count, amount}) {
  return (
    <div className='Controls'>
      <p className='Controls__text'>В корзине: <b>2 товара / {amount()}</b></p>
      <button onClick={() => onOpenCart()}>{textBtn}</button>
    </div>
  )
}

Controls.propTypes = {
  onOpenCart: PropTypes.func,
  textBtn: PropTypes.string
};

Controls.defaultProps = {
  onOpenCart: () => {}
}

export default React.memo(Controls);
