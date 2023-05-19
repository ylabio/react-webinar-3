import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Head from '../head';
import List from '../list';
import { getTotalPrice } from '../../utils';

function Order({
  order,
  isOpenModal,
  setIsOpenModal,
  onDeleteOrder,
  buttonTitle,
}) {
  const cn = bem('Order');
  return (
    <div className={`${cn()} ${isOpenModal && cn('opened')}`}>
      <div className={cn('container')}>
        <Head title='Корзина'>
          <button
            onClick={() => {
              setIsOpenModal(false);
            }}
          >
            Закрыть
          </button>
        </Head>
        <div className={cn('info')}>
          <List
            list={order}
            onClick={onDeleteOrder}
            buttonTitle={buttonTitle}
          />
        </div>
        <div className={cn('totalPrice')}>
          Итого <span>{getTotalPrice(order)} ₽</span>
        </div>
      </div>
    </div>
  );
}

Order.propTypes = {
  order: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  buttonTitle: PropTypes.string,
  isOpenModal: PropTypes.bool,
  setIsOpenModal: PropTypes.func,
  onDeleteOrderItem: PropTypes.func,
};

Order.defaultProps = {
  onDeleteOrderItem: () => { },
  setIsOpenModal: () => { },
};

export default React.memo(Order);
