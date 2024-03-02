import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types';
import './style.css';
import Footer from '../footer'
import Head from '../head'
import List from '../list'

function Cart({list, onDeleteItem, onOpenCart}) {
  const outSide = useRef(null);

  const closeCart = (e) => {
    if (!outSide.current) return;
    if(e.target.contains(outSide.current)) onOpenCart()
  }

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
    <div className='fixed-overlay fixed-overlay__modal' ref={outSide} onClick={closeCart}>
      <div className='Cart'>
        <div className='Cart__container'>
          <Head title={'Корзина'} onCloseCart={onOpenCart}/>
          <div>
            <List list={list}
                  buttonText={'Удалить'}
                  onDeleteItem={onDeleteItem}/>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

Cart.propTypes = {
  onOpenCart: PropTypes.func,
  textBtn: PropTypes.string,
  onDeleteItem: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
}

Cart.defaultProps = {
  onOpenCart: () => {},
  onDeleteItem: () => {}
}

export default React.memo(Cart);
