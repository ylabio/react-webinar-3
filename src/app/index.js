import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import {Spinner} from "./Spinner/Spinner";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Spinner />
      <Main/>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
