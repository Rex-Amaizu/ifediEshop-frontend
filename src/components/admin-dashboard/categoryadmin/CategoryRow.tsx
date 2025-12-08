import React, { useState } from "react";
import DeleteModal from "../productadmin/DeleteModal";

interface Props {
  id: string;
  name: string;
  createAt: string;
  updatedAt: string;
  creator: string;
}

const CategoryRow = ({ id, name, createAt, updatedAt, creator }: Props) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const toggleModal = () => {
    setOpenDeleteModal((prev) => !prev);
  };

  const handleDelete = async (id: string) => {
    try {
      // call the API to delete
      await fetch(`/api/category/${id}`, {
        method: "DELETE",
      });

      // You can either refresh list, or lift state up
      console.log("Deleted:", id);
      toggleModal();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };
  return (
    <div
      key={id}
      className="grid grid-cols-[200px_100px_200px_150px_150px_100px] justify-between items-center gap-2.5 py-2.5 px-3 border-b bg-white border-[#f2f2f2]"
    >
      <p className="text-xs text-[#808080] whitespace-nowrap w-60">{id}</p>
      <p className="text-xs text-[#808080] whitespace-nowrap w-32">{name}</p>
      <p className="text-xs text-[blue] whitespace-nowrap w-44">{creator}</p>
      <p className="text-xs text-[#808080] whitespace-nowrap w-60">
        {createAt}
      </p>
      <p className="text-xs text-[#808080] whitespace-nowrap w-44">
        {updatedAt}
      </p>

      {/* Actions */}
      <div className="flex flex-row gap-2 w-32 whitespace-nowrap">
        <button className="text-[#513cbf] text-xs cursor-pointer">Edit</button>
        <button
          onClick={toggleModal}
          className="text-red-600 text-xs cursor-pointer"
        >
          Delete
        </button>
      </div>
      <DeleteModal
        isOpen={openDeleteModal}
        onClose={toggleModal}
        id={id}
        name={name}
        onDelete={handleDelete}
        section="Category"
      />
    </div>
  );
};

export default CategoryRow;
