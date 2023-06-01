import { memo } from "react";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import LoginMenu from "../../containers/login-menu";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";

function Main() {
  const { t } = useTranslate();

  return (
    <PageLayout>
      <LoginMenu />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
