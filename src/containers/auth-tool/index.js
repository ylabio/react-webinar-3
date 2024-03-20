import { memo, useCallback } from "react";
import ProfileTool from "../../components/profile-tool";
import SideLayout from "../../components/side-layout";
import useTranslate from "../../hooks/use-translate";
import { useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";

function Auth() {
  const { t } = useTranslate();
  const navigate = useNavigate();

  const store = useStore();

  const select = useSelector((state) => ({
    userData: state.user.userData,
  }));

  const callbacks = {
    navigateToAuthForm: () => {
      navigate("/login");
    },

    logout: useCallback(() => {
      store.actions.user.logout();
    }, [store]),
  };

  return (
    <SideLayout side="end" padding="10x20">
      {!select.userData ? (
        <ProfileTool
          label={t("enter")}
          onClick={callbacks.navigateToAuthForm}
        />
      ) : (
        <ProfileTool
          label={t("logout")}
          path={"/profile"}
          userName={select.userData.profile.name}
          onClick={callbacks.logout}
        />
      )}
    </SideLayout>
  );
}

export default memo(Auth);
