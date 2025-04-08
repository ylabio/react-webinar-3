import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ArticleContent from '../../components/article-content';
import Controls from '../../components/controls';
import { useTranslation } from '../../i18n/language-context';

function Article() {
  const store = useStore();
  const { id } = useParams();
  const { t, language } = useTranslation();

  useEffect(() => {
    store.actions.article.getArticleById(id, language);
    store.actions.modals.open(null);
  }, [id, language]);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    article: state.article.article,
    activeModal: state.modals.name,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout>
      <Head title={t('ProductName')} />
      <Controls
        openModalBasket={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        t={t}
      />
      <ArticleContent article={select.article} addToBasket={callbacks.addToBasket} t={t} />
    </PageLayout>
  );
}

export default memo(Article);
