import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types';
import './style.css';
import { closeWindow } from '../../utils'

function Cart({children, onOpenCart}) {
  const outSide = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        onOpenCart();
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  return (
    <div className='fixed-overlay fixed-overlay__modal' ref={outSide} onClick={(e) => closeWindow(e, outSide, onOpenCart)}>
      <div className='Cart'>
        <div className='Cart__container'>
          {children}
        </div>
      </div>
    </div>
  )
}

Cart.propTypes = {
  children: PropTypes.node,
  onOpenCart: PropTypes.func
}

Cart.defaultProps = {
  onOpenCart: () => {}
}

export default React.memo(Cart);
