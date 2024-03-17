import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function FlexContainer({title, children}) {

  const cn = bem('FlexContainer')

  return (
    <div className={cn()}>
      <h2>{title}</h2>
      {children}
    </div>
  )
}

FlexContainer.PropTypes = {
  children: PropTypes.node,
  title: PropTypes.string
}

export default React.memo(FlexContainer);