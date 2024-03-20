import { useNavigate } from 'react-router-dom';

export function useNavigateToLogin() {
    const navigate = useNavigate();
    return () => navigate('/login');
}