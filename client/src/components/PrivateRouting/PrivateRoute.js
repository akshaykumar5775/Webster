import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, loading, children }) => {
    if (!loading && !isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};
export default PrivateRoute;
