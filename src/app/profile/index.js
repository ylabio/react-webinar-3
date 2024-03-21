import { memo, useCallback, useEffect, useMemo } from 'react';
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
import ProfileCard from '../../components/profile-card';
import UserBar from '../../components/user-bar';

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Profile() {
  const store = useStore();
  // Параметры из пути /articles/:id

  useEffect(() => {
    async function getUser() {
      await store.actions.user.getUserInfo();
    };
    getUser()
  }, [])

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    user: state.user.info,
    token: state.auth.token,
    isAuth: state.auth.isAuth,
  }));

  const { t } = useTranslate();

  return (<PageLayout>
    <UserBar />
    <Head title={t("Shop")}>
      <LocaleSelect />
    </Head>
    <Navigation />
    <Spinner active={select.waiting}>
      <ProfileCard user={select.user} title={"Профиль"} />
    </Spinner>
  </PageLayout>
  );
}

export default memo(Profile);
