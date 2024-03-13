import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import { Route, Routes } from "react-router-dom";
import ItemInfo from "./item-info";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="item">
          <Route path=":itemId" element={<ItemInfo />} />
        </Route>
      </Routes>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
