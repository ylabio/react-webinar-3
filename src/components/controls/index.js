import React, { useContext } from "react";
import { constructIntl } from "../../utils";
import { Context } from "../context";
import { cn as bem } from "@bem-react/classname";
import PropTypes from 'prop-types';
import './style.css';

function Controls({callback, allPrice}) {
  const { defaultContext, modifiedContext } = useContext(Context);

  const bemClass = bem('Controls');
  
  return (
    <div className={bemClass()}>
      <span className={bemClass('text')}>В корзине: <b>{defaultContext.length 
      ? defaultContext.length + ` ${constructIntl({method: 'PluralRules', value: defaultContext.length, variants: {one: 'товар', few: 'товара', many: 'товаров'}})}` + ` / ${constructIntl({method: 'NumberFormat', value: allPrice})}` 
      : 'пусто'}</b></span>
      <button onClick={() => callback()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  callback: PropTypes.func,
  allPrice: PropTypes.number,
};

Controls.defaultProps = {
  callback: () => {}
};

export default React.memo(Controls);