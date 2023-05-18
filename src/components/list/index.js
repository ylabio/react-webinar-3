import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import styles from './List.module.scss';

const List = ({ list, onDeleteItem, addProduct, modal, removeProduct, products }) => {
  const itemsToRender = modal ? products : list;
  return (
    <div className={styles.List}>
      {itemsToRender.map((item) => (
        <div key={item.code} className={styles.ListItem}>
          <Item
            item={item}
            modal={modal}
            addProduct={addProduct}
            removeProduct={removeProduct}
            products={products}
            onDelete={onDeleteItem}
          />
        </div>
      ))}
    </div>
  );
};

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func,
};

List.defaultProps = {
  onDeleteItem: () => {},
  onSelectItem: () => {},
};

export default React.memo(List);
