"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import ProductRow from "./ProductRow";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts } from "@/redux/slices/productSlice";

const ProductTable = () => {
  const [refetchProducts, setRefetchProducts] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, refetchProducts]);

  const getRowInfo = useCallback(() => {
    setRefetchProducts((k) => k + 1);
  }, []);
  const productRows = useMemo(() => {
    return data.map((item) => (
      <ProductRow
        key={item._id} // Explicit string conversion
        id={item._id}
        name={item.name}
        category={item.category[0]?.name || "Uncategorized"} // Added safe access
        stock={item.stock.total}
        sold={item.stock.sold}
        damaged={item.stock.damaged}
        returned={item.stock.returned}
        colors={item.colors}
        sizes={item.sizes}
        amountSold={item.stock.amountSold}
        price={item.price}
        passRowInfo={getRowInfo}
      />
    ));
  }, [data, getRowInfo]);

  return (
    <div className="w-full overflow-x-auto rounded-lg">
      <div className="min-w-max">
        {/* HEADER */}
        <div className="grid grid-cols-[100px_96px_64px_64px_64px_64px_200px_96px_96px] justify-between gap-2.5 bg-[#f2f2f2] py-2.5 px-3 rounded-t-lg border-b border-[#f2f2f2]">
          <h1 className="font-semibold text-xs whitespace-nowrap w-28">
            Product
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-24">
            Category
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-16">
            Stock
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-16 ">
            Sold
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-16">
            Damaged
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-16">
            Returned
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-56">
            Variants
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-28">
            Financials
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-24">
            Actions
          </h1>
        </div>
        {productRows}
      </div>
    </div>
  );
};

export default ProductTable;
