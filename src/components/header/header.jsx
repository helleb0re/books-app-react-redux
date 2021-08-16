import React from "react";
import CustomLink from "../custom-link";
import { Container } from "../help-components";

import "./header.css";

function Header() {
  return (
    <header className="header">
      <Container>
        <CustomLink to="/">
          <h1 className="header__title">Search for books</h1>
        </CustomLink>
      </Container>
    </header>
  );
}

export default Header;
