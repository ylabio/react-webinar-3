import { Routes, Route } from "react-router-dom";

import Main from "./main";
import ItemPage from "./itemPage";
import Basket from "./basket";
import useSelector from "../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/articles/:id" element={<ItemPage />} />
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
