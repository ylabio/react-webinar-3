import { memo } from "react";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import useSelector from "../../hooks/use-selector";
import AuthContainer from "../../containers/auth-container";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import ProfileCard from "../../components/profile-card";
import Spinner from "../../components/spinner";
import useInit from "../../hooks/use-init";
import { useNavigate } from "react-router-dom";

function Profile() {
    const {t} = useTranslate();
    const store = useStore();
    const navigate = useNavigate() 


    const select = useSelector(state => ({
        user: state.profile.user,
        waiting: state.profile.waiting,
        errorMessage: state.profile.errorMessage,
        token: state.authorization.token
      }));


    useInit(async () => {
        if (select.token) {
            await store.actions.profile.getUser(select.token);
        } else {
            navigate('/login')
        }
      }, [select.token]);
  
    return (
      <PageLayout>
        <AuthContainer />
        <Head title={t('title')}>
          <LocaleSelect />
        </Head>
        <Navigation />
        <Spinner active={select.waiting}>
          <ProfileCard title={t('profile.title')} user={select.user} name={t('profile.name')} phone={t('profile.phone')}/>
        </Spinner>
      </PageLayout>
    );
  }

  export default memo(Profile);