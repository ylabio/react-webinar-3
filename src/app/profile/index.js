import React, { memo, useMemo } from "react";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import useTranslate from "../../hooks/use-translate";
import UserAuthPortal from "../../containers/user-auth-portal";
import ProfileInfo from "../../components/profile-info";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Spinner from "../../components/spinner";

function Profile() {
  const { t, lang } = useTranslate();
  const store = useStore();
  const select = useSelector((state) => ({
    profile: state.profile,
    user: state.user.data,
  }));

  useInit(() => {
    if (select.user) {
      store.actions.profile.setProfile(select.user._id);
    }
  }, [select.user]);

  // на случай если токен есть,но стал не валидным
  useInit(() => {
    if (select.profile.error) {
      store.actions.user.authMe();
    }
  }, [select.profile.error]);

  const data = useMemo(
    () => [
      {
        label: t("profile.name"),
        value: select.profile.data ? select.profile.data.profile.name : "",
      },
      {
        label: t("profile.phone"),
        value: select.profile.data ? select.profile.data.profile.phone : "",
      },
      {
        label: t("profile.email"),
        value: select.profile.data ? select.profile.data.email : "",
      },
    ],
    [lang, select.profile]
  );

  return (
    <PageLayout>
      <UserAuthPortal />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={!select.profile.data}>
        <ProfileInfo title={t("profile.title")} data={data} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
