import React from 'react';
import PropTypes from 'prop-types';
import { numFormat } from '../../utils';
import './style.css';
import Buttons from '../buttons';

function Item({ item = {}, onClickBtn = () => {} }) {
  return (
    <>
      <div className={'Item'}>
        <div className="Item-title">
          <b>{item.title}</b>
          <div className="Item-title-right">
            <span>{numFormat(item.price) + ' ₽'}</span>
          </div>
        </div>
        <div className="Item-actions">
          <Buttons onClick={() => onClickBtn(item)} variant="default">
            Добавить
          </Buttons>
        </div>
      </div>
    </>
  );
}

Item.propTypes = {
  item: PropTypes.object,
  onAddToCart: PropTypes.func,
};

export default React.memo(Item);
