import {memo, useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from "../../components/basket-tool";
import Detailizer from '../../components/detailizer';
import LocaleSwitcher from '../../components/locale-switcher';

function Arcticle() {
  const store = useStore();
  const { articleId } = useParams();

  useEffect(
    () => {
      callbacks.getArticle(articleId);
    },
    [articleId]
  );

  const select = useSelector(state => ({
    article: state.articles.article,
    amount: state.basket.amount,
    sum: state.basket.sum,
    page: state.catalog.page,
    locales: state.translator.locales,
    locale: state.translator.locale,
  }));

  const callbacks = {
    // Запрос данных о товаре
    getArticle: useCallback(articleId => store.actions.articles.getArticle(articleId), [store]),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Перевод текста
    translate: useCallback(text => store.actions.translator.translate(text), [store, select.locale]),
    // Выбор локали
    setLocale: useCallback(locale => store.actions.translator.setLocale(locale), [store]),
  }
  
  return (
    <PageLayout>
      <Head title={select.article ? select.article.title : ''}>
        <LocaleSwitcher
          locales={select.locales}
          locale={select.locale}
          setLocale={callbacks.setLocale}/>
      </Head>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        link={{title: callbacks.translate('main page'), url: `/?page=${(select.page)}`}}
        translate={callbacks.translate}/>
      {select.article &&
        <Detailizer
          article={select.article}
          onAdd={callbacks.addToBasket}
          translate={callbacks.translate}/>
      }
    </PageLayout>
  );
}

export default memo(Arcticle);