import { memo, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import ProfileLayout from "../../components/profile-layout";
import SideLayout from "../../components/side-layout";
import AuthPanelControl from "../../containers/auth-panel-control";
import Spinner from "../../components/spinner";
function Profile() {
  const store = useStore();

  const params = useParams();

  const select = useSelector((state) => ({
    user: state.profile.user,
    waiting: state.profile.waiting,
    token: state.authentication.token,
  }));

  useEffect(() => {
    store.actions.profile.loadUser(select.token);
  }, []);

  const { t } = useTranslate();

  console.log(select.user);

  return (
    <PageLayout>
      <SideLayout side="end" padding="medium">
        <AuthPanelControl />
      </SideLayout>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileLayout user={select.user} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
