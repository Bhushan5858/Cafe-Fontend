import React, { useState, useEffect } from 'react';
import './../compocss/subcompoCss/allreservation.css';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';

const AllReservation = () => {
    const [animationData, setAnimationData] = useState(null);
    const [reservations, setReservations] = useState([]); // State for reservations
    const navigate = useNavigate(); 

    useEffect(() => {
        // Fetch animation data
        fetch('https://lottie.host/e51a2446-cd83-4aea-9f17-a7d248d8b682/iCJlNWBKIB.json')
            .then(response => response.json())
            .then(data => setAnimationData(data));

        // Fetch reservations
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        const token = localStorage.getItem('authToken'); // Retrieve the authToken

        if (!token) {
            console.error('No auth token found');
            return;
        }

        try {
            const response = await fetch('https://cafe-backend-ywnx.onrender.com/Admin/AdminReservation', {
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
            setReservations(data.Reservations); // Assuming the response has a 'Reservations' field
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    const handledonebtn = async (e) => {
        const Id = e.target.id;

        // Show confirmation dialog
        const result = await Swal.fire({
            title: 'Confirm Reservation',
            text: 'Are you sure you want to confirm this reservation?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, confirm it!',
            cancelButtonText: 'No, cancel!',
        });

        if (result.isConfirmed) {
            const ob = { Id: Id };
            console.log(ob);

            try {
                const doneresponse = await fetch('https://cafe-backend-ywnx.onrender.com/Admin/AdminDoneRes', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(ob),
                });

                if (!doneresponse.ok) {
                    throw new Error('Network response was not ok');
                }

                // Optionally handle response data if needed
                const data = await doneresponse.json();
                console.log('Response from server:', data);

                // Refresh reservations after marking as done
                fetchReservations();

                // Show success alert
                Swal.fire({
                    title: 'Confirmed!',
                    text: 'The reservation has been confirmed.',
                    icon: 'success',
                });

            } catch (err) {
                console.log(err);
                // Show error alert
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error confirming the reservation.',
                    icon: 'error',
                });
            }
        }
    };

    return (
        <>
            <div className='allres-con'>
                <div className='con'>
                    <div className='admin-panel'>
                        <div className='svg'> 
                            <div style={{ width: '100%', height: '100%' }}>
                                {animationData && <Lottie animationData={animationData} loop={true} />}
                            </div>
                        </div> 
                        <h1>Bhushan Patil</h1>
                        <h2>ADMIN</h2>
                        <div className='navig'>
                            <button className='btn' onClick={() => navigate('/AdminMenu')}>Menu</button>
                            <button className='btn' onClick={() => navigate('/Allreservation')}>All Reservation</button>
                            <button className='btn' onClick={() => navigate('/Home')}>Back To Home</button>
                        </div>
                    </div>
                    <div className='content'>
                        <div className='allres-info'>
                            <h1>All Reservation</h1>
                            <div className='records'>
                                {reservations.length === 0 ? (
                                    <p>No reservations found.</p>
                                ) : (
                                    reservations.map((reservation, index) => (
                                        <div className='data' key={index}>
                                            <p>{reservation.email}</p>
                                            <p>{reservation.phone}</p>
                                            <p>{reservation.date}</p>
                                            <p>{reservation.time}</p>
                                            <p>{reservation.people}</p>
                                            <button className='done-btn' id={reservation._id} onClick={handledonebtn}>Confirm</button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllReservation;
