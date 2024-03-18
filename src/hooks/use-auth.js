import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "./use-store";
import { getAuthToken } from "../utils";

export default function useAuth (dependencies) {

    const store = useStore();
    const navigate = useNavigate();
    const onLoadUser = useCallback(token => store.actions.auth.loadUser(token), [store])

    useEffect(() => {
        const token = getAuthToken();
        if (token) {
            onLoadUser(token);
            navigate('/profile')
        } else navigate('/login');
    }, dependencies)
}