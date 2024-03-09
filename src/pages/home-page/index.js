import Main from "../../app/main";
import Basket from "../../app/basket";
import useSelector from "../../store/use-selector";

function HomePage() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Main/>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default HomePage;
