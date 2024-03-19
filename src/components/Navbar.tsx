import React, { useState, useEffect, FC } from "react";
import "./NavbarStyles.css";
import { Link } from "react-router-dom";
import SapphireLogo from "../assets/sapphirelogo.svg";

interface NavbarProps {
  handleScroll: (ref: React.RefObject<HTMLElement>) => void;
  homeRef: React.RefObject<HTMLElement>;
  bookNowRef: React.RefObject<HTMLElement>;
  amenitiesRef: React.RefObject<HTMLElement>;
  videoRef: React.RefObject<HTMLElement>;
  reviewsRef: React.RefObject<HTMLElement>;
  aboutRef: React.RefObject<HTMLElement>;
  contactFormRef: React.RefObject<HTMLElement>;
}

const Navbar: FC<NavbarProps> = (props: NavbarProps) => {
  const [clicked, setClicked] = useState(false);

  const handleMenuItemClick = () => {
    setClicked(false);
  };

  return (
    <nav className={`NavbarItems`}>
      <div className="menu-icons">
        <i className={"fas fa-bars"}></i>
      </div>

      <ul className={"nav-menu"}>
        <div className="navbar-logo">
          <img
            src={SapphireLogo}
            className="sapphire-logo-header"
            alt="Sapphire Logo"
          />
        </div>
        <li key="home">
          <Link
            onClick={() => {
              props.handleScroll(props.homeRef);
              handleMenuItemClick();
            }}
            className="nav-links"
            to="/#home"
          >
            Home
          </Link>
        </li>
        <li key="book">
          <Link
            onClick={() => {
              props.handleScroll(props.bookNowRef);
              handleMenuItemClick();
            }}
            className="nav-links"
            to="/#book-now"
          >
            Book
          </Link>
        </li>
        <li>
          <Link
            onClick={() => {
              props.handleScroll(props.amenitiesRef);
              handleMenuItemClick();
            }}
            className="nav-links"
            to="/#"
          >
            Amenities
          </Link>
        </li>
        <li>
          <Link
            onClick={() => {
              props.handleScroll(props.videoRef);
              handleMenuItemClick();
            }}
            className="nav-links"
            to="/#"
          >
            Video Tour
          </Link>
        </li>
        <li>
          <Link
            onClick={() => {
              props.handleScroll(props.reviewsRef);
              handleMenuItemClick();
            }}
            className="nav-links"
            to="/#"
          >
            Reviews
          </Link>
        </li>
        <li>
          <Link
            onClick={() => {
              props.handleScroll(props.aboutRef);
              handleMenuItemClick();
            }}
            className="nav-links"
            to="/#"
          >
            About Us
          </Link>
        </li>
        <li key="contact">
          <Link
            onClick={() => {
              props.handleScroll(props.contactFormRef);
              handleMenuItemClick();
            }}
            className="nav-links"
            to="/#"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
