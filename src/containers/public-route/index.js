import { Navigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

const PublicRoute = ({ children, nav }) => {

  const previewPage = new URLSearchParams(nav).toString()
  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
  }));
  return !select.isAuth ? <>{children}</> : <Navigate to={`/?${previewPage}` || "/"} />;
};

export default PublicRoute;