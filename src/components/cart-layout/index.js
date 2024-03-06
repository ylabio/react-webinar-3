import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CartLayout({children, onCloseCart}) {

  const cn = bem('CartLayout')

  return (
    <div className={cn()} onClick={onCloseCart}>
      <div className={cn('container')} onClick={(e) => e.stopPropagation()}>
        <button className={cn('button')} onClick={onCloseCart}>Закрыть</button>
        {children}
      </div>
    </div>
  );
}

CartLayout.propTypes = {
  children: PropTypes.node,
  onCloseCart: PropTypes.func,
}

export default React.memo(CartLayout);