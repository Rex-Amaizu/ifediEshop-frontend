"use client";
import React, { useState } from "react";
import ProductTable from "./ProductTable";

const ProductsMain = () => {
  return (
    <div className="flex flex-col gap-5 w-full h-auto">
      <div>
        <ProductTable />
      </div>
    </div>
  );
};

export default ProductsMain;
