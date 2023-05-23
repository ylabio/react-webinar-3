import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Head(props) {
  const cn = bem('Head')
  return (
    <div className={cn({'active': props.active})}>
      <h1 className={cn('title')}>{props.title}</h1>
      {props.active && (
        <button
          type="button"
          className={cn('button')}
          onClick={() => props.onclick(!props.active)}>
          Закрыть
        </button>
      )}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  active: PropTypes.bool,
  onclick: PropTypes.func,
}

Head.defaultProps = {
  onclick: () => {},
}

export default React.memo(Head)
