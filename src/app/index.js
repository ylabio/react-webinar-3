import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import { createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route } from 'react-router-dom';
import Product from './product';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);
  // const router = createBrowserRouter([
  //   {
  //     path: '/',
  //     element: <Main />
  //   },
  //   {
  //     path: 'product/:id',
  //     element: <Product />
  //   }
  // ]);

  return (
    <>
      {/* <Main /> */}
      <BrowserRouter>
        <Routes>
          
          {/* <RouterProvider router={router} /> */}
          <Route path='/' element={<Main />} />
          <Route path='/product/:id' element={<Product />} />
          
        </Routes>
        {activeModal === 'basket' && <Basket />}
      </BrowserRouter>
    </>
  );
}

export default App;
