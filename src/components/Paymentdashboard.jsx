    import { Link, useNavigate } from "react-router-dom";
    import { useState,useEffect } from "react";
    import { Calendar } from "lucide-react";
    import NavBarLogo from "../assets/Screenshot_2025-01-07_220519-removebg-preview.png";
    import piglogo from "../assets/piggy-bank.png";
    import Axios from "axios";
    import "./home_styles.css";
    export function PaymentDashboard() {
        const name=localStorage.getItem("name") || "Guest";
        const bankacc=localStorage.getItem("bankacc");
        const creditacc="851888348567"
        const [card1, setCard1] = useState(localStorage.getItem("card1") || "0");
        const [card2, setCard2] = useState(localStorage.getItem("card2") || "0");


        const [accountNumber, setAccountNumber] = useState("");
        const [payeeName, setPayeeName] = useState("");
        const [amount, setAmount] = useState("");
        const [selectedCard, setSelectedCard] = useState("");
        const [pin, setPin] = useState("");


        const [accountError, setAccountError] = useState("");
        const [cardError, setCardError] = useState("");
        const [amountError, setAmountError] = useState("");
        const [pinError, setPinError] = useState("");

        const [sentTransactions, setSentTransactions] = useState([]);
        const [receivedTransactions, setReceivedTransactions] = useState([]);

        const today = new Date();
        const formattedDate = today.toLocaleDateString("en-GB").replace(/\//g, "-");

        const [piggyBank, setPiggyBank] = useState(localStorage.getItem("piggyBank") || "0");
        const savingsPercentage = 2; // 5% of every transaction goes into savings
        const [piggyBankTransactions, setPiggyBankTransactions] = useState([]);

        const [isAnonymous, setIsAnonymous] = useState(false);

        const [currency, setCurrency] = useState("INR"); // Default to INR
        const exchangeRates = {
            INR: 1,
            USD: 83.3, // Example rate (1 USD = 83.3 INR)
            EUR: 90.5, // Example rate (1 EUR = 90.5 INR)
        };


        const formatBankAcc = (acc) => {
            if (!acc) return "N/A";  // Handle empty or null values
            return acc.replace(/\d{4}(?=\d)/g, "$& "); // Add spaces every 4 digits
        };
        const formatAmount = (amount) => {
            return parseFloat(amount).toLocaleString("en-IN"); // Adds commas as per Indian number system
        };


        const handleaccountnumber= async(eOrAccNumber)=>{
            const inputAccount = typeof eOrAccNumber === "string" ? eOrAccNumber : eOrAccNumber.target.value;
            setAccountNumber(inputAccount);
            if (inputAccount.length !== 12) {
                setPayeeName("");
                setAccountError("");
                return false;
            }
            const loggedInUserAcc = localStorage.getItem("bankacc"); // Get the logged-in user's account number

            if (inputAccount === loggedInUserAcc) {
                setPayeeName("");
                setAccountError("You cannot send money to your own account.");
                return false;
            }
                try
                {
                    const response= await Axios.get('http://localhost:3003/users');
                    const users=response.data;
                    const payeeUser = users.find(user => user.bankacc === inputAccount);
                    if(payeeUser)
                    {
                        setPayeeName(payeeUser.name);
                        setAccountError("");
                        return payeeUser;
                    }
                    else
                    {
                        setPayeeName("");
                        setAccountError("Account number not found.Please enter valid acc number.")
                        return false;
                    }
                }
                catch(error)
                {
                    console.log("error in acc check function");
                    return false;
                }
            
        };


        const validateanddeductbalance = () => {
            setCardError("");
            setAmountError("");
        
            if (!selectedCard) {
                setCardError("Please select a card.");
                return false;
            }
        
            let enteredAmount = parseFloat(amount.replace(/,/g, ""));
            if (isNaN(enteredAmount) || enteredAmount <= 0) {
                setAmountError("Please enter a valid amount.");
                return false;
            }
        
            let amountInINR = enteredAmount * exchangeRates[currency]; // ✅ Convert amount to INR
            let balance = selectedCard === "card1" ? parseFloat(card1) : parseFloat(card2);
            let savingsAmount = (amountInINR * savingsPercentage) / 100; // ✅ Calculate Piggy Bank savings in INR
            let totalDeduction = amountInINR + savingsAmount;
        
            if (totalDeduction > balance) {
                setAmountError("Not enough balance.");
                return false;
            }
        
            // Deduct from the selected card
            if (selectedCard === "card1") {
                setCard1(balance - totalDeduction);
                localStorage.setItem("card1", balance - totalDeduction);
            } else if (selectedCard === "card2") {
                setCard2(balance - totalDeduction);
                localStorage.setItem("card2", balance - totalDeduction);
            }
        
            // Update Piggy Bank
            let newPiggyBalance = parseFloat(piggyBank) + savingsAmount;
            setPiggyBank(newPiggyBalance);
            localStorage.setItem("piggyBank", newPiggyBalance);
        
            return { savingsAmount, amountInINR }; // ✅ Return both in INR
        };
        
        
        


        const validatepin=()=>
        {
            const storedpin=localStorage.getItem("pin");
            if(pin!==storedpin)
            {
                setPinError("Incorrect pin.");
                return false;   
            }
            setPinError("");
            return true;
        }

        const updateDatabase = async (payeeUser, savingsAmount, amountInINR) => {
            try {
                console.log("🔄 Fetching sender details from DB...");
                const senderResponse = await Axios.get(`http://localhost:3003/users?bankacc=${bankacc}`);
                console.log("✅ Sender Response:", senderResponse.data);
        
                if (senderResponse.data.length === 0) {
                    console.error("❌ Sender account not found in database.");
                    return false;
                }
        
                const senderUser = senderResponse.data[0];
        
                console.log("💰 Before Update - Sender Balance:", senderUser[selectedCard + "balance"]);
                console.log("💰 Before Update - Payee Balance:", payeeUser.card1balance);
        
                // Convert balances to float
                const senderUpdatedBal = parseFloat(senderUser[selectedCard + "balance"]) - amountInINR;
                const payeeUpdatedBal = parseFloat(payeeUser.card1balance) + amountInINR;
                const newPiggyBalance = (parseFloat(senderUser.piggyBank) || 0) + savingsAmount;
        
                // Update sender's balance
                senderUser[selectedCard + "balance"] = senderUpdatedBal.toString();
                senderUser.piggyBank = newPiggyBalance.toString();
        
                // Update payee's balance
                payeeUser.card1balance = payeeUpdatedBal.toString();
        
                console.log("💰 After Update - Sender Balance:", senderUpdatedBal);
                console.log("💰 After Update - Payee Balance:", payeeUpdatedBal);
                console.log("🐷 Updated Piggy Bank Balance:", newPiggyBalance);
        
                // Prepare transactions
                const transactionDate = new Date().toISOString().split("T")[0];
                const transactionTime = new Date().toLocaleTimeString();
        
                const sentTransaction = {
                    type: "sent",
                    to: payeeUser.bankacc,
                    toName: isAnonymous ? "Anonymous" : payeeUser.name,
                    amount: amountInINR.toFixed(2),
                    date: transactionDate,
                    time: transactionTime
                };
        
                const receivedTransaction = {
                    type: "received",
                    from: isAnonymous ? "Anonymous" : senderUser.bankacc,
                    fromName: isAnonymous ? "Anonymous" : senderUser.name,
                    amount: amountInINR.toFixed(2),
                    date: transactionDate,
                    time: transactionTime
                };
        
                const piggyBankTransaction = {
                    type: "piggy",
                    name: "Piggy Bank",
                    amount: savingsAmount.toFixed(2),
                    date: transactionDate,
                    time: transactionTime
                };
        
                senderUser.transactions = senderUser.transactions
                    ? [...senderUser.transactions, sentTransaction, piggyBankTransaction]
                    : [sentTransaction, piggyBankTransaction];
        
                payeeUser.transactions = payeeUser.transactions
                    ? [...payeeUser.transactions, receivedTransaction]
                    : [receivedTransaction];
        
                console.log("📡 Updating sender in database...");
                const senderUpdateResponse = await Axios.put(`http://localhost:3003/users/${senderUser.id}`, senderUser);
                console.log("✅ Sender Update Response:", senderUpdateResponse.data);
        
                console.log("📡 Updating payee in database...");
                const payeeUpdateResponse = await Axios.put(`http://localhost:3003/users/${payeeUser.id}`, payeeUser);
                console.log("✅ Payee Update Response:", payeeUpdateResponse.data);
        
                return true;
            } catch (error) {
                console.error("❌ Error updating database:", error);
                return false;
            }
        };
        
        
        
        
        


        const handlemakepayment = async () => {
            console.log("🚀 Starting transaction...");
            
            // Step 1: Validate account number and get payee details
            const payeeUser = await handleaccountnumber(accountNumber);
            console.log("✅ Payee User:", payeeUser);
            if (!payeeUser) {
                console.error("❌ Payee validation failed.");
                return;
            }
        
            // Step 2: Validate PIN
            if (!validatepin()) {
                console.error("❌ Incorrect PIN.");
                return;
            }
        
            // Step 3: Validate balance and deduct money
            let validationResult = validateanddeductbalance();
            console.log("✅ Validation Result:", validationResult);
            if (!validationResult) {
                console.error("❌ Balance validation failed.");
                return;
            }
        
            const { savingsAmount, amountInINR } = validationResult;
        
            // Step 4: Update database
            console.log("🔄 Updating database...");
            const success = await updateDatabase(payeeUser, savingsAmount, amountInINR);
            console.log("✅ Database update result:", success);
            
            if (!success) {
                alert("❌ Transaction failed! Please try again.");
                return;
            }
        
            // Step 5: Store transaction details
            console.log("📌 Storing transaction details...");
            const transaction = {
                type: "sent",
                to: isAnonymous ? "Anonymous" : payeeUser.bankacc,
                toName: isAnonymous ? "Anonymous" : payeeUser.name,
                amount: `${amount} ${currency} → ${amountInINR.toFixed(2)} INR`,
                piggyBankSaved: savingsAmount.toFixed(2),
                date: new Date().toISOString().split("T")[0],
                time: new Date().toLocaleTimeString(),
            };
        
            setSentTransactions((prev) => [...prev, transaction]);
        
            console.log("🎉 Payment successful!");
            alert(`Payment Successful! ₹${savingsAmount.toFixed(2)} saved in Piggy Bank.`);
            fetchTransactions();
            window.location.reload();
        };
        
        
        
        
        
        
        
         



        const fetchTransactions = async () => {
            try {
                const response = await Axios.get(`http://localhost:3003/users?bankacc=${bankacc}`);
                if (response.data.length > 0) {
                    const allTransactions = response.data[0].transactions || [];
        
                    allTransactions.sort((a, b) => {
                        const dateA = new Date(`${a.date} ${a.time}`);
                        const dateB = new Date(`${b.date} ${b.time}`);
                        return dateB - dateA; // Latest transactions first
                    });
        
                    // Store all transactions in one state
                    setSentTransactions(allTransactions);
                }
            } catch (error) {
                console.log("Error fetching transactions", error);
            }
        };
        
        useEffect(() => {
            fetchTransactions();
        }, [bankacc]);
        
        useEffect(() => {
            const fetchPiggyBankBalance = async () => {
                try {
                    const response = await Axios.get(`http://localhost:3003/users?bankacc=${bankacc}`);
                    if (response.data.length > 0) {
                        const user = response.data[0];
                        setPiggyBank(user.piggyBank || "0");
                    }
                } catch (error) {
                    console.error("Error fetching piggy bank balance:", error);
                }
            };
        
            fetchPiggyBankBalance();
        }, [bankacc]);  
        
        
        const handleWithdrawPiggyBank = async () => {
            if (parseFloat(piggyBank) < 2000) {
                alert("Not enough balance in Piggy Bank.");
                return;
            }
        
            let updatedCard1Balance = parseFloat(card1) + 2000;
            let updatedPiggyBank = parseFloat(piggyBank) - 2000;
        
            setCard1(updatedCard1Balance);
            setPiggyBank(updatedPiggyBank);
        
            // Update localStorage
            localStorage.setItem("card1", updatedCard1Balance);
            localStorage.setItem("piggyBank", updatedPiggyBank);
        
            const transactionDate = new Date().toISOString().split("T")[0];
            const transactionTime = new Date().toLocaleTimeString();
        
            const piggyWithdrawTransaction = {
                type: "piggy-withdraw",
                name: "Piggy Bank → Card 1",
                amount: "2000",
                date: transactionDate,
                time: transactionTime
            };
        

            setSentTransactions(prev => [piggyWithdrawTransaction, ...prev]);
        
            try {
                const response = await Axios.get(`http://localhost:3003/users?bankacc=${bankacc}`);
                if (response.data.length > 0) {
                    const user = response.data[0];
                    user.card1balance = updatedCard1Balance.toString();
                    user.piggyBank = updatedPiggyBank.toString();
        
                    user.transactions = user.transactions ? [piggyWithdrawTransaction, ...user.transactions] : [piggyWithdrawTransaction];
        
                    await Axios.put(`http://localhost:3003/users/${user.id}`, user);
                    alert("₹2000 has been transferred from Piggy Bank to Card 1.");
                }
            } catch (error) {
                console.error("Error updating balances:", error);
            }
        };
        
        

        
        return (
            <div className="paymentdashboard">
                <div className="payment-header-container">
                    <img className="registerlogo" src={NavBarLogo} alt="Logo" width={150} />
                    <h2 className="dashboardhead">Hello,{name}</h2>
                    <div className="date-container">
                    <Calendar className="calendar-icon" size={18} />
                    <span className="date-text">Today {formattedDate}</span>
                    </div>
                    <Link to="/" onClick={() => localStorage.removeItem("piggyBank")} style={{ color:"black",marginLeft:"40px" }}>
                        <span>Logout</span>
                    </Link>
                </div>


                <div className="logindashboardcontents">
                    <div className="logindashleft">
                        <div className="paymentdashcards">
                            <h3 className="transactions-heading" >My Cards</h3>
                            <div className="paymentdashcardsposn">
                            <div className="card1" style={{marginLeft:"0px"}}>
                                <div>
                                    <p className="cardholdername">Sidakpay&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹</p>
                                    <p className="cardbalance">Total Balance: <br />
                                        ₹{formatAmount(card1)}
                                    <p className="cardbankaccnumber"  style={{ marginLeft: "106px", fontSize:"5px",padding:"0",marginTop:"-15px" }}>{formatBankAcc(bankacc)}</p>
                                    </p>
                                </div>
                            </div>
                            <div className="card2">
                                <div>
                                    <p className="cardholdername">Sidakpay&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div className="mastercardcircle1" ><div className="mastercardcircle2"></div></div></p>
                                    <p className="cardbalance">Total Balance: <br />
                                        ₹{formatAmount(card2)}
                                    <p className="cardbankaccnumber"  style={{ marginLeft: "106px", fontSize:"5px",padding:"0",marginTop:"-15px" }}>{formatBankAcc(creditacc)}</p>
                                    </p>
                                </div>
                            </div>
                            </div>
                        </div>


                        {/* Transactions Section */}
                        <div className="piggybank">
                            <div style={{display:"flex"}}>
                                <img src={piglogo} alt="Logo" width={60} height={60} style={{marginRight:"10px"}} />
                                <h3>Piggy Bank Savings</h3>
                            </div>
                            <p style={{color:"green", fontWeight:"500",fontSize:"23px"}}>+₹{formatAmount(piggyBank)}</p>
                            <button 
                               onClick={handleWithdrawPiggyBank} 
                               style={{ display: "block", marginTop: "10px", padding: "10px 20px", fontSize: "20px", background: "blue", color: "white" }}>
                               Withdraw ₹2000 to Card 
                           </button>
                        </div>

                    </div>




                    <div className="logindashright">
                        <div className="paymentdetails">
                        <h3 className="transactions-heading" >Make Payment</h3>
                        <label htmlFor="">Payee Account Number</label><br />
                        <input type="text" placeholder="Enter account number" value={accountNumber} onChange={handleaccountnumber} maxLength={12}/><br />
                        {payeeName && <p style={{ color: "green", fontSize:"14px",fontWeight:"500" }}>Account number verified.Payee Name: {payeeName}</p>}
                        {accountError && <p style={{ color: "red", fontSize:"14px",fontWeight:"500" }}>{accountError}</p>}
                        
                        
                        <label htmlFor="">Select your card</label> <br />
                        <label style={{fontSize:"15px",marginRight:"30px"}}>
                            <input type="radio" name="card" value="card1" onChange={(e)=>setSelectedCard(e.target.value)} style={{height:"15px", width:"15px"}}/>
                            Card 1
                        </label>


                        <label style={{fontSize:"15px"}}>
                            <input type="radio" name="card" value="card2" onChange={(e)=>setSelectedCard(e.target.value)} style={{height:"15px", width:"15px"}}/>
                            Card 2
                        </label><br />  
                        {cardError && <p style={{ color: "red", fontSize: "14px" }}>{cardError}</p>}
                        
                        <label>Select Currency</label><br />
                        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                            <option value="INR">Indian Rupee (INR)</option>
                            <option value="USD">US Dollar (USD)</option>
                            <option value="EUR">Euro (EUR)</option>
                        </select><br />

                        <label htmlFor="">Enter amount</label><br />
                        <input type="text" placeholder="Enter amount" value={amount}  onChange={(e) => {
                            let rawValue = e.target.value.replace(/,/g, ""); // Remove existing commas
                            if (!isNaN(rawValue) && rawValue !== "") {
                                setAmount(Number(rawValue).toLocaleString("en-IN")); // Add commas while typing
                            } else {
                                setAmount("");
                            }
                            }}
                            onBlur={(e) => setAmount(amount.replace(/,/g, ""))} // Remove commas when user leaves input field/><br />
                            /><br />
                        {amountError && <p style={{ color: "red", fontSize: "14px" }}>{amountError}</p>}


                        <label htmlFor="">Enter your pin</label><br />
                        <input type="text" placeholder="Enter pin" value={pin} onChange={(e)=>setPin(e.target.value)}/> 
                        {pinError && <p style={{ color: "red", fontSize: "14px" ,padding:"0"}}>{pinError}</p>} <br />
                        

                        <label style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                            <input
                                type="checkbox"
                                checked={isAnonymous}
                                onChange={() => setIsAnonymous(!isAnonymous)}
                                style={{ marginRight: "5px", width: "15px", height: "15px" }}
                            />
                            Make this payment anonymous
                        </label>


                        <button onClick={handlemakepayment} style={{marginTop:"10px"}}>Make Payment</button>

                        </div>
                        <div className="transactions-container">
                            <h3 className="transactions-heading">Recent Transactions</h3>

                            {sentTransactions.length === 0 ? (
                                <p className="no-transactions">No transactions found</p>
                            ) : (
                                <div className="transactions-list">
                                    {sentTransactions.map((txn, index) => (
                                        <div key={index} className="transaction-card">
                                            <div className="transaction-row">
                                                <span className="transaction-name">
                                                    {txn.type === "sent"
                                                        ? `To: ${txn.toName}`
                                                        : txn.type === "received"
                                                        ? `From: ${txn.fromName}`
                                                        : txn.type === "piggy-withdraw"
                                                        ? "Piggy Bank → Card 1"
                                                        : "Piggy Bank"}
                                                </span>
                                                <span className="transaction-amount"
                                                    style={{ color: txn.type === "sent" || txn.type === "piggy-withdraw" ? "red" : "green" }}>
                                                    {txn.type === "sent" || txn.type === "piggy-withdraw" ? `- ₹${txn.amount}` : `+ ₹${txn.amount}`}
                                                </span>
                                            </div>
                                            <span className="transaction-date">{txn.date} | {txn.time}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>  
                </div>
            </div>
        );
    }
