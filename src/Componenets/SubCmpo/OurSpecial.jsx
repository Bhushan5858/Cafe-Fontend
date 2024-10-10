import React, { useEffect, useState } from 'react';
import './../compocss/subcompoCss/ourspecial.css';

const OurSpecial = () => {
    const [menuItems, setMenuItems] = useState([]); // Ensure initial state is an array

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch('http://localhost:5000/User/ShowMenu');
                const data = await response.json();
                console.log('Fetched menu data:', data); // Log the fetched data
                
                // Set menuItems to the menulist property
                setMenuItems(data.menulist);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        };

        fetchMenu();
    }, []);

    return (
        <div className='ourspecial-section' id='ourspecial'>
            <div className='ourspecial-con'>
                <h1>Menu</h1>
                <div className='special-items'>
                    {menuItems.length > 0 ? (
                        menuItems.map((item, index) => (
                            <div className='cards' key={index}>
                                <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} />
                                <p className='Name'>{item.name}</p>
                                <p className='price'>${item.price}</p>
                            </div>
                        ))
                    ) : (
                        <p>No menu items available.</p> // Fallback message
                    )}
                </div>
            </div>
        </div>
    );
}

export default OurSpecial;
