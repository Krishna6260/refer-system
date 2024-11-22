import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";
import Main from "./Main";
import UsersReferralList from "./UsersReferralList";

function App() {
  const router = createBrowserRouter([

    {
      path: "/",
      element: <Login />
    },
    {
      path: "/Register",
      element: <Registration/>
    },
    {
      path: "/Main",
      element: <Main/>
    },
    {
      path: "/list",
      element: <UsersReferralList/>
    },
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
    )
}

export default App;
