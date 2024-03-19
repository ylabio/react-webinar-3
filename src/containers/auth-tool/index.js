import { memo } from "react";
import ProfileTool from "../../components/profile-tool";
import SideLayout from "../../components/side-layout";
import useTranslate from "../../hooks/use-translate";
import { useNavigate } from "react-router-dom";

function Auth() {
  const { t } = useTranslate();
  const navigate = useNavigate();

  const callbacks = {
    navigateToAuthForm: () => {
      navigate("/login");
    },
  };

  return (
    <SideLayout side="end" padding="10x20">
      <ProfileTool
        label={t("login")}
        path={"/profile"}
        onClick={callbacks.navigateToAuthForm}
      />
    </SideLayout>
  );
}

export default memo(Auth);
