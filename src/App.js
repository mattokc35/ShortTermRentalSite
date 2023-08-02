import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Book from './routes/Book';
import Contact from './routes/Contact';
import About from './routes/About';
import PrivateRoutes from './routes/PrivateRoutes';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/book" element={<Book/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
  
    </div>
  );
}

export default App;
