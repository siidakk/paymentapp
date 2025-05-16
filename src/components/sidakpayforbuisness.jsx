import React from "react";
import { BarChart, Globe, Clock, Shield, CreditCard, Zap, Users, Wallet } from "lucide-react";
import businessImage from "../assets/buisness_analytics.jpg";

export function SidakPayBusiness() {
  return (
    <div className="business-container">
        <h1>SidakPay For Buisness</h1>
      {/* Hero Section */}
      <div className="business-hero">
        <h1>🚀 Power Your Business with SidakPay</h1>
        <p>Accept payments, manage transactions, and scale your business with our secure and seamless solutions.</p>
        <div className="hero-buttons">
          <button className="primary-btn">Start Free Trial</button>
          <button className="secondary-btn">Contact Sales</button>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="features-text">
          <div className="feature">
            <Globe className="feature-icon" />
            <div>
              <h3>Global Payment Solutions</h3>
              <p>Accept payments from customers worldwide with multiple currency support.</p>
            </div>
          </div>
          <div className="feature">
            <BarChart className="feature-icon" />
            <div>
              <h3>Advanced Analytics</h3>
              <p>Track your business performance with real-time analytics and reports.</p>
            </div>
          </div>
          <div className="feature">
            <Clock className="feature-icon" />
            <div>
              <h3>Fast Settlements</h3>
              <p>Get payments settled into your account within 24 hours.</p>
            </div>
          </div>
        </div>
        <div className="features-image">
          <img src={businessImage} alt="Business analytics" />
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="solutions-section">
        <h2>🔹 Complete Business Solutions</h2>
        <div className="solutions-grid">
          <div className="solution-card">
            <Shield className="solution-icon" />
            <h3>Secure Transactions</h3>
            <p>PCI-DSS compliant with fraud protection.</p>
          </div>
          <div className="solution-card">
            <CreditCard className="solution-icon" />
            <h3>Multiple Payment Methods</h3>
            <p>Accept credit cards, UPI, and wallets.</p>
          </div>
          <div className="solution-card">
            <Zap className="solution-icon" />
            <h3>Quick API Integration</h3>
            <p>Seamless integration with your platform.</p>
          </div>
          <div className="solution-card">
            <Users className="solution-icon" />
            <h3>24/7 Support</h3>
            <p>Dedicated customer support for businesses.</p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="pricing-section">
        <h2>💰 Transparent Pricing</h2>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Starter</h3>
            <p>Best for small businesses</p>
            <div className="price">1.9% + ₹0.30</div>
            <button className="primary-btn">Get Started</button>
          </div>
          <div className="pricing-card featured">
            <h3>Professional</h3>
            <p>For growing businesses</p>
            <div className="price">1.5% + ₹0.25</div>
            <button className="secondary-btn">Get Started</button>
          </div>
          <div className="pricing-card">
            <h3>Enterprise</h3>
            <p>Custom pricing</p>
            <div className="price">Contact Sales</div>
            <button className="primary-btn">Contact Sales</button>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <h2>🚀 Ready to Transform Your Business?</h2>
        <p>Join thousands of businesses that trust SidakPay.</p>
        <div className="hero-buttons">
          <button className="primary-btn">Start Free Trial</button>
          <button className="secondary-btn">Schedule Demo</button>
        </div>
      </div>
    </div>
  );
}

export default SidakPayBusiness;
