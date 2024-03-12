import React, { useCallback, useEffect, useState } from "react";
import PageLayout from "../../components/page-layout";
import { redirect, useParams } from "react-router";
import Head from "../../components/head";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { numberFormat } from "../../utils";
import useStore from "../../store/use-store";

function Product() {
  const cn = bem("Product");
  const { id } = useParams();
  const [
    { title, description, price, madeIn, category, edition },
    changeProduct,
  ] = useState({});
  const store = useStore();
  const callbacks = {
    addToBasket: useCallback(() => {
      console.log(id);
      store.actions.basket.addToBasket(id);
    }, [store]),
  };
  useEffect(() => {
    const getProduct = async () => {
      if (!id) redirect("/");
      const response = await fetch(
        `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
      );
      const json = await response.json();
      changeProduct(json.result);
    };

    getProduct();
  }, [id]);

  return (
    <PageLayout head={<Head title={title} />}>
      <div className={cn("content")}>
        <p>{description}</p>
        <p>
          Страна производитель:{" "}
          <b>
            {madeIn?.title} ({madeIn?.code})
          </b>
        </p>
        <p>
          Категория: <b>{category?.title}</b>
        </p>
        <p>
          Год выпуска: <b>{edition}</b>
        </p>
        <h1>Цена: {numberFormat(price)} ₽</h1>
        <button onClick={callbacks.addToBasket}>Добавить</button>
      </div>
    </PageLayout>
  );
}

export default Product;