import { memo } from "react";
import HeadAuth from "../../components/head-auth";
import useAuthInfo from "../../hooks/use-auth-info"

function HeadAuthContainer(){
  const {isAuth, name, onClickHandler} = useAuthInfo();

  return <HeadAuth isAuth={isAuth} name={name} onClickHandler={onClickHandler}/>
}

export default memo(HeadAuthContainer);