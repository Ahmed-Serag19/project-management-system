import React, { MouseEventHandler } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface CustomToggleProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const CustomToggle = React.forwardRef<HTMLButtonElement, CustomToggleProps>(
  ({ onClick }, ref) => (
    <button
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="btn btn-link p-0 m-0 border-0 shadow-none text-success"
    >
      <BsThreeDotsVertical />
    </button>
  )
);

export default CustomToggle;
