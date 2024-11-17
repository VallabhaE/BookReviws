import React, { useEffect, useState } from 'react';
import NavBar from './navBar'; // Import Navbar component
import Book from './book'; // Import Book component
import NewBook from './newBook'; // Import NewBook form component
import axios from 'axios'; // Axios for HTTP requests
import BookData from './BookInfo'; // Import static books data

const Home = () => {
  const [books, setBooks] = useState(BookData); // Set initial books state with local data
  const [showNewBookForm, setShowNewBookForm] = useState(false); // Control visibility of NewBook form

  // Fetch books from the backend and modify the current books list
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/books');
        console.log('Fetched data from server:', response.data);
        
        // Update the books list with fetched data
        setBooks(response.data); 
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks(); // Call the function to fetch books on component mount
  }, []);

  // Function to add a new book
  const addNewBook = async (newBook) => {
    try {
      // Send POST request to add the new book
      const response = await axios.post('http://localhost:5000/books', newBook);
  
      // Add the new book directly to the current books list without combining with static data
      setBooks((prevBooks) => [...prevBooks, response.data]);  // Use response.data which is the newly added book
    } catch (error) {
      console.error('Error adding new book:', error);
    }
    setShowNewBookForm(false); // Close NewBook form after submission
  };
  
  // Show the NewBook form
  const handleAddNewBookClick = () => {
    setShowNewBookForm(true);
  };

  // Cancel adding a new book
  const handleCancel = () => {
    setShowNewBookForm(false);
  };

  return (
    <div>
      <NavBar addNewBook={addNewBook} />
      {showNewBookForm ? (
        <NewBook onSubmit={addNewBook} onCancel={handleCancel} />
      ) : (
        <div>
          <div className="container">
            <button onClick={handleAddNewBookClick} className="add-new-book-btn">
              Add New Book
            </button>
            {books.length > 0 ? (
              books.map((book) => (
                <Book
                  key={book.id}
                  link={book.id}
                  img={book.image}
                  bookName={book.bookName}
                  ID={book.id}
                />
              ))
            ) : (
              <p>No books available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
