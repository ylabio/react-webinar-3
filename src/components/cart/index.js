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
    },
    onShowCart: () => {
      props.onShowCart();
    }
  }

  return ( 
    <div className={props.activeCart ? cn({active: true}) : cn()}>
        <div className={cn('wrapper')}>
          <Head classModifier={props.activeCart ? 'cart' : ''} title='Корзина'>
              <button onClick={callbacks.onShowCart}>
                Закрыть
              </button>
          </Head>
          {props.listCart.length 
            ? <List list={props.listCart} textButton={'Удалить'} onClick={props.onClick}/> 
            : ''}
            <div className={cn('total')}>
              <div className={cn('total-text')}>Итого</div>
              <div className={cn('total-price')}>
                {separatingNumberSpaces(props.totalPrice)} &#8381;
              </div>
            </div>
        </div>
    </div>
  )
}

Cart.propTypes = {
  totalPrice: PropTypes.number,
  activeCart: PropTypes.bool,
  classModifier: PropTypes.string,
  onClick: PropTypes.func,
  onShowCart: PropTypes.func
};

Cart.defaultProps = {
  onClick: () => {},
  onShowCart: () => {}
}

export default React.memo(Cart);