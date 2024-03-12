import { useState, useEffect } from "react";;
import {Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import { useFetchData } from "../../utils";
import "./style.css";
import Head from "../head";
import BasketTool from "../basket-tool";
import Controls from "../controls";


function DetailsCart() {
  const cn = bem("details_cart");


  // const { id } = useParams();
  // const [product, setProduct] = useState(null);

  // useEffect(() => {
  //   fetch(
  //     `/api/v1/articles/${id}?fields=category(title),price,edition,description,madeIn(title)`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setProduct(data.result));
  // }, [id]);

  // if (!product) {
  //   return <div>Loading...</div>;
  // }
  const { product } = useFetchData();

  if (!product) {
    return <div>Loading...</div>;
  }
  

  return (
    <div className={cn()}>
      <Head title="Название товара" />
      <div className={cn('header')}>
      <Link to="/" className={cn('header-button')}>Главная</Link>
        <BasketTool  onOpen={handleAddToBasket}/>
      </div>
      <p className={cn("description")}>{product.description}</p>
      <h2 className={cn("title")}>{product.title}</h2>
      <p className={cn("made-in")}>
        Страна Производитель:
        <span className="made-in-title">{product.madeIn.title}</span>
      </p>
      <p className={cn("category")}>
        Категория:{" "}
        <span className="category-title">{product.category.title}</span>
      </p>
      <p className={cn("edition")}>
        Год выпуска:<span className="edition-text">{product.edition}</span>
      </p>
      <p className={cn("price")}>Цена: {product.price}</p>
      <Controls />
    </div>
  );
}

export default DetailsCart;
