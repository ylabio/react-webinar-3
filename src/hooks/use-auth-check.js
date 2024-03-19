import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSelector from "../hooks/use-selector";

const useAuthCheck = (Component) => {
  const AuthCheck = (props) => {
    const navigate = useNavigate();
    const isAuth = useSelector((state) => state.auth.isAuth);

    useEffect(() => {
      if (!isAuth) {
        navigate("/login");
      }
    }, [isAuth, navigate]);

    return <Component {...props} />;
  };

  return AuthCheck;
};

export default useAuthCheck;
