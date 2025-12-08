"use client";
import React from "react";
import CategoryRow from "./CategoryRow";

interface CategoryRow {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  creator: string;
}

const sampleData: CategoryRow[] = [
  {
    id: "69282e9e33c56a729c079d04",
    name: "Shoes",
    createdAt: "Nov 10 2025",
    updatedAt: "Nov 10 2025",
    creator: "Ebuka Rex Amaizu",
  },
  {
    id: "69282eb033c56a729c079d07",
    name: "Gym",
    createdAt: "Nov 10 2025",
    updatedAt: "Nov 10 2025",
    creator: "Ebuka Rex Amaizu",
  },
  {
    id: "69282ebf33c56a729c079d0d",
    name: "Pants",
    createdAt: "Nov 10 2025",
    updatedAt: "Nov 10 2025",
    creator: "Ebuka Rex Amaizu",
  },
  {
    id: "69283601f54a5d4e44832783",
    name: "Accessories",
    createdAt: "Nov 10 2025",
    updatedAt: "Nov 10 2025",
    creator: "Ebuka Rex Amaizu",
  },
];

const CategoryTable = () => {
  return (
    <div className="w-full overflow-x-auto rounded-lg">
      <div className="min-w-max">
        {/* HEADER */}
        <div className="grid grid-cols-[200px_100px_200px_150px_150px_100px] justify-between gap-2.5 bg-[#f2f2f2] py-2.5 px-3 rounded-t-lg border-b border-[#f2f2f2]">
          <h1 className="font-semibold text-xs whitespace-nowrap w-52">
            Category ID
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-28">
            Category Name
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-52">
            Creator
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-40">
            Created At
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-40">
            Last Update
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-28">
            Actions
          </h1>
        </div>

        {/* ROWS */}
        {sampleData.map((cat) => (
          <CategoryRow
            key={cat.id}
            id={cat.id}
            name={cat.name}
            createAt={cat.createdAt}
            updatedAt={cat.updatedAt}
            creator={cat.creator}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryTable;
