import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import {cn as bem} from '@bem-react/classname';
import "./style.css";

function List({ list, onAddCartItem }) {
  const callbacks = {
    onAddItem: (item) => {
      onAddCartItem(item);
    },
  };
  const cn = bem('List');
  return (
    <div className={cn()}>
      {list.map((item) => (
        <div key={item.code} className={cn('item')}>
          <Item
            item={item}
            onClickButton={callbacks.onAddItem}
            textButton="Добавить"
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onAddCartItem: PropTypes.func,

};

List.defaultProps = {
  onAddCartItem: () => {},
};

export default React.memo(List);
