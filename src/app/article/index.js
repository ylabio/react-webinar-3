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
import SideLayout from "../../components/side-layout";
import Button from "../../components/Button";

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Article() {
  const store = useStore();

  // Параметры из пути /articles/:id
  const params = useParams();

  const { t, lang } = useTranslate();

  useInit(() => {
    store.actions.article.load(params.id, lang);
  }, [params.id, lang]);

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
  };

  return (
    <PageLayout
      head={
        <SideLayout side="end" padding="10x20">
          <Button label={t("login")} />
        </SideLayout>
      }
    >
      <Head title={select.article.title}>
        <LocaleSelect />
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
