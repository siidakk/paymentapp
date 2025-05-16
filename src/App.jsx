import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Registration } from './components/Registration';
import { Dashboard } from "./components/Dashboard";
import {PaymentDashboard} from "./components/Paymentdashboard"
import {ContactUs} from "./components/contactus"
import {CustomerCare} from "./components/customercare"
import {MovieBooking} from "./components/moviebooking"
import {TrainBooking} from "./components/trainbooking"
import {FlightBooking} from "./components/flightbooking"
import {BusBooking} from "./components/busbooking"
import {CustomerPage} from "./components/sidakpayforcustomer"
import {SidakPayBusiness} from "./components/sidakpayforbuisness"
import {ReferPage} from "./components/referandwin"


function App() {
  return (
    <BrowserRouter basename="/PaymentWebsite">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/logindashboard' element={<Dashboard />} />
        <Route path='/paymentdash' element={<PaymentDashboard/>}/>
        <Route path='/contactus' element={<ContactUs/>}/>
        <Route path='/customercare' element={<CustomerCare/>}/>
        <Route path='/moviebooking' element={<MovieBooking/>}/>
        <Route path='/trainbooking' element={<TrainBooking/>}/>
        <Route path='/flightbooking' element={<FlightBooking/>}/>
        <Route path='/busbooking' element={<BusBooking/>}/>
        <Route path='/sidakpayforcustomer' element={<CustomerPage/>}/>
        <Route path='/sidakpayforbuisness' element={<SidakPayBusiness/>}/>
        <Route path='/referandwin' element={<ReferPage/>}/>



      </Routes>
    </BrowserRouter>
  );
}

export default App;
