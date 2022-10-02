import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          LIBRARY
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/add-book">
                Books
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categories">
                Category
              </Link>
            </li>
          </ul>
          <div className="input-group">
  <div className="form-outline d-flex justify-align-center"  >
    <input id="search-input" type="search" id="form1" className="form-control mx-3" />
    <button className="btn btn-danger form-label" for="form1">Search</button>
  </div>
  <button id="search-button" type="button" className="btn btn-primary ">
    <i className="fas fa-search"></i>
  </button>
</div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
