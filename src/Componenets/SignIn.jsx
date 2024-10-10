import React, { useState, useEffect } from 'react';
import './compocss/signin.css';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaGoogle, FaGithub } from 'react-icons/fa';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// Motion animation
const vari1 = {
  hidden: { x: "100vw" },
  visible: {
    x: 0,
    transition: { type: 'spring', delay: 0.5 }
  }
};

const vari2 = {
  hidden: { x: "100vw" },
  visible: {
    x: 0,
    transition: { type: 'spring', delay: 0.5, duration: 1.5 }
  }
};

const SignIn = () => {
  // Handling signIn form
  const [signinformdata, setsigninformdata] = useState({
    email: '',
    password: ''
  });

  const handlesigninChange = (e) => {
    const { name, value } = e.target;
    setsigninformdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlesigninSubmit = async (e) => {
    e.preventDefault();
    console.log('SignIn Form Submitted:', signinformdata);

    try {
      const response = await fetch('https://cafe-backend-ywnx.onrender.com/User/SignIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signinformdata),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);

      // Check if a token is returned
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        console.log(localStorage.getItem('authToken'));

        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Sign In Successful',
          text: 'Welcome back!',
        });

        // Clear the entered data from fields
        setsigninformdata({ email: '', password: '' });
        // Navigate to the home page
        navigate('/Home');
      } else {
        // Show error alert for incorrect credentials
        Swal.fire({
          icon: 'error',
          title: 'Sign In Failed',
          text: data.err || 'Please check your credentials.',
        });
      }

    } catch (error) {
      console.error('Error during sign in:', error);
      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Wrong Email or Password. Please try again.',
      });
    }
  };

  const [animationData, setAnimationData] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetch('https://lottie.host/902e37b8-e7ac-47b2-8431-0b4a2450d593/DF32gaAkm0.json')
      .then(response => response.json())
      .then(data => setAnimationData(data));
  }, []);

  return (
    <div className='signin-con'>
      <div className='con'>
        <motion.div className='form-con'
          variants={vari1}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <form onSubmit={handlesigninSubmit}>
            <h1>Sign In</h1>
            <div className='input'>
              {/* Email */}
              <input placeholder='Email'
                type="email"
                name="email"
                value={signinformdata.email}
                onChange={handlesigninChange}
                required
              />

              {/* Password */}
              <input placeholder='Password'
                type="password"
                name="password"
                value={signinformdata.password}
                onChange={handlesigninChange}
                required
              />
            </div>

            <button className='btn' type='submit'>Sign In</button>

            <div className="signin-icons">
              <a href="https://www.facebook.com" className="icon"><FaFacebook /></a>
              <a href="https://www.instagram.com" className="icon"><FaInstagram /></a>
              <a href="https://www.google.com" className="icon"><FaGoogle /></a>
              <a href="https://www.github.com" className="icon"><FaGithub /></a>
            </div>
          </form>
        </motion.div>

        <motion.div className='svg'
          variants={vari2}
          initial="hidden"
          animate="visible"
        >
          <div className='signinsvg visible' >
            {animationData && <Lottie animationData={animationData} loop={true} />}
          </div>
          <p>If you don't have an account</p>
          <button className='btn' onClick={() => navigate('/SignUp')}>Sign Up</button>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
