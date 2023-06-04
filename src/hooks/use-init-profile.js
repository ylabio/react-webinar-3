import { useEffect } from "react";
import useSelector from "./use-selector";
import useStore from "./use-store";

function useInitProfile(){
  const store = useStore();

  const selectors = useSelector(state => ({
    waiting: state.auth.waiting,
    isAuth: state.profile.isAuth
  }))

  useEffect(() => {
    store.actions.profile.initAuth();
  }, [selectors.waiting])

  return { isAuth: selectors.isAuth }
}

export default useInitProfile