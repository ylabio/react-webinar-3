import React from "react";
import PropTypes from "prop-types";
import './style.css';

const List = ({component: Component, ...props}) => {

  return (
    <div className='List'>{
      props.list.map(item =>
        <div key={item.code} className='List-item'>
          <Component item={item} {...props} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default React.memo(List);
