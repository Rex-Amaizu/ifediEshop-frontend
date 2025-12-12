"use client";
import React, { useEffect, useState } from "react";
import CategoryRow from "./CategoryRow";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { getAll } from "@/redux/slices/categorySlice";
import DeleteModal from "../DeleteModal";

const CategoryTable = () => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { data, token } = useAppSelector((state) => state.categories);

  useEffect(() => {
    if (!token) return;
    dispatch(getAll());
  }, [token]);

  return (
    <div className="w-full overflow-x-auto rounded-lg">
      <div className="min-w-max">
        {/* HEADER */}
        <div className="grid grid-cols-[200px_100px_200px_150px_150px_100px] justify-between gap-2.5 bg-[#f2f2f2] py-2.5 px-3 rounded-t-lg border-b border-[#f2f2f2]">
          <h1 className="font-semibold text-xs whitespace-nowrap w-52">
            Category ID
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-28">
            Category Name
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-52">
            Creator
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-40">
            Created At
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-40">
            Last Update
          </h1>
          <h1 className="font-semibold text-xs whitespace-nowrap w-28">
            Actions
          </h1>
        </div>

        {/* ROWS */}
        {data?.map((cat, index) => (
          <CategoryRow
            key={cat._id || index}
            catId={cat._id}
            indexId={index}
            name={cat.name}
            createdAt={cat.createdAt}
            updatedAt={cat.updatedAt}
            creator={cat.creator}
            onDeleteClick={() => setDeleteId(cat._id)}
          />
        ))}
      </div>
      {deleteId && (
        <DeleteModal
          isOpen={!!deleteId}
          onClose={() => setDeleteId(null)}
          id={deleteId}
          name={data.find((c) => c._id === deleteId)?.name || ""}
          section="Category"
        />
      )}
    </div>
  );
};

export default CategoryTable;
