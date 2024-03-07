import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from '@bem-react/classname';

function Head(props) {

  const cn = bem('Head');

  return (
    <div className={cn()}>
      <h1>{props.title}</h1>
      {props.children && <div className={cn('actions')}>{props.children}</div>}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default React.memo(Head);
