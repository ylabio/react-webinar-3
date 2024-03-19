import { useEffect } from "react";
import useStore from "./use-store";
import useSelector from "./use-selector";
import useInit from "./use-init";

export default function useSession() {
  const store = useStore();
  const select = useSelector((state) => ({
    waiting: state.user.waiting,
    user: state.user.data,
    token: state.auth.token,
  }));

  useInit(() => {
    store.actions.user.getData();
  }, [store]);

  if (!select.token) return null;

  return select;
}
