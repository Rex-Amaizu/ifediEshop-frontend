import React from "react";
import RecentTable from "./RecentTable";

const Recent = () => {
  return (
    <div className="flex flex-col w-full h-auto overflow-auto mt-3">
      <label className="font-bold text-lg">Recent Products</label>
      <div>
        <RecentTable />
      </div>
    </div>
  );
};

export default Recent;
