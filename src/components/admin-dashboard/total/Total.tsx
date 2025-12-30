import React from "react";
import TotalCard from "./TotalCard";
interface Props {
  prodLength: number;
  catLength: number;
}

const Total = ({ prodLength, catLength }: Props) => {
  return (
    <div className="flex flex-col w-full h-auto overflow-auto">
      <label className="font-bold text-'[14px] sms:text-lg">Dashboard</label>
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(100px,1fr))]">
        <TotalCard cat={catLength} />
        <TotalCard prod={prodLength} />
      </div>
    </div>
  );
};

export default Total;
