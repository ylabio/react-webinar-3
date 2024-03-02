import React from "react";
import PropTypes from "prop-types";
import './style.css';
import { cn as bem} from '@bem-react/classname';

function Head({title, isCartOpen, onCloseCart}) {

  const cn = bem('Head');

  return (
    <div className='Head'>
      <h1 className={cn('title')}>{title}</h1>
      {isCartOpen && <button className={cn('button')} onClick={onCloseCart}>Закрыть</button>}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  isCartOpen: PropTypes.bool,
  onCloseCart: PropTypes.func
};

export default React.memo(Head);
