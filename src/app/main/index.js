import { memo } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useSelector from '../../store/use-selector';
import Basket from "../basket";
import Catalog from "../catalog";

function Main() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool />
      <Catalog />
      {activeModal === 'basket' && <Basket />}
    </PageLayout>
  );
}

export default memo(Main);
