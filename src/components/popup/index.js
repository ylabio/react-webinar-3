import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React, { useEffect } from 'react';
import './style.css';

function Popup({children, setActive}) {
  const cn = bem('Popup');
  return (
    <div className={cn()} onClick={() => setActive(false)}>
      <div className={cn('content')} onClick={e => e.stopPropagation()}>
        <button className={cn('close')} onClick={() => setActive(false)}>Закрыть</button>
        {children}
      </div>
    </div>
  );
};

Popup.propTypes = {
  setActive: PropTypes.func.isRequired,
  children: PropTypes.node,
}

Popup.defaultProps = {
  setActive: () => { }
}

export default React.memo(Popup);