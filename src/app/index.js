import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import {Route, Routes} from "react-router";
import PageDetail from "./page-detail";
import LanguageProvider from "../language-provider.js";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" exact element={<Main/>} />
        <Route path=':id' element={<PageDetail />} />
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </LanguageProvider >
  );
}

export default App;
