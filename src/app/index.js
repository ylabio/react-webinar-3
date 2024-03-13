import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import { Route, Routes } from "react-router-dom";
import ItemInfo from "./item-info";
import { Suspense } from "react";
import PageLayout from "../components/page-layout";
import Loader from "../components/loader";

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
          <Route
            path=":itemId"
            element={
              <Suspense fallback={<Loader />}>
                <ItemInfo />
              </Suspense>
            }
          ></Route>
        </Route>
      </Routes>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
