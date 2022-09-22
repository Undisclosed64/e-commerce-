import React from "react";
import "../App.css";
import axios from "axios";
import DisplayProduct from "./DisplayProduct";
import { useState } from "react";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    description: "",
    rating: "",
    quantity: "",
  });
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      name: formData.name,
      brandName: formData.brandName,
      description: formData.description,
      rating: formData.rating,
      quantity: formData.quantity,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newProduct.image = filename;

      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {}
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/products",
        newProduct
      );
      <DisplayProduct />;
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Create product</h1>
      <form action="" onSubmit={handleSubmit} method="POST">
        <label htmlFor="fileInput"></label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input
          type="text"
          name="name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Black shirt"
        />
        <input
          type="text"
          name="brandName"
          onChange={(e) =>
            setFormData({ ...formData, brandName: e.target.value })
          }
          placeholder="Brand name"
        />
        <input
          type="text"
          name="description"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Product description"
        />
        <input
          type="number"
          name="rating"
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          placeholder="Rating"
        />
        <input
          type="number"
          name="quantity"
          onChange={(e) =>
            setFormData({ ...formData, quantity: e.target.value })
          }
          placeholder="Quantity"
        />
        <button type="submit" value="Upload">
          Create
        </button>
      </form>
    </div>
  );
};
export default CreateProduct;
