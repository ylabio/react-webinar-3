import React from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import CartInfo from '../cart-info/index'
import Button from '../button/index'
import './style.css';

function Controls({callbacks ,count , totalSumm}) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
       <CartInfo count={count} totalSumm={totalSumm}/>
       <Button callback={callbacks.onOpenCart}  title={'Перейти'}/>
    </div>
  )
}

Controls.propTypes = {
  callbacks: PropTypes.object,
  count: PropTypes.number,
  totalSumm: PropTypes.number,
};

Controls.defaultProps = {
  callbacks: {}
}

export default React.memo(Controls);
