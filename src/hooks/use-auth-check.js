import { useMemo, useState } from "react";
import useStore from "./use-store";
import useSelector from "./use-selector";

export default function useAuthCheck() {
 
  const store = useStore();
  

const select = useSelector((store) => ({
        auth: store.user.auth,
      }));
  useMemo(() => {
    
    const token = localStorage.getItem("token");
    if (!select.auth && token) {
      store.actions.user.getUserToken(token);
    } 
  }, [store]);

  return select.auth;
}
