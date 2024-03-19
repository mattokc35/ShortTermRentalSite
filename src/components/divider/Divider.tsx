// Divider.tsx

import React, { FC, Ref } from "react";
import "./Divider.css"; // CSS for styling

interface DividerProps {
  title?: string;
}

const Divider: FC<DividerProps> = React.forwardRef(
  (props: DividerProps, ref: Ref<HTMLDivElement>) => {
    return (
      <div ref={ref} className="divider-container">
        <hr className="divider-line" />
        {props.title && <div className="divider-title">{props.title}</div>}
        <hr className="divider-line" />
      </div>
    );
  }
);

export default Divider;
