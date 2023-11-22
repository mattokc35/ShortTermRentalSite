import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Book from "./routes/Book";
import Contact from "./routes/Contact";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
