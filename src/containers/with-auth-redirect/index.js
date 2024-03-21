import { Navigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";



function WithAuthRedirect({path='/login',children}){

  const select = useSelector(state => ({
    isAuth:state.user.isAuth,
  }));

  if(!select.isAuth){
    return <Navigate to={path} replace/>
  }
  return children
}

export default WithAuthRedirect