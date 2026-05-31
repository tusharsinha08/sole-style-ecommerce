import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import SingleProduct from "../pages/SingleProduct/SingleProduct";
import Register from "../pages/LoginAndRegister/Register";
import Login from "../pages/LoginAndRegister/Login";
import PrivateRoute from "./PrivateRoute";

import CustomerDashboardLayout from "../layouts/CustomerDashboardLayout";
import Dashboard from "../pages/UserAccount/Dashboard";


export const router = createBrowserRouter([
    {
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
                path: '/products',
                element: <Shop></Shop>
            },
            {
                path: '/products/:id',
                element: <SingleProduct></SingleProduct>
            },
            {
                path: '/my-account',
                element: <PrivateRoute><CustomerDashboardLayout></CustomerDashboardLayout> </PrivateRoute>,
                children: [
                    {
                        path: 'dashboard',
                        element: <Dashboard></Dashboard>
                    }

                ]
            },
        ]
    }
])