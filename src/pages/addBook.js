import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import axios from 'axios'; // Import axios for making HTTP requests
import NavBar from './navBar'; // Import NavBar component

const BookInfo = () => {
  const { id } = useParams(); // Get the id from the URL
  const [book, setBook] = useState(null); // State to store the book data
  const [newMessage, setNewMessage] = useState(''); // State to store the updated message
  const [loading, setLoading] = useState(true); // State to manage loading state
  const navigate = useNavigate(); // Use useNavigate for redirecting after the update

  // Fetch the book details when the component mounts or when the id changes
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/book/${id}`); // Fetch book details using id
        setBook(response.data); // Set the book to state
        setNewMessage(response.data.message); // Set initial message to the textarea
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching book:', error);
        setLoading(false); // Set loading to false even in case of an error
      }
    };

    fetchBook(); // Call the function to fetch book details
  }, [id]); // The effect will re-run when the id changes

  // Handle change in the message input
  const handleMessageChange = (event) => {
    setNewMessage(event.target.value); // Update newMessage state when user types
  };

  // Handle form submission to update the message
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    try {
      const updatedBook = { ...book, message: newMessage }; // Create updated book object
      await axios.put(`http://localhost:5000/book/${id}`, updatedBook); // Send PUT request to update book
      setBook(updatedBook); // Update the local state with the new book data
      alert('Message updated successfully!'); // Notify the user of the successful update
      navigate(`/book/${id}`); // Redirect to the updated book info page
    } catch (error) {
      console.error('Error updating message:', error);
      alert('Error updating message'); // Show error message if update fails
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
  }

  if (!book) {
    return <div>Book not found</div>; // Show if no book is found for the given id
  }

  return (
    <div>
      <NavBar />
      <div className="info">
        <div className="image">
          <img src={book.image} alt={book.bookName} />
        </div>

        <div className="details">
          <h3>{book.bookName}</h3>
          <p>{"Author: " + book.author}</p>

          {/* Form to submit the new message */}
          <form onSubmit={handleSubmit}>
            <textarea
              id="w3review"
              name="w3review"
              rows="10"
              cols="80"
              value={newMessage} // Bind the textarea to the newMessage state
              onChange={handleMessageChange} // Update state when user changes the message
              placeholder={`Write your review for "${book.bookName}" here...`}
            />

            <br />
            <button type="submit">Submit</button> {/* Submit button triggers the update */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
