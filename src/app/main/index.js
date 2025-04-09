import { memo } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Catalog from "../catalog";
import MainMenu from "../../components/main-menu";

function Main() {

  return (
    <PageLayout>
      <Head title="Магазин" />
      <MainMenu />
      <Catalog />
    </PageLayout>
  );
}

export default memo(Main);
