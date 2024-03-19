import React, {useCallback} from "react";
import UserMenu from "../../components/user-menu";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function AuthHead() {

  const store = useStore()

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
    user: state.auth.user,
  }));

  const callbacks = {
    logOut: useCallback(() => store.actions.auth.logOut(), [store]),
  }


  const links = {
    login: `/login?referrer=${encodeURIComponent(window.location.pathname)}`,
    profile: '/profile'
  }

  return (
    <UserMenu links={links} isAuth={select.isAuth}
              logOut={callbacks.logOut} userName={select.user?.name}/>
  )
}


export default React.memo(AuthHead);