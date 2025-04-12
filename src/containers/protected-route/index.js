import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, children }) {
    if (!user?.profile?.name) {
        return <Navigate to="/login" replace />;
    }
    return children;
}