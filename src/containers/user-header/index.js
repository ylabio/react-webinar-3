import React, { useCallback } from "react";
import SideLayout from "../../components/side-layout";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import UserControl from "../../components/user-control";

const UserHeader = () => {

  const store = useStore();
  
  const select = useSelector((state) => ({
    isAuthorized: state.user.isAuthorized,
    user: state.user.user,
  }));

  const callbacks = {
    onLogOut: useCallback(() => store.actions.user.userLogOut(), [store]),
  };

  const { t } = useTranslate();

  return (
    <SideLayout side={"end"}>
      <UserControl
        user={select.user}
        isAuthorized={select.isAuthorized}
        loginTitle={t("login")}
        logOutTitle={t("logout")}
        onLogOut={callbacks.onLogOut}
      />
    </SideLayout>
  );
};

export default UserHeader;
