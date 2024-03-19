import { memo } from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from '../../hooks/use-init';
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import TopMenu from '../../containers/top-menu';
import ProfileDescription from '../../components/profile-description';

function Profile() {
  const store = useStore()

  const select = useSelector(state => ({
    profile: state.profile.data,
    waiting: state.profile.waiting
  }));

  useInit(() => {
    store.actions.profile.load();
  }, []);

  return (
    <PageLayout>
      <TopMenu />
      <Head title='Магазин'>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileDescription user={select.profile} />
    </PageLayout>
  );
}

export default memo(Profile);