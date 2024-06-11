import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";

export default function App() {
  return <RouterProvider router={router} />;
}
