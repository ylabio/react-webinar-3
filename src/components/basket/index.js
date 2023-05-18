import { cn as bem } from "@bem-react/classname";
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import Head from '../head';
import Item from '../item';
import List from '../list';
import PageLayout from '../page-layout';
import Popup from '../popup';
import './style.css';

/** Окно корзины на основе универсального Popup */

function BasketWindow({ list, info, onDelete, setOpen }) {
  const cn = bem('BasketWindow');

  // Специфичный итем для корзины
  const basketItem = useCallback(item => <Item
    item={item}
    onAction={onDelete}
    actionName="Удалить"
  />, []);

  return (
    <Popup setActive={setOpen}>
      <PageLayout>
        <Head title='Корзина' />
        <div className={cn('empty')} />
        <List list={list} render={basketItem} />
        
        <div className={cn('info')}>
          {info.goods ?
            <>
              <div className={cn('info-text')}>Итого</div>
              <div className={cn('info-value')}>{info.price.toLocaleString('ru-RU') + ' ₽'}</div>
            </>
            : <div className={cn('info-text-empty')}>Нет товаров в корзине!</div>
          }
        </div>

      </PageLayout>
    </Popup>
  );
}

BasketWindow.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  info: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired
}

BasketWindow.defaultProps = {
  list: [],
  info: { goods: 0, price: 0 },
  onDelete: () => { },
  setOpen: () => { }
}

export default React.memo(BasketWindow);