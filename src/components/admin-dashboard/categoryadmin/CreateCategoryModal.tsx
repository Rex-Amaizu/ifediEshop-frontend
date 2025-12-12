"use client";
import React, { useState } from "react";
import Modal from "@/components/global/modal/Modal";
import UniversalInput from "@/components/global/input/UniversalInput";
import UniversalButton from "@/components/global/button/UniversalButton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createCategory } from "@/redux/slices/categorySlice";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCategoryModal = ({ isOpen, onClose }: ModalProps) => {
  // --- Form fields ---
  const [name, setName] = useState("");
  const [creator, setCreator] = useState("");
  const [success, setSuccess] = useState<string>("");
  const [failure, setFailure] = useState<string>("");
  // --- Validation state ---
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const dispatch = useAppDispatch();

  const { token, loading } = useAppSelector((state) => state.categories);

  // --- Validation Logic ---
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name) newErrors.name = "Category name is required.";
    if (!creator) newErrors.creator = "Creator name is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const sizeMap: Record<string, any[]> = {};
  // --- Submit handler ---
  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (!token) return;

    try {
      const payload = { name, creator };
      const res = await dispatch(createCategory(payload)).unwrap();
      setSuccess(res.message);
      setTimeout(() => {
        setName("");
        setSuccess("");
        onClose();
      }, 2000);
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
          Create new category
        </label>
        <p className="font-normal text-xs text-[#737373]">
          Please type your new category name to create it. Once you have created
          the category successfully, it will show on the category dropdown on
          the product page and you can choose it to create a product under that
          category
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
          label="Creator's Name"
          name="creator"
          placeholder="Creator's name"
          placeholderColor="#9CA3AF"
          outerClassName="w-full"
          background="#f2f2f2"
          inputClassName="w-full h-[40px] pl-5"
          value={creator}
          onChange={(e) => setCreator(e.target.value)}
          error={errors.creator}
        />
        <UniversalInput
          label="Name"
          name="name"
          placeholder="Category name"
          placeholderColor="#9CA3AF"
          outerClassName="w-full"
          background="#f2f2f2"
          inputClassName="w-full h-[40px] pl-5"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />

        <UniversalButton
          label={loading ? "Loading..." : "Create category"}
          color="white"
          height="40px"
          className="bg-[#21184e] hover:bg-[#513cbf] cursor-pointer"
          onClick={handleSubmit}
        />
      </div>
    </Modal>
  );
};

export default CreateCategoryModal;
