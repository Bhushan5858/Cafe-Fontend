import React from 'react'
import './../compocss/subcompoCss/contactus.css'
import { motion } from 'framer-motion';
import './../compocss/subcompoCss/contactus.css'

const ContactUs = () => {
    
        return (
            <div className="contactus-section" id='contactus'>
                <div className="contactus-text">
                     <motion.h1
                        initial={{ y: '-100vh' }}
                        animate={{ y: 0 }}
                        transition={{ type: "spring", stiffness: 50 }}
                        className='heroh1'
                    >
                        Contact Us
                    </motion.h1>
        <form>
          <input type="email" placeholder="Email" />
          <input type="phone" placeholder="Phone Number" />
          <input type="textarea" placeholder="Your Message" />
          <button type="submit">Send</button>
        </form>
      </div>
                  
                </div>
           
        
        );
    }
    
    
  


export default ContactUs
