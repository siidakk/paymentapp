import React from "react";
import { Shield, Smartphone, CreditCard, Zap, Globe, Clock, CheckCircle } from "lucide-react";

export function CustomerPage() {
  return (
    <div className="container">
      {/* Hero Section */}
      <h1 style={{textAlign:"center",marginBottom:"70px"}}>SidakPay For Customer</h1>
      <section className="hero-section">
        <h3 className="hero-title">Transform Your Payment Experience</h3>
        <p className="hero-subtitle">
          Experience the future of payments with SidakPay. Send money, make purchases, and manage
          your finances with unmatched security and convenience.
        </p>
        <div className="button-group">
          <button className="primary-button">Get Started Free</button>
          <button className="secondary-button">Learn More</button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-grid">
        <div className="features-image">
          <img
            src="https://routemobile.b-cdn.net/wp-content/uploads/2022/09/Simplifying-payment-with-Omnicent.png"
            alt="Mobile payment"
            className="rounded-lg shadow-xl"
          />
        </div>
        <div className="features-list">
          <div className="feature-item">
            <Shield className="feature-icon" />
            <div>
              <h3 className="feature-title">Bank-Grade Security</h3>
              <p className="feature-description">
                Your transactions are protected with advanced encryption and multi-factor authentication.
              </p>
            </div>
          </div>
          <div className="feature-item">
            <Smartphone className="feature-icon" />
            <div>
              <h3 className="feature-title">Seamless Mobile Experience</h3>
              <p className="feature-description">
                Manage all your payments through our intuitive mobile app.
              </p>
            </div>
          </div>
          <div className="feature-item">
            <CreditCard className="feature-icon" />
            <div>
              <h3 className="feature-title">Flexible Payment Options</h3>
              <p className="feature-description">
                Link multiple payment methods or use your SidakPay balance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <h2 className="section-title">Why Choose SidakPay?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <Zap className="benefit-icon" />
            <h3 className="benefit-title">Instant Transfers</h3>
            <p className="benefit-description">Send and receive money instantly, 24/7.</p>
          </div>
          <div className="benefit-card">
            <Globe className="benefit-icon" />
            <h3 className="benefit-title">Global Reach</h3>
            <p className="benefit-description">Send money to over 100 countries.</p>
          </div>
          <div className="benefit-card">
            <Clock className="benefit-icon" />
            <h3 className="benefit-title">24/7 Support</h3>
            <p className="benefit-description">Our dedicated support team is always here to help.</p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section" style={{marginBottom:"50px"}}>
        <h2 className="section-title">Trusted by Millions</h2>
        <div className="testimonial-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-header">
                <img
                  src={`https://i.pravatar.cc/60?img=${i}`}
                  alt="User"
                  className="testimonial-avatar"
                />
                <div>
                  <h4 className="testimonial-name">Sarah Johnson</h4>
                  <p className="testimonial-role">Verified User</p>
                </div>
              </div>
              <p className="testimonial-text">
                "SidakPay has transformed how I handle my daily transactions. It's incredibly easy to
                use and secure."
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2 className="cta-title">Ready to Get Started?</h2>
        <p className="cta-subtitle">Join millions of users who trust SidakPay for their payment needs.</p>
        <button className="primary-button" style={{width:"300px"}}>Create Free Account</button>
      </section>
    </div>
  );
}

export default CustomerPage;
