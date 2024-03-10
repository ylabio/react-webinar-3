import {memo, useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from "../../components/basket-tool";
import Detailizer from '../../components/detailizer';
import Preloader from '../../components/preloader';
import Error from '../../components/error';
import WithModal from '../../components/with-modal';

function Article() {
  const store = useStore();
  const { articleId } = useParams();

  useEffect(
    () => {
      store.actions.articles.getArticle(articleId);
    },
    [articleId]
  );

  const select = useSelector(state => ({
    activeModal: state.modals.name,
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
    addToBasket: useCallback(() => store.actions.basket.addToBasket(articleId, select.article.title, select.article.price), [store, select.article]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Перевод текста
    translate: useCallback(text => store.actions.translator.translate(text), [store, select.locale]),
    // Выбор локали
    setLocale: useCallback(locale => store.actions.translator.setLocale(locale), [store]),
  }
  console.log('Article');

  return (
    <WithModal activeModal={select.activeModal}>
      <PageLayout>
        <Head
          title={select.article ? select.article.title : ''}
          locales={select.locales}
          locale={select.locale}
          setLocale={callbacks.setLocale}/>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          page={select.page}
          translate={callbacks.translate}/>
        { select.isFetching && <Preloader/> }
        { !select.isFetching && select.isSuccess &&
          <Detailizer
            article={select.article}
            onAdd={callbacks.addToBasket}
            translate={callbacks.translate}/>
        }
        { !select.isFetching && !select.isSuccess &&
          <Error
            message={callbacks.translate('failed to fetch data')}
            btnRetryTitle={callbacks.translate('try again')}
            onRetry={() => callbacks.getArticle(articleId)}/>
        }
      </PageLayout>
    </WithModal>
  );
}

export default memo(Article);