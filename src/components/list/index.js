import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import {cn as bem} from "@bem-react/classname";

function List({list, buttonText, action}){
  const cn = bem('List');
  return (
    <div className={cn()}>{
      list.map(item =>
        <div key={item.code} className={cn("item")}>
          <Item item={item} buttonText={buttonText} action={action}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  buttonText: PropTypes.string,
  action: PropTypes.func
};

export default React.memo(List);
