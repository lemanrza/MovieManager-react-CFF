import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ROUTER from "./routes/route"
const router = createBrowserRouter(ROUTER)
function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App