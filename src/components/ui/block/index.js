import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Block({isColumn, children}){
  const cn = bem('Block');

  return (
    <div className={`${cn()} ${isColumn ? cn('isColumn'): ''}`}>
      {children}
    </div>
  )
}

Block.propTypes = {
  children: PropTypes.node
};

Block.defaultProps = {
  isColumn: false
}

export default Block;
