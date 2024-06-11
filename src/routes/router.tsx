import { createBrowserRouter } from "react-router-dom";
import Root from "@/src/pages/root";
import ErrorPage from "@/src/pages/errors/error-page";
import ButtonTester from "@/src/pages/button-tester";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <ButtonTester />,
      },
      {
        path: "/test",
        element: <ButtonTester />,
      },
    ],
  },
]);
