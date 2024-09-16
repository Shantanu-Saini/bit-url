import { Link } from "react-router-dom"

function Navbar() {
    return (
        <div className="navbar bg-base-300 top-0 left-0 sticky z-40 shadow-lg">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Bit URL</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to='/'>Url Shortner</Link></li>
                    <li><Link to='/qrgenerator'>QR Generator</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar