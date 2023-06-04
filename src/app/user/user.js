import { memo } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import TopHead from "../../components/top-head";
import AuthLink from "../../components/auth-link";
import { useNavigate, useParams } from "react-router-dom";
import UserInfo from "../../components/user-info";
import useInit from "../../hooks/use-init";

function User() {
  const store = useStore();
  const navigate = useNavigate();
  const params = useParams();
  const select = useSelector((state) => ({
    article: state.article.data,
    wait: state.auth.wait,
    user: state.auth.user,
  }));

  useInit(() => {
    if (select.user === null) {
      store.actions.auth.getUserToken();
      navigate("/auth");
    }
  }, [params.name]);

  return (
    <PageLayout>
      <TopHead>
        <AuthLink user={select.user} />
      </TopHead>
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <UserInfo user={select.user} />
    </PageLayout>
  );
}

export default memo(User);
