import {memo, useState} from "react";
import PropTypes from "prop-types";
<<<<<<< HEAD
=======
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
>>>>>>> 0d7275a5b9abf52bfdf66805aac7ed9247c620c1
import './style.css';
import {cn as bem} from '@bem-react/classname';

function Item(props){

  const cn = bem('Item');

  const callbacks = {
<<<<<<< HEAD
    functionResolver: () => {
      props.functionResolver(props.item.code);
    }
=======
    onAdd: (e) => props.onAdd(props.item._id)
>>>>>>> 0d7275a5b9abf52bfdf66805aac7ed9247c620c1
  }
  
  return (
    <div className={cn()}>
<<<<<<< HEAD
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{Intl.NumberFormat('ru-RU').format(props.item.price)} ₽ </div>
      {props.item.count && (<div className={cn('count')}>{props.item.count} шт</div>)}
      <div className={cn('actions')}>
        <button onClick={callbacks.functionResolver}>
          {props.buttonTitle}
        </button>
=======
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
>>>>>>> 0d7275a5b9abf52bfdf66805aac7ed9247c620c1
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
<<<<<<< HEAD
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  functionResolver: PropTypes.func,
};

Item.defaultProps = {
  functionResolver: () => {},
=======
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
>>>>>>> 0d7275a5b9abf52bfdf66805aac7ed9247c620c1
}

export default memo(Item);
