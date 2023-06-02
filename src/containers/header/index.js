import React, { memo, useCallback } from "react";
import Head from "../../components/head";
import LocaleSelect from "../locale-select";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

const Header = (props) => {
  const { t } = useTranslate();
  const tokenLocal = localStorage.getItem("token");
  const userLocal = localStorage.getItem("user");
  const store = useStore();
  const select = useSelector((state) => ({
    error: state.login.err,
    token: state.login.token,
    user: state.login.user,
  }));
  const callbacks = {
    logOut: useCallback((token) => store.actions.login.logOut(token)),
  };

  return (
    <Head
      title={t("title")}
      login={t("login")}
      exit={t("exit")}
      urlLogin={"/login"}
      url={"/profile"}
      urlExit={"/"}
      token={tokenLocal ? tokenLocal : select.token}
      logOut={callbacks.logOut}
      user={userLocal ? userLocal : select.user}
    >
      <LocaleSelect />
    </Head>
  );
};

export default memo(Header);
