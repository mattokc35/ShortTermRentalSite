import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Book from "./routes/Book";
import Contact from "./routes/Contact";
import PrivateRoutes from "./routes/PrivateRoutes";
import { Provider } from "react-redux";
import store from "./store/store";


function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
    </Provider>
  );
}

export default App;
