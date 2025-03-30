import React from 'react';
import './style.css';
import PropTypes from "prop-types";

function List({ list, renderItem = () => {}}) {
 
  return (
    <div className="List">
      {list?.map((item) => (
        <div key={item.code} className="List-item">
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ),
};


export default React.memo(List);
