import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CartFoot({sum}) {

  const cn = bem('CartFoot')

  return (
    <div className={cn()}>
      <h3>Итого</h3>
      <h3>{sum} ₽</h3>
    </div>
  )
}

CartFoot.PropTypes = {}

export default React.memo(CartFoot);