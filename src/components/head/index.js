import React from "react";
import PropTypes from "prop-types";
import { cn as bem} from '@bem-react/classname';
import './style.css';

function Head({title, isCartOpen, onCloseCart}) {
  const cn = bem('Head');

  return (
    <div className={cn()}>
      <h1 className={cn('title')}>{title}</h1>
      {isCartOpen && <button className={cn('button')} onClick={onCloseCart}>Закрыть</button>}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node.isRequired,
  isCartOpen: PropTypes.bool,
  onCloseCart: PropTypes.func
};

export default React.memo(Head);
