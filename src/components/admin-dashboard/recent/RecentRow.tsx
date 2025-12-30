import React from "react";

interface Props {
  catName: string;
  prodName: string;
  stock: number;
}

const RecentRow = ({ catName, prodName, stock }: Props) => {
  return (
    <div className="grid grid-cols-4 h-8 w-full py-2.5 px-2.5 sms:px-5 border border-[#f2f2f2] bg-white">
      <h6 className="font-medium text-[8px] sms:text-[10px] text-[#808080] whitespace-nowrap">
        {prodName}
      </h6>
      <h6 className="font-medium text-[8px] sms:text-[10px] text-[#808080] whitespace-nowrap">
        {catName}
      </h6>
      <h6 className="font-medium text-[8px] sms:text-[10px] text-[#808080] whitespace-nowrap">
        {stock}
      </h6>
      <h6 className="font-medium text-[8px] sms:text-[10px] text-[#808080] whitespace-nowrap">
        {stock > 0 ? (
          <span className="h-full w-[100px] p-1 rounded-sm bg-emerald-200 whitespace-nowrap">
            In Stock
          </span>
        ) : (
          <span className="h-full w-[100px] p-1 rounded-sm bg-red-900 whitespace-nowrap">
            No Stock
          </span>
        )}
      </h6>
    </div>
  );
};

export default RecentRow;
