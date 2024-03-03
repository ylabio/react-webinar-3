import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import ShopItem from "../shop-item";

function ShopList ({ list, onAdd }) {

  const cn = bem('ShopList')

  return (
    <div className={cn()}>
      {list.map((item) => (
        <ShopItem onAdd={onAdd} item={item} key={item.code}/>
      ))}
    </div>
  )
}

ShopList.PropTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAdd: PropTypes.func,
}

ShopList.defaultProps = {
  onAdd: () => {}
}

export default React.memo(ShopList);