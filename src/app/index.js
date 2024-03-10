import {useCallback, useContext, useEffect, useState} from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import ArticleInfo from "../components/article-info";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  // const activeModal = useSelector(state => state.modals.name);
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();
  const onClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Main />} />
        <Route path="/articles/:id" element={<ArticleInfo />} />
      </Routes>
      {background && (
        <Routes>
          <Route 
            path="/cart"
            // element={activeModal === 'basket' && <Basket/>}
            element={<Basket onClose={onClose} />}
          />
        </Routes>
      )}
    </>
  );
}

export default App;
