import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils';
import { cn } from '@bem-react/classname';

function Controls({ showModal, cnt, sum }) {
  const item = cn('Item-control');

  return (
    <div className="Controls">
      <div className={item()}>В корзине:</div>
      {!!cnt ? (
        <div className={item(null, ['bold'])}>
          {cnt} {plural(cnt, { one: 'товар', few: 'товара', many: 'товаров' })}{' '}
          / {sum} &#8381;
        </div>
      ) : (
        <div className={item(null, ['bold'])}>пусто</div>
      )}
      <div className={item('action')}>
        <button onClick={() => showModal()}>Перейти</button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  showModal: PropTypes.func,
  cnt: PropTypes.number,
  sum: PropTypes.string,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Controls);
