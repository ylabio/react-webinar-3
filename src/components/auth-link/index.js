import React, { useCallback } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import useStore from "../../hooks/use-store";

const AuthLink = ({ user }) => {
  const cn = bem("Link");
  const store = useStore();
  const callbacks = {
    signOut: useCallback(() => store.actions.auth.signOut(), [store]),
  };
  return (
    <div className={cn("")}>
      {!user ? 
        (<Link to={"/auth"}>
          <button className={cn("btn")}>Вход</button>
        </Link>)
       : 
       ( <>
          <Link className={cn("link")} to={`/user/${user ? user?.profile.name : ''}`}>
            <div className={cn("user")}>{user ? user?.profile.name : ''}</div>
          </Link>
          <Link to={"/auth"}>
            <button className={cn("btn")} onClick={callbacks.signOut}>
              Выход
            </button>
          </Link>
        </>)
      }
    </div>
  );
};

AuthLink.propTypes = {
  signIn: PropTypes.func,
  user: PropTypes.object,
};

AuthLink.defaultProps = {
  signOut: () => {},
  user: null,
}
export default AuthLink;
