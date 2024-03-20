import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import ProfileForm from "../../components/profile-form";
import "./style.css";

function LoginPage(props) {

  return (
    <div className="Login-Page">
      <ProfileForm getInfo={props.getInfo} initParams={props.initParams} resetParams={props.resetParams} setLogin={props.setLogin} setPassword={props.setPassword}/>
    </div>
  );
}

export default memo(LoginPage);
