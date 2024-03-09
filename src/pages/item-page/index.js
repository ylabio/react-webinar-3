import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import ItemInfo from "../../components/item-info";
import Basket from "../../app/basket";
import useSelector from "../../store/use-selector";
import { getItemInfo } from './getItemInfo';
import ErrorPage from '../error-page';

function ItemPage() {

  const { item } = useLoaderData()

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Await errorElement={<ErrorPage />} resolve={item}>
          <ItemInfo item={item} />
          {activeModal === 'basket' && <Basket/>}
        </Await>
      </Suspense>
      
    </>
  );
}

export default ItemPage;

export const itemLoader = async ({ params }) => {
  const item = getItemInfo(params.itemId);

  return defer({ item });
};
