import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PreloadWrapper({ isLoad, children }) {

  const cn = bem('PreloadWrapper');

  return (
    <div className={cn()}>
      {isLoad ? <div className={cn('spiner')}></div> : children}
    </div>
  );
}

PreloadWrapper.propTypes = {
  isLoad: PropTypes.bool,
  children: PropTypes.node
}

export default memo(PreloadWrapper);
