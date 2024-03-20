import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import ProfileForm from "../../components/profile-form";
import "./style.css";

function LoginPage() {

  return (
    <div className="Login-Page">
      <ProfileForm/>
    </div>
  );
}

export default memo(LoginPage);
