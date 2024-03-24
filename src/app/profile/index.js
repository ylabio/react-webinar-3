import { memo, useCallback, useEffect } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import Authorization from "../../containers/authorization";
import ProfileCard from "../../components/profile-card";
import Spinner from "../../components/spinner";

/**
 * Страница профиля
 */
function Profile() {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    name: state.user.name,
    email: state.user.email,
    phone: state.user.phone,
    waiting: state.user.waiting,
  }));

  useEffect(() => {
    store.actions.user.getSelf();
  }, [store]);

  return (
    <PageLayout>
      <Authorization />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard
          name={select.name}
          email={select.email}
          phone={select.phone}
          t={t}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
