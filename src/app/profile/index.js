import { memo } from "react";
import ProfileCard from "../../components/profile-card";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import LoginControl from "../../containers/login-control";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner";
import useInit from "../../hooks/use-init";
import useSession from "../../hooks/use-session";

function Profile() {
  const { t } = useTranslate();

  const session = useSession();

  return (
    <PageLayout>
      <LoginControl />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={session.waiting}>
        <ProfileCard
          name={session.user.name}
          phoneNumber={session.user.phoneNumber}
          email={session.user.email}
          t={t}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
