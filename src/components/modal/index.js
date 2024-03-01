import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import List from "../list";

function Modal({ store, list, onAddItem, onDeleteItem }) {
  const { basketList } = store.getState();

  return (
    <div className='Modal'>
      <h1>Корзина</h1>
      {/* <button onClick={callbacks.onDelete}>Удалить</button> */}
      <List
        list={list}
        onAddItem={onAddItem}
        onDeleteItem={onDeleteItem} />
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
