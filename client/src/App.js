import React from "react";
import "./App.css";
import CreateProduct from "./components/CreateProduct";
import DisplayProduct from "./components/DisplayProduct";
import axios from "axios";
import Carousel from "./components/Carousel";
import { Component3 } from "./components/Component3";

import { MdAccountCircle } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { useState, useCallback } from "react";

const App = () => {
  const [products, setProducts] = React.useState(null);
  const [name, setName] = useState();
  const [singleProduct, setSingleProduct] = useState(null);
  const [suggestions, setSuggestions] = useState("");

  const images = [
    {
      url: "https://cdn.shopify.com/s/files/1/0270/0315/8570/files/banner-3_1600x.progressive.jpg?v=1663833787",
    },
    {
      url: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
    },
    {
      url: "https://img.freepik.com/free-psd/horizontal-banner-template-online-fashion-sale_23-2148585405.jpg?w=1060&t=st=1663946651~exp=1663947251~hmac=0f68ca214d975f03f82d10d5db0c5985a8c52dfaa9ce61b3a81231a3bad06c1d",
    },
  ];
  const images2 = [
    {
      url: "https://images.unsplash.com/photo-1587451527975-ce1f6218418f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8RnpvM3p1T0hONnd8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60",
      text: " Product 1",
    },
    {
      url: "https://images.unsplash.com/photo-1663763405972-d0e881c082a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8RnpvM3p1T0hONnd8fGVufDB8fHx8&auto=format&fit=crop&w=1100&q=60",
      text: " Product 2",
    },
    {
      url: "https://images.unsplash.com/photo-1645675368692-f283ea2fd608?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDR8RnpvM3p1T0hONnd8fGVufDB8fHx8&auto=format&fit=crop&w=1100&q=60",
      text: " Product 3",
    },
  ];

  const containerStyles = {
    width: "500px",
    height: "300px",
    margin: "0 auto",
  };

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
    //console.log(value);
    setName(value);
    if (value !== "") {
      try {
        const res = await axios.get(
          "https://calm-springs-54909.herokuapp.com/api/products",
          {
            params: {
              name: value,
            },
          }
        );
        //console.log(res.data);
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
      const res = await axios.get(
        "https://calm-springs-54909.herokuapp.com/api/products",
        {
          params: {
            name: name,
          },
        }
      );
      //console.log(res.data);
      setProducts(res.data);
      const input = document.querySelector(".searchInput");
      input.value = "";
      setSuggestions("");
    } catch (err) {}
  };
  const handleSingleSubmit = async (productName) => {
    try {
      const res = await axios.get(
        "https://calm-springs-54909.herokuapp.com/api/products",
        {
          params: {
            name: productName,
          },
        }
      );
      //console.log(res.data);
      setProducts(res.data);
      const input = document.querySelector(".searchInput");
      input.value = "";
      setSuggestions("");
    } catch (err) {}
  };
  return (
    <div className="app-container">
      <header>
        <div className="logo">Giftlab</div>
        <div className="searchBar">
          <input
            type="text"
            name="name"
            className="searchInput"
            placeholder="Search for products"
            onChange={(e) => optimizedFn(e.target.value)}
          />
          <div className="searchLogoParent" onClick={handleSubmit}>
            <BsSearch className="searchLogo" />
          </div>
        </div>
        <div className="account">
          <MdAccountCircle className="account-logo" /> My account
        </div>
      </header>
      {suggestions.length > 0 && (
        <div className="autocomplete">
          {suggestions.map((product, i) => (
            <div
              key={i}
              className="autocompleteItems"
              onClick={() => handleSingleSubmit(product.name)}
            >
              <span>{product.name}</span>
            </div>
          ))}
        </div>
      )}
      {/* <CreateProduct /> */}
      <div className="carousel-container">
        <Carousel slides={images} />
      </div>
      {products !== null ? <DisplayProduct products={products} /> : ""}
      <div style={containerStyles}>
        <Component3 data={images2} />
      </div>
    </div>
  );
};

export default App;
