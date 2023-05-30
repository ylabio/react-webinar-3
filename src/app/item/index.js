import { memo, useState, useCallback, useEffect, useLayoutEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./style.css";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ItemInfo from "../../components/item-info";
import Loading from "../../components/loading";
import NavBar from "../../components/nav-bar";
import NavMenu from "../../components/nav-menu";

function Item() {

  const store = useStore();
  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.item.item,
  }));

  const { id } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    store.actions.modals.close("basket");
  }, [location])

  useEffect(() => {
    store.actions.item
      .load(id)
      .then(() => setIsLoading(false))
      .catch((err) => alert(err));
    store.actions.modals.close("basket");
  }, [id]);

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open("basket"), [store]),
  };

  return (
    <PageLayout>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <Head title={select.item.title} />
          <NavBar>
            <NavMenu />
            <BasketTool
              onOpen={callbacks.openModalBasket}
              amount={select.amount}
              sum={select.sum}
            />
          </NavBar>
          <ItemInfo item={select.item} onAdd={callbacks.addToBasket} />
        </>
      )}
    </PageLayout>
  );
}

export default memo(Item);
