import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import "./style.css";

function Head({ title, children, initParams, resetParams }) {

  useInit(() => {
    initParams;
  }, [], true);

  const select = useSelector((state) => ({
    user: state.users.user,
    userName: state.users.userName,
    params: state.users.params,
  }));

  const callbacks = {
    // Удаление из корзины
    resetParams: useCallback(() => resetParams(), []),
  };
  return (
    <>
      <div className="Login-Button">
        <Link to="/login">
        {select.userName}
          <button
            onClick={() => {
              select.userName != '' ? callbacks.resetParams() : {};
            }}
          >
             { select.userName != '' ? 'Выход' : 'Вход'}
          </button>
        </Link>
      </div>
      <div className="Head">
        <div className="Head-place">
          <h1>{title}</h1>
        </div>
        <div className="Head-place">{children}</div>
      </div>
    </>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

export default memo(Head);
