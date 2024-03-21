import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "./use-store";
import { deleteCookie, getAuthToken } from "../utils";
import useSelector from "./use-selector";

export default function useAuth (dependencies) {

    const store = useStore();
    const navigate = useNavigate();
    const onLoadUser = useCallback(token => store.actions.profile.loadUser(token), [store]);
    const select = useSelector(state => ({
        userInfo: state.auth.userData,
      }));

    useEffect(() => {
        const checkUser = async() => {
            const token = getAuthToken();
            if (token) {
                const success = await onLoadUser(token);
                if (!success) {
                    deleteCookie('token');
                    navigate('/login');
                } else navigate('/profile');            
            } else navigate('/login');
        }

        Object.keys(select.userInfo).length == 0 && checkUser();
    }, dependencies)
}