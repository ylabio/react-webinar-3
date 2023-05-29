import {memo, useState} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function Item(props){

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  const dict = {
    rus: {
      add: 'Добавить'
    },
    eng: {
      add: 'Add'
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        {
          props.address ?
            <Link to={props.address} className={cn('titleLink')}>{props.item.title}</Link> :
            <span className={cn('titleSpan')}>{props.item.title}</span>
        }
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{dict[props.lang].add}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  address: PropTypes.string,
  lang: PropTypes.oneOf(['rus', 'eng']),
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  lang: 'rus',
  onAdd: () => {},
}

export default memo(Item);
