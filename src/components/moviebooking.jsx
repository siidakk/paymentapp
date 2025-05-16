import { useState,useEffect } from "react";
import img1 from "../assets/landofmine.jpeg";
import img2 from "../assets/chava.jpeg";
import img3 from "../assets/xmen.jpg";


export function MovieBooking() {

    const images = [img1,img2,img3];
    const showtimes = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"];
    const [startIndex, setStartIndex] = useState(0);
    const totalImages = images.length;

    const movies = [
        { id: 1, title: "Chhaava", price: 250 },
        { id: 2, title: "X Men", price: 300 },
        { id: 3, title: "Lanf Of Mine", price: 200 },
    ];
    
    const nextSlide = () => {
        setStartIndex((prevIndex) => (prevIndex + 3) % totalImages);
    };
    
    const prevSlide = () => {
        setStartIndex((prevIndex) => (prevIndex - 3 + totalImages) % totalImages);
    };
    
    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, []);


    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedShowtime, setSelectedShowtime] = useState("");
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const toggleSeat = (seatNumber) => {
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
        } else if (selectedSeats.length < 5) {
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };

    const handlePayment = () => {
        if (!selectedMovie || !selectedShowtime || selectedSeats.length === 0) {
            alert("Please select movie, showtime, and at least one seat.");
            return;
        }
        setPaymentSuccess(true);
    };

    return (

        <div>
        <div className="slideshow-container2">
            {/* <button className="nav-button left" onClick={prevSlide}>❮</button> */}

            <div className="slideshow2">
                {images.slice(startIndex, startIndex + 3).map((img, index) => (
                    <img key={index} src={img} alt={`Slide ${index}`} className="slide" />
                ))}
            </div>

            {/* <button className="nav-button right" onClick={nextSlide}>❯</button> */}
        </div>
        <div className="movie-booking">
            <h2 style={{margin:"0"}}>Book Your Movie Ticket 🎬</h2>
            
            <div className="selection">
                <label className="movie-labels">Choose a Movie:  </label> 
                <select className="selectionboxes" onChange={(e) => setSelectedMovie(movies.find(m => m.id == e.target.value))}>
                    <option value="">Select...</option>
                    {movies.map((movie) => (
                        <option key={movie.id} value={movie.id}>{movie.title} - ₹{movie.price}</option>
                    ))}
                </select>
            </div>

            <div className="selection">
                <label className="movie-labels">Showtime:  </label>
                <select className="selectionboxes" onChange={(e) => setSelectedShowtime(e.target.value)}>
                    <option value="">Select...</option>
                    {showtimes.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>
            </div>

            <div className="seat-selection">
                <label>Pick Your Seats (Max 5):</label>
                <div className="seats">
                    {[...Array(20)].map((_, i) => (
                        <button
                            key={i}
                            className={selectedSeats.includes(i + 1) ? "seat selected" : "seat"}
                            onClick={() => toggleSeat(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>

            <button onClick={handlePayment} className="pay-btn">Pay ₹{selectedMovie ? selectedMovie.price * selectedSeats.length : 0}</button>

            {paymentSuccess && <p className="success"><h3 style={{margin:"0px"}}>✅ Booking Confirmed! Enjoy your movie! 🍿</h3></p>}
        </div>
        </div>
    );
}
