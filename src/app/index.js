import Basket from "./basket";
import useSelector from "../store/use-selector";
import Main from "./main";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return <>{activeModal === "basket" && <Basket />}</>;
}

export default App;
