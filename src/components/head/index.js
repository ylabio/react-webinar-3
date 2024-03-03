import React from "react";
import PropTypes from "prop-types";
import Button from "../button";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Head({title, btnText, btnAction}) {
  const cn = bem('Head');
  return (
    <>
    <div className={cn()}>
      <h1>{title}</h1>
      {btnText && 
      <Button text={btnText} onAction={btnAction} />}
    </div>
    </>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  btnText: PropTypes.string,
  btnAction: PropTypes.func,
};

Head.defaultProps = {
  btnAction: () => {
  },
}

export default React.memo(Head);
