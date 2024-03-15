import {memo, useCallback, useMemo} from 'react';
import {useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import ProfileBody from '../../components/profile-body';

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Profile() {
  const store = useStore();

  useInit(() => {
    store.actions.profile.load();
  }, []);

  const select = useSelector(state => ({
    waiting: state.profile.waiting,
  }));


  return (
    <PageLayout>
      <Head title={'Магазин'}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ProfileBody/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
