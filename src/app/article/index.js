import { memo, useCallback, useContext, useEffect } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ArticlePage from '../../components/article-page';
import PreloadWrapper from '../../components/preload-wrapper';
import { localeContext } from '../../store/locale-context';
import { useLocale } from '../../store/use-locale';

function Article() {

  const store = useStore();
  const article_id = new URLSearchParams(location.search).get('id')
  const {locale, changeLocale} = useContext(localeContext)
  const localeDict = useLocale()
  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    article: state.article.data,
    isLoad: state.article.isLoad
  }));
  useEffect(() => {
    store.actions.article.loadArticle(article_id);
    callbacks.closeModal()
  }, [article_id])
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }
  const renders = {
    head: useCallback(() => {
      return <Head title={select.article.title} changeLocale={changeLocale}/>
    }, [select.article.title]),
  };
  return (
    <PageLayout localeDict={localeDict} head={renders.head()} onOpen={callbacks.openModalBasket} amount={select.amount}
      sum={select.sum}>
      <PreloadWrapper isLoad={select.isLoad}>
        <ArticlePage article={select.article} addToBasket={callbacks.addToBasket} localeDict={localeDict}/>
      </PreloadWrapper>
    </PageLayout>
  );
}

export default memo(Article);
