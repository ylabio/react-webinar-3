import { memo, useCallback, useEffect } from 'react';

import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import Footer from '../../components/footer';
import Actions from '../../components/actions';
import Navigation from '../../components/navigation';

import { LANGUAGES } from '../../lang/languages.js';
import { PAGE_PATH } from '../../constants/index.js';

function Main(callback, deps) {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.currentLang,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Смена языка интерфейса
    switchLang: useCallback(() => store.actions.language.switchLanguage(), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} itemPageLink={`${PAGE_PATH.PRODUCT_PAGE}${item._id}`} onAdd={callbacks.addToBasket} lang={select.lang} />;
      },
      [callbacks.addToBasket, select.lang],
    ),
  };

  return (
    <PageLayout>
      <Head
        title={LANGUAGES[select.lang].store}
        onChangeLang={callbacks.switchLang}
        currentLang={select.lang}
      />
      <Actions>
        <Navigation title={LANGUAGES[select.lang].main} />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          lang={select.lang}
        />
      </Actions>
      <List list={select.list} renderItem={renders.item} />
      <Footer />
    </PageLayout>
  );
}

export default memo(Main);
