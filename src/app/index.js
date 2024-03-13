import Main from "./main";
import Basket from "./basket";
import ItemPage from "./item-page";
import useSelector from "../store/use-selector";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {getLocale} from "../utils";
import {useState, useEffect} from "react";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const [lang, setLang] = useState('ru');

  useEffect(() => {
    const result = getLocale();
    result && setLang(result);
  }, [])

  const activeModal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main lang={lang} setLang={setLang}/>} />
        <Route path='/item/*' element={<ItemPage lang={lang}/>} />
      </Routes>
      {activeModal === 'basket' && <Basket lang={lang}/>}
    </BrowserRouter>
  );
}

export default App;
