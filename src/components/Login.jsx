import { useState } from "react";
import NavBarLogo from "../assets/Screenshot_2025-01-07_220519-removebg-preview.png";
import "./home_styles.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

export function Login() {
    const [mobilenumber, setMobilenumber] = useState("+91 ");
    const [dynamicpin, setDynamicpin] = useState("");
    const [errormessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handlelogin = async (e) => {
        e.preventDefault();
        const formattedmobile = mobilenumber.replace("+91 ", "").trim();
        try {
            const response = await Axios.get("http://localhost:3003/users");
            const users = response.data;

            const user = users.find(
                (user) =>
                    user.mobileNumber === formattedmobile &&
                    user.dynamicpin === dynamicpin
            );

            if (user) {
                alert("Login Successful");
                localStorage.setItem("name",user.name);
                localStorage.setItem("bankacc",user.bankacc);
                localStorage.setItem("card1",user.card1balance);
                localStorage.setItem("card2",user.card2balance);
                localStorage.setItem("pin",user.dynamicpin);
                navigate("/logindashboard"); // Redirect to home page after login
                console.log(localStorage.getItem("name"));
                console.log(localStorage.getItem("bankacc"))
            } else {
                setErrorMessage("Invalid mobile number or dynamic pin");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setErrorMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="loginbackground">
        <div className="loginpage">
            <div className="register-header">
                <img className="registerlogo" src={NavBarLogo} alt="Logo" width="150" />
            </div>
            <h3 className="loginpagehead">Login with your Sidakpay Account</h3>

            {/* Mobile Number Input */}
            <div className="mobile-input-container">
                <input
                    type="text"
                    className="mobile-input"
                    value={mobilenumber}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value.startsWith("+91 ") && /^\+91 \d*$/.test(value)) {
                            setMobilenumber(value);
                        }
                    }}
                />
            </div>
            <br />


            <div className="pin-input-container">
                <input
                    type="password"
                    placeholder="Enter Dynamic Pin"
                    className="pin-input"
                    value={dynamicpin}
                    onChange={(e) => setDynamicpin(e.target.value)}
                />
            </div>

            {errormessage && <p className="error-text">{errormessage}</p>}

            {/* Login Button */}
            <button className="loginpagebutton" onClick={handlelogin}>
                Login
            </button>
            <div className="loginpagecontentfooter">
                <h5>
                    Don't have an account?
                    <br />
                    <Link to="/register" style={{ textDecoration: "none" }}>
                        <span>Sign up</span>
                    </Link>
                </h5>
            </div>
        </div>
        </div>
    );
}
