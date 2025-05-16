import NavBarLogo from "../../assets/Screenshot_2025-01-07_220519-removebg-preview.png"
import UserPng from "../../assets/user.png"
import { Link } from "react-router-dom";
import { useState, useTransition } from "react";
export function Navbar(){
    const [dropdownOpen, setDropdownOpen] = useState(null);

    const handleMouseEnter = (menu) => {
        setDropdownOpen(menu);
    };

    const handleMouseLeave = () => {
        setDropdownOpen(null);
    };
    return (
        <nav className="navbar">
            <div className="navbarcontents">
                <img className="navbarlogo" src={NavBarLogo} alt="Logo" width="250" />
                <ul className="navbarmenu">
                    <li className="ahover4" onMouseEnter={() => handleMouseEnter("solutions")} onMouseLeave={handleMouseLeave}>
                    <a className="ahover" href="#">OUR SOLUTIONS</a>
                    {dropdownOpen === "solutions" && (
                        <div className="dropdowncontent">
                            <Link className="ahover" to="/sidakpayforcustomer">Sidakpay for customer</Link>
                            <Link className="ahover" to="/sidakpayforbuisness">Sidakpay for buisness</Link>
                            <Link className="ahover" to="/referandwin">Refer and Win</Link>
                        </div>
                     )}
                    </li>
                    <li className="ahover4" onMouseEnter={() => handleMouseEnter("solutions")} onMouseLeave={handleMouseLeave}>
                    <a className="ahover" href="#">TICKET BOOKING</a>
                    {dropdownOpen === "solutions" && (
                        <div className="dropdowncontent">
                            <Link className="ahover" to="/moviebooking">Movie Tickets</Link>
                            <Link className="ahover" to="/flightbooking">Flight Tickets</Link>
                            <Link className="ahover" to="/trainbooking">Train Tickets</Link>
                            <Link className="ahover" to="/busbooking">Bus Tickets</Link>
                        </div>
                     )}
                    </li>
                    <li><Link className="ahover" to="/contactus">CONTACT US</Link></li>
                    <li><Link className="ahover" to="/customercare">CUSTOMER CARE</Link></li>          
                </ul>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <div className="loginbutton">
                            <span className="loginbuttontext">Login</span>
                            <img className="loginicon" src={UserPng} alt="usericon" />
                        </div>
                    </Link>
            </div>
        </nav>
    )
}