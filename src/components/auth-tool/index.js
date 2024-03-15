import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function AuthTool({children}) {
  const cn = bem('AuthTool');
  return (
    <div className={cn()}>
      {children}
    </div>
  )
}

AuthTool.propTypes = {
  children: PropTypes.node
}

export default memo(AuthTool);