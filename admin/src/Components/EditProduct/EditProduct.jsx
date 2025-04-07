import React, { useEffect, useState } from "react";
import "../AddProduct/AddProduct.css";
import upload_area from "../Assets/upload_area.svg";
import { useParams, useNavigate } from "react-router-dom";
import { backend_url } from "../../App";
import "../EditProduct/EditProduct.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: ""
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${backend_url}/products/${id}`);
        const data = await response.json();
        setProductDetails(data);
        console.log("Fetched product details:", data); // LOG PRODUCT DETAILS
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductDetails();
  }, [id]);

  const updateProduct = async () => {
    console.log("Update button clicked!"); // LOG BUTTON CLICK
    let product = { ...productDetails };
    let dataObj;

    if (image) {
      let formData = new FormData();
      formData.append("product", image);

      try {
        const uploadResponse = await fetch(`${backend_url}/upload`, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });
        dataObj = await uploadResponse.json();
        console.log("Image upload response:", dataObj); // LOG IMAGE UPLOAD RESPONSE

        if (dataObj.success) {
          product.image = dataObj.image_url;
        } else {
          alert("Image upload failed");
          return;
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    try {
      console.log("Payload being sent to API:", product); // LOG PAYLOAD
      const response = await fetch(`${backend_url}/updateproduct/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      console.log("Update response:", data); // LOG SERVER RESPONSE

      if (data.success) {
        alert("Product Updated Successfully");
        navigate("/listproduct");
      } else {
        alert("Failed to Update Product");
      }
    } catch (error) {
      console.error("Error updating product:", error); // LOG ANY ERRORS
      alert("An error occurred while updating the product.");
    }
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="addproduct">
      <h1>Edit Product</h1>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          type="text"
          name="name"
          value={productDetails.name}
          onChange={changeHandler}
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Product description</p>
        <input
          name="description"
          value={productDetails.description}
          onChange={changeHandler}
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Old Price</p>
          <input
            type="number"
            name="old_price"
            value={productDetails.old_price}
            onChange={changeHandler}
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            type="number"
            name="new_price"
            value={productDetails.new_price}
            onChange={changeHandler}
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product category</p>
        <select
          name="category"
          value={productDetails.category}
          onChange={changeHandler}
          className="add-product-selector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p>Product image</p>
        <label htmlFor="file-input">
        <img
  className="addproduct-thumbnail-img"
  src={
    !image
      ? (productDetails.image ? `${backend_url}${productDetails.image}` : upload_area)
      : URL.createObjectURL(image)
  }
  alt="Product thumbnail"
/>

        </label>
        <input
          type="file"
          id="file-input"
          name="image"
          accept="image/*"
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <button className="addproduct-btn" onClick={updateProduct}>
        UPDATE
      </button>
    </div>
  );
};

export default EditProduct;
