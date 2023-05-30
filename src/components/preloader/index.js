import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';

function Preloader() {
  const cn = bem('Preloader');
  return (
    <div className={cn()}>
      <span className={cn("Item")}></span>
    </div>
  )
}

export default memo(Preloader);
