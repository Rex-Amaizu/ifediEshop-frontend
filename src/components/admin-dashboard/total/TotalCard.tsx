import React from "react";

interface Props {
  cat?: number;
  prod?: number;
}

const TotalCard = ({ cat, prod }: Props) => {
  return (
    <div className="flex flex-col h-20 justify-center pl-2.5 bg-white rounded-sm border border-[#f2f2f2]">
      <h1 className="font-normal text-[8px] sms:text-[10px]">
        {cat ? "Categories" : "Products"}
      </h1>
      <p className="font-semibold text-[14px] sms:text-lg">
        {cat ? cat : prod}
      </p>
    </div>
  );
};

export default TotalCard;
