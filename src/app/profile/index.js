import { memo } from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";

const Profile = () => {

  const select = useSelector(state => ({
    user: state.article.data,
    waiting: state.article.waiting,
  }));
  
  const {t} = useTranslate();

  return (
  <PageLayout>
    <Head title={t('title')} />
    <div>
      <h3>Профиль</h3>
      <p>Телефон: {select.user?.profile?.phone}</p>
      <p>email: {select.user?.email}</p>
    </div>
  </PageLayout>
  );
}

export default memo(Profile);