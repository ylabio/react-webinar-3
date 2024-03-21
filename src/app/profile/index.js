import { memo, useCallback, useEffect, useMemo } from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import ProfileCard from '../../components/profile-card';
import UserBar from '../../components/user-bar';


function Profile() {
  const store = useStore();
  const { t } = useTranslate();

  useEffect(() => {
    async function getUser() {
      await store.actions.user.getUserInfo();
    };
    getUser()
  }, [])

  const select = useSelector(state => ({
    waiting: state.article.waiting,
    user: state.user.info,
  }));



  return (<PageLayout>
    <UserBar />
    <Head title={t("title")}>
      <LocaleSelect />
    </Head>
    <Navigation />
    <Spinner active={select.waiting}>
      <ProfileCard user={select.user} title={t("profile.title")}
        name={t("profile.name")} phone={t("profile.phone")} />
    </Spinner>
  </PageLayout>
  );
}

export default memo(Profile);
