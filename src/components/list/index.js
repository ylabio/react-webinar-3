import { cn as bem } from "@bem-react/classname";
import PropTypes from 'prop-types';
import React from "react";
import './style.css';

/** Теперь это универсальный лист */

function List({ list, render }) {
  const cn = bem('List');

  return (
    <div className={cn()}>{
      list.map(item =>
        <div key={item.code} className={cn('item')}>
          {render(item)}
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
  render: PropTypes.func.isRequired
}

List.defaultProps = {
  list: []
}

export default React.memo(List);