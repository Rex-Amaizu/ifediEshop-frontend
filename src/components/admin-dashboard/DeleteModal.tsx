"use client";
import Modal from "@/components/global/modal/Modal";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteCategory } from "@/redux/slices/categorySlice";
import { deleteProduct } from "@/redux/slices/productSlice";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  name: string;
  onDelete?: (product: string) => void;
  section: string;
  onSuccess: () => void;
}

const DeleteModal = ({
  isOpen,
  onClose,
  id,
  name,
  section,
  onSuccess,
}: ModalProps) => {
  const [success, setSuccess] = useState<string>("");
  const [failure, setFailure] = useState<string>("");
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.categories);
  const { loading: productLoading } = useAppSelector((state) => state.products);
  const handleCategoryDelete = async () => {
    try {
      const res = await dispatch(deleteCategory(id)).unwrap();
      setSuccess(res.message);
      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 2000);
    } catch (err: any) {
      setFailure(err);
      setTimeout(() => {
        setFailure("");
      }, 2000);
    }
  };

  const handleProductDelete = async () => {
    try {
      const res = await dispatch(deleteProduct(id)).unwrap();
      setSuccess(res.message);
      onSuccess();
      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 2000);
    } catch (err: any) {
      setFailure(err);
      setTimeout(() => {
        setFailure("");
      }, 2000);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col w-60 h-auto gap-2.5">
        <h1 className="font-medium text-sm text-[#737373]">
          Are you sure you want to delete this {section}?
        </h1>
        <p className="font-bold text-sm text-black">{name}</p>
        {success !== "" && (
          <p className="flex items-center justify-center h-10 w-full text-black font-semibold text-xs bg-green-400">
            {success}
          </p>
        )}
        {failure !== "" && (
          <p className="flex items-center justify-center h-10 w-full text-black font-semibold text-sm bg-red-500">
            {failure}
          </p>
        )}
        <div className="flex flex-row w-full justify-between gap-2.5">
          <button
            className="text-sm bg-red-900 hover:bg-red-950 h-6 w-full font-bold hover:text-white text-black cursor-pointer"
            onClick={
              section === "Product" ? handleProductDelete : handleCategoryDelete
            }
          >
            {loading ? "Loading..." : "Delete"}
          </button>
          <button
            onClick={onClose}
            className="text-sm bg-[#737373] hover:bg-gray-800 h-6 w-full font-bold hover:text-white text-black cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
