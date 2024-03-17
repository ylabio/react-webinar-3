import React, {useCallback} from "react";
import UserMenu from "../../components/user-menu";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function AuthHead() {

  const store = useStore()

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
  }));

  const callbacks = {
    logOut: useCallback(() => store.actions.auth.logOut(), [store]),
  }


  const links = {
    login: '/login',
    profile: '/profile'
  }

  return (
    <UserMenu links={links} isAuth={select.isAuth} logOut={callbacks.logOut}/>
  )
}


export default React.memo(AuthHead);