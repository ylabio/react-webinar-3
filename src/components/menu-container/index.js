import {cn as bem} from '@bem-react/classname';
import {memo} from "react";
import PropTypes from "prop-types";
import 'style.css'

function MenuContainer ({ children }) {

  const cn = bem('Menu-Container')

  return (<div className={cn()}>
    {children}
  </div>)
}

MenuContainer.propTypes = {
  children: PropTypes.node
}

export default memo(MenuContainer)
