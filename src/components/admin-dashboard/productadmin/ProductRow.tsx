import React, { useState } from "react";
import DeleteModal from "./DeleteModal";

interface Props {
  id: string;
  name: string;
  category: string;
  stock: number;
  sold: number;
  damaged: number;
  returned: number;
  remaining: number;
  variants: number;
  financials: string;
}

const ProductRow = ({
  id,
  name,
  category,
  stock,
  sold,
  damaged,
  returned,
  remaining,
  variants,
  financials,
}: Props) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const toggleModal = () => {
    setOpenDeleteModal((prev) => !prev);
  };

  const handleDelete = async (productId: string) => {
    try {
      // call the API to delete
      await fetch(`/api/products/${id}`, {
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
      className="grid grid-cols-[100px_96px_64px_64px_64px_64px_64px_100px_96px_96px] justify-between items-center gap-2.5 py-2.5 px-3 border-b bg-white border-[#f2f2f2]"
    >
      <p className="text-xs text-[#808080] whitespace-nowrap w-32">{name}</p>
      <p className="text-xs text-[#808080] whitespace-nowrap w-28">
        {category}
      </p>
      <p className="text-xs text-[#808080] whitespace-nowrap w-20">{stock}</p>
      <p className="text-xs text-[#808080] whitespace-nowrap w-20">{sold}</p>
      <p className="text-xs text-[red] whitespace-nowrap w-24">{damaged}</p>
      <p className="text-xs text-[#cca300] whitespace-nowrap w-24">
        {returned}
      </p>
      <p className="text-xs text-[green] whitespace-nowrap w-24">{remaining}</p>
      <p className="text-xs text-[#808080] whitespace-nowrap w-28">
        {variants}
      </p>
      <div className="flex flex-col gap-0 h-16">
        <div className="flex flex-row gap-0.5">
          <p className="text-xs text-[#808080] whitespace-nowrap w-28">Sold:</p>
          <p className="text-xs text-[#808080] whitespace-nowrap w-28">
            {financials}
          </p>
        </div>
        <div className="flex flex-row gap-0.5">
          <p className="text-xs text-[#808080] whitespace-nowrap w-28">
            Remaining:
          </p>
          <p className="text-xs text-[#808080] whitespace-nowrap w-28">
            {financials}
          </p>
        </div>
        <div className="flex flex-row gap-0.5">
          <p className="text-xs text-[red] whitespace-nowrap w-28">Damaged:</p>
          <p className="text-xs text-[red] whitespace-nowrap w-28">
            {financials}
          </p>
        </div>
        <div className="flex flex-row gap-0.5">
          <p className="text-xs text-black font-semibold whitespace-nowrap w-28">
            Total:
          </p>
          <p className="text-xs text-black font-semibold whitespace-nowrap w-28">
            {financials}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-row gap-2 w-24 whitespace-nowrap">
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
        section="Product"
      />
    </div>
  );
};

export default ProductRow;
