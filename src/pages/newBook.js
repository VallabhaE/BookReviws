import React, { useState } from 'react';
import axios from 'axios';  // Import axios for HTTP requests

const NewBook = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    image: '',
    bookName: '',
    author: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.image && formData.bookName && formData.author && formData.message) {
      const newBook = {
        image: formData.image,
        bookName: formData.bookName,
        author: formData.author,
        message: formData.message,
      };

      try {
        // Sending a POST request to the server with the new book data
        const response = await axios.post('http://localhost:5000/books', newBook);
        console.log('New book added:', response.data);

        onSubmit(response.data);  // Pass the newly added book back to the parent component
        onCancel();  // Close the form after submission
      } catch (error) {
        console.error('Error adding book:', error);
        alert('There was an error adding the book!');
      }
    } else {
      alert('Please fill in all fields!');
    }
  };

  return (
    <div>
      <h2>Enter Book Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Image Link:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Book Name:</label>
          <input
            type="text"
            name="bookName"
            value={formData.bookName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default NewBook;
