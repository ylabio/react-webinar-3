import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Separator({children}) {

  const cn = bem('Separator');


  return (
    <div className={cn()}>
        {children}
    </div>

  );
}

Separator.propTypes = {
  children: PropTypes.node
}

export default memo(Separator);