import {memo} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import { Link } from 'react-router-dom';

function ErrorPage() {

  return (
    <PageLayout>
      <Head title='Страница ошибки'/>
      <div>Произошла ошибка</div>
      <Link to="/">вернуться на главную страницу сайта</Link>
    </PageLayout>

  );
}

export default memo(ErrorPage);
