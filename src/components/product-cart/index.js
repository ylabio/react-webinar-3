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
    const fetchData = async () => {
      try {
        const [countryResponse, categoryResponse] = await Promise.all([
          fetch(`api/v1/countries/${product.madeIn._id}?lang=ru&fields=%2A`),
          fetch(`api/v1/categories/${product.category._id}?lang=ru&fields=%2A`),
        ]);

        const [countryData, categoryData] = await Promise.all([
          countryResponse.json(),
          categoryResponse.json(),
        ]);

        setCountryName(countryData.result.title);
        setCategoryName(categoryData.result.title);
      } catch (error) {
        console.log(error);
      }
    };

    if (product?.madeIn?._id && product?.category?._id) {
      fetchData();
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
