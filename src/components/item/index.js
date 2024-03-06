import React, {useState} from "react";
import PropTypes from "prop-types";
import {localeNum, plural} from "../../utils";
import './style.css';
import {cn as bem} from '@bem-react/classname';

function Item(props) {
  const cn = bem('Item');

  // Счётчик выделений
  const [count, setCount] = useState(0);

  const callbacks = {
    // onClick: () => {
    //   props.onSelect(props.item.code);
    //   if (!props.item.selected) {
    //     setCount(count + 1);
    //   }
    // },
    onDelete: (e) => {
      e.stopPropagation();
      props.onClick(props.item.code);

    }
  }

  return (
    <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}
         onClick={callbacks.onClick}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn("actions")}>
        <p className={cn("subtitle")}>{`${localeNum(props.item.price)} ₽`}</p>
        {props.cart && <p className={cn("cart")}>{`${props.item.count} шт`}</p>}
        <button onClick={callbacks.onDelete}>
          {props.btnName}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func
};

Item.defaultProps = {
  onDelete: () => {
  },
  onSelect: () => {
  },
}

export default React.memo(Item);
