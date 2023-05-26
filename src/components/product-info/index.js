import React from "react";

const ProductInfo = ({itemInfo, onAdd}) => {

  console.log(itemInfo)

  return (
    <div>
      <div>
        <div>{itemInfo.description}</div>
        <div>{itemInfo.madeIn._type}</div>
        <div>{itemInfo.category._type}</div>
        <div>{itemInfo.edition}</div>
        <div>{itemInfo.price}</div>
        <button onClick={() => onAdd(itemInfo._id)}>Добавить</button>
      </div>
    </div>
  )
}

export default React.memo(ProductInfo)