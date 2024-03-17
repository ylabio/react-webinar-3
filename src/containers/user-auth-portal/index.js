import React, { memo, useCallback } from "react";
import "./style.css";
import PropTypes from "prop-types";
import useAuth from "../../hooks/use-auth";
import UserPortal from "../../components/user-portal";
import UserLoggedIn from "../../components/user-logged-in";
import { useNavigate } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";

function UserAuthPortal() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  console.log(user);
  const { t } = useTranslate();
  const callbacks = {
    signIn: useCallback(() => {
      navigate("/login");
    }),
    signOut: () => {
      signOut();
    },
  };
  return (
    <UserPortal>
      <Spinner active={user.waiting}>
        {user.data ? (
          <UserLoggedIn
            link={"/profile"}
            textBtn={t("button.exit")}
            linkTitle={user.data.profile.name}
            action={callbacks.signOut}
          />
        ) : (
          <button onClick={callbacks.signIn}>{t("button.signIn")}</button>
        )}
      </Spinner>
    </UserPortal>
  );
}

export default memo(UserAuthPortal);
