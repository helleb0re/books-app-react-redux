import React from "react";
import { Link } from "react-router-dom";

import "./custom-link.css";

function CustomLink({ children, to, withUnderline = false }) {
  return (
    <Link className={"link" + (withUnderline ? ' link-underline' : '')} to={to}>
      {children}
    </Link>
  );
}

export default CustomLink;
