import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";
import { memo } from 'react';
import './style.css';

function TopMenuContainer({children}) {
  
    const cn = bem('TopMenuContainer');
  
    return (
      <div className={cn()}>
        {children}
      </div>
    );
  }

  TopMenuContainer.propTypes = {
    children: PropTypes.node,
  };
  
  TopMenuContainer.defaultProps = {
    children: <></>
  };
  
  export default memo(TopMenuContainer);