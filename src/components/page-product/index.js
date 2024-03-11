import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useCallback } from "react";
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
function PageProduct() {
  console.log("resolvedPage");
  const cn = bem("Product-page");
  const { id } = useParams();
  const store = useStore();
  const select = useSelector((state) => ({
    list: state.catalog.list,
    isLoading: state.catalog.isLoading,
    error: state.catalog.error,
  }));
  const addToBasket = useCallback(
    (_id) => store.actions.basket.addToBasket(_id),
    [store]
  );
  useEffect(() => {
    store.actions.catalog.loadById(id);
  }, []);
  if (select.isLoading) {
    return <div>Loading...</div>;
  }
  console.log(select.list);
  return (
    <>
      {select.list[0]?.description && (
        <div className={cn()}>
          <p className={cn("description")}>{select.list[0].description}</p>
          <p>
            Страна произвоитель:{" "}
            <span className={cn("madeIn")}>
              {select.list[0].madeIn.title} ({select.list[0].madeIn.code})
            </span>
          </p>
          <p>
            Категория:{" "}
            <span className={cn("category")}>
              {select.list[0].category.title}
            </span>
          </p>
          <p>
            Год выпуска:{" "}
            <span className={cn("edition")}>{select.list[0].edition}</span>
          </p>
          <p className={cn("price")}>
            Цена: {numberFormat(select.list[0].price)} ₽
          </p>
          <button
            className={cn("action")}
            onClick={() => addToBasket(select.list[0]._id)}
          >
            Добавить
          </button>
        </div>
      )}
    </>
  );
}

export default PageProduct;
