import { useNavigate } from "react-router-dom";
import useSelector from "./use-selector";
import useStore from "./use-store";
import { useCallback } from "react";

export default function useAuthInfo(){
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    isAuth: state.profile.isAuth,
    name: state.profile.userData?.name
  }))

  const logout = useCallback(()=>{
    store.actions.auth.logout()
  }, [])

  const onClickHandler = () => {
    
    if(select.isAuth) {
      logout()
    } else {
      navigate('/login')
    };
  }

  return {isAuth: select.isAuth, name: select.name, onClickHandler};
}