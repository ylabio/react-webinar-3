import React, { memo } from 'react';
import propTypes from 'prop-types';
import PropTypes from "prop-types";
import './style.css';
import { numberFormat } from '../../utils';
import {cn as bem} from "@bem-react/classname";

const ItemProduct = ({ onAdd, item, madeIn, category, }) => {
    const cn = bem('ItemProduct');
    const callbacks = {
        onAdd: (e) => onAdd(item._id)
    };
    return (
        <div className={cn('wrapper')}>
            <div className={cn('desc')}>{item.description}</div>
            <div className={cn('block')}>Страна производитель: <span>{madeIn.title}</span></div>
            <div className={cn('block')} >Категория: <span> {category.title}</span></div>
            <div className={cn('block')} >Год выпуска: <span>{item.edition}</span></div>
            <div className={cn('price')}>Цена:  {numberFormat(item.price)} ₽</div>
            <button className={cn('btn')}onClick={callbacks.onAdd} >Добавить</button>
        </div>
    );
};

ItemProduct.propTypes = {
    item: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      description: PropTypes.string,
      price: PropTypes.number,
      edition: PropTypes.number,
    }).isRequired,
    category: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
    }).isRequired,
    madeIn: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      code: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
    onAdd: propTypes.func,
  }
  
  ItemProduct.defaultProps = {
    onAdd: () => {},
  }

  
export default memo(ItemProduct);