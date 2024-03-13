import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function MainMenu({children}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      {children}
    </div>
  )
}

MainMenu.propTypes = {
  children: PropTypes.node
}

export default memo(MainMenu);