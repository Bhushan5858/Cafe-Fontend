
import { motion } from 'framer-motion';
import './../compocss/subcompoCss/aboutus.css'
import { FaFacebook, FaInstagram, FaGoogle, FaGithub } from 'react-icons/fa';

const AboutUs = () => {
    
        return (
            <div className="aboutus-section" id='aboutus'>
                <div className="aboutus-text">
                    <motion.h1
                        initial={{ y: '-100vh' }}
                        animate={{ y: 0 }}
                        transition={{ type: "spring", stiffness: 50 }}
                        className='heroh1'
                    >
                        About Us
                    </motion.h1>
                    <motion.p
                        initial={{ x: '-100vw' }}
                        animate={{ x: 0 }}
                        transition={{ type: "spring", stiffness: 50 }}
                        className='herop'
                    >
                        Welcome to Cafe Hous, where every cup tells a story! Nestled in the heart of Surat, we pride ourselves on serving exceptional coffee made from the finest, ethically sourced beans. Our passion for quality extends to our delicious pastries and light bites, all crafted with love and local ingredients.
                    </motion.p>
                    <div className="about-icons">
                        <a href="www.facebook.com" className="icon"><FaFacebook /></a>
                        <a href="www.instagarm.com" className="icon"><FaInstagram /></a>
                        <a href="www.google.com" className="icon"><FaGoogle /></a>
                        <a href="www.github.com" className="icon"><FaGithub /></a>
                    </div>
                </div>
           
            </div>
        );
    }
    
    
  


export default AboutUs
