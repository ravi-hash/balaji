import React from "react";
import { ProductList, ProductFilter } from "./Product"; // Import only the needed components
import "./viewproduct.scss"; // Your styles here

const viewAllProduct = () => {
  return (
    <section className="view-all-product">
      <div className="filter-container">
        <ProductFilter />
      </div>
      <div className="product-list-container">
        <ProductList /> {/* Use ProductList here */}
      </div>
    </section>
  );
};

export default viewAllProduct;
