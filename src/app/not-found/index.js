import './style.css';
import { memo } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import { Link } from "react-router";

function NotFound() {
  return (
    <PageLayout>
      <Head title="Ничего не найдено"></Head>
      <Link to="/">
        <button className="not-found-button">
          На главную
        </button>
      </Link>
    </PageLayout>
  )
}

export default memo(NotFound);
