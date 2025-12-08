import React from "react";

const RecentRow = () => {
  return (
    <div className="grid grid-cols-4 h-8 w-full py-2.5 px-2.5 sms:px-5 border border-[#f2f2f2] bg-white">
      <h6 className="font-medium text-[8px] sms:text-[10px] text-[#808080] whitespace-nowrap">
        Classic Cottton Tee
      </h6>
      <h6 className="font-medium text-[8px] sms:text-[10px] text-[#808080] whitespace-nowrap">
        T-shirts
      </h6>
      <h6 className="font-medium text-[8px] sms:text-[10px] text-[#808080] whitespace-nowrap">
        50
      </h6>
      <h6 className="font-medium text-[8px] sms:text-[10px] text-[#808080] whitespace-nowrap">
        <span className="h-full w-full p-1 rounded-sm bg-emerald-200 whitespace-nowrap">
          In Stock
        </span>
      </h6>
    </div>
  );
};

export default RecentRow;
