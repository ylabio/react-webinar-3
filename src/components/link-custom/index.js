import {memo} from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LinkCustom({to, className, children}) {
  const cn = bem('LinkCustom');

  return (
    <Link to={to} className={cn({ custom: className })}>{children}</Link>
  )
}

LinkCustom.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,  
  children: PropTypes.node
};

export default memo(LinkCustom);

