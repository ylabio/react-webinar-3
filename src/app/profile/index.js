import React from "react";
import Head from "../../components/head";
import PageLayout from "../../components/layouts/page-layout";
import ProfileForm from "../../components/profile-form";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import LoginBar from "../../containers/login-bar";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import useUser from "../../hooks/use-user";

/**
 * Страница профиля. через хук делаем проверку и тянем поля, как если бы был юсе-селектор с пачкой ифов
 */

function Profile() {
  const { t } = useTranslate();
  const { waiting, fields, misc } = useUser({ orRedirectTo: '/login' }); // misc пока не используется

  return (
    <PageLayout>
      <LoginBar />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={waiting}>
        {fields ? <ProfileForm fields={fields} t={t} /> : null} {/* при ф5 так лучше */}
      </Spinner>
    </PageLayout >
  )
};

export default React.memo(Profile);