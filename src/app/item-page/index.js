import React, { useCallback } from "react"
import PageLayout from "../../components/page-layout"
import Head from "../../components/head"
import Description from "../../components/description"
import BasketTool from "../../components/basket-tool"
import useSelector from "../../store/use-selector"
import useStore from "../../store/use-store"
import { locale } from "../../locale"

function ItemPage({lang}) {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.catalog.item
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.item.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
        sum={select.sum} lang={lang}/>
      <Description item={select.item} lang={lang} onClick={callbacks.addToBasket}>
        <button onClick={() => callbacks.addToBasket(select.item._id)}>{locale[lang].button.add}</button>
      </Description>
    </PageLayout>
  )
}

export default React.memo(ItemPage)