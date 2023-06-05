import {Navigate, useLocation} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import PropTypes from "prop-types";
function RequireAuth({ children, href = '/login' }) {
    const location = useLocation();

    const select = useSelector(state => ({
      session: state.session
    }));

    if (select.session.waiting) {
      return null;
    }

    if (select.session.isAuth) {
      return children;
    }

    return <Navigate to={href} state={{from: location}} replace />
}

RequireAuth.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node
}

export default RequireAuth;