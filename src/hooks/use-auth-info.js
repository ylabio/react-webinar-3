import { useNavigate } from "react-router-dom";
import useSelector from "./use-selector";
import useStore from "./use-store";
import { useCallback } from "react";

export default function useAuthInfo(){
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
    name: state.auth.userData?.name
  }))

  const logout = useCallback(()=>{
    store.actions.auth.logout()
  }, [])

  const onClickHandler = () => {
    
    if(isAuth) {
      logout()
    } else {
      navigate('/login')
    };
  }

  const isAuth = select.isAuth;
  const name = select.name

  return {isAuth, name, onClickHandler};
}