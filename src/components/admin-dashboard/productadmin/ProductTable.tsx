"use client";
import React from "react";
import ProductRow from "./ProductRow";

interface ProductRow {
  id: string;
  name: string;
  category: string;
  stock: number;
  sold: number;
  damaged: number;
  returned: number;
  remaining: number;
  variants: number;
  financials: string;
}

const sampleData: ProductRow[] = [
  {
    id: "1",
    name: "Nike Shoe",
    category: "Footwear",
    stock: 120000,
    sold: 50,
    damaged: 2,
    returned: 1,
    remaining: 67,
    variants: 3,
    financials: "$1,200",
  },
  {
    id: "2",
    name: "Adidas Jersey",
    category: "Sports",
    stock: 80,
    sold: 30,
    damaged: 1,
    returned: 0,
    remaining: 49,
    variants: 2,
    financials: "$850",
  },
  {
    id: "3",
    name: "Nike Shoe",
    category: "Footwear",
    stock: 120000,
    sold: 50,
    damaged: 2,
    returned: 1,
    remaining: 67,
    variants: 3,
    financials: "$1,200",
  },
  {
    id: "4",
    name: "Adidas Jersey",
    category: "Sports",
    stock: 80,
    sold: 30,
    damaged: 1,
    returned: 0,
    remaining: 49,
    variants: 2,
    financials: "$850",
  },
  {
    id: "5",
    name: "Nike Shoe",
    category: "Footwear",
    stock: 120000,
    sold: 50,
    damaged: 2,
    returned: 1,
    remaining: 67,
    variants: 3,
    financials: "$1,200",
  },
  {
    id: "6",
    name: "Adidas Jersey",
    category: "Sports",
    stock: 80,
    sold: 30,
    damaged: 1,
    returned: 0,
    remaining: 49,
    variants: 2,
    financials: "$850",
  },
  {
    id: "7",
    name: "Nike Shoe",
    category: "Footwear",
    stock: 120000,
    sold: 50,
    damaged: 2,
    returned: 1,
    remaining: 67,
    variants: 3,
    financials: "$1,200",
  },
  {
    id: "8",
    name: "Adidas Jersey",
    category: "Sports",
    stock: 80,
    sold: 30,
    damaged: 1,
    returned: 0,
    remaining: 49,
    variants: 2,
    financials: "$850",
  },
  {
    id: "9",
    name: "Nike Shoe",
    category: "Footwear",
    stock: 120000,
    sold: 50,
    damaged: 2,
    returned: 1,
    remaining: 67,
    variants: 3,
    financials: "$1,200",
  },
  {
    id: "10",
    name: "Adidas Jersey",
    category: "Sports",
    stock: 80,
    sold: 30,
    damaged: 1,
    returned: 0,
    remaining: 49,
    variants: 2,
    financials: "$850",
  },
  {
    id: "11",
    name: "Nike Shoe",
    category: "Footwear",
    stock: 120000,
    sold: 50,
    damaged: 2,
    returned: 1,
    remaining: 67,
    variants: 3,
    financials: "$1,200",
  },
  {
    id: "12",
    name: "Adidas Jersey",
    category: "Sports",
    stock: 80,
    sold: 30,
    damaged: 1,
    returned: 0,
    remaining: 49,
    variants: 2,
    financials: "$850",
  },
];

const ProductTable = () => {
  return (
    <div className="w-full overflow-x-auto rounded-lg">
      <div className="min-w-max">
        {/* HEADER */}
        <div className="grid grid-cols-[100px_96px_64px_64px_64px_64px_64px_100px_96px_96px] justify-between gap-2.5 bg-[#f2f2f2] py-2.5 px-3 rounded-t-lg border-b border-[#f2f2f2]">
          <h1 className="font-semibold text-xs whitespace-nowrap w-28">
            Product
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-24">
            Category
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-16">
            Stock
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-16 ">
            Sold
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-16">
            Damaged
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-16">
            Returned
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-16">
            Remaining
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-28">
            Variants
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-28">
            Financials
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-24">
            Actions
          </h1>
        </div>

        {/* ROWS */}
        {sampleData.map((item) => (
          <ProductRow
            key={item.id}
            id={item.id}
            name={item.name}
            category={item.category}
            stock={item.stock}
            sold={item.sold}
            damaged={item.damaged}
            returned={item.returned}
            remaining={item.remaining}
            variants={item.variants}
            financials={item.financials}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductTable;
