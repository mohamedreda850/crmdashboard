import { ToastContainer } from "react-toastify";
import "./App.css";
import fire from "./assets/Images/Emoji.png";
import rose from "./assets/Images/Emoji2.png";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./Layout/AuthLayout";
import Signin from "./components/authuntcation/Signin";
import MainLayout from "./Layout/MainLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import Deals from "./components/Deals/Deals";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import DealModal from "./components/Deals/DealModal/DealModal";
import DealDetails from "./components/Deals/DealDetails/DealDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Signin />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "deals",
          element: <Deals />,
        },
        {
          path: "deals/:id",
          element: <DealDetails />,
        },
      ],
    },
  ]);

  return (
    <div className="">
      <ToastContainer
        icon={({ type }) => {
          switch (type) {
            case "warning":
              return <img src={fire} />;
            case "info":
              return <img src={rose} />;

            default:
              return null;
          }
        }}
        style={{ height: "50px" }}
        autoClose={false}
        theme="dark"
      />
      <RouterProvider router={router}></RouterProvider>
      <DealModal />
    </div>
  );
}

export default App;
