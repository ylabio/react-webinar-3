import { Outlet } from 'react-router-dom';
import Basket from './basket';

function Layout({ activeModal }) {
  return (
    <>
      <Outlet />
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default Layout;
