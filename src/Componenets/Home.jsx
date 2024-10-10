import React from 'react'
import Navbar from './SubCmpo/Navbar'
import HeroSection from './SubCmpo/HeroSection'
import OurSpecial from './SubCmpo/OurSpecial'
import Reservation from './SubCmpo/Reservation'
import AboutUs from './SubCmpo/AboutUs'
import ContactUs from './SubCmpo/ContactUs'
const Home = () => {
    return(<>
     <Navbar/>
     <HeroSection/>
     <OurSpecial/>
     <Reservation/>
     <AboutUs/>
     <ContactUs/>
    
    </>)    
}

export default Home