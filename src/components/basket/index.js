import React from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import HeadBasket from "../headBasket";
import List from "../list";
import FooterBasket from "../footerBasket";
import './style.css';

function Basket({listInBasket, deleteFromBasket, active, closeBasket, summaryPrice}) {
  const cn = bem('Basket');

  return (
    <div className={`${cn()} ${active ? 'active' : ''}`} onClick={(e) => closeBasket(false)}>
      <div className="Basket-window" onClick={(event) => event.stopPropagation()}>
        <HeadBasket title='Корзина' closeBasket={closeBasket}/>
        {
          listInBasket.length === 0 ? <div className={cn('info')}>Ваша корзина пуста</div> : (
            <>
              <List list={listInBasket} deleteFromBasket={deleteFromBasket} itemType='basketItem'/>
              <FooterBasket summaryPrice={summaryPrice}/>
            </>
          )
        }
      </div>
    </div>
  )
}

Basket.propTypes = {
  listInBasket: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  })).isRequired,
  active: PropTypes.bool,
  deleteFromBasket: PropTypes.func,
  closeBasket: PropTypes.func,
  summaryPrice: PropTypes.number
};

Basket.defaultProps = {
  deleteFromBasket: () => {
  },
}

export default React.memo(Basket);