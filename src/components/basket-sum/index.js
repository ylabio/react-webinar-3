import React from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import { formatSum } from "../../utils";
import './style.css';

function BasketSum({total}) {

  const cn = bem('BasketSum')

  return (<div className={ cn() }>
    <p className={ cn( 'price' ) }>Итого</p>
    <p className={ cn( 'total' ) }>{ formatSum( total ) } ₽</p>
    <p className={ cn( 'block' ) }></p>
  </div>)
}

BasketSum.propTypes = {
  total: PropTypes.number
};

BasketSum.defaultProps = {
  total: 0
}

export default React.memo(BasketSum);