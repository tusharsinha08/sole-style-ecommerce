import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoutes = ({ children }) => {
    const { user, loading } = useAuth()
    const { isAdmin, isAdminLoading } = useAdmin()
    const location = useLocation()

    if (loading || isAdminLoading) {
        return <>
            <div className="flex justify-center items-center h-screen">
                <progress className="progress w-56"></progress>
            </div>
        </>
    }
    if (user && isAdmin) {
        return children;
    }
    else if (user) {
        return <Navigate to={'/my-account/dashboard'} state={{ from: location }} replace ></Navigate>
    }

    return <Navigate to={'/login'} state={{ from: location }} replace ></Navigate>
};

export default AdminRoutes;