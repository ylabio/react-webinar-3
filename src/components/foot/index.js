import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Foot({sum}) {

  const cn = bem('Foot')

  return (
    <div className={cn()}>
      <h3>Итого</h3>
      <h3>{sum} ₽</h3>
    </div>
  )
}

Foot.PropTypes = {
  sum: PropTypes.number
}

export default React.memo(Foot);