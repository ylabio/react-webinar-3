import { memo } from "react";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import useSelector from "../../hooks/use-selector";
import UserCard from "../../components/user-card";
import Spinner from "../../components/spinner";
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';
import { useNavigate } from 'react-router-dom';

/**
 * СТраница профиля
 */
function Profile() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    userInfo: state.profile.userInfo,
    waiting: state.profile.waiting,
    token: state.auth.token,
  }));

  useInit(() => {
    if (!select.token) {
      navigate('/login');
    }
    store.actions.profile.loadUser();
  }, []);


  if (!select.token) {
    return null;
  }

  const { t } = useTranslate();

  return (
    <>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <UserCard userInfo={select.userInfo} t={t} />
      </Spinner>
    </>
  );
}

export default memo(Profile);
