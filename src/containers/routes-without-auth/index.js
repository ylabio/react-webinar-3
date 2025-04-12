import { Outlet } from "react-router-dom";
import {  Navigate } from "react-router-dom"
import useSelector from "../../hooks/use-selector"
import { memo } from "react";
function RoutesWithoutAuth(){
    const selectIsLogin = useSelector(state=> (state.auth.isLogin))
    if(selectIsLogin){
        return <Navigate to={'/profile'}/>
    }

    return(
        <>
        <Outlet/>
        </>
    )
}
export default memo(RoutesWithoutAuth)