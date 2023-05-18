import { cn as bem } from "@bem-react/classname";
import PropTypes from 'prop-types';
import React from "react";
import Item from "../item";
import './style.css';

/** Теперь это универсальный лист */

function List({ list, buttonsAction, buttonsLabel }) {
  const cn = bem('List');

  return (
    <div className={cn()}>{
      list.map(item =>
        <div key={item.code} className={cn('item')}>
          <Item item={item} onAction={buttonsAction} actionName={buttonsLabel} />
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