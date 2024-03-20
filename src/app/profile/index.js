import { memo } from "react";
import { useNavigate } from "react-router-dom";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import ProfileCard from "../../components/profile-card";
import Spinner from "../../components/spinner";
import AuthControl from "../../containers/auth-control";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

function Profile() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    token: state.session.token,
    data: state.user.data,
    waiting: state.user.waiting,
  }));

  useInit(() => {
    if (!select.token) navigate("/login");
    else {
      store.actions.user.load(select.token);
    }
  }, [select.token, store]);

  const { t } = useTranslate();

  return (
    <PageLayout>
      <AuthControl />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard user={select.data} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
