import React, { useState } from "react";

export function FlightBooking() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState("");
    const [passengers, setPassengers] = useState(1);
    const [flights, setFlights] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);

    const availableFlights = [
        { id: 1, airline: "IndiGo", from: "Delhi", to: "Mumbai", price: 4500 },
        { id: 2, airline: "Air India", from: "Bangalore", to: "Delhi", price: 6500 },
        { id: 3, airline: "SpiceJet", from: "Mumbai", to: "Chennai", price: 4000 },
    ];

    const locations = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Kolkata"];

    const searchFlights = () => {
        if (!from || !to || !date) {
            alert("Please enter all details!");
            return;
        }
        const filteredFlights = availableFlights.filter(
            (flight) => flight.from === from && flight.to === to
        );
        setFlights(filteredFlights);
    };

    const bookTicket = (flight) => {
        setSelectedFlight(flight);
        setBookingConfirmed(true);
    };

    return (
        <div className="mainflightbooking">
            <h2 style={{ textAlign: "center", margin: "0", paddingTop: "20px" }}>Book a Flight ✈️</h2>
            <div className="flight-booking" style={{paddingBottom:"75px"}}>
                {!bookingConfirmed ? (
                    <>
                        <div className="booking-form">
                            <label>From: </label>
                            <select
                                style={{ backgroundColor: "white", color: "black", border: "1.8px solid black" }}
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                            >
                                <option value="">Select Departure</option>
                                {locations.map((city, index) => (
                                    <option key={index} value={city}>{city}</option>
                                ))}
                            </select>

                            <label>To: </label>
                            <select
                                style={{ backgroundColor: "white", color: "black", border: "1.8px solid black" }}
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                            >
                                <option value="">Select Destination</option>
                                {locations.map((city, index) => (
                                    <option key={index} value={city}>{city}</option>
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

                            <button onClick={searchFlights}>Search Flights</button>
                        </div>

                        <div className="flight-list">
                        {flights.length > 0 ? (
                            <>
                                <h3 style={{ textAlign: "center" }}>Available Flights:</h3>
                                {flights.map((flight) => (
                                    <div key={flight.id} className="flight-card">
                                        <h4>{flight.airline}</h4>
                                        <p>{flight.from} → {flight.to}</p>
                                        <p>Price: ₹{flight.price * passengers}</p>
                                        <button onClick={() => bookTicket(flight)}>Book Now</button>
                                    </div>
                                ))}
                            </>
                        ) : flights.length === 0 && from && to && date ? (
                            <p style={{ marginBottom: "0px", textAlign: "center" }}>
                                No flights found. Try another route.
                            </p>
                        ) : null}

                        </div>
                    </>
                ) : (
                    <div className="confirmation">
                        <h3>🎟 Booking Confirmed!</h3>
                        <p>Airline: <strong>{selectedFlight.airline}</strong></p>
                        <p>Route: {selectedFlight.from} → {selectedFlight.to}</p>
                        <p>Departure Date: {date}</p>
                        <p>Passengers: {passengers}</p>
                        <p>Total Fare: ₹{selectedFlight.price * passengers}</p>
                        <button onClick={() => window.location.reload()}>Book Another Ticket</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FlightBooking;
