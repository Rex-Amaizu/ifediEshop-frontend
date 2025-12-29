import React, { useState } from "react";
import DeleteModal from "../DeleteModal";
import EditProductModal from "./EditProductModal";

interface Props {
  id: string;
  name: string;
  category: string;
  stock: number;
  sold: number;
  damaged: number;
  returned: number;
  colors: string[];
  sizes: string[];
  amountSold: number;
  price: number;
  passRowInfo: () => void;
}

const ProductRow = ({
  id,
  name,
  category,
  stock,
  sold,
  damaged,
  returned,
  colors,
  sizes,
  amountSold,
  price,
  passRowInfo,
}: Props) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const toggleEditModal = () => {
    setOpenEditModal((prev) => !prev);
    passRowInfo();
  };

  const toggleModal = () => {
    setOpenDeleteModal((prev) => !prev);
  };

  const amountRemaining = Number(stock) * Number(price);
  const amountDamaged = Number(damaged) * Number(price);
  const totalAmount =
    Number(amountDamaged) + Number(amountRemaining) + Number(amountSold);

  const handleDelete = async (productId: string) => {
    try {
      // call the API to delete
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      toggleModal();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };
  return (
    <div className="grid grid-cols-[100px_96px_64px_64px_64px_64px_200px_96px_96px] justify-between items-center gap-2.5 py-2.5 px-3 border-b bg-white border-[#f2f2f2]">
      <p className="text-xs text-[#808080] whitespace-nowrap w-32">{name}</p>
      <p className="text-xs text-[#808080] whitespace-nowrap w-28">
        {category}
      </p>
      <p className="text-xs text-black font-semibold whitespace-nowrap w-20">
        {stock}
      </p>
      <p className="text-xs text-[green] whitespace-nowrap w-20">{sold}</p>
      <p className="text-xs text-[red] whitespace-nowrap w-24">{damaged}</p>
      <p className="text-xs text-[#cca300] whitespace-nowrap w-24">
        {returned}
      </p>
      {/* <p className="text-xs text-[green] whitespace-nowrap w-24">{}</p> */}
      <div className="flex flex-col gap-0 h-16 justify-center">
        <div className="flex flex-row gap-0.5 items-center">
          <p className="text-xs text-[#808080] whitespace-nowrap">colors:</p>
          {colors.map((color) => (
            <span
              key={color}
              title={color}
              className="w-3 h-3 rounded-full border border-gray-300"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className="flex flex-row gap-0.5 items-center">
          <p className="text-xs text-[#808080] whitespace-nowrap">sizes:</p>
          {sizes.map((size) => (
            <span
              key={size}
              title={size}
              className="text-xs text-[#808080] border border-gray-300"
            >
              {size}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-0 h-16">
        <div className="flex flex-row gap-0.5">
          <p className="text-xs text-[#808080] whitespace-nowrap">Sold:</p>
          <p className="text-xs text-[#808080] whitespace-nowrap">
            ${amountSold}
          </p>
        </div>
        <div className="flex flex-row gap-0.5">
          <p className="text-xs text-[#808080] whitespace-nowrap">Remaining:</p>
          <p className="text-xs text-[#808080] whitespace-nowrap">
            ${amountRemaining}
          </p>
        </div>
        <div className="flex flex-row gap-0.5">
          <p className="text-xs text-[red] whitespace-nowrap">Damaged:</p>
          <p className="text-xs text-[red] whitespace-nowrap">
            ${amountDamaged}
          </p>
        </div>
        <div className="flex flex-row gap-0.5">
          <p className="text-xs text-black font-semibold whitespace-nowrap">
            Total:
          </p>
          <p className="text-xs text-black font-semibold whitespace-nowrap">
            ${totalAmount}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-row gap-2 w-24 whitespace-nowrap">
        <button
          onClick={toggleEditModal}
          className="text-[#513cbf] text-xs cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={toggleModal}
          className="text-red-600 text-xs cursor-pointer"
        >
          Delete
        </button>
      </div>
      <EditProductModal
        id={id}
        isOpen={openEditModal}
        onClose={toggleEditModal}
        stock={stock}
        soldOld={sold}
        priceOld={price}
        damagedOld={damaged}
        returnedOld={returned}
        amountSoldOld={amountSold}
        onSuccess={passRowInfo}
      />
      <DeleteModal
        isOpen={openDeleteModal}
        onClose={toggleModal}
        id={id}
        name={name}
        onDelete={handleDelete}
        section="Product"
        onSuccess={passRowInfo}
      />
    </div>
  );
};

export default ProductRow;
