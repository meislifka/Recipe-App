import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import '../tailwind.css'; // Import Tailwind CSS
import '../App.css';

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-[#b3924a]' : 'text-white'; // Set the active link color to blue, otherwise set it to the default color
  };

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };
  return (
    <div className="navbar">
      <Link to="/" className={`hover:text-[#b3924a] ${isActive('/')}`}>Home</Link>
      <Link to="/create-recipe" className={`hover:text-[#b3924a] ${isActive('/create-recipe')}`}>Create Recipe</Link>

      {!cookies.access_token ? (
        <>
          <Link to="/auth" className={`hover:text-[#b3924a] ${isActive('/auth')}`}>Login/Register</Link>
        </>
      ) : (
        <>
          <Link to="/saved-recipes" className={`hover:text-[#b3924a] ${isActive('/saved-recipes')}`}>Saved Recipes</Link>
          <button className="text-2xl ml-4" onClick={logout}> Logout </button>
        </>
      )}
    </div>
  );
};