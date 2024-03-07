import React from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function List({list, makeItem}) {
  const cn = bem("List");

  return (
    <div className={cn()}>{
      list.map((item, index) =>
        <div key={item.code} className={index === 0 ? cn("item-first") : cn("item")}>
          {makeItem(item)}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  makeItem: PropTypes.func,
};

List.defaultProps = {
  makeItem: () => {
  },
}

export default React.memo(List);
