import {memo} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import PropTypes from "prop-types";

function ErrorText({children}) {
  const cn = bem('ErrorText');

  return (
    <p className={cn()}>
      {children}
    </p>
  )
}

ErrorText.propTypes = {
  children: PropTypes.node,
};

export default memo(ErrorText);
