import React from "react";
import CategoryTable from "./CategoryTable";

const CategoryMain = () => {
  return (
    <div className="flex flex-col gap-5 w-full h-auto">
      <div>
        <CategoryTable />
      </div>
    </div>
  );
};

export default CategoryMain;
