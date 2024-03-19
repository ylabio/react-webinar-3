import {memo, useCallback} from "react"
import {Link} from "react-router-dom";
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
import PageAccess from "../../containers/page-access";

function Profile() {

  const store = useStore();

  useInit(() => {
    store.actions.login.initParams();
    store.actions.profile.initProfile();
  }, [], true);

  const select = useSelector(state => ({
    name: state.profile.name,
    phone: state.profile.phone,
    email: state.profile.email,
  }));

  const callbacks = {
    onLogOut: useCallback(() => store.actions.login.logOut()),
  }

  const {t} = useTranslate();

  return (
    <PageAccess redirect='/login' needAuthorization={true}>
      <PageLayout>
        <HeadProfile onClick={callbacks.onLogOut} title={t('login.exit')}>
          <Link to='/profile'>{select.name}</Link>
        </HeadProfile>
        <Head title={t('title')}>
          <LocaleSelect />
        </Head>
        <Navigation />
        <ProfileCard t={t} name={select.name} phone={select.phone} email={select.email} />
      </PageLayout>
    </PageAccess>
  )
}

export default memo(Profile)
