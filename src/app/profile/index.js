import { memo, useCallback, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "../../components/page-layout";
import HeadProfile from "../../components/head-profile";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import ProfileCard from "../../components/profile-card";
import useInit from "../../hooks/use-init";

function Profile() {

  const store = useStore();

  const navigate = useNavigate();

  useInit(() => {
    store.actions.login.initParams();
  }, [], true);

  const select = useSelector(state => ({
    name: state.login.name,
    phone: state.login.phone,
    email: state.login.email,
    authorized: state.login.authorized
  }));

  useEffect(() => {
    if (!select.authorized) {
     return navigate('/login')
   }
  }, [select.authorized])

  const callbacks = {
    onLogOut: useCallback(() => store.actions.login.logOut()),
  }

  const {t} = useTranslate();

  return (
    <PageLayout>
      <HeadProfile onClick={callbacks.onLogOut}
        title={t('login.exit')}>
        {select.authorized && <Link to='/profile'>{select.name}</Link>}
      </HeadProfile>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileCard t={t} name={select.name} phone={select.phone} email={select.email}/>
    </PageLayout>
  )
}

export default memo(Profile)
