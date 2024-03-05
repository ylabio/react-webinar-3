import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Item from "../item";

function List({list, funcForBtn, labelForBtn, emptyText}) {

  const cn = bem('List')

  return (
    <div className={cn()}>
      {
        list.length ?
          list.map((item) => (
            <Item
              item={item}
              key={item.code}
              onFuncForBtn={funcForBtn}
              labelForBtn={labelForBtn}
            />
          )) : <h3 className={cn()}>{emptyText}</h3>
      }
    </div>
  )
}

List.PropTypes = {
  list: PropTypes.node,
  funcForBtn: PropTypes.func,
  labelForBtn: PropTypes.string,
  emptyText: PropTypes.string,
}

List.defaultProps = {
  funcForBtn: () => {}
}

export default React.memo(List);