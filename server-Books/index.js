const express = require('express');
const cors = require('cors'); // Importing CORS middleware
const app = express();
const port = 5000;

// Use CORS middleware if you're accessing this API from a different origin (like React on localhost:3000)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());  // This is important to parse the body of POST requests

// Sample data to send as JSON
let books = [
  {
    id: 1,
    image: "https://m.media-amazon.com/images/I/81gTRv2HXrL._SY522_.jpg",
    bookName: "Can't Hurt Me",
    author: "David Goggins",
    message: "An inspiring story of resilience and overcoming adversity.",
  },
  {
    id: 2,
    image: "https://m.media-amazon.com/images/I/81BE7eeKzAL._SL1500_.jpg",
    bookName: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    message: "Challenges traditional views on wealth creation, emphasizing financial literacy and asset acquisition.",
  },
];

// Route to get all books
app.get('/books', (req, res) => {
  res.json(books);  // Send the books array as a JSON response
});

// Route to get a single book by its ID
app.get('/book/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);  // Extract the ID from the URL parameter
  const book = books.find(b => b.id === bookId);  // Find the book with the given ID

  if (book) {
    res.json(book);  // If the book is found, return it as JSON
  } else {
    res.status(404).json({ message: 'Book not found' });  // If the book is not found, return a 404 error
  }
});

// Route to add a new book (POST request)
app.post('/books', (req, res) => {
    const newBook = req.body;  // Get the new book data from the request body
    newBook.id = books.length + 1;  // Assign a new ID for the book
    books.push(newBook);  // Add the new book to the array
    res.status(201).json(newBook);  // Send back the newly added book as a JSON response
  });
  

// Route to update a book's message by its ID
app.put('/book/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10); // Extract the ID from the URL parameter
    
    // Find the index of the book by ID in the global books array
    const bookIndex = books.findIndex(b => b.id === bookId);
    
    if (bookIndex !== -1) {
      // If the book is found, remove it from the array
      books.splice(bookIndex, 1); // Remove the book from the array
  
      // Send a 200 OK response to indicate success
      res.status(200).send(); // You can optionally send a message here if needed
    } else {
      // If the book is not found, return a 404 error
      res.status(404).json({ message: 'Book not found' });
    }
  });
        
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
