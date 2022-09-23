import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { useState, useCallback } from "react";
import axios from "axios";

const Navbar = () => {
  const [name, setName] = useState();
  const [suggestions, setSuggestions] = useState("");

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const handleChange = async (value) => {
    if (value !== "") {
      try {
        const res = await axios.get("http://localhost:5000/api/products", {
          params: {
            name: value,
          },
        });
        console.log(res.data);
        setSuggestions(res.data);
      } catch (err) {}
    }
    if (value === "") {
      setSuggestions("");
    }
  };
  const optimizedFn = useCallback(debounce(handleChange), []);

  const handleSubmit = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products", {
        params: {
          name: name,
        },
      });
      console.log(res.data);
    } catch (err) {}
  };
  return (
    <div className="header-container">
      <header>
        <div className="logo">Logo</div>
        <div className="searchBar">
          <input
            type="text"
            name="name"
            placeholder="Search for products"
            onChange={(e) => optimizedFn(e.target.value)}
          />
          <div className="searchLogoParent" onClick={handleSubmit}>
            <BsSearch className="searchLogo" />
          </div>
        </div>
        <div className="account">
          My account
          <MdAccountCircle className="account-logo" />
        </div>
      </header>
      {suggestions.length > 0 && (
        <div className="autocomplete">
          {suggestions.map((product, i) => (
            <div key={i} className="autocompleteItems">
              {console.log(product.name)}
              <span>{product.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
