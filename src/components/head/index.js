import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import "./style.css";

function Head({ title, children }) {
  const store = useStore();

  const select = useSelector((state) => ({
    user: state.users.user,
    params: state.users.params,
  }));

  const callbacks = {
    // Удаление из корзины
    resetParams: useCallback(() => store.actions.users.resetParams(), [store]),
  };
  return (
    <>
      <div className="Login-Button">
        <Link to="/login">
        { select.user != null ? `${select.user.result.user.profile.name}` : ''}
          <button
            onClick={() => {
              select.user != null ? callbacks.resetParams() : {};
            }}
          >
             { select.user != null ? 'Выход' : 'Вход'}
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
