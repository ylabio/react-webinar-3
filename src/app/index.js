import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../components/not-found-page";
import Articles from "./articles";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/:page?" element={<Main />} />
        <Route path="articles/:id" element={<Articles />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
