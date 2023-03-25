import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const addProductDetails = async () => {
    //console.log(name, price, category, company);
    console.warn(!name);
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    //console.warn(result);
    navigate("/");
  };

  return (
    <div className="productContainer">
      <h1>Add Product</h1>
      <input
        className="inputField"
        type="text"
        placeholder="Enter Product Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      {error && !name && (
        <span className="error">Enter valid product name</span>
      )}
      <input
        className="inputField"
        type="text"
        placeholder="Enter Product Price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      {error && !price && (
        <span className="error">Enter valid product price</span>
      )}
      <input
        className="inputField"
        type="text"
        placeholder="Enter Category Type"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />
      {error && !category && (
        <span className="error">Enter valid product category name</span>
      )}
      <input
        className="inputField"
        type="text"
        placeholder="Enter Company Name"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
      />
      {error && !company && (
        <span className="error">Enter valid product company name</span>
      )}
      <button onClick={addProductDetails} className="btn">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
