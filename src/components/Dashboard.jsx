import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { Calendar } from "lucide-react";
import NavBarLogo from "../assets/Screenshot_2025-01-07_220519-removebg-preview.png";
import Axios from "axios";
import "./home_styles.css";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export function Dashboard() {
    const name=localStorage.getItem("name") || "Guest";
    const bankacc=localStorage.getItem("bankacc");
    const creditacc="851888348567"
    const [sentTransactions, setSentTransactions] = useState([]);
    const [receivedTransactions, setReceivedTransactions] = useState([]);
    const [maxTransactionAmount, setMaxTransactionAmount] = useState(0);

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB").replace(/\//g, "-");

    const [graphData, setGraphData] = useState([]);
    const formatBankAcc = (acc) => {
        if (!acc) return "N/A";  // Handle empty or null values
        return acc.replace(/\d{4}(?=\d)/g, "$& "); // Add spaces every 4 digits
    };
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                console.log(`Fetching transactions for bankacc: ${bankacc}`);
    
                const response = await Axios.get(`http://localhost:3003/users?bankacc=${bankacc}`);
                console.log("API Response:", response.data);
    
                if (response.data.length > 0) {
                    const allTransactions = response.data[0].transactions || [];
                    console.log("Fetched Transactions:", allTransactions);

                    allTransactions.sort((a, b) => {
                        const dateA = new Date(`${a.date} ${a.time}`);
                        const dateB = new Date(`${b.date} ${b.time}`);
                        return dateB - dateA; // Latest transactions first
                    });
    
                    setSentTransactions(allTransactions.filter(txn => txn.type === "sent"));
                    setReceivedTransactions(allTransactions.filter(txn => txn.type === "received"));
    
                    // Group transactions by date and separate sent & received
                    const groupedData = {};
                    let maxTransactionAmount = 0;

                    allTransactions.forEach(txn => {
                        if (!groupedData[txn.date]) {
                            groupedData[txn.date] = { date: txn.date, sent: 0, received: 0 };
                        }
                        if (txn.type === "sent") {
                            groupedData[txn.date].sent += Number(txn.amount);
                        } else if (txn.type === "received") {
                            groupedData[txn.date].received += Number(txn.amount);
                        }
                        maxTransactionAmount = Math.max(
                            maxTransactionAmount,
                            groupedData[txn.date].sent,
                            groupedData[txn.date].received
                        );
                    });
    
                    setGraphData(Object.values(groupedData));
                    setMaxTransactionAmount(maxTransactionAmount);
                }
            } catch (error) {
                console.log("Error fetching transactions:", error);
            }
        };
        fetchTransactions();
    }, [bankacc]);
    return (
        <div className="logindashboard">
            <div className="header-container">
                <img className="registerlogo" src={NavBarLogo} alt="Logo" width={160} />
                <div className="navbar-content">
                    <h2>Hello, {name}</h2>
                </div>

                {/* Login and Logout links on the right */}
                <div className="auth-links">
                    <Link to="/paymentdash" style={{ color: "black" }}>
                        <span>Pay Now</span>
                    </Link>
                    <Link to="/" style={{ color: "black" }}>
                        <span>Logout</span>
                    </Link>
                </div>
            </div>

            <div className="main-container">
                <div className="leftdashboard">
                    <div className="upperleft">
                        <p className="man-containerheads" style={{marginBottom:"20px"}}>Accounts Status</p>
                        <ResponsiveContainer width="80%" height={350}>
                            <BarChart data={graphData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis domain={[0, maxTransactionAmount + 4000]} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="received" fill="green" name="Received Amount" />
                                <Bar dataKey="sent" fill="red" name="Sent Amount" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="lowerleft">
                        <p className="man-containerheads" style={{marginLeft:"100px"}}>Transactions history</p>
                        
                        <div className="transactions-container" style={{ marginTop: "20px", marginBottom: "40px",marginLeft:"80px"}}>
                            <h3 className="transactions-heading">Recent Transactions</h3>

                            {sentTransactions.length === 0 && receivedTransactions.length === 0 ? (
                                <p className="no-transactions">No transactions found</p>
                            ) : (
                                <div className="transactions-list" >
                                    {([...sentTransactions, ...receivedTransactions] // Merge both arrays
                                        .sort((a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`)) // Sort latest first
                                        .map((txn, index) => (
                                            <div key={index} className="transaction-card">
                                                <div className="transaction-row">
                                                    <span className="transaction-name">
                                                        {txn.type === "sent" ? `To: ${txn.toName}` : `From: ${txn.fromName}`}
                                                    </span>
                                                    <span className="transaction-acc">Acc: {txn.type === "sent" ? txn.to : txn.from}</span>
                                                    <span className="transaction-amount" style={{ color: txn.type === "sent" ? "red" : "green" }}>
                                                        {txn.type === "sent" ? `- ₹${txn.amount}` : `+ ₹${txn.amount}`}
                                                    </span>
                                                </div>
                                                <span className="transaction-date">{txn.date} | {txn.time}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
                <div className="rightdashboard">
                    <div className="upperright">
                        <p className="man-containerheads">Cards</p>
                        <div className="card-container2">
                        <div className="card1">
                            <div>
                                <p className="cardholdername">Sidakpay&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹</p>
                                <div className="cardbarcode" style={{ marginLeft: "10px" }}></div>
                                <p className="cardbankaccnumber"  style={{ marginLeft: "0px" }}>{formatBankAcc(bankacc)}</p>
                            </div>
                                <div className="carddetails">
                                    <p>VisaCard:5341 <br />
                                        Exp.Date:12/25 <br /> 
                                        Status:Active <br /> 
                                        Currency:INR
                                    </p>
                                </div>
                        </div>

                        </div>
                        <div className="card-container2">

                            <div className="card2">
                                <div>
                                <p className="cardholdername">Sidakpay&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div className="mastercardcircle1" ><div className="mastercardcircle2"></div></div></p>
                                <div className="cardbarcode" style={{ marginLeft: "10px" }}></div>
                                <p className="cardbankaccnumber"  style={{ marginLeft: "0px" }}>{formatBankAcc(creditacc)}</p>

                                </div>
                                <div className="carddetails">
                                    <p>VisaCard:5341 <br />
                                        Exp.Date:12/25 <br />
                                        Status:Active <br />
                                        Currency:INR
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lowerright">
                        <p className="man-containerheads">Upcoming Payment</p>
                        <div class="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Payment Category</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody> 
                                    <tr>
                                        <td>
                                            {/* <img src="images/car-loan.png" alt="Car Loan" class="icon-img">  */}
                                            Car Loan
                                         </td>
                                        <td>20.01.2022</td>
                                        <td>₹500.00</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {/* <img src="images/house-rent.png" alt="House Rent" class="icon-img">  */}
                                            House Rent
                                        </td>
                                        <td>05.01.2022</td>
                                        <td>₹900.00</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {/* <img src="images/internet.png" alt="Internet Bill" class="icon-img">  */}
                                            Internet Bill
                                        </td>
                                        <td>05.01.2022</td>
                                        <td>₹55.00</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {/* <img src="images/water-bill.png" alt="Water Bill" class="icon-img">  */}
                                            Water Bill
                                        </td>
                                        <td>15.01.2022</td>
                                        <td>₹750.00</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {/* <img src="images/loan.png" alt="Loan Installment" class="icon-img">  */}
                                            Loan Installment
                                        </td>
                                        <td>20.01.2022</td>
                                        <td>₹750.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
