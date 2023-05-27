import {memo} from 'react';
import { Link } from 'react-router-dom';
import {cn as bem} from "@bem-react/classname";
import PageLayout from "../../../components/page-layout";
import Head from "../../../components/head";
import './style.css';


function NotFound() {

  const cn = bem('NotFound');

  return (
    <PageLayout>
      <Head title='404 страница не найдена'/>
      <div className={cn('text')}>
        Этой станицы не существует. Вернуться на 
        <Link className={cn('link')} to="/">главную</Link>
      </div>
    </PageLayout>
  );
}

export default memo(NotFound);
