import React from "react";
import "../App.css";
import { AiFillStar } from "react-icons/ai";

const DisplayProduct = (props) => {
  const products = props.products;
  const path = "http://localhost:5000/images/";
  return (
    <div className="product-container">
      {products.map((product) => (
        <div key={product._id} className="product">
          <img
            src={`${path}/${product.image}`}
            alt=""
            className="product-image"
          />
          <div className="product-brand">{product.brandName}</div>
          <div className="product-name">{product.name}</div>
          <div className="product-rating">
            <div>{product.rating}</div>
            <AiFillStar className="rating-logo" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayProduct;
