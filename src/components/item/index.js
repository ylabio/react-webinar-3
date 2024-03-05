import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import Button from "../button";
import { getTriads } from "../../utils";
import './style.css';

function Item(props) {

  const callbacks = {
    onClick: () => {
      props.onClick(props.item.code)
    } 
  }

  const cn = bem('Item');

  const price = getTriads(props.item.price);

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{price + ' ₽'}</div>
      {props.item.count && <div className={cn('count')}>{props.item.count + ' шт'}</div>}
      <div className={cn('actions')}>
        <Button title={props.buttonTitle} onClick={callbacks.onClick} />
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
  buttonTitle: PropTypes.string,
  onClick: PropTypes.func,
};

Item.defaultProps = {
  onClick: () => {
  },
}

export default React.memo(Item);
