import {memo} from 'react';
import {Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import useSelector from "../../hooks/use-selector";
import Spinner from "../../components/spinner";

function AuthProtect({children}) {

  const select = useSelector(state => ({
    isAuth: !!state.user.data,
    waiting: state.user.waiting,
  }));

  return (
    <Spinner active={select.waiting} wait={true}>
      {select.isAuth ? children : <Navigate to={'/login'} />}
    </Spinner>
  );
}

AuthProtect.propTypes = {
  children: PropTypes.node,
}

export default memo(AuthProtect);
