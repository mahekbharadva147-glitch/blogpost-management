import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
                 
import AuthGuard from "./auth/AuthGuard";
import Dashboard from "./pages/Dashboard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import Analytics from "./pages/Analytics";
import ThemeContext from "./context/ThemeContext";
import Favorites from "./pages/Favorites";


const DefaultRoute = () => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  if (loginData) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Navigate to="/register" replace />;
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DefaultRoute />,
    },
    {
    path: "/login",
    element: <Login />,
  },
  
    {
    path: "/register",
    element: <Register />,
  },

    {
      path: "/dashboard",
      element: (
        <AuthGuard required={true}>
          <Dashboard />
        </AuthGuard>
      ),
    },
    
    {
      path: "/create-post",
      element: (
        <AuthGuard required={true}>
          <CreatePost />
        </AuthGuard>
      ),
    },
    {
      path:"/create-post/:id",
      element:(
        <AuthGuard required ={true}>
          <PostDetails/>
        </AuthGuard>
      ),
    },
    {
  path: "/post/",
  element: (
    <AuthGuard required={true}>
      <PostDetails />
    </AuthGuard>
  ),
},
{
      path: "/analytics",
      element: (
        <AuthGuard required={true}>
          <Analytics />
        </AuthGuard>
      ),
    },
    {
      path: "/themecontext",
      element: (
        <AuthGuard required={true}>
          <ThemeContext/>
        </AuthGuard>
      ),
    },
    {
      path: "/favorites",
      element: (
        <AuthGuard required={true}>
          <Favorites/>
        </AuthGuard>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />

      {/* Toast container added ONCE */}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;