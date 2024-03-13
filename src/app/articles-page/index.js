import { memo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useParams } from 'react-router-dom';
import ItemDetails from '../../components/item-details';
import ErrorText from '../../components/error-text';
import { langText } from '../../constants/language';
import BreadCrumbs from '../../components/bread-crumbs';
import Row from '../../components/row';

function ArticlesPage({ language = 'ru' }) {
  const store = useStore();
  const { articleId } = useParams();

  useEffect(() => {
    store.actions.articles.getProductDetails(articleId, language);
    return () => {
      store.actions.articles.clearData();
    };
  }, [articleId, language]);

  const basket = useSelector(({ basket }) => ({
    amount: basket.amount,
    sum: basket.sum,
  }));

  const articles = useSelector(({ articles }) => ({
    ...articles.data,
    loading: articles.loading,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      _id => store.actions.basket.addToBasket(_id, language),
      [store, language],
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open('basket'),
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title={articles.title} language={language}/>
      <p>{}</p>
      <Row>
        <BreadCrumbs  path={'/'}>
          {langText.MAIN[language]}
        </BreadCrumbs>
        <BasketTool
          language={language}
          onOpen={callbacks.openModalBasket}
          amount={basket.amount}
          sum={basket.sum}
        />
      </Row>
      {articles.loading === 'success' && (
        <ItemDetails
          item={articles}
          onAdd={callbacks.addToBasket}
          language={language}
        />
      )}
      {articles.loading === 'failed' && (
        <ErrorText>{langText.FAILED_TO_LOAD[language]}</ErrorText>
      )}
    </PageLayout>
  );
}

ArticlesPage.propTypes = {
  language: PropTypes.string,
};

export default memo(ArticlesPage);
