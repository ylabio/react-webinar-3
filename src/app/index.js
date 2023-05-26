import Main from "./main";
import ItemPage from "./item-page";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import { Route, Routes } from "react-router-dom";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/item/:itemId" element={<ItemPage />} />
      </Routes>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
