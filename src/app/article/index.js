import {memo, useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from "../../components/basket-tool";
import Detailizer from '../../components/detailizer';
import LocaleSwitcher from '../../components/locale-switcher';
import Preloader from '../../components/preloader';
import Error from '../../components/error';
import {Link} from 'react-router-dom';

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
    isFetching: state.articles.isFetching,
    isSuccess: state.articles.isSuccess,
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
    addToBasket: useCallback((_id, title, price) => store.actions.basket.addToBasket(_id, title, price), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Перевод текста
    translate: useCallback(text => store.actions.translator.translate(text), [store, select.locale]),
    // Выбор локали
    setLocale: useCallback(locale => store.actions.translator.setLocale(locale), [store]),
  }

  const addToBasket = () => {
    callbacks.addToBasket(articleId, select.article.title, select.article.price);
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
        translate={callbacks.translate}>
          <Link to={`/?page=${(select.page)}`}>{callbacks.translate('main page')}</Link>
      </BasketTool>
      { select.isFetching && <Preloader/> }
      { !select.isFetching && select.isSuccess &&
        <Detailizer
          article={select.article}
          onAdd={addToBasket}
          translate={callbacks.translate}/>
      }
      { !select.isFetching && !select.isSuccess &&
        <Error
          message={callbacks.translate('failed to fetch data')}
          btnRetryTitle={callbacks.translate('try again')}
          onRetry={() => callbacks.getArticle(articleId)}/>
      }
    </PageLayout>
  );
}

export default memo(Arcticle);