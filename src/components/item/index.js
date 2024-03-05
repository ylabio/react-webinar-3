import React, {useCallback} from "react";
import {formatPrice} from "../../utils";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Item(props) {
  const cn = bem('Item');
  
  const handleClick = useCallback(() => {
    props.onClick(props.item);
  }, [])

  return (
    <div className={cn()}>
      <div className={cn('start')}>
        <div className={cn('code')}>{props.item.code}</div>
        <div className={cn('title')}>{props.item.title}</div>
      </div>
      <div className={cn('end')}>
        <div className={cn('price')}>
          {formatPrice(props.item.price)}
        </div>
        <div className={cn('count')}>
          {props.item?.count && <span>{props.item.count} шт</span>}
        </div>
        <div className={cn('actions')}>
          <button onClick={handleClick}>{props.textBtn}</button>
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
    textBtn: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func
};

Item.defaultProps = {
  onClick: () => {},
}

export default React.memo(Item);
