import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import Spinner from "../components/spinner/spinner";
import MainPage from "./main-page";
import ProductPage from "./product-page";
import Error404Page from "./error-404-page";
import {Route, Routes} from "react-router-dom";
import {useCallback} from "react";
import {makeGetRoutePath} from "../utils";

export const appRouterConfig = [
  {id: 1, path: '/', name: 'main', component: MainPage},
  {id: 2, path: '/product/:id', name: 'product', component: ProductPage},
  {id: '*', path: '*', name: 'error404', component: Error404Page},
];

export const getRoutePath = makeGetRoutePath(appRouterConfig);

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {


  const select = useSelector(state => ({
    isLoading: state.catalog.isLoading || state.basket.isLoading || state.product.isLoading,
    activeModal: state.modals.name,
  }));

  const renders = {
    router: useCallback(() => {
      return (
        <Routes>
          {appRouterConfig.map(route => (
            <Route
              key={route.id}
              path={route.path}
              element={<route.component/>}
            />
          ))}
        </Routes>
      )
    }, []),
  };

  return (
    <>
      {select.isLoading && <Spinner/>}
      <Main renderRouter={renders.router}/>
      {select.activeModal === 'basket' && <Basket/>}
    </>
  );
}


export default App;
