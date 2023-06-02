import {memo, useCallback, useMemo} from 'react';
import {useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import HeadPage from "../../components/head-page"
import User from "../../components/user"

function UserPage() {
  const store = useStore();

  const params = useParams();

//   useInit(() => {
//     store.actions.article.load(params.id);
//   }, [params.id]);


  return (
    <PageLayout head={<HeadPage/>}>
      <Head title='Магазин'>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <User/>
    </PageLayout>
  );
}

export default memo(UserPage);