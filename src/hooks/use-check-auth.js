import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useCheckAuth(){
    const navigate = useNavigate()
    useEffect(() => {
        if(!localStorage.getItem('X-Token')){
            navigate('/login')
        }
    }, [])
}