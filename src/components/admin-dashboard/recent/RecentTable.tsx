import React from "react";
import RecentRow from "./RecentRow";

const RecentTable = () => {
  return (
    <div className="flex flex-col w-full h-auto rounded-lg">
      <div className="grid grid-cols-4 h-8 w-full py-2.5 px-2.5 sms:px-5 bg-[#f2f2f2] rounded-t-lg">
        <h1 className="font-semibold text-[10px] sms:text-xs whitespace-nowrap">
          Product
        </h1>
        <h1 className="font-semibold text-[10px] sms:text-xs whitespace-nowrap">
          Category
        </h1>
        <h1 className="font-semibold text-[10px] sms:text-xs whitespace-nowrap">
          Stock
        </h1>
        <h1 className="font-semibold text-[10px] sms:text-xs whitespace-nowrap">
          Status
        </h1>
      </div>
      <RecentRow />
      <RecentRow />
      <RecentRow />
      <RecentRow />
      <RecentRow />
    </div>
  );
};

export default RecentTable;
