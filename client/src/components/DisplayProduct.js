import React from "react";
import "../App.css";
import { AiFillStar } from "react-icons/ai";

const DisplayProduct = (props) => {
  const products = props.products;
  const path = "https://calm-springs-54909.herokuapp.com/images/";
  return (
    <div className="product-container">
      {products.map((product) => (
        <div key={product._id} className="product">
          <img
            src={`${path}/${product.image}`}
            alt=""
            className="product-image"
          />
          <section className="product-info">
            <div className="product-brand">{product.brandName}</div>
            <div className="product-name">{product.name}</div>
            <div className="product-price">$249</div>
            <div className="product-rating">
              <div>{product.rating}</div>
              <AiFillStar className="rating-logo" />
            </div>
          </section>
        </div>
      ))}
    </div>
  );
};

export default DisplayProduct;
