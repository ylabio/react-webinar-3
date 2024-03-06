import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Head(props) {

  const cn = bem('Head');

  return (
    <div className={cn()}>
      <h1>{props.title}</h1>
      {props.closeModal&&<button className={cn('button')} onClick={props.closeModal}>Закрыть</button>}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  closeModal: PropTypes.func
};

export default React.memo(Head);
