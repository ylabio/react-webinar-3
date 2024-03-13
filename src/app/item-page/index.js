import React, { useCallback } from "react"
import PageLayout from "../../components/page-layout"
import Head from "../../components/head"
import Description from "../../components/description"
import BasketTool from "../../components/basket-tool"
import useSelector from "../../store/use-selector"
import useStore from "../../store/use-store"
import {getIdFromUrl} from "../../utils"
import {locale} from "../../locale"
import Navigation from "../../components/navigation"

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
    // Обновление текущего товара
    setItemPage: useCallback(_id => store.actions.catalog.setCurrentItem(_id), [store])
  }

  const itemId = getIdFromUrl();

  const currentItem = Object.keys(select.item).length ? select.item : callbacks.setItemPage(itemId);

  return (
    <PageLayout>
      <Head title={currentItem.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
        sum={select.sum} lang={lang}>
        <Navigation link='/' title={locale[lang].tool.main} />
      </BasketTool>
      <Description item={currentItem} lang={lang} onClick={callbacks.addToBasket} />
    </PageLayout>
  )
}

export default React.memo(ItemPage)