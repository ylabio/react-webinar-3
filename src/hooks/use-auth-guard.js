import useSelector from "./use-selector";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function useAuthGuard() {
  const token = useSelector(state => state.session.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);
}
