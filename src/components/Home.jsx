import { Footer } from "./home_comps/Footer";
import { Navbar } from "./home_comps/Navbar";
import { Slideshow } from "./home_comps/Slideshow";
import "./home_styles.css";

import Image1 from "../assets/ss1.png";
import Image2 from "../assets/ss2.png";
import Image3 from "../assets/ss3.png";
import Image4 from "../assets/ss4.png";
import { useState, useEffect } from "react";

export function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home-main">
      <Navbar />
      <div className="nav-margin">
        <Slideshow />   
        <section>
          <h1 style={{ textAlign: "center", fontSize: "50px" }}>Discover SIDAKPAY</h1>
          <p className="cardheader">
            Now send and request money using just a mobile number or UPI ID
          </p>
          <div className="card-container">
            <div className="card">
              <img className="cardimg" src={Image1} alt="Who can use SIDAKPAY?" />
              <h2 className="cardheading">Who can use SIDAKPAY?</h2>
              <p className="cardcontent">
                Anyone with a bank account, registered mobile number, and debit card.
              </p>
            </div>

            <div className="card">
              <img className="cardimg" src={Image2} alt="Who can I send money to?" />
              <h2 className="cardheading">Who can I send money to?</h2>
              <p className="cardcontent">
                Friends, relatives, online shopping, retailers, or merchants 
                (as long as they are on UPI). Transfer money to them using their VPA or via UPI QR.
              </p>
            </div>

            <div className="card">
              <img className="cardimg" src={Image3} alt="When can I use SIDAKPAY?" />
              <h2 className="cardheading">When can I use SIDAKPAY?</h2>
              <p className="cardcontent">SIDAKPAY is a 24x7 payment solution.</p>
            </div>

            <div className="card">
              <img className="cardimg" src={Image4} alt="Why should I use SIDAKPAY?" />
              <h2 className="cardheading">Why should I use SIDAKPAY?</h2>
              <p className="cardcontent">
                Simple and secure transactions on the go, in your preferred language.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />

      {/* Scroll-To-Top Button */}
      {isVisible && (
        <button 
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "10px 15px",
            fontSize: "20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width:"50px"
          }}
        >
          ↑
        </button>
      )}
    </div>
  );
}
