import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function MenuLayout({ children }) {

  const cn = bem('MenuLayout');

  return (
    <div className={cn()}>
      {children}
    </div>
  );
}

MenuLayout.propTypes = {
  children: PropTypes.node
}

export default memo(MenuLayout);
