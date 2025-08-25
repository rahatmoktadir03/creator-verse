import { useRoutes } from "react-router-dom";
import ShowCreators from "./pages/ShowCreators";
import ViewCreators from "./pages/ViewCreators";
import AddCreators from "./pages/AddCreators";
import EditCreators from "./pages/EditCreators";
import Navbar from "./components/Navbar";
import ShootingStars from "./components/ShootingStars";

function App() {
  const routes = useRoutes([
    { path: "/", element: <ShowCreators /> },
    { path: "/creators/:id", element: <ViewCreators /> },
    { path: "/add", element: <AddCreators /> },
    { path: "/edit/:id", element: <EditCreators /> },
  ]);

  return (
    <div className="container">
      <ShootingStars />
      <Navbar />
      {routes}
    </div>
  );
}

export default App;
