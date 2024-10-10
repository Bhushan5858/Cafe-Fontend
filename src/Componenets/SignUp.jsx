import React, { useState, useEffect } from 'react';
import './compocss/signup.css';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaGoogle, FaGithub } from 'react-icons/fa';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const vari1 = {
  hidden: {
    x: "-100vw"
  },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      delay: 0.5
    }
  }
};

const vari2 = {
  hidden: {
    x: "-100vw"
  },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      delay: 0.5,
      duration: 1.5
    },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut" }
    }
  }
};

const SignUp = () => {
  const [signupformdata, setsignupformdata] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  });

  const handlesignupChange = (e) => {
    const { name, value } = e.target;
    setsignupformdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlesignupSubmit = async (e) => {
    e.preventDefault();
    console.log('SignUp Form Submitted:', signupformdata);

    try {
      const response = await fetch('http://localhost:5000/User/SignUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupformdata),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response from server:', data);

      // Show success alert
      Swal.fire({
        title: 'Success!',
        text: 'You have signed up successfully!',
        icon: 'success',
        confirmButtonText: 'Okay'
      });

      setsignupformdata({
        username: '',
        email: '',
        phone: '',
        password: ''
      });

      navigate('/'); // Navigate to home or another page after successful signup

    } catch (error) {
      console.error('Error during signup:', error);
      // Show error alert
      Swal.fire({
        title: 'Error!',
        text: 'This Email Is Already Used,Please Try Again with Different Email',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    }
  };

  const [animationData, setAnimationData] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetch('https://lottie.host/30444200-c873-4810-8dcf-6ea3f3ac9226/HzfXYiBf3Y.json')
      .then(response => response.json())
      .then(data => setAnimationData(data));
  }, []);

  return (
    <div className='signup-con'>
      <div className='con'>
        <motion.div className='form-con'
          variants={vari1}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <form onSubmit={handlesignupSubmit}>
            <h1>Sign Up</h1>
            <div className='input'>
              {/* Username */}
              <input placeholder='Username'                                             
                type="text"
                name="username"
                value={signupformdata.username}
                onChange={handlesignupChange}
                required
              />

              {/* Email */}
              <input placeholder='Email'                                             
                type="email" // Use type="email" for email validation
                name="email"
                value={signupformdata.email}
                onChange={handlesignupChange}
                required
              />

              {/* Phone */}
              <input placeholder='Phone'                                             
                type="text"
                name="phone"
                value={signupformdata.phone}
                onChange={handlesignupChange}
                required
              />

              {/* Password */}
              <input placeholder='Create Password'                                             
                type="password" // Use type="password" for password
                name="password"
                value={signupformdata.password}
                onChange={handlesignupChange}
                required
              />
            </div>

            <button className='btn' type='submit'>Sign Up</button>

            <div className="signup-icons">
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
          <div style={{ width: '70%', height: '70%' }} className='visible'>
            {animationData && <Lottie animationData={animationData} loop={true} />}
          </div>
          <p>If you already created an account</p>
          <button className='btn' onClick={() => navigate('/')}>Sign In</button>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
