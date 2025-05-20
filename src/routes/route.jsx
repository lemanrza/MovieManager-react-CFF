import Home from "../pages/Home.jsx";
import Favorites from "../pages/Favorites.jsx";
import Layout from "../layout/Layout.jsx";

const ROUTER = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "favorites",
                element: <Favorites />
            }
        ]
    }
]
export default ROUTER;