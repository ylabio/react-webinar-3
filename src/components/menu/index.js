import React from 'react';
import {cn as bem} from '@bem-react/classname'
import {Link} from "react-router-dom";
import BasketTool from "../basket-tool";
import './style.css';
import PropTypes from "prop-types";

function Menu(props) {

  const cn = bem('Menu')
  return (
    <div className={cn()}>
      <Link className={cn('link')} to={'/'}>Главная</Link>
      <BasketTool onOpen={props.onOpen} amount={props.amount} sum={props.sum}/>
    </div>
  );
}

Menu.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

Menu.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}


export default Menu;