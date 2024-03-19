import React from "react";
import "./Footer.css"; // Import your custom styles

interface FooterContent {
  name: string;
  description: string;
  address: string;
  email: string;
  phone: string;
}

const Footer: React.FC = () => {
  const footerContent: FooterContent = {
    name: "Sapphire By The Sea",
    description: "Beach House Short Term Rental",
    address: "Crystal Beach, Bolivar Peninsula, Texas",
    email: "Your-Email-Here",
    phone: "Your-Phone-Here",
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <p>{footerContent.name}</p>
          <p>{footerContent.description}</p>
        </div>
        <div className="footer-contact">
          <p>Contact Us:</p>
          <p>Address: {footerContent.address}</p>
          <p>Email: {footerContent.email}</p>
          <p>Phone: {footerContent.phone}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
