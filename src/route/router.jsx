import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import ForgotPassword from "../pages/forgotpassword/ForgotPassword";
import ResetPassword from "../pages/resetpassword/ResetPassword";
import Dashboard from "../pages/dashboard/Dashboard";
import Create from "../pages/dashboard/create/Create";
import Storage from "../pages/dashboard/storage/Storage";
import VR from "../pages/dashboard/vr/VR";
import Profile from "../pages/dashboard/profile/Profile";
import AccountInfo from "../pages/dashboard/profile/AccountInfo";
import HelpCenter from "../pages/dashboard/profile/HelpCenter";
import Call from "../pages/dashboard/call/Call";

const router = createBrowserRouter([{
    path: "/",
    element: <App/>,
    // errorElement: <h1>404 Page Not Found</h1>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/:email/reset-password/:token',
    element: <ResetPassword />
  },
  {
    path: "/dashboard/",
    element: <Dashboard/>,
    children: [{
      index: true,
      element: 
        <Navigate to="/dashboard/create" replace/>
    },
      {
        path: "create",
        element: <Create/>
      },
      {
        path: "storage",
        element: <Storage/>
      },
      {
        path: "vr",
        element: <VR/>
      },
      {
        path: "profile",
        element: <Profile/>,
        children: [
          {
            path: "account-info",
            element: <AccountInfo/>
          },
          {
            path: "help-center",
            element: <HelpCenter/>
          },
        ]
      },
      {
        path: "call/:id",
        element: <Call/>
      }
    ]
  }])

  export default router;