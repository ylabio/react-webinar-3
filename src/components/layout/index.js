import React from "react";
import {Outlet} from "react-router-dom";
import Basket from "../../app/basket";
import useSelector from "../../store/use-selector";

function Layout() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Outlet />
      {activeModal === 'basket' && <Basket/>}
    </>
  )
}

export default React.memo(Layout);