import React, { useState } from "react";

export function BusBooking() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState("");
    const [passengers, setPassengers] = useState(1);
    const [buses, setBuses] = useState([]);
    const [selectedBus, setSelectedBus] = useState(null);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const [searched, setSearched] = useState(false);  // 👈 New state to track searches

    const locations = ["Bangalore", "Mumbai", "Delhi", "Jaipur", "Hyderabad", "Chennai", "Pune"];

    const availableBuses = [
        { id: 1, operator: "VRL Travels", from: "Bangalore", to: "Mumbai", price: 1200 },
        { id: 2, operator: "RedBus", from: "Delhi", to: "Jaipur", price: 800 },
        { id: 3, operator: "KSRTC", from: "Hyderabad", to: "Chennai", price: 950 },
    ];

    const searchBuses = () => {
        if (!from || !to || !date) {
            alert("Please enter all details!");
            return;
        }
        setSearched(true); // 👈 Mark that a search has been performed
        const filteredBuses = availableBuses.filter(
            (bus) => bus.from === from && bus.to === to
        );
        setBuses(filteredBuses);
    };

    const bookTicket = (bus) => {
        setSelectedBus(bus);
        setBookingConfirmed(true);
    };

    return (
        <div className="mainbusdiv" style={{paddingBottom:"140px"}}>
            <h2 style={{ textAlign: "center", margin: "0", paddingTop: "20px" }}>Book a Bus 🚌</h2>
            <div className="bus-booking">
                {!bookingConfirmed ? (
                    <>
                        <div className="booking-form">
                            <label>From: </label>
                            <select
                                style={{ backgroundColor: "white", color: "black", border: "1.8px solid black" }}
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                            >
                                <option value="">Select Source</option>
                                {locations.map((location, index) => (
                                    <option key={index} value={location}>
                                        {location}
                                    </option>
                                ))}
                            </select>

                            <label>To: </label>
                            <select
                                style={{ backgroundColor: "white", color: "black", border: "1.8px solid black" }}
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                            >
                                <option value="">Select Destination</option>
                                {locations.map((location, index) => (
                                    <option key={index} value={location}>
                                        {location}
                                    </option>
                                ))}
                            </select>

                            <label>Date: </label>
                            <input
                                style={{ backgroundColor: "white", color: "black", border: "1.8px solid black" }}
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />

                            <label>Passengers: </label>
                            <input
                                style={{ backgroundColor: "white", color: "black", border: "1.8px solid black" }}
                                type="number"
                                min="1"
                                value={passengers}
                                onChange={(e) => setPassengers(e.target.value)}
                            />

                            <button onClick={searchBuses}>Search Buses</button>
                        </div>

                        <div className="bus-list">
                            {buses.length > 0 ? (
                                <>
                                    <h3 style={{ textAlign: "center" }}>Available Buses:</h3>
                                    {buses.map((bus) => (
                                        <div key={bus.id} className="bus-card">
                                            <h4>{bus.operator}</h4>
                                            <p>{bus.from} → {bus.to}</p>
                                            <p>Price: ₹{bus.price * passengers}</p>
                                            <button onClick={() => bookTicket(bus)}>Book Now</button>
                                        </div>
                                    ))}
                                </>
                            ) : searched ? (  // 👈 Show "No buses found" only if a search was made
                                <p style={{ marginBottom: "110px", textAlign: "center" }}>No buses found. Try another route.</p>
                            ) : null}
                        </div>
                    </>
                ) : (
                    <div className="confirmation">
                        <h3>🎟 Booking Confirmed!</h3>
                        <p>Bus Operator: <strong>{selectedBus.operator}</strong></p>
                        <p>Route: {selectedBus.from} → {selectedBus.to}</p>
                        <p>Departure Date: {date}</p>
                        <p>Passengers: {passengers}</p>
                        <p>Total Fare: ₹{selectedBus.price * passengers}</p>
                        <button onClick={() => window.location.reload()}>Book Another Ticket</button>
                    </div>
                )}
            </div>
        </div>
    );
};
