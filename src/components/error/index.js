import './style.css';
import { cn as bem } from '@bem-react/classname';
import PropTypes from "prop-types";
import './style.css';
import {memo} from "react";

function Error(props) {
  const cn = bem('Error');
  return <div className={cn()}>
    {props.message ? <span>{props.message}</span>
    :
      props.issues.map((err, i) => <span key={i}>{err.message}</span>)
    }
  </div>
}

Error.propTypes = {
  message: PropTypes.node,
  issues: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string
  }))
}

export default memo(Error);