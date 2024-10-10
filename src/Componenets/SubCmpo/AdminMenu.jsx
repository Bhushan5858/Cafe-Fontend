import React, { useState, useEffect } from 'react';
import './../compocss/subcompoCss/adminmenu.css';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import demoimg from './../../Assets/coffes.jpg';
import Swal from 'sweetalert2'; // Import SweetAlert2

const AdminMenu = () => {
    const [animationData, setAnimationData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://lottie.host/e51a2446-cd83-4aea-9f17-a7d248d8b682/iCJlNWBKIB.json')
            .then(response => response.json())
            .then(data => setAnimationData(data));
    }, []);

    // Search form handling
    const [searchformdata, setsearchformdata] = useState("");
    const [searchResult, setSearchResult] = useState(null); // State for storing search results

    const handlesearchChange = (e) => {
        const value = e.target.value;
        setsearchformdata(value);
    };

    const handlesearchSubmit = async (e) => {
        e.preventDefault();
        console.log('Search Form Submitted:', searchformdata);

        try {
            const response = await fetch('http://localhost:5000/Admin/Menusearch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: searchformdata }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Search Result:', data);
            setSearchResult(data.item); // Store the search result in state

            // Show success alert
            Swal.fire({
                title: 'Search Successful!',
                text: 'Item found.',
                icon: 'success',
            });

        } catch (error) {
            console.error('Error fetching item:', error);
            // Show error alert
            Swal.fire({
                title: 'Error!',
                text: 'Item not found.',
                icon: 'error',
            });
        }

        setsearchformdata(''); // Clear the input
    };

    // Add form handling
    const [addformdata, setaddformdata] = useState({
        category: '',
        name: '',
        price: '',
        image: null,
    });

    const handleaddChange = (e) => {
        const { name, value, files } = e.target;
        setaddformdata((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleaddSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('category', addformdata.category);
        formData.append('name', addformdata.name);
        formData.append('price', addformdata.price);
        formData.append('image', addformdata.image); // Send the file directly

        try {
            const response = await fetch('http://localhost:5000/Admin/MenuAdd', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Response from server:', data);

            // Show success alert
            Swal.fire({
                title: 'Success!',
                text: 'Item added successfully.',
                icon: 'success',
            });

            // Clearing the entered data from fields
            setaddformdata({
                category: '',
                name: '',
                price: '',
                image: null,
            });
        } catch (error) {
            console.error('Error adding item:', error);
            // Show error alert
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add item.',
                icon: 'error',
            });
        }
    };

    // Update form handling
    const [updateformdata, setupdateformdata] = useState({
        oldname: '',
        category: '',
        name: '',
        price: '',
        image: null,
    });

    const handleupdateChange = (e) => {
        const { name, value, files } = e.target;
        setupdateformdata((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value, // If it's a file input, get the file, otherwise the value
        }));
    };

    const handleupdateSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('oldname', updateformdata.oldname);
        formData.append('category', updateformdata.category);
        formData.append('name', updateformdata.name);
        formData.append('price', updateformdata.price);
        formData.append('image', updateformdata.image); // Send the file directly

        console.log(updateformdata.image);

        try {
            const response = await fetch('http://localhost:5000/Admin/MenuUpdate', {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Update Response from server:', data);

            // Show success alert
            Swal.fire({
                title: 'Success!',
                text: 'Item updated successfully.',
                icon: 'success',
            });

            // Clear the form fields after successful update
            setupdateformdata({
                oldname: '',
                category: '',
                name: '',
                price: '',
                image: null,
            });
        } catch (error) {
            console.error('Error updating item:', error);
            // Show error alert
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update item.',
                icon: 'error',
            });
        }
    };

    // Delete form handling
    const [deleteformdata, setdeleteformdata] = useState({
        category: '',
        name: '',
    });

    const handledeleteChange = (e) => {
        const { name, value } = e.target;
        setdeleteformdata((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handledeleteSubmit = async (e) => {
        e.preventDefault();
        console.log('Delete Form Data Submitted:', deleteformdata);

        try {
            const response = await fetch('http://localhost:5000/Admin/MenuDelete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: deleteformdata.name,
                    category: deleteformdata.category,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Delete Response from server:', data);

            // Show success alert
            Swal.fire({
                title: 'Success!',
                text: 'Item deleted successfully.',
                icon: 'success',
            });

            // Clear the form fields after successful delete
            setdeleteformdata({
                name: '',
                category: '',
            });
        } catch (error) {
            console.error('Error deleting item:', error);
            // Show error alert
            Swal.fire({
                title: 'Error!',
                text: 'Failed to delete item.',
                icon: 'error',
            });
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
                        <div className='up'>
                            <div className='search'>
                                <h2>Search Item</h2>
                                <form onSubmit={handlesearchSubmit}>
                                    {/* Item name */}
                                    <input
                                        placeholder='Item Name'
                                        type="text"
                                        name="name"
                                        value={searchformdata}
                                        onChange={handlesearchChange}
                                        required
                                    />
                                    <button className='btn' type="submit">Search</button>
                                </form>
                                <div className='info'>
                                    {searchResult ? (
                                        <>
                                            <h3>Category: {searchResult.category}</h3>
                                            <h3>Name: {searchResult.name}</h3>
                                            <h3>Price: ${searchResult.price}</h3>
                                            {searchResult.image && (
                                                <img src={`http://localhost:5000/uploads/${searchResult.image}`} alt={searchResult.name} height="40%" width="100%" />
                                            )}
                                        </>
                                    ) : (
                                        <img src={demoimg} height="50%" width="100%" alt='coffee' />
                                    )}
                                </div>
                            </div>

                            <div className='add'>
                                <h2>Add Item</h2>
                                <form onSubmit={handleaddSubmit}>
                                    {/* Category */}
                                    <input placeholder='Enter Category: Coffee, Tea, Snack'
                                        type="text"
                                        name="category"
                                        value={addformdata.category}
                                        onChange={handleaddChange}
                                        required
                                    />
                                    {/* Item name */}
                                    <input placeholder='Item Name'
                                        type="text"
                                        name="name"
                                        value={addformdata.name}
                                        onChange={handleaddChange}
                                        required
                                    />
                                    {/* Price */}
                                    <input placeholder='Price'
                                        type="number"
                                        name="price"
                                        value={addformdata.price}
                                        onChange={handleaddChange}
                                        required
                                    />
                                    {/* Select Image */}
                                    <input placeholder='Select Image'
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleaddChange}
                                        required />
                                    <button className='btn' type="submit">ADD</button>
                                </form>
                            </div>
                        </div>

                        <div className='down'>
                            <div className='update'>
                                <h2>Update</h2>
                                <form onSubmit={handleupdateSubmit}>
                                    {/* Old Name */}
                                    <input placeholder='Old Name Of Item'
                                        type="text"
                                        name="oldname"
                                        value={updateformdata.oldname}
                                        onChange={handleupdateChange}
                                        required
                                    />
                                    <input placeholder='New Category'
                                        type="text"
                                        name="category"
                                        value={updateformdata.category}
                                        onChange={handleupdateChange}
                                        required
                                    />
                                    {/* New Item Name */}
                                    <input placeholder='New Item Name'
                                        type="text"
                                        name="name"
                                        value={updateformdata.name}
                                        onChange={handleupdateChange}
                                        required
                                    />
                                    {/* New Price */}
                                    <input placeholder='New Price'
                                        type="number"
                                        name="price"
                                        value={updateformdata.price}
                                        onChange={handleupdateChange}
                                        required
                                    />
                                    {/* Select New Image */}
                                    <input placeholder='Select New Image'
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleupdateChange}
                                        required />
                                    <button className='btn' type="submit">Update</button>
                                </form>
                            </div>

                            <div className='delete'>
                                <h2>Delete</h2>
                                <form onSubmit={handledeleteSubmit}>
                                    {/* Item name */}
                                    <input 
                                        type="text" 
                                        placeholder='Enter Name' 
                                        name="name"  // Bind the name to state
                                        value={deleteformdata.name}  // Set value from state
                                        onChange={handledeleteChange}
                                        required
                                    />
                                    {/* Category */}
                                    <input 
                                        type="text" 
                                        placeholder='Category' 
                                        name="category"  // Bind the category to state
                                        value={deleteformdata.category}  // Set value from state
                                        onChange={handledeleteChange}
                                        required
                                    />
                                    <button className='btn' type='submit'>Delete</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminMenu;
