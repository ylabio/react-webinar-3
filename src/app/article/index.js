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
    isFetchingArticle: state.articles.isFetching,
    isSuccessArticle: state.articles.isSuccess,
    amount: state.basket.amount,
    sum: state.basket.sum,
    isFetchingPrice: state.basket.isFetching,
    isSuccessPrice: state.basket.isSuccess,
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
        translate={callbacks.translate}>
          <Link to={`/?page=${(select.page)}`}>{callbacks.translate('main page')}</Link>
      </BasketTool>
      { select.isFetchingArticle && <Preloader/> }
      { !select.isFetchingArticle && select.isSuccessArticle &&
        <Detailizer
          article={select.article}
          isEnabled={!select.isFetchingPrice}
          onAdd={callbacks.addToBasket}
          translate={callbacks.translate}/>
      }
      { !select.isFetchingArticle && !select.isSuccessArticle &&
        <Error
          message={callbacks.translate('failed to fetch data')}
          btnRetryTitle={callbacks.translate('try again')}
          onRetry={() => callbacks.getArticle(articleId)}/>
      }
    </PageLayout>
  );
}

export default memo(Arcticle);