import React from "react";
import RecentTable from "./RecentTable";
import { Category } from "@/redux/slices/categorySlice";
import { Product } from "@/redux/slices/productSlice";

interface Props {
  prodData: Product[];
}

const Recent = ({ prodData }: Props) => {
  const lastTenProd = prodData?.slice(-12);
  return (
    <div className="flex flex-col w-full h-auto overflow-auto mt-3">
      <label className="font-bold text-[14px] sms:text-lg">
        Recent Products
      </label>
      <div>
        <RecentTable products={lastTenProd} />
      </div>
    </div>
  );
};

export default Recent;
