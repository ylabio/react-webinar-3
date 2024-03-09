import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Head({title}) {

  const cn = bem('Head')

  return (
    <div className={cn()}>
      <h1>{title}</h1>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.string,
  setActive: PropTypes.func,
};

export default React.memo(Head);
