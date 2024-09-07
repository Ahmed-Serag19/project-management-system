import {
  // createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import AuthLayout from "./modules/Shared/components/AuthLayout/AuthLayout";
import Login from "./modules/Auth/components/Login/Login";
import Register from "./modules/Auth/components/Register/Register";
import ForgotPassword from "./modules/Auth/components/ForgotPassword/ForgotPassword";
import ResetPassword from "./modules/Auth/components/ResetPassword/ResetPassword";
import MasterLayout from "./modules/Shared/components/MasterLayout/MasterLayout";
import Home from "./modules/Home/components/Home/Home";
import NotFound from "./modules/Shared/components/NotFound/NotFound";
import LandingPage from "./modules/Shared/components/LandingPage/LandingPage";
import Users from "./modules/Users/Componant/Users";
import Projects from "./modules/Projects/Componant/Projects";
import Tasks from "./modules/Tasks/Componant/Tasks";
import ChangePassword from "./modules/Auth/components/ChangePassword/ChangePassword";
import VerifyEmail from "./modules/Auth/components/VerifyEmail/VerifyEmail";
import AddProject from "./modules/Projects/Componant/AddProject/AddProject";
import AddTask from "./modules/Tasks/Componant/AddTask/AddTask";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState('light');

  const toggle =()=>{
    if(mode==='light'){
      setMode('dark');
    }
    else{
      setMode('light');
    }
  }
  
  const routes = createHashRouter([
    {
      path: "/",
      element: <LandingPage />,
      errorElement: <NotFound />,
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      errorElement: <NotFound />,

      children: [
        {
          index: true,
          element: <Login />,
          errorElement: <NotFound />,
        },

        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "change-password", element: <ChangePassword /> },
        { path: "verify-email", element: <VerifyEmail /> },
      ],
    },
    {
      path: "/dashboard",
      element: <MasterLayout toggle={toggle} mode={mode} />,
      errorElement: <NotFound />,

      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "projects",
          element: <Projects />,
        },
        {
          path: "add-project",
          element: <AddProject />,
        },
        {
          path: "tasks",
          element: <Tasks />,
        },
        {
          path: "add-task",
          element: <AddTask />,
        },
      ],
    },
  ]);
  return(
    <>
    <RouterProvider router={routes} />
    </>
    ) 
}

export default App;
