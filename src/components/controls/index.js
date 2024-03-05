import React from "react";
import PropTypes from 'prop-types';
import CartInfo from '../cart-info';
import Button from '../ui/button';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Controls({totalAmount, totalSum, onOpenModal}) {

  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <CartInfo totalAmount={totalAmount} totalSum={totalSum}/>
      <Button onClick={onOpenModal} inCart={true}>Перейти</Button>
    </div>
  )
}

Controls.propTypes = {
  totalAmount: PropTypes.number.isRequired,
  totalSum: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired
};

Controls.defaultProps = {
  onOpenModal: () => {}
}

export default React.memo(Controls);
