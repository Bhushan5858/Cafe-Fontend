import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SignUp from './Componenets/SignUp';
import SignIn from "./Componenets/SignIn";
import Home from "./Componenets/Home";
import Profile from './Componenets/Profile'
import AdminMenu from './Componenets/SubCmpo/AdminMenu'
import AllReservation from "./Componenets/SubCmpo/AllReservation";
import UserReservation from "./Componenets/SubCmpo/UserReservation";
import { AnimatePresence } from 'framer-motion';


const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence>
      <Routes location={location} key={location.key}>
        <Route path="/" element={<SignIn />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/AdminMenu" element={<AdminMenu />} />
        <Route path="/AllReservation" element={<AllReservation />} />
        <Route path="/UserReservation" element={<UserReservation />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
