import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import { useCallback } from "react";
import { numberFormat } from "../../utils";
import "./style.css";

function ProductInfo() {
  const store = useStore();
  const cn = bem("ProductInfo");

  const select = useSelector((state) => ({
    _id: state.product._id,
    description: state.product.description,
    year: state.product.edition,
    price: state.product.price,
    countryName: state.product.madeIn.title,
    countryCode: state.product.madeIn.code,
    category: state.product.category.title,
  }));

  const callbacks = {
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
  };

  return (
    <div className={cn()}>
      <div className={cn("field")}>{select.description}</div>
      <div className={cn("field")}>
        Страна производитель:{" "}
        <span className={cn("field", { w700s: true })}>
          {select.countryName} ({select.countryCode})
        </span>
      </div>
      <div className={cn("field")}>
        Категория:{" "}
        <span className={cn("field", { w700s: true })}>{select.category}</span>
      </div>
      <div className={cn("field")}>
        Год выпуска:{" "}
        <span className={cn("field", { w700s: true })}>{select.year}</span>
      </div>
      <div className={cn("field")}>
        <span className={cn("field", { w700b: true })}>
          Цена: {numberFormat(select.price)} &#8381;
        </span>
      </div>
      <button
        onClick={() => callbacks.addToBasket(select._id)}
        className={cn("btn", { add: true })}
      >
        Добавить
      </button>
    </div>
  );
}

export default memo(ProductInfo);
