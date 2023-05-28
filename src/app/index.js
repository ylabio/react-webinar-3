import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import {Route, Routes} from "react-router-dom";
import Article from "./article";
import {LanguageContext} from "../store/context";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
  const activeLanguage = useSelector(state => state.language.activeLanguage)

  return (
    <LanguageContext.Provider value={activeLanguage}>
      <Routes>
        <Route path={'/'} element={<Main/>}/>
        <Route path={'articles/:articleId'} element={<Article/>}/>
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </LanguageContext.Provider>
  );
}

export default App;
