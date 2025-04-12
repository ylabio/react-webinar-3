import { memo } from "react"
import {Outlet} from "react-router-dom"
import useSelector from "../../hooks/use-selector"
import { Navigate } from "react-router-dom"
function RouteGuard(){

    const selectIsLogin = useSelector(state=> (state.auth.isLogin))
    if(!selectIsLogin){
        return <Navigate to={'/login'}/>
    }
            
    return (
        <>
        <Outlet/>
        </>
    )
}

export default memo(RouteGuard)