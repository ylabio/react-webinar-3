import { cn as bem } from "@bem-react/classname";
import PropTypes from 'prop-types';
import React from "react";
import Goods from "../goods";
import './style.css';

function List({ list, buttonsAction, buttonsLabel }) {
  const cn = bem('List');

  return (
    <div className={cn()}>{
      list.map(goods =>
        <div key={goods.code} className={cn('Goods')}>
          <Goods goods={goods} onAction={buttonsAction} actionName={buttonsLabel} />
        </div>
      )
    }
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  buttonsAction: PropTypes.func.isRequired,
  buttonsLabel: PropTypes.string.isRequired
}

List.defaultProps = {
  list: [],
  buttonsAction: () => { },
  buttonsLabel: 'Действие'
}

export default React.memo(List);