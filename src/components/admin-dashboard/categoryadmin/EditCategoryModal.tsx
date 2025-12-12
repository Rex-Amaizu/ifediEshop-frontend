"use client";
import React, { useState } from "react";
import Modal from "@/components/global/modal/Modal";
import UniversalInput from "@/components/global/input/UniversalInput";
import UniversalButton from "@/components/global/button/UniversalButton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateCategory } from "@/redux/slices/categorySlice";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  name: string;
}

const EditCategoryModal = ({ isOpen, onClose, id, name }: ModalProps) => {
  // --- Form fields ---
  const [newName, setNewName] = useState("");
  const [success, setSuccess] = useState<string>("");
  const [failure, setFailure] = useState<string>("");
  // --- Validation state ---
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const dispatch = useAppDispatch();

  const { token, loading } = useAppSelector((state) => state.categories);

  // --- Validation Logic ---
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!newName) newErrors.NewName = "Category name is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const sizeMap: Record<string, any[]> = {};
  // --- Submit handler ---
  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (!token) return;

    try {
      const res = await dispatch(
        updateCategory({
          name: newName,
          id: id,
        })
      ).unwrap();
      setSuccess(res.message);
      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 3000);
    } catch (err: any) {
      setFailure(err);
      setTimeout(() => {
        setFailure("");
      }, 3000);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col w-full sms:w-[500px] h-auto gap-2.5">
        <label className="font-bold text-lg text-black">
          Edit category ({name})
        </label>
        <p className="font-normal text-xs text-[#737373]">
          Please note you can only edit the category name.
        </p>
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

        <UniversalInput
          label="Category name"
          name="newName"
          placeholder="Edit Category name"
          placeholderColor="#9CA3AF"
          outerClassName="w-full"
          background="#f2f2f2"
          inputClassName="w-full h-[40px] pl-5"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          error={errors.newName}
        />

        <UniversalButton
          label={loading ? "Loading..." : "Edit category"}
          color="white"
          height="40px"
          className="bg-[#21184e] hover:bg-[#513cbf] cursor-pointer"
          onClick={handleSubmit}
        />
      </div>
    </Modal>
  );
};

export default EditCategoryModal;
