import React from "react";
import TotalCard from "./TotalCard";

const Total = () => {
  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      <label className="font-bold text-lg">Dashboard</label>
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        <TotalCard />
        <TotalCard />
        <TotalCard />
      </div>
    </div>
  );
};

export default Total;
