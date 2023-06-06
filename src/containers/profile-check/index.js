import {memo, useEffect} from "react";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";
import PropTypes from 'prop-types';
import Spinner from "../../components/spinner";

function ProfileCheck({children, redirect}) {

  const navigate = useNavigate();

  const select = useSelector(state => ({
    waiting: state.session.waiting,
    loggedIn: state.session.loggedIn,
  }));

  useEffect(() => {
    if (!select.loggedIn && !select.waiting) {
      navigate(redirect);
    }
  }, [select.loggedIn, select.waiting])

  return (
    <Spinner active={select.waiting}>
      {children}
    </Spinner>
  );
}

ProfileCheck.propTypes = {
  children: PropTypes.node.isRequired,
  redirect: PropTypes.string,
};

ProfileCheck.defaultProps = {
  redirect: "/",
}

export default memo(ProfileCheck);
