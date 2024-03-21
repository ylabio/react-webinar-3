import {memo} from "react";
import { Navigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

/**
 * Контейнер с компонентами навигации
 */
function RedirectByLogin(props) {

  return (
    <>
        {props.isLoggedNull ? null : props.exec ? <Navigate to={props.redirect} /> : props.children}
    </>
  );
}

export default memo(RedirectByLogin);
