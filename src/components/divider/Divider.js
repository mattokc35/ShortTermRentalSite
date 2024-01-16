// Divider.js

import React from "react";
import "./Divider.css"; // CSS for styling

const Divider = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="divider-container">
      <hr className="divider-line" />
      {props.title && <div className="divider-title">{props.title}</div>}
      <hr className="divider-line" />
    </div>
  );
});

export default Divider;
