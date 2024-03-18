import { Route, Navigate } from "react-router-dom";

const AnonymousRoute = ({ authorized, element }) => {
    return authorized ? <Navigate to="/" /> : element;
}

export default AnonymousRoute;