import React, { memo, useMemo } from "react";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";

import PageLayout from "../../components/page-layout";
import useTranslate from "../../hooks/use-translate";
import UserAuthPortal from "../../containers/user-auth-portal";
import ProfileInfo from "../../components/profile-info";
import useAuth from "../../hooks/use-auth";

function Profile() {
  const { t, lang } = useTranslate();
  const { user } = useAuth();

  const data = useMemo(
    () => [
      {
        label: t("profile.name"),
        value: user.data ? user.data.profile.name : "",
      },
      {
        label: t("profile.phone"),
        value: user.data ? user.data.profile.phone : "",
      },
      { label: t("profile.email"), value: user.data ? user.data.email : "" },
    ],
    [lang]
  );
  return (
    <PageLayout>
      <UserAuthPortal />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileInfo title={t("profile.title")} data={data} />
    </PageLayout>
  );
}

export default memo(Profile);
