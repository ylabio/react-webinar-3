import useSelector from "./use-selector";
import useInit from "./use-init";
import {useNavigate} from "react-router-dom";

export default function useRedirect(url) {

  const navigate = useNavigate();

  const select = useSelector(state => ({
    token:  state.authorization.token,
  }));

  const redirectLogin = () => {
    if (!select.token) {
      return navigate(`/${url}`);
    }
    return null;
  };

  useInit(() => {
    redirectLogin()
  }, [select.token], true)
}
