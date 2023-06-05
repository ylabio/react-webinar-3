import { memo, useCallback } from "react";
import { useParams } from "react-router-dom";
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
import LoginButton from "../../components/login-button";

function Article() {
  const store = useStore();

  const userState = useSelector((state) => state.user);
  const token = userState.token;
  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(() => {
    store.actions.article.load(params.id);
    if (token) {
      store.actions.profile.loadData(token);
    }
  }, [params.id, token, store.actions.profile]);

  const select = useSelector((state) => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }));

  const user = useSelector((state) => state.profile.user);
  const profile = { ...user.profile };
  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Выход из профиля
    exit: useCallback(() => {
      store.actions.user.signOut();
      localStorage.clear();
    }, [store]),
  };

  return (
    <PageLayout
      head={<LoginButton text={profile.name} onExit={callbacks.exit} />}
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
