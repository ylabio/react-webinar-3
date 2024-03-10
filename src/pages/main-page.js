import useSelector from "../store/use-selector";
import Main from "../app/main";
import Basket from "../app/basket";

function MainPage() {


  const activeModal = useSelector(state => state.modals.name);


  return (
    <>
      <Main/>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}
export default MainPage