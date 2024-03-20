import {memo, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import PropTypes from "prop-types";

const ProtectedRoute = ({children, redirect}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector((state) => ({
    user: state.auth.user,
    token: state.auth.token,
  }));

  useEffect(() => {	
    if (!select.user && !select.token) {
      navigate(redirect, {state: {backNavigate: location.pathname}});
    }
  }, [select.user, select.token]);

  if (select.user && select.token) return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
	redirect: PropTypes.string
};

export default memo(ProtectedRoute);