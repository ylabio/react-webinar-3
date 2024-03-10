import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Product_body({data,onAdd}) {
  const callbacks = {
    addProduct: (e) => {
      onAdd(data._id)
    }

  }
  return (
    <div className='Product-body'>
        <p className="Product-body__desc">{data.description}</p>
        <p className="Product-body__country">Страна производитель: <span>{data.madeInTitle}({data.madeInCode})</span> </p>
        <p className="Product-body__category">Категория: <span>{data.category}</span></p>
        <p className="Product-body__year">Год выпуска: <span>{data.dateCreate}</span></p>
        <p className="Product-body__price">Цена:  <span>{data.price}</span> ₽</p>
        <button onClick={() => callbacks.addProduct()}>Добавить</button>
      </div>
  )
}

Product_body.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    madeInTitle: PropTypes.string,
    category: PropTypes.string,
    madeInCode: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

Product_body.defaultProps = {
  onAdd: () => {},
}

export default memo(Product_body);
