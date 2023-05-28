import {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import {
	createBrowserRouter,
	Link,
	Route,
	RouterProvider,
	Routes,
  } from "react-router-dom";
  import ProductsDetails from './productDetails/index';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
	<>
	<Routes>
	  <Route
		path="/"
		element={<Main />}
	  />
	  <Route
		path="/products/:id"
		element={<ProductsDetails />}
	  />
	</Routes>
	{activeModal === 'basket' && <Basket/>}
  </>
  );
}

export default App;
