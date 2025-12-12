import React, { useState } from "react";
import DeleteModal from "../DeleteModal";
import EditCategoryModal from "./EditCategoryModal";
import { formatDateTime } from "@/utils/formateDate";

interface Props {
  catId: string;
  indexId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  creator: string;
  onDeleteClick: (id: string) => void;
  // openDeleteModal: boolean;
  // setOpenDeleteModal: (id: string | null) => void;
}

const CategoryRow = ({
  catId,
  indexId,
  name,
  createdAt,
  updatedAt,
  creator,
  onDeleteClick,
}: Props) => {
  // const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  // const toggleDeleteModal = () => {
  //   setOpenDeleteModal((prev) => !prev);
  // };
  const toggleEditModal = () => {
    setOpenEditModal((prev) => !prev);
  };

  return (
    <div className="grid grid-cols-[200px_100px_200px_150px_150px_100px] justify-between items-center gap-2.5 py-2.5 px-3 border-b bg-white border-[#f2f2f2]">
      <p className="text-xs text-[#808080] whitespace-nowrap w-60">{indexId}</p>
      <p className="text-xs text-[#808080] whitespace-nowrap w-32">{name}</p>
      <p className="text-xs text-[blue] whitespace-nowrap w-44">{creator}</p>
      <p className="text-xs text-[#808080] whitespace-nowrap w-60">
        {formatDateTime(createdAt)}
      </p>
      <p className="text-xs text-[#808080] whitespace-nowrap w-44">
        {formatDateTime(updatedAt)}
      </p>

      {/* Actions */}
      <div className="flex flex-row gap-2 w-32 whitespace-nowrap">
        <button
          className="text-[#513cbf] text-xs cursor-pointer"
          onClick={toggleEditModal}
        >
          Edit
        </button>
        <button
          onClick={() => onDeleteClick(catId)}
          className="text-red-600 text-xs cursor-pointer"
        >
          Delete
        </button>
      </div>
      <EditCategoryModal
        isOpen={openEditModal}
        onClose={toggleEditModal}
        id={catId}
        name={name}
      />
      {/* <DeleteModal
        isOpen={openDeleteModal}
        onClose={toggleDeleteModal}
        id={catId}
        name={name}
        section="Category"
      /> */}
    </div>
  );
};

export default CategoryRow;
