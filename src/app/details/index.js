import React, { memo, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import BasketTool from "../../components/basket-tool";
import Head from "../../components/head";
import ItemDetails from "../../components/item-details";
import Menu from "../../components/menu";
import PageLayout from "../../components/page-layout";
import Row from "../../components/row";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";

function Details() {
  // const [item, setItem] = React.useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const store = useStore();
  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.product,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
  };

  // const getProduct = async () => {
  //   try {
  //     const res = await fetch(
  //       `/api/v1/articles/${id}?fields=*,madeIn(title),category(title)`
  //     );
  //     const json = await res.json();
  //     setItem(json.result);
  //   } catch (e) {
  //     alert("Ошибка при загрузке продукта");
  //     console.error(e);
  //     navigate(-1);
  //   }
  // };

  useEffect(() => {
    try {
      if (id) store.actions.product.loadProduct(id);
    } catch (e) {
      alert("Ошибка при загрузке продукта");
      console.error(e);
      navigate(-1);
    }
  }, [id]);

  console.log(select.item);
  return (
    <PageLayout>
      {select.item && (
        <>
          <Head title={select.item.title} />
          <Row>
            <Menu />
            <BasketTool
              sum={select.sum}
              amount={select.amount}
              onOpen={callbacks.openModalBasket}
            />
          </Row>
          <ItemDetails item={select.item} onAdd={callbacks.addToBasket} />
        </>
      )}
    </PageLayout>
  );
}

export default memo(Details);
