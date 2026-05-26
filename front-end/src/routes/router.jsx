import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import SingleProduct from "../pages/SingleProduct/SingleProduct";
import Register from "../pages/LoginAndRegister/Register";
import Login from "../pages/LoginAndRegister/Login";
import UserHome from "../pages/UserAccount/UserHome";


export const router = createBrowserRouter([{
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/register',
            element: <Register></Register>
        },
        {
            path: '/my-account',
            element: <UserHome></UserHome>
        },
        {
            path: '/products',
            element: <Shop></Shop>
        },
        {
            path: '/products/:id',
            element: <SingleProduct></SingleProduct>
        }
    ]
}])