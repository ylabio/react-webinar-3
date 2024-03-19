import {useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import {useEffect} from "react";
import PropTypes from "prop-types";

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();

  const select = useSelector(state => ({
    token: state.authorization.token
  }));

  useEffect(() => {
    if (!select.token) {
      navigate('/login');
    }
}, [select.token]);

  return children
};

AuthWrapper.propTypes = {
  children: PropTypes.node,
};

export default AuthWrapper;