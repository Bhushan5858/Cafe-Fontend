import React, { useState, useEffect } from 'react';
import './../compocss/subcompoCss/reservation.css';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const vari1 = {
  hidden: { x: "-100vw" },
  visible: {
    x: 0,
    transition: { type: 'spring', delay: 0.5 }
  }
};

const vari2 = {
  hidden: { x: "-100vw" },
  visible: {
    x: 0,
    transition: { type: 'spring', delay: 0.5, duration: 1.5 },
    exit: { x: "-100vw", transition: { ease: "easeInOut" } }
  }
};

const Reservation = () => {
  // Handling reservation form
  const [reservationformdata, setreservationformdata] = useState({
    email: '',
    phone: '',
    date: '',
    time: '',
    people: ''
  });

  const handlereservationChange = (e) => {
    const { name, value } = e.target;
    setreservationformdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlereservationSubmit = async (e) => {
    e.preventDefault();
    console.log('Reservation Form Submitted:', reservationformdata);

    try {
      const response = await fetch('https://cafe-backend-ywnx.onrender.com/User/UserReservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationformdata),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response from server:', data);

      // Clearing the entered data from fields
      setreservationformdata({
        email: '',
        phone: '',
        date: '',
        time: '',
        people: ''
      });

      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Reservation Successful',
        text: 'Your table has been booked!',
      });

      // Navigate to the home page
      navigate('/Home');

    } catch (error) {
      console.error('Error during reservation:', error);
      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Reservation Failed',
        text: 'There was an error booking your table. Please try again later.',
      });
    }
  };

  const navigate = useNavigate(); // Hook for navigation
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('https://lottie.host/9900bc97-5afa-4506-a96e-bcc0e67001a0/Yc1a53b8f0.json')
      .then(response => response.json())
      .then(data => setAnimationData(data));
  }, []);

  return (
    <div className='res-con' id="reservation">
      <div className='con'>
        <motion.div className='form-con'
          variants={vari1}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <form onSubmit={handlereservationSubmit}>
            <h1>Reservation</h1>
            <div className='input'>
              {/* Email */}
              <input placeholder='Email'
                type="email" // Use type="email" for better validation
                name="email"
                value={reservationformdata.email}
                onChange={handlereservationChange}
                required
              />

              {/* Phone */}
              <input placeholder='Phone'
                type="tel" // Use type="tel" for phone numbers
                name="phone"
                value={reservationformdata.phone}
                onChange={handlereservationChange}
                required
              />

              {/* Date */}
              <input placeholder='Date'
                type="date"
                name="date"
                value={reservationformdata.date}
                onChange={handlereservationChange}
                required
              />

              {/* Time */}
              <input placeholder='Time'
                type="time"
                name="time"
                value={reservationformdata.time}
                onChange={handlereservationChange}
                required
              />

              {/* People */}
              <input placeholder='People'
                type="number"
                name="people"
                value={reservationformdata.people}
                onChange={handlereservationChange}
                required
              />
            </div>

            <button className='btn' type='submit'>Book Table</button>
          </form>
        </motion.div>

        <motion.div className='svg'
          variants={vari2}
          initial="hidden"
          animate="visible"
        >
          <div style={{ width: '100%', height: '100%' }}  className='visible'>
            {animationData && <Lottie animationData={animationData} loop={true} />}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Reservation;
