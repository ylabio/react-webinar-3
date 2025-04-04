import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { QueryApiClient } from "../../api/api-query";
import { ArticleService } from "../../api/api-articles";
import Head from "../head";
import Controls from "../controls";
import { cartButtonLabel } from "../../utils";
import PageLayout from "../page-layout";
import "./style.css"
import { createHooks } from "../../hooks";

const ModalArticle = ({ store }) => {
  const { id } = useParams(); // ID товара из URL
  const { sizeCart, total } = store.getCartState();

  // Состояния
  const [product, setProduct] = useState(null);

  // API клиент и сервис
  const apiClient = new QueryApiClient('http://localhost:8010/api');
  const articleService = new ArticleService(apiClient);

  // Хуки
  const hooks = createHooks(store);

  // Загрузка данных о товаре
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDetails = await articleService.getArticleWithDetails(id);
        setProduct(productDetails);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Загрузка...</div>;
  }

  const onClick = () => {
    hooks.onAddCart(id);
  };

  const cartBtnLabel = cartButtonLabel(sizeCart, total);

  return (
    <PageLayout>
      <Head title={product.title} />
      <Controls label={cartBtnLabel} />
      <p>{product.description}</p>
      <div className="product-info">
        <div className="product-info__block">
          <span className="product-info__label">Производитель:</span>
          <span className="product-info__value">{product.madeIn.title}</span>
        </div>

        <div className="product-info__block">
          <span className="product-info__label">Категория:</span>
          <span className="product-info__value">{product.category.title}</span>
        </div>

        <div className="product-info__block">
          <span className="product-info__label">Год выпуска:</span>
          <span className="product-info__value">{product.edition}</span>
        </div>
      </div>
      <span className={"product-price"}> Цена: {product.price} ₽</span>
      <div className={"product-actions"}>
        <button onClick={onClick}>Добавить</button>
      </div>
    </PageLayout>
  );
};

export default ModalArticle;
