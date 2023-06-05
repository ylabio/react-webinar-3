import React from "react";
import Head from "../../components/head";
import PageLayout from "../../components/layouts/page-layout";
import ProfileForm from "../../components/profile-form";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import LoginBar from "../../containers/login-bar";
import Navigation from "../../containers/navigation";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

/**
 * Страница профиля.
 */

function Profile() {
  const { t } = useTranslate();
  const store = useStore();

  useInit(async () => {
    await store.actions.profile.load();
  }, []);

  const { fields, waiting } = useSelector(state => ({
    fields: state.profile.fields,
    waiting: state.profile.waiting,
  }));

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