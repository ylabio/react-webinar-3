import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";

function ProductInfo(props) {
  const cn = bem("ProductInfo");
  const t = props.useTranslate;
  const product = props.productData;

  const callbacks = {
    addToBasket: () => {
      props.addToBasket(product._id);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn("field")}>{product.description}</div>
      <div className={cn("field")}>
        Страна производитель:{" "}
        <span className={cn("field", { w700s: true })}>
          {product.madeIn.title} ({product.madeIn.code})
        </span>
      </div>
      <div className={cn("field")}>
        Категория:{" "}
        <span className={cn("field", { w700s: true })}>
          {product.category.title}
        </span>
      </div>
      <div className={cn("field")}>
        Год выпуска:{" "}
        <span className={cn("field", { w700s: true })}>{product.edition}</span>
      </div>
      <div className={cn("field")}>
        <span className={cn("field", { w700b: true })}>
          Цена: {numberFormat(product.price)} &#8381;
        </span>
      </div>
      <button
        onClick={callbacks.addToBasket}
        className={cn("btn", { add: true })}
      >
        {t("Добавить")}
      </button>
    </div>
  );
}

export default memo(ProductInfo);
