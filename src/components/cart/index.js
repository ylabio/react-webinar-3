import { cn as bem } from "@bem-react/classname";
import PropTypes from 'prop-types';
import React from 'react';
import Head from '../head';
import List from '../list';
import PageLayout from '../page-layout';
import Popup from '../popup';
import './style.css';

function CartModal({ list, info, onDelete, setOpen }) {
  const cn = bem('CartModal');

  return (
    <Popup setActive={setOpen}>
      <PageLayout>
        <Head title='Корзина' />
        <div className={cn('empty')} />
        <List list={list} buttonsAction={onDelete} buttonsLabel="Удалить" />
        
        <div className={cn('cart')}>
          {info.goods ?
            <>
              <div className={cn('cart-text')}>Итого</div>
              <div className={cn('cart-value')}>{info.price.toLocaleString('ru-RU') + ' ₽'}</div>
            </>
            : <div className={cn('cart-text-empty')}>В корзине пусто!</div>
          }
        </div>

      </PageLayout>
    </Popup>
  );
}

CartModal.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  info: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired
}

CartModal.defaultProps = {
  list: [],
  info: { goods: 0, price: 0 },
  onDelete: () => { },
  setOpen: () => { }
}

export default React.memo(CartModal);