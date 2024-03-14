import {useCallback, useContext, useEffect, useState} from 'react';
import { Routes, Route, useLocation, useNavigate, useParams, Navigate } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import ArticlePage from "./article-page";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import PageLayout from "../components/page-layout";
import Head from "../components/head";
import BasketTool from "../components/basket-tool";
import LocaleMatch from "../components/locale-match";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  // const activeModal = useSelector(state => state.modals.name);
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();

  const store = useStore();

  const onCartOpen = () => {
    const navigatePath = location.pathname === '/' ? '/cart' : location.pathname + '/cart';
    navigate(navigatePath, {
      state: { background: location }
    })
  }
  
  const onCartClose = () => {
    navigate(-1);
  };

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.article.item,
    currentLanguage: state.localization.currentLanguage,
    uiElements: state.localization.uiElements,
  }));

  const getPageTitle = useCallback((location) => {
    if (location.pathname.includes("articles")) {
      return select.item?.title;
    }
    return select.uiElements.mainTitle[select.currentLanguage];
  }, [select.item, select.currentLanguage, select.uiElements]);

  return (
    <>
      <PageLayout>
        <Head title={getPageTitle(location)} />
          <BasketTool onOpen={onCartOpen} amount={select.amount}
                      sum={select.sum}/>
          <Routes location={background || location}>
            <Route 
              path="/" 
              element={<LocaleMatch 
                element={<Navigate to="/pages/1" />} 
              />} 
            />
            <Route 
              path="/pages/:page" 
              element={<LocaleMatch 
                element={<Main />} 
              />} 
            />
            <Route 
              path="/articles/:id"
              element={<LocaleMatch 
                element={<ArticlePage />} 
              />} 
            />
          </Routes>
      </PageLayout>  
      {background && (
        <Routes>
          <Route 
            path="/articles/:id?/:lang?/cart"
            element={<Basket onClose={onCartClose} />}
          />
          <Route 
            path="/pages/:page?/:lang?/cart"
            element={<Basket onClose={onCartClose} />}
          />
          <Route 
            path="/:lang?/cart"
            element={<Basket onClose={onCartClose} />}
          />
        </Routes>
      )}
    </>
  );
}

export default App;
