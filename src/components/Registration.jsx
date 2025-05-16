import { useState,useEffect } from "react";
import NavBarLogo from "../assets/Screenshot_2025-01-07_220519-removebg-preview.png";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export function Registration() {
    const navigate = useNavigate();
    const [step, setStep] = useState("register"); // "register", "otp", or "details"
    const [mobileNumber, setMobileNumber] = useState("+91 ");
    const [otp, setOtp] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [bankError, setBankError] = useState("");

    //data insersion in database
        const[users,setusers]=useState([]); 
        const[name,setname]=useState("");
        const[email,setemail]=useState("");
        const[bankacc,setbankacc]=useState("");
        const[dynamicpin,setdynamicpin]=useState("");
        const[card1balance,setcard1balance]=useState("20000");
        const[card2balance,setcard2balance]=useState("50000");

        const loadData= async ()=>{
            const response= await Axios.get('http://localhost:3003/users');
            console.log(response.data);
        };
        useEffect(()=>{
            loadData();
        },[]);


        // Handles mobile number input
        const handleChange = (event) => {
            const value = event.target.value;
            if (value.startsWith("+91 ") && /^\+91 \d*$/.test(value)) {
                setMobileNumber(value);
            }
        };
    
        const handleRegisterClick = () => {
            const numberOnly = mobileNumber.replace("+91 ", ""); // Extracts numeric part
    
            if (numberOnly.length !== 10) {
                setErrorMessage("Please enter a valid 10-digit mobile number.");
                return;
            }
            setErrorMessage("");
            setStep("otp"); // Move to OTP step if valid
        };
    
        // Handles OTP input
        const handleOtpChange = (event) => {
            const value = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
            if (value.length <= 6) {
                setOtp(value);
            }
        };
    
        // Move to Registration Details after OTP verification
        const handleVerifyClick = () => {
            if (otp!=="123456") {
                setErrorMessage("Please enter correct otp.");
                return;
            }
            else
            {
                setErrorMessage("");
                setStep("details");
            }
        }
        setTimeout(() => {
            loadData();
        }, 500);

        const handleBankAccChange = (e) => {
            const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
            if (value.length > 8) return; // Restrict input to max 8 digits
            setbankacc(value);
            setBankError(value.length < 8 ? "Please enter a valid 8-digit bank account number." : ""); // Show error if less than 8 digits
        };

        const AddUser=(e)=>{
            e.preventDefault();
            const formattedMobile = mobileNumber.replace("+91 ", "").trim();
            Axios.post('http://localhost:3003/users',{mobileNumber: formattedMobile,name,email,bankacc,dynamicpin,card1balance,card2balance})
            .then(()=>{
                setMobileNumber("+91 ");
                setname("");
                setemail("");
                setbankacc("");
                setdynamicpin("");
                setcard1balance("");
                setcard2balance("");
                alert("User registered successfully!");
                navigate("/login"); // Redirect to home page after login
            }).catch((err)=>{
                console.log(err);
                alert("Error registering user. Please try again.");
            })

            setTimeout(() => {
                loadData();
            }, 500);
        }

    return (
        <div className="mainregister">
        <div className="registerpage">
            <div className="register-header">
                <img className="registerlogo" src={NavBarLogo} alt="Logo" width="150" />
            </div>

            {step === "register" && (
                <>
                    <div className="registerdivcontent">
                        <h3>Welcome to Sidakpay</h3>
                        <h2>Get started with your<br /> email or phone<br /> number</h2>
                    </div>
                    <div className="mobile-input-container">
                        <input type="text" className="mobile-input" value={mobileNumber} onChange={handleChange} />
                    </div>
                    {errorMessage && <p className="error-text">{errorMessage}</p>}
                    <button className="registerbutton" onClick={handleRegisterClick}>Register</button>
                </>
            )}

            {step === "otp" && (
                <>
                    <div className="registerdivcontent">
                        <h2>Almost there. Enter <br /> the OTP sent to your <br /> phone number</h2>
                    </div>
                    <div className="mobile-input-container">
                        <input type="text" className="mobile-input" value={mobileNumber} readOnly />
                    </div>
                    <div className="otp-input-container">
                        <input
                            type="text"
                            className="otp-input"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={handleOtpChange}
                            maxLength={6}
                        />
                    </div>
                    {errorMessage && <p className="error-text">{errorMessage}</p>}
                    <button className="registerbutton" onClick={handleVerifyClick}>Verify</button>
                </>
            )}
            {step === "details" && (
                <>
                    <div className="registration-details">
                        <h2>Complete Your Registration</h2>

                        <label htmlFor="name">Full Name</label>
                        <input type="text"  placeholder="Enter your full name" value={name} onChange={e=>setname(e.target.value)}/>

                        <label htmlFor="email">Email Address</label>
                        <input type="email"  placeholder="Enter your email" value={email} onChange={e=>setemail(e.target.value)} />

                        <label htmlFor="bankAccount">Bank Account Number</label>
                        <input type="text" placeholder="Enter your 8 digit bank account number" value={bankacc}  onChange={handleBankAccChange}/>
                        {bankError && <p className="error-text">{bankError}</p>} {/* Error Message */}

                        <label htmlFor="dynamic pin">Dynamic Pin</label>
                        <input type="text"  value={dynamicpin} onChange={e=>setdynamicpin(e.target.value)} placeholder="Enter your dynamic pin to be used to login your account" />

                        <label>Gender</label>
                        <div className="gender-container">
                            <label>
                                <input type="radio" name="gender" value="male" /> Male
                            </label>
                            <label>
                                <input type="radio" name="gender" value="female" /> Female
                            </label>
                        </div>

                        <button className="submit-button" onClick={AddUser}>Submit</button>
                    </div>

                </>
            )}
        </div>
        </div>
    );
}
