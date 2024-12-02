import { createBrowserRouter } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import App from "../layout/App";
import AboutPage from "../../features/about/AboutPage";

export const router=createBrowserRouter([
    {
        path: '/',
        element: <App />, 
        children: [
            // {element: <RequireAuth />, children:[
            //     { path:'checkout', element: <CheckoutPage /> },
            // ]},
            { path:'', element: <HomePage /> },
            { path: 'about', element: <AboutPage /> },  // Ruta za Dashboard
            //{ path: 'orders', element: <OrdersPage /> },  // Ruta za Orders
            //{ path: 'reports', element: <ReportsPage /> },  // Ruta za Reports
        ]
    }
])