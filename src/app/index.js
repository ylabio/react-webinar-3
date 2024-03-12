import useSelector from "../store/use-selector";
import { useParams, useSearchParams } from "react-router-dom";
import Basket from "./basket";
import Main from "./main";
import Item from "./item";

/**
 * Приложение
 * @returns {React.ReactElement}
 */

function App() {
  const activeModal = useSelector((state) => state.modals.name);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  return (
    <>
      {!id && <Main />}
      {!page && id && <Item />}
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
