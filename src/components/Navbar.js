import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const naviagate = useNavigate();
  const logout = () => {
    localStorage.clear();
    naviagate("/signup");
  };
  return (
    <div>
      <img
        src="https://cdn.siasat.com/wp-content/uploads/2022/06/JustMyRoots.jpg"
        alt="logo"
        className="logo"
      />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Product</Link>
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          <li>
            <Link to="/update">Update Product</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/signup" onClick={logout}>
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Sign In</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
