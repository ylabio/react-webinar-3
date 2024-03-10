import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import './style.css';

function ProductCart({ product, onAdd }) {
  const [countryName, setCountryName] = useState();
  const [categoryName, setCategoryName] = useState();

  const callbacks = {
    onAdd: () => onAdd(product?._id)
  };

  useEffect(() => {
    const fetchCountryName = async (id) => {
      try {
        const response = await fetch(`api/v1/countries/${id}?lang=ru&fields=%2A`);
        const { result } = await response.json();
        return result;
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCategoryName = async (id) => {
      try {
        const response = await fetch(`api/v1/categories/${id}?lang=ru&fields=%2A`);
        const { result } = await response.json();
        return result;
      } catch (error) {
        console.log(error);
      }
    };

    if (product?.madeIn?._id && product?.category?._id) {
      fetchCategoryName(product?.category._id).then(({ title }) => setCategoryName(title));
      fetchCountryName(product?.madeIn._id).then(({ title }) => setCountryName(title));
    }
  }, [product]);

  return (
    <div className="ProductCart">
      <p>{product?.description}</p>
      <p>Страна изготовитель: <b>{countryName}</b></p>
      <p>Категория: <b>{categoryName}</b></p>
      <p>Год выпуска: <b>{product?.edition}</b></p>
      <p className='ProductCart-price'>Цена: {product?.price} ₽</p>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  );
}

ProductCart.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    madeIn: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
    category: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
    edition: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }),
  onAdd: PropTypes.func.isRequired,
};

export default memo(ProductCart);
