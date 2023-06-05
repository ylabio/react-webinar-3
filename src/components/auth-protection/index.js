import {Navigate} from "react-router-dom";

const AuthProtection = ({isAuth, children, url = '/'}) => {
  if (!isAuth) return <Navigate to={url} />;

  return (
    <>
    {children}
    </>
  );
};

export default AuthProtection;