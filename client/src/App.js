import React from "react";
import "./App.css";
import CreateProduct from "./components/CreateProduct";
import DisplayProduct from "./components/DisplayProduct";
import axios from "axios";
import Carousel from "./components/Carousel";
import { Component3 } from "./components/Component3";
import Navbar from "./components/Navbar";

const App = () => {
  const [products, setProducts] = React.useState(null);

  const images = [
    {
      url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60",
    },
    {
      url: "https://images.unsplash.com/photo-1657214059212-104dac959c56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxzZWFyY2h8OHx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1100&q=60",
    },
    {
      url: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGZhc2hpb258ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    },
  ];
  const images2 = [
    {
      url: "https://images.unsplash.com/photo-1587451527975-ce1f6218418f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8RnpvM3p1T0hONnd8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60",
    },
    {
      url: "https://images.unsplash.com/photo-1663763405972-d0e881c082a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8RnpvM3p1T0hONnd8fGVufDB8fHx8&auto=format&fit=crop&w=1100&q=60",
    },
    {
      url: "https://images.unsplash.com/photo-1645675368692-f283ea2fd608?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDR8RnpvM3p1T0hONnd8fGVufDB8fHx8&auto=format&fit=crop&w=1100&q=60",
    },
  ];

  // React.useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/api/products`)
  //     .then((response) => {
  //       //console.log(response.data);
  //       setProducts(response.data);
  //       //console.log(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const containerStyles = {
    width: "500px",
    height: "300px",
    margin: "0 auto",
  };

  // if (!products) return <div>loading..</div>;

  return (
    <div className="App">
      <Navbar />
      {/* <div style={containerStyles}>
        <Carousel slides={images} />
      </div> */}
      {/* <div style={containerStyles}>
        <Component3 data={images2} />
      </div> */}
    </div>
  );
};

export default App;
