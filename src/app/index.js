import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/hooks/use-selector";
import { Route, Routes } from "react-router-dom";
import ItemInfo from "./item-info";
import useTranslate from "../hooks/use-translate";

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
        <Route path="page">
          <Route path=":pageNumber" element={<Main />} />
        </Route>
        <Route path="item">
          <Route path=":itemId" element={<ItemInfo />} />
        </Route>
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
