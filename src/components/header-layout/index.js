import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function HeaderLayout({children}) {

  const cn = bem('HeaderLayout');

  return (
    <div className={cn()}>
      {children}
    </div>
  );
}

HeaderLayout.propTypes = {
  children: PropTypes.node
}

export default memo(HeaderLayout);
