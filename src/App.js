import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  AddBook  from './pages/addBook'; // Make sure this matches the file name exactly
import Home from './pages/home'
import BookInfo from './pages/newBook'
import LoginPage from './pages/login'

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} /> 
    <Route path="/book/:id" element={<AddBook />} />
    <Route path="/book/new" element={<BookInfo />} />
    <Route path="/login" element={<LoginPage />} />
    

        </Routes>
  </BrowserRouter>
  );
}

export default App;
