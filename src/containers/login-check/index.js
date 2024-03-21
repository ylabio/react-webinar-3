import {memo, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useSelector from "../../hooks/use-selector";

function LoginCheck({children}) {
  const navigate = useNavigate();
  const select = useSelector((state) => ({
    isLogin: state.login.isLogin,
  }));

    useEffect(() => {
    if (select.isLogin === false) {
     return navigate('/login')
   }
  }, [select.isLogin])

  return children;
}

LoginCheck.propTypes = {
  children: PropTypes.node
}

export default memo(LoginCheck);