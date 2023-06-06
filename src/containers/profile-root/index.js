import React from "react";
import { Navigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import Profile from "../../app/profile";

const ProfileRoot = ({children, url, keys}) => {
  return <>{keys ?  <Navigate to={url} /> : children }</>;
};

export default ProfileRoot;
