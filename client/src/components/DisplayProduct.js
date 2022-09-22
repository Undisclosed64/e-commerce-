import React from "react";
import "../App.css";

const DisplayProduct = (props) => {
  const products = props.products;
  console.log(props.products);
  const path = "http://localhost:5000/images/";
  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>
          <img src={`${path}/${product.image}`} alt=""></img>
          <div>{product.name}</div>
        </div>
      ))}
    </div>
  );
};

export default DisplayProduct;
