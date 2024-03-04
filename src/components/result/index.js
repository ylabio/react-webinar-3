import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Result({ totalPrice }) {
  //console.log('RESULT');
  const cn = bem('Result')
  return (
    <div className={cn()}>
      <span className={cn('bold')}>Итого</span>
      <span className={cn('bold')}>{` ${totalPrice} ₽`}</span>
    </div>
  )
}

export default React.memo(Result);