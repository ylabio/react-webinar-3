import useSelector from "../store/use-selector";
import AppRoutes from "./AppRoutes";
import Basket from "./basket";
import "./lib/global.css";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <AppRoutes />
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
