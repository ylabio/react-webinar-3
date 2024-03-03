import React from "react";
import PropTypes from 'prop-types';
import List from "../list";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Modal({ store, list, onAddItem, onDeleteItem, closeModal }) {
  const cn = bem('Modal');
  const { basketList } = store.getState();

  return (
    <div className={cn()}>
      <div className={cn('header')}>
        <h1>Корзина</h1>
        <button onClick={closeModal}>Закрыть</button>
      </div>
      {basketList.length
        ? <List
          list={list}
          onAddItem={onAddItem}
          onDeleteItem={onDeleteItem}
          isBasket={true}
        />
        : <p>В корзине пусто</p>
      }
    </div>
  );
}

// Controls.propTypes = {
//   onAdd: PropTypes.func
// };

// Controls.defaultProps = {
//   onAdd: () => {}
// }

export default React.memo(Modal);
