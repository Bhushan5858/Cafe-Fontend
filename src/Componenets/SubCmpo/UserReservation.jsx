import React, { useState, useEffect } from 'react';
import '../compocss/subcompoCss/userreservation.css';
import { useNavigate } from 'react-router-dom';

const UserReservation = () => {
  const [reservations, setReservations] = useState([]); // State for reservations
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchUserReservations = async () => {
      const token = localStorage.getItem('authToken'); // Retrieve the authToken

      if (!token) {
        console.error('No auth token found');
        return;
      }

      try {
        const response = await fetch('https://cafe-backend-ywnx.onrender.com/User/UserReservation', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include token in headers
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setReservations(data.Reservations); // Assuming the response has a 'reservations' field
      } catch (error) {
        console.error('Error fetching user reservations:', error);
        // Handle errors (e.g., show an error message)
      }
    };

    fetchUserReservations();
  }, []);

  return (
    <div className='userreservation-con'>
      <div className='con'>
        <div className='records'>
          <div className='navig'>
            <button onClick={() => navigate('/Home')}>Back To Home</button>
            <h1>My Reservation</h1>
          </div>

          <div className='info'>
            {reservations.length === 0 ? (
              <p>No reservations found.</p>
            ) : (
              reservations.map((reservation, index) => (
                <div className='data' key={index}>
                  <p>({index + 1})</p>
                  <p>Date : {reservation.date}</p>
                  <p>Time : {reservation.time}</p>
                  <p>People : {reservation.people}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserReservation;
