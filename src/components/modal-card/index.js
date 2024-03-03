import React from 'react'
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Overlay from '../overlay';
import List from '../list';
import { formatPrice } from '../../utils';

function ModalCard(props) {
    
    if (!props.isOpen) return null;
    const cn = bem('ModalCard');
    
    return (
        <Overlay onClose={props.onClose}>
      <div className={cn()}>
        <div className={cn("header")}>
            <h1>Корзина</h1>
          <button className={cn("header-close-button")} onClick={props.onClose}>
            Закрыть
          </button>
        </div>
        <div className={cn("content")}>
          <List list = {props.list} itemButtonContent = "Удалить" onButtonClickHandler = {props.onButtonClickHandler}>
          </List>
        </div>
        <div className={cn("footer")}>
            <span><b>Итого</b></span>
            <span><b>{`${formatPrice(props.totalCost)} ₽`}</b></span>
        </div>
      </div>
        </Overlay>
    );
};


ModalCard.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    onButtonClickHandler: PropTypes.func.isRequired,
    totalCost: PropTypes.number.isRequired
};

List.defaultProps = {
  onClose: () => {
  },
  onButtonClickHandler: () => {
  },
}

export default ModalCard
