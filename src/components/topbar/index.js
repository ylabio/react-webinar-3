import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Topbar({children}) {
  const cn = bem('Topbar');
  return (
    <div className={cn()}>
      {children}
    </div>
  )
}

Topbar.propTypes = {
  children: PropTypes.node
}

export default memo(Topbar);