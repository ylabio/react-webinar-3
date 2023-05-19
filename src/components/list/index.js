import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function List(props) {
  const cn = bem('List')
  return (
    <div className={cn({ active: props.active })}>
      {props.list.map((item) => (
        <div key={item.code} className={cn('item')}>
          <Item
            item={item}
            titleButton={props.title}
            onclick={props.onclick}
            active={props.active}
          />
        </div>
      ))}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  title: PropTypes.string,
  onclick: PropTypes.func,
  active: PropTypes.bool,
}

List.defaultProps = {
  onclick: () => {},
}

export default React.memo(List)
