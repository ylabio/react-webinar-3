import { memo, useCallback, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import Auth from "../../containers/auth-tool";

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Article() {
  const store = useStore();

  // Параметры из пути /articles/:id
  const params = useParams();

  const { t, lang, setLang } = useTranslate();

  useInit(
    () => {
      store.actions.article.initParams(params.id, { lang });
    },
    [params.id, lang],
    true
  );

  const select = useSelector((state) => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),

    setLang: useCallback(
      (lang) => {
        store.actions.catalog.setParams({ lang });
        setLang(lang);
      },
      [store, lang]
    ),
  };

  return (
    <PageLayout head={<Auth />}>
      <Head title={select.article.title}>
        <LocaleSelect onChange={callbacks.setLang} value={lang} />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard
          article={select.article}
          onAdd={callbacks.addToBasket}
          t={t}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
