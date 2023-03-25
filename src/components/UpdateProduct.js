import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.warn(params);
    getProductDetails();
  }, []);
  const updateProductDetails = async () => {
    console.log(name, price, category, company);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    navigate("/");
  };
  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    //console.log(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  return (
    <div className="productContainer">
      <h1>Update Product</h1>
      <input
        className="inputField"
        type="text"
        placeholder="Enter Product Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        className="inputField"
        type="text"
        placeholder="Enter Product Price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <input
        className="inputField"
        type="text"
        placeholder="Enter Category Type"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />
      <input
        className="inputField"
        type="text"
        placeholder="Enter Company Name"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
      />
      <button onClick={updateProductDetails} className="btn">
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
