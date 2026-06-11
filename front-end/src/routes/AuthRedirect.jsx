import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthRedirect = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        <>
            <div className="flex justify-center items-center h-screen">
                <progress className="progress w-56"></progress>
            </div>
        </>
    }

    if (user) {
        return <Navigate to="/my-account/dashboard" replace />;
    }

    return children;
};

export default AuthRedirect;