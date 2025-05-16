import React from "react";  

export function CustomerCare() {
  return (
    <div className="cc-main">
        <div>
            <h1 className="cchead">Customer Care</h1>
        </div>
        <div style={{textAlign:"left",marginLeft:"150px"}}>
            <h2>Need Help with Your SidakPay Account?</h2>
            <p>As a valued SidakPay user, your convenience and security are our top priorities. Whether you're 
                facing an issue with your account or need <br />assistance with transactions, our dedicated support
                 team is here to guide you through. Beyond traditional support, we offer an intelligent<br /> chatbot 
                designed to provide instant and convenient solutions right through the app. It's like having a 
                personal assistant, available anytime to <br />address your queries.</p>
        </div>
        <div style={{textAlign:"left",marginLeft:"150px"}}>
            <h2>Here's Why SidakPay Stands Out:</h2>
            <ul>
                <li>A seamless support experience through our app, with a smart chatbot ready to assist you 24 hours a day.</li>
                <br /><li>Multiple contact channels tailored to your preference, ensuring there's always a way for you to reach out.</li>
            </ul>
        </div><br /><br />

        <div className="ccbox1">
            <h2 style={{marginLeft:"20px"}}>How to Reach Out to SidakPay Across Various Channels?</h2>
            <ul>
                <li><h4>SidakPay App:</h4>
                Easily find all customer support options under the "Help & Support" section. Whether you prefer chat support, or email, or need our phone number, everything's a tap away. Get started with our support right after you've installed the app.</li>
                <li><h4>Phone:</h4>
                Our helpline numbers are available for your calls, providing direct assistance for any queries. Different services offer the most efficient ways to contact support. You can go to the Help & Support section to reach out to our support helplines.</li>
                <li><h4>Website:</h4>
                For FAQs, troubleshooting tips, and more, our website is the resource hub you need. Visit our blog for insightful guides and updates.</li>
            </ul>
        </div><br />
        <div className="ccbox1">
            <h2>SidakPay Customer Care Number and Support Details</h2>
            <p>Reach out 24/7 through various channels including phone, chatbot, and email for support on account issues,
                <br /> technical support, or to report suspicious activity.</p>
        </div><br /><br />
        <div className="ccbox1">
            <h2 style={{marginLeft:"20px"}}>FAQs</h2>
            <ul>
                <li><h4>How can you keep your SidakPay account safe?</h4>
                Use strong, unique passwords for your SidakPay account and keep your mobile number and email address updated. Don't share your password or OTP with anyone. Use secure internet connections and enable 2FA for added security. Log out of shared devices and keep your phone and app updated. Be cautious of phishing and fraud attempts.</li>
                <li><h4>How can I resolve issues with failed UPI transactions?</h4>
                If UPI transactions are failing, check internet connection, verify details, check balance, check
                 transaction limit, contact bank, try again later, check with UPI provider. Keep the bank and UPI app 
                 teams informed for further investigation.</li>
                <li><h4>Money transferred through SidakPay UPI but the receiver did not get it?</h4>
                Majority of UPI payments get successful instantly and money is added to the receiver’s bank
                 account at the moment itself. However, in rare circumstances which are beyond our control, like not 
                receiving a success message from NPCI or receiver bank within a stipulated time, transactions go
                 into a pending state. For pending cases, we keep checking the status with NPCI on a regular basis and 
                within 24 hours, we know the final status — success or failure of all payments. 
                For failed payments, all banks do a reconciliation and add the money back to your bank account within 2 working days.</li>
            </ul>
        </div><br /><br />
    </div>
  );
}

export default CustomerCare;
