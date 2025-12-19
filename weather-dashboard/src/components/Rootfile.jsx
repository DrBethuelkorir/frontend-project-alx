import { Outlet } from "react-router-dom";
import Navbar from "./navbar";


function Rootfile() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}
export default Rootfile;