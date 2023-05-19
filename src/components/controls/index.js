import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils';
import { cn } from '@bem-react/classname';

function Controls({ showModal, cnt, sum }) {
  const item = cn('Item');

  return (
    <div className="Controls">
      <div className={item()}>В корзине:</div>
      {!!cnt ? (
        <div className={item(null, ['bold'])}>
          {cnt} {plural(cnt, { one: 'товар', few: 'товара', many: 'товаров' })}{' '}
          / {sum} ₽
        </div>
      ) : (
        <div className={item(null, ['bold'])}>пусто</div>
      )}
      <div className={item('action')}></div>
      <button onClick={() => showModal()}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  showModal: PropTypes.func,
  cnt: PropTypes.number,
  sum: PropTypes.number,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Controls);
