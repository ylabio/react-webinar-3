import Product from "../app/product";
import Basket from "../app/basket";
import useSelector from "../store/use-selector";

function ProductPage() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Product/>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default ProductPage