import { Navigate } from "react-router-dom";

function WithAuthRedirect({isAuth,path='/login',children}){
  if(!isAuth){
    return <Navigate to={path} replace/>
  }
  return children
}

export default WithAuthRedirect