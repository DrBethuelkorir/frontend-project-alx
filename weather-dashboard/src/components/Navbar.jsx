import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="nav text-blue-500 p-4 flex justify-center border-b border-gray-300">
            <ul className="flex space-x-4">
                <li className="hover:text-blue-700">
                    <Link to="/">Home</Link>
                </li>
                <li className="hover:text-blue-700">
                    <Link to="/searchdashboard">Search</Link>
                </li>
                <li className="hover:text-blue-700">
                    <Link to="/Reportchallenge">Report Bug</Link>
                </li>
            </ul>
        </div>
    )
}
export default Navbar;