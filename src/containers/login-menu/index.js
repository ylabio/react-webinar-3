import React, { memo } from "react";
import { Link } from "react-router-dom";
import SideLayout from "../../components/side-layout";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

const LoginMenu = () => {
  const { t } = useTranslate();
  const store = useStore();

  const user = useSelector((state) => state.profile.user);

  const handleLogout = () => {
    store.actions.login.signOut();
  };

  return (
    <SideLayout paddingX="medium" paddingY="small" side="end" gap="medium">
      {user && <Link to={"/profile"}>{user.profile.name}</Link>}
      {user ? (
        <button onClick={handleLogout}>{t("login.exit")}</button>
      ) : (
        <Link to={"/login"}>
          <button>{t("login.enter")}</button>
        </Link>
      )}
    </SideLayout>
  );
};

export default memo(LoginMenu);