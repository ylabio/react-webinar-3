import { memo, useCallback, useEffect, useMemo } from "react"
import { useParams } from "react-router";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import ItemDetails from "../../components/item-details";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import MainMenu from "../../components/main-menu";
import "../style.css"

const ItemPage = () => {

  const { id } = useParams();

  const store = useStore();

  useEffect(() => {
    if (id) {
      store.actions.product.loadItem(id);
    }
  }, [id])

  const select = useSelector(state => ({
    product: state.product,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.i18n.lang,
    languageNames: state.i18n.languageNames,
    locale: state.i18n.locale
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Переключение языка
    changeLang: useCallback((e) => store.actions.i18n.changeLocale(e.target.value), [store]),
  }

  return (
    <PageLayout
      head={<>
        <Head
          title={select.product.title}
          lang={select.lang}
          languageNames={select.languageNames}
          changeLang={callbacks.changeLang}
        />
        <div className="MenuAndBasketTool">
          <MainMenu title={select.locale.Main} />
          <BasketTool
            onOpen={callbacks.openModalBasket}
            amount={select.amount}
            sum={select.sum}
            locale={{
              Main: select.locale.Main,
              In_cart: select.locale.In_cart,
              product: select.locale.product,
              empty: select.locale.empty,
              Navigate: select.locale.Navigate
            }}
          />
        </div>
      </>}
    >
      <ItemDetails
        item={select.product}
        onAdd={callbacks.addToBasket}
        locale={{
          Country_of_origin: select.locale.Country_of_origin,
          Category: select.locale.Category,
          Year_of_production: select.locale.Year_of_production,
          Price: select.locale.Price,
          Add: select.locale.Add,
        }}
      />
    </PageLayout>
  )
}

export default memo(ItemPage)