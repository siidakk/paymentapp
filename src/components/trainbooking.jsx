import React, { useState } from "react";

export function  TrainBooking (){
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [trainClass, setTrainClass] = useState("Sleeper");
    const [passengers, setPassengers] = useState(1);
    const [availableTrains, setAvailableTrains] = useState([]);
    const [selectedTrain, setSelectedTrain] = useState(null);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);

    // Dummy train data
    const trainsData = [
        { id: 1, name: "Rajdhani Express", time: "10:00 AM", price: 800 },
        { id: 2, name: "Shatabdi Express", time: "2:00 PM", price: 1000 },
        { id: 3, name: "Duronto Express", time: "6:30 PM", price: 1200 },
    ];

    const locations = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune"];

    // Function to search for available trains
    const searchTrains = () => {
        if (!source || !destination || !date) {
            alert("Please fill in all details.");
            return;
        }
        setAvailableTrains(trainsData);
    };

    // Function to handle train selection
    const bookTicket = (train) => {
        setSelectedTrain(train);
        setBookingConfirmed(true);
    };

    return (
        <div className="maindivtrain" style={{paddingBottom:"40px"}}>
            <h2 style={{textAlign:"center",margin:"0",paddingTop:"20px"}}>🚆 Train Ticket Booking</h2>
        <div className="train-booking-container">
            
            {!bookingConfirmed ? (
                <>
                    <div className="booking-form">
                    <label>Source:</label>
                        <select style={{backgroundColor:"white",color:"black",border:"1.8px solid black"}} value={source} onChange={(e) => setSource(e.target.value)}>
                            <option value="">Select Source</option>
                            {locations.map((location, index) => (
                                <option key={index} value={location}>{location}</option>
                            ))}
                        </select>

                        <label>Destination:</label>
                        <select style={{backgroundColor:"white",color:"black",border:"1.8px solid black"}} value={destination} onChange={(e) => setDestination(e.target.value)}>
                            <option value="">Select Destination</option>
                            {locations.map((location, index) => (
                                <option key={index} value={location}>{location}</option>
                            ))}
                        </select>

                        <label>Date of Travel:</label>
                        <input style={{backgroundColor:"white",color:"black",border:"1.8px solid black"}} type="date" value={date} onChange={(e) => setDate(e.target.value)} />

                        <label>Class:</label>
                        <select style={{backgroundColor:"white",color:"black",border:"1.8px solid black"}} value={trainClass} onChange={(e) => setTrainClass(e.target.value)}>
                            <option value="Sleeper">Sleeper</option>
                            <option value="AC 3 Tier">AC 3 Tier</option>
                            <option value="AC 2 Tier">AC 2 Tier</option>
                            <option value="AC 1 Tier">AC 1 Tier</option>
                        </select>

                        <label>Passengers:</label>
                        <input style={{backgroundColor:"white",color:"black",border:"1.8px solid black"}} type="number" min="1" value={passengers} onChange={(e) => setPassengers(e.target.value)} />

                        <button onClick={searchTrains}>Search Trains</button>
                    </div>

                    {/* Display Available Trains */}
                    {availableTrains.length > 0 && (
                        <div className="train-list">
                            <h3 style={{textAlign:"center"}}>Available Trains:</h3>
                            {availableTrains.map((train) => (
                                <div key={train.id} className="train-card">
                                    <p>🚄 <strong>{train.name}</strong></p>
                                    <p>Departure: {train.time}</p>
                                    <p>Price: ₹{train.price * passengers}</p>
                                    <button onClick={() => bookTicket(train)}>Book Now</button>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div className="confirmation">
                    <h3>🎟 Booking Confirmed!</h3>
                    <p>Train: <strong>{selectedTrain.name}</strong></p>
                    <p>Departure Time: {selectedTrain.time}</p>
                    <p>Class: {trainClass}</p>
                    <p>Passengers: {passengers}</p>
                    <p>Total Fare: ₹{selectedTrain.price * passengers}</p>
                    <button onClick={() => window.location.reload()}>Book Another Ticket</button>
                </div>
            )}
        </div>
        </div>
    );
};
