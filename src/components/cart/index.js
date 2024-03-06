import React from 'react';
import PropTypes from 'prop-types';
import {separatingNumberSpaces} from '../../utils';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Head from '../head';
import List from '../list';


function Cart (props) {

  const cn = bem('Cart');

  const callbacks = {
    onClick: () => {
      props.onClick();
    }
  }

  return ( 
        <>
          <Head classModifier={props.visibleCartModal ? 'cart' : ''} title='Корзина'/>
          {props.listCart.length 
            ? <>
                <List classModifier={'cart'} list={props.listCart} textButton={'Удалить'} onClick={props.onClick}/>
                <div className={cn('total')}>
                  <div className={cn('total-text')}>Итого</div>
                  <div className={cn('total-price')}>
                    {separatingNumberSpaces(props.totalPrice)} &#8381;
                  </div>
                </div>
              </>
            : <div className={cn('empty')}>В корзине пусто...</div>
          }
        </>
  )
}

Cart.propTypes = {
  totalPrice: PropTypes.number,
  visibleCartModal: PropTypes.bool,
  classModifier: PropTypes.string,
  onClick: PropTypes.func,
};

Cart.defaultProps = {
  onClick: () => {}
}

export default React.memo(Cart);