import {memo, useCallback, useEffect} from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function NotFound() {
  return (
    <PageLayout>
      <h2>Not Found Error 404</h2>
    </PageLayout>
  );
}

export default memo(NotFound);
