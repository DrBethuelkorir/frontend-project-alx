import Home from "./components/Home";
import { createBrowserRouter, RouterProvider,Route, createRoutesFromElements } from "react-router-dom";
import Rootfile from "./components/Rootfile";
import Searchdashboard from "./components/Searchdashboard";
import Reportchallenge from "./components/Reportchallenge";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Rootfile />}>
        <Route index element={<Home />} />
        <Route path="searchdashboard" element={<Searchdashboard />} />
        <Route path="Reportchallenge" element={<Reportchallenge />} />
      </Route>
    )
  )
  return(
    <>
   <RouterProvider router={router} />
    </>
  );
}
export default App;