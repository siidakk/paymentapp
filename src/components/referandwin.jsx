import React from "react";
import { Gift, Users, Coins, Share2, Award, Zap } from "lucide-react";

export function ReferPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 style={{textAlign:"center",marginBottom:"80px"}}>Refer And Win</h1>
      {/* Hero Section */}
      <div className="hero-section text-center mb-16">
        <h3 className="hero-title text-gray-900">Share & Earn with SidakPay</h3>
        <p className="hero-subtitle text-gray-600">
          Invite your friends and family to SidakPay and earn rewards for every successful referral. The more you share, the more you earn!
        </p>
        <button className="btn-primary">Get Your Referral Link</button>
      </div>

      {/* How It Works */}
      <div className="how-it-works mb-24 bg-dark text-white py-8">
        <h2 className="section-title text-center">How It Works</h2>
        <div className="flex justify-between items-center">
          {[ 
            { icon: <Share2 />, title: "1. Share Your Link", desc: "Get your unique referral link and share it with friends and family." },
            { icon: <Users />, title: "2. Friends Join", desc: "When they sign up using your link and make their first transaction." },
            { icon: <Gift />, title: "3. Both Get Rewarded", desc: "You and your friend both receive bonus rewards!" }
          ].map((item, index) => (
            <div key={index} className="info-card text-center">
              <div className="icon-container">{item.icon}</div>
              <h3 className="info-title">{item.title}</h3>
              <p className="info-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rewards Section */}
      <div className="rewards-section mb-24 bg-dark text-white py-8">
        <h2 className="section-title text-center">Exciting Rewards</h2>
        <div style={{backgroundColor:"white",borderRadius:"15px",padding:"40px"}} className="flex justify-between items-center">
          {[ 
            {
              icon: <Award style={{ width: "64px", height: "64px", color: "blue",marginLeft:"160px" }}/>,
              title: "For You",
              rewards: ["$30 bonus for each referral", "Extra rewards for multiple referrals", "Special milestone bonuses"]
            },
            {
              icon: <Gift style={{ width: "64px", height: "64px", color: "blue",marginLeft:"140px" }}/>,
              title: "For Your Friends",
              rewards: ["$20 welcome bonus", "No transaction fees for 30 days", "Premium features trial"]
            }
          ].map((item, index) => (
            <div key={index} className="reward-card text-center">
              <div className="flex items-center justify-start mb-4">{item.icon}</div>
              <h3 className="reward-title">{item.title}</h3>
              <ul className="reward-list" style={{listStyle:"none"}}>
                {item.rewards.map((reward, i) => (
                  <li key={i} className="reward-item">
                    <Coins  style={{ width: "32px", height: "32px", color: "blue" ,marginRight:"10px" }} className="reward-icon-small" />
                    <span>{reward}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials-section mb-24 bg-dark text-white py-8">
        <h2 className="section-title text-center">Success Stories</h2>
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((i) => (
            <div key={i} className="testimonial-card text-center">
              <div className="testimonial-header">
                <img src={`https://i.pravatar.cc/60?img=${i + 3}`} alt="User" className="testimonial-avatar" />
                <div>
                  <h4 className="testimonial-name">John Smith</h4>
                  <p className="testimonial-earnings">Earned ₹450 in rewards</p>
                </div>
              </div>
              <p className="testimonial-text">
                "I've referred 15 friends to SidakPay and earned amazing rewards. The process was super simple!"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section text-center">
        <h2 className="cta-title">Start Earning Today!</h2>
        <p className="cta-subtitle">Join our referral program and earn rewards for sharing SidakPay with your network</p>
        <button className="btn-light">Get Started Now</button>
      </div>
    </div>
  );
}

export default ReferPage;
