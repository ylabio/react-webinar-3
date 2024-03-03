import React from "react";
import PropTypes from "prop-types";
import Button from "../button";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item(props) {
  const cn = bem('Item');
  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{props.item.price.toLocaleString()}&nbsp;₽</div>
      {props.item.count !== undefined &&
        <div className={cn('count')}>{props.item.count}&nbsp;шт</div>
      }
      {props.item.code &&
        <div className={cn('actions')}>
          <Button title={props.item.count !== undefined ? 'Удалить' : 'Добавить'} callback={() => props.callback(props.item.code)} />
        </div>
      }
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  callback: PropTypes.func,
};

Item.defaultProps = {
  callback: () => {
  },
}

export default React.memo(Item);
