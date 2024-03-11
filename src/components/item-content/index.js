import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function ItemContent(props) {

  const cn = bem('ItemContent');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.data._id)
  }

  return (
    <div className={cn()}>
      <p className={cn('description')}>
        {props.data.description}
      </p>
      <p className={cn('country')}>
        {`${props.t.country}: `}
        <span className={cn('country-name')}>{props.data.madeIn.title} ({props.data.madeIn.code})</span>
      </p>
      <p className={cn('category')}>
        {`${props.t.category}: `}
        <span className={cn('category-name')}>{props.data.category.title}</span>
      </p>
      <p className={cn('year')}>
        {`${props.t.year}: `}
        <span className={cn('year-number')}>{(new Date(props.data.dateCreate)).getFullYear()}</span>
      </p>
      <p className={cn('price')}>
        {`${props.t.price}: ${numberFormat(props.data.price)} ₽`}
      </p>
      <div className={cn('actions')}>
        <button onClick={callbacks.onAdd}>{props.t.add}</button>
      </div>
    </div>
  );
}


ItemContent.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    madeIn: PropTypes.object,
    category: PropTypes.object,
    dateCreate: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

ItemContent.defaultProps = {
  onAdd: () => {},
}

export default memo(ItemContent);
