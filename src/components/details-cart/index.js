import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import { useFetchData } from "../../utils";
import PropTypes from "prop-types";
import "./style.css";
import BasketTool from "../basket-tool";


function DetailsCart({ onAdd,sum,amount,onOpen,onClick }) {
  const cn = bem("details_cart");

  const { product } = useFetchData();

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={cn()}>
       <div className={cn("header")}> 
      <Link to="/" className={cn("header-button")}>
        Главная
      </Link>
       <BasketTool  sum={sum} amount={amount} onOpen={onOpen}/> 
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
      <p className={cn("price")}>Цена: {product.price} ₽</p>
      <button className={cn("button")} onClick={() => product._id && onAdd(product._id)}>Добавить</button>
    </div>
  );
}
DetailsCart.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
export default DetailsCart;
