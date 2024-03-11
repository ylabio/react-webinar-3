import {useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import {LangContext} from "../store/use-lang-context";

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

      <Main/>
      {activeModal === 'basket' && <Basket/>}
    </LangContextProvider>
  );
}

export default App;
