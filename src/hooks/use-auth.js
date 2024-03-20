import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useSelector from "./use-selector";

export default function useAuth(cb, cbArgs) {

  const navigate = useNavigate()

  const select = useSelector(state => ({
    token: state.session.data.token
  }))

  useEffect(() => {
    if (!select.token) {
      navigate('/login')
    } else {
      cb(...cbArgs)
    }
  }, [select.token])

}