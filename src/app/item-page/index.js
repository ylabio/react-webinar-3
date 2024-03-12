import { memo, useCallback, useEffect, useMemo } from "react"
import { useParams } from "react-router";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import ItemDetails from "../../components/item-details";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";

const ItemPage = () => {

  const { id } = useParams();

  const store = useStore();

  useEffect(() => {
    if (id) {
      store.actions.product.loadItem(id);
    }
  }, [id])

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.product,
    locale: state.i18n.locale
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.product.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
        sum={select.sum} />
      <ItemDetails
        item={select.product}
        onAdd={callbacks.addToBasket}
        locale={select.locale}
      />
    </PageLayout>
  )
}

export default memo(ItemPage)