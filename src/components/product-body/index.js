import {memo} from "react";
import './style.css';

function Product_body({data,onAdd}) {
  const callbacks = {
    addProduct: (e) => onAdd(data._id)
  }
  return (
    <div className='Product-body'>
        <p className="Product-body__desc">{data.description}</p>
        <p className="Product-body__country">Страна производитель: <span>{data.madeInTitle}({data.madeInCode})</span> </p>
        <p className="Product-body__category">Категория: <span>{data.category}</span></p>
        <p className="Product-body__year">Год выпуска: <span>{data.dateCreate}</span></p>
        <p className="Product-body__price">Цена:  <span>{data.price}</span></p>
        <button onClick={() => callbacks.addProduct()}>Добавить</button>
      </div>
  )
}

Product_body.propTypes = {

};

Product_body.defaultProps = {

}

export default memo(Product_body);
