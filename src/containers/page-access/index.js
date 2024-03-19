import {memo, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";

function PageAccess({children, redirect, needAuthorization}) {
  const navigate = useNavigate();

  const select = useSelector(state => ({
    authorized: state.login.authorized,
  }));

  useEffect(() => {
    const rule = needAuthorization ? !select.authorized : select.authorized;
    if (rule) {
      return navigate(redirect);
    }
  }, [select.authorized])

  return (
    <>
      {children}
    </>
  )
}

export default memo(PageAccess);
