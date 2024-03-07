import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from '@bem-react/classname';

function Head({title, children}) {
  const cn = bem('Head');

  return (
    <div className={cn()}>
      <h1 className={cn("h1")}>{title}</h1>
      {children}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
