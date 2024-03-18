import { useLocation, useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import { useEffect } from "react";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector(state => ({
    session: state.authorization.session
  }));

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');
    if (!select.session && !isAuthenticated) {
      navigate('/login', { state: { backNavigate: location.pathname } });
    }
  }, [select.session, navigate, location.pathname]);

  if (select.session) return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
