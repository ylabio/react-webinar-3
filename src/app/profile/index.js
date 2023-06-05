import PageLayout from "../../components/page-layout";
import HeaderMain from "../../containers/header-main";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import {memo} from "react";
import useTranslate from "../../hooks/use-translate";
import ProfileDetails from "../../components/profile-details";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";
import Spinner from "../../components/spinner";

function Profile(props) {

  const store = useStore();

  const {t} = useTranslate();

  const select = useSelector(state => ({
    profile: {
      name: state.profile.data?.profile?.name,
      email: state.profile.data?.email,
      phone: state.profile.data?.profile?.phone
    },
    waiting: state.profile.waiting
  }));

  useInit( () => {
    store.actions.profile.load();
  })

  return (
    <PageLayout>
      <HeaderMain />
        <Head title={t('title')}>
          <LocaleSelect />
        </Head>
        <Navigation/>
        <Spinner active={select.waiting}>
          <ProfileDetails data={select.profile} />
        </Spinner>
    </PageLayout>
  )
}

export default memo(Profile);