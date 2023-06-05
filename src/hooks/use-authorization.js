import {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import useSelector from "./use-selector";

export default function useAuthorization(path = "/login") {
  const navigate = useNavigate();

  const select = useSelector(state => ({
    token: state.user.token,
  }));

  useEffect(() => {
    if (!select.token) {
      navigate(path);
    }
  }, [select]);
};
