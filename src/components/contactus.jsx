import { useState } from "react";
import locationIcon from "../assets/location-pin.png";
import phoneIcon from "../assets/phone-call.png";
import emailIcon from "../assets/communication.png";

export function ContactUs() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message Sent!");
    };

    return (
        <div className="contactus-main">
            <h1 className="contacthead">Contact Us</h1>
            <div className="contactmaindiv">
                <div className="contactdiv1">
                    <div className="contactrow">
                        <img className="contactlogosimage" src={locationIcon} alt="Location" />
                        <div className="contactinfo">
                            <h3 className="contactheadings">Address:</h3>
                            <p className="contactcontent">
                                Sidak Arora <br />
                                (CEO SIDAKPAY) <br />
                            </p>
                        </div>
                    </div>

                    <div className="contactrow">
                        <img className="contactlogosimage" src={phoneIcon} alt="Phone" />
                        <div className="contactinfo">
                            <h3 className="contactheadings">Mobile:</h3>
                            <p className="contactcontent">+91 9560757799</p>
                        </div>
                    </div>

                    <div className="contactrow">
                        <img className="contactlogosimage" src={emailIcon} alt="Email" />
                        <div className="contactinfo">
                            <h3 className="contactheadings">Email:</h3>
                            <a className="contactcontent" href="mailto:sidak@gmail.com">sidak@gmail.com</a>
                        </div>
                    </div>
                </div>

                <div className="contactdiv2">
                    <h2 style={{ marginLeft: "50px", marginTop: "40px" }}>Send Message</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="contactinputbox"
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                        /><br />
                        <input
                            className="contactinputbox"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        /><br />
                        <textarea
                            className="contactinputbox"
                            name="message"
                            placeholder="Type your Message..."
                            maxLength="256"
                            value={formData.message}
                            onChange={handleChange}
                        />
                        <button className="contactsubmitbutton" type="submit">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
