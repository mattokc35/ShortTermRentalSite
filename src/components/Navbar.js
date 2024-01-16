import { Component } from "react";
import "./NavbarStyles.css";
import { Link } from "react-router-dom";
import SapphireLogo from "../assets/sapphirelogo.svg";

class Navbar extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <nav className="NavbarItems">
        <div className="navbar-logo">
          <img src={SapphireLogo} className="sapphire-logo" alt="Sapphire Logo" />
        </div>

        <div className="menu-icons" onClick={this.handleClick}>
          <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>

        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          <li>
            <Link
              onClick={() => this.props.handleScroll(this.props.homeRef)}
              className="nav-links"
              to="/"
            >
              <i className="fa-solid fa-house"></i>
              Home
            </Link>
          </li>
          <li>
            <Link
              onClick={() => this.props.handleScroll(this.props.bookNowRef)}
              className="nav-links"
              to="/"
            >
              <i className="fa-solid fa-book"></i>
              Book
            </Link>
          </li>
          <li>
            <Link
              onClick={() => this.props.handleScroll(this.props.contactFormRef)}
              className="nav-links"
              to="/"
            >
              <i className="fa-solid fa-address-book"></i>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;