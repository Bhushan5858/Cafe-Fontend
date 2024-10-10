import React from 'react';
import { motion } from 'framer-motion';
import './../compocss/subcompoCss/herosection.css';

const HeroSection = () => {

  

    return (
        <div className="hero-section" id='herosection'>
            <div className="hero-text">
                <motion.h1
                    initial={{ y: '-100vh' }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 50 }}
                    className='heroh1'
                >
                    Open up your senses with a cup of fresh coffee
                </motion.h1>
                <motion.p
                    initial={{ x: '-100vw' }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 50 }}
                    className='herop'
                >
                    Our mission is to provide hand-picked quality coffee. Great coffee is our passion, and we want to share it with you.
                </motion.p>
               <a href='#reservation'> <motion.button 
                    className="reservation-button"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                >
                    Make a Reservation
                </motion.button></a>
            </div>
       
        </div>
    );
}

export default HeroSection;
