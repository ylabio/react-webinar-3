import {memo, useCallback, useEffect} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useTranslate} from "../../i18n";
import {getRoutePath} from "../index";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import Nav from "../../components/nav";
import FlexContainer from "../../components/flex-container";


function Main(props) {

  const store = useStore();
  const t = useTranslate();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    headTitle: state.application.headTitle,
    lang: state.application.lang
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    loadCatalogPage: useCallback((page) => store.actions.catalog.load(page), [store]),
    getRoutePath: useCallback((...args) => getRoutePath(...args), []),
    changeLang: useCallback(() => store.actions.application.changeLang(), [store])
  }

  const basketToolAmountPlural =
    select.lang === 'en'
      ? plural(
        select.amount,
        {
          one: 'product',
          other: 'products',
        },
        'en-US',
      ) : plural(select.amount, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      });

  const navConfig = [
    {id: 1, title: t('basket-tool-main-link-title'), path: callbacks.getRoutePath('main')},
    //это тестовый пункт меню для демонстрации
    {id: 2, title: t('test-link'), path: '/testLink'}
  ]

  return (
    <PageLayout>
      <Head title={t(select.headTitle) === null ? select.headTitle : t(select.headTitle)}
            onChangeLang={callbacks.changeLang} lang={select.lang}/>
      <FlexContainer>
        <Nav
          navConfig={navConfig}
        />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          inBasketTitle={t('basket-tool-in-basket-title')}
          goToBasketTitle={t('basket-tool-go-to-basket-title')}
          emptyBasketTitle={t('basket-tool-empty-basket-title')}
          amountPlural={basketToolAmountPlural}
        />
      </FlexContainer>
      {props.renderRouter()}
    </PageLayout>
  );
}

Main.propTypes = {
  renderRouter: PropTypes.func
};

export default memo(Main);
