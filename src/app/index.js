import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";

function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Main/>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
