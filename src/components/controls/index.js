import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import Counter from "./counter";
import {cn as bem} from "@bem-react/classname";

function Controls({totalCount, totalPrice, onClick}) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <Counter totalCount={totalCount} totalPrice={totalPrice}/>
      <button onClick={onClick}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  totalCount: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default React.memo(Controls);
