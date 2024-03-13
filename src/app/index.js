import {useState} from 'react';
import { Route, Routes} from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import {LangContext} from "../store/use-lang-context";
import PageNotFound from "../components/page-not-found";
import ItemDetails from "./item-details";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const [language, setLanguage] = useState('Ru');
  const activeModal = useSelector(state => state.modals.name);
  const LangContextProvider = LangContext.Provider;

  const switchLanguage = (language) => {
    setLanguage(language);
  };

  return (
    <LangContextProvider value={{
      language,
      setLanguage: switchLanguage,
    }}>
      {activeModal === 'basket' && <Basket/>}
      <Routes>
          <Route path="/*" element={<Main/>}/>
          <Route path="/:id" element={<ItemDetails/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    </LangContextProvider>
  );
}

export default App;
