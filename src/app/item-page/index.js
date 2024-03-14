import { memo, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Basket from "../basket";
import "./style.css";

function ItemPage() {
  var id = useParams().id;
  const store = useStore();

  const activeModal = useSelector((state) => state.modals.name);

  useEffect(() => {
    store.actions.catalog.loadItem(id);
  }, [id]);

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.catalog.item,
    lang: state.language.lang
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id, item) => store.actions.basket.addToBasket(_id, item), [
      store,
    ]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open("basket"), [
      store,
    ]),
    changeLang: useCallback(()=> store.actions.language.changeLang())
  };

  return (
    <PageLayout>
      <Head title={select.item.title} changeLang={callbacks.changeLang} lang={select.lang}/>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        lang={select.lang}
      />
      <div className="Field">{select.item.description}</div>
      <div className="Field">
        Страна производитель:{" "}
        <div className="Answer">{Object(select.item.madeIn).title} ({Object(select.item.madeIn).code})</div>
      </div>
      <div className="Field">
        Категория:{" "}
        <div className="Answer">{Object(select.item.category).title}</div>
      </div>
      <div className="Field">
        Год выпуска: <div className="Answer">{select.item.edition}</div>
      </div>
      <div className="Cost">Цена: {select.item.price} ₽</div>
      <button className="AddButton" onClick={() => {callbacks.addToBasket(id, select.item)}}>Добавить</button>
      {activeModal === "basket" && <Basket />}
    </PageLayout>
  );
}

export default memo(ItemPage);
