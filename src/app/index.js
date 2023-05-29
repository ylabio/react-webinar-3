import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import {Route, Routes} from "react-router-dom";
import ItemInfo from "./iteminfo";
import useStore from "../store/use-store";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const store = useStore();
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main store={store}/>}/>
        <Route path="/item-info/:id" element={<ItemInfo store={store} />}/>
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
