import React, {memo} from 'react'
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './style.css';

const Nav = ({children}) => {

  const cn = bem('Navigate');

  return (
    <div className={cn()}>
      {children}
    </div>
  )
}

Nav.propTypes = {
  children: PropTypes.node
}
export default memo(Nav);
