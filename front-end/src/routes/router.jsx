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
import CheckOut from "../pages/CheckOut/CheckOut";
import Orders from "../pages/UserAccount/Orders";
import MyCart from "../pages/UserAccount/MyCart";
import MyProfile from "../pages/UserAccount/MyProfile";
import Notification from "../pages/UserAccount/Notification";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Products from "../pages/Admin/Products/Products";
import AddProduct from "../pages/Admin/Products/AddProduct";
import EditProduct from "../pages/Admin/Products/EditProduct";
import Users from "../pages/Admin/Users/Users";
import EditUser from "../pages/Admin/Users/EditUser";
import AllOrders from "../pages/Admin/Orders/AllOrders";
import UpdateOrder from "../pages/Admin/Orders/UpdateOrder";
import AdminRoutes from "./AdminRoutes";
import AuthRedirect from "./AuthRedirect";


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
                element:
                    <AuthRedirect>
                        <Login></Login>
                    </AuthRedirect>
            },
            {
                path: '/register',
                element:
                    <AuthRedirect>
                        <Register></Register>
                    </AuthRedirect>
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
                path: 'check-out',
                element: <CheckOut></CheckOut>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },

            {
                path: '/my-account',
                element: <PrivateRoute><CustomerDashboardLayout></CustomerDashboardLayout> </PrivateRoute>,
                children: [
                    {
                        path: 'dashboard',
                        element: <Dashboard></Dashboard>
                    },
                    {
                        path: 'carts',
                        element: <MyCart></MyCart>
                    },
                    {
                        path: 'orders',
                        element: <Orders></Orders>
                    },
                    {
                        path: 'profile',
                        element: <MyProfile></MyProfile>
                    },
                    {
                        path: 'notifications',
                        element: <Notification></Notification>
                    }
                ]
            },
        ]
    },
    {
        path: "/admin",
        element: <AdminRoutes><AdminLayout></AdminLayout></AdminRoutes>,
        children: [
            {
                path: 'dashboard',
                element: <AdminDashboard></AdminDashboard>
            },
            {
                path: 'products',
                element: <Products></Products>
            },
            {
                path: 'products/add-product',
                element: <AddProduct></AddProduct>
            },
            {
                path: 'products/edit/:id',
                element: <EditProduct></EditProduct>
            },
            {
                path: 'users',
                element: <Users></Users>
            },
            {
                path: 'users/edit/:id',
                element: <EditUser></EditUser>
            },
            {
                path: 'orders',
                element: <AllOrders></AllOrders>
            },
            {
                path: 'orders/edit/:id',
                element: <UpdateOrder></UpdateOrder>
            }
        ]
    }
])