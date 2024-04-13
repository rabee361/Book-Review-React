import './App.css'
import BookInfo from './components/BookInfo'
import Books from './components/Books'
import Genres from './components/Genres'
import Reviews from './components/Reviews'
import { useState } from 'react'
import Gallery from './components/Gallery'
import Section1 from './components/Section1'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import Login from './components/Auth/Login'
import RelatedBooks from './components/RelatedBooks'
import Author from './components/Author'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage'
import SignUp from './components/Auth/SignUp'

function App() {
  const [bookId , setBookId] = useState(1)

  const getBook = (id) => {
    setBookId(id);
}


return (
    <Router>
      <div className="bg-amber-400 text-black dark:bg-gray-900 dark:text-gray-200 transition-all ease-linear duration-100">
          {/* <BookInfo bookId={bookId} /> */}
          <NavBar/>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/library" element={<Books />} />
            <Route path="/book/:bookId" element={<BookInfo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
          <Footer/>

      </div>

    </Router>

  )
}

export default App
