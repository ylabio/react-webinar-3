import {memo} from 'react';
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import Login from '../../containers/login';
import ProfileCard from '../../components/profile-card';
import Spinner from '../../components/spinner';
import { useNavigate } from 'react-router-dom';

/**
 * Страница профиля пользователя
 */
function Profile() {

	const navigate = useNavigate();

	const select = useSelector(state => ({
    user: state.user.data,
    waiting: state.user.waiting,
  }));

	useInit(() => {
		if (!select.user.username) {
			navigate('/login');
			return null;
		}
  }, [select.user.username, navigate])

  const {t} = useTranslate();

  return (
    <PageLayout>
      <Login />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
      	<ProfileCard user={select.user} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
