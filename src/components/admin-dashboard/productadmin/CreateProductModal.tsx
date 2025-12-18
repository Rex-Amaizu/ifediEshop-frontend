"use client";
import React, { useEffect, useRef, useState } from "react";
import Modal from "@/components/global/modal/Modal";
import UniversalInput from "@/components/global/input/UniversalInput";
import UniversalButton from "@/components/global/button/UniversalButton";
import GlobalSelect from "@/components/global/select/GlobalSelect";
import GlobalImageUpload from "@/components/global/imageUploader/GlobalImageUpload";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { getAll } from "@/redux/slices/categorySlice";
import { createProduct } from "@/redux/slices/productSlice";
import {
  genderSelect,
  GenderValue,
  mapCategoriesToSelect,
  SizeTypeKey,
} from "@/utils/selectData";
import {
  colorsSelect,
  sizeTypeSelect,
  euShoesSizes,
  usShoesSizes,
  ukShoesSizes,
  alphaClothingSizes,
  trouserSizes,
  kidsClothingSizes,
  capSizes,
  watchSizes,
  necklaceSizes,
  shirtNumberSizes,
} from "@/utils/selectData";
import { registerUser } from "@/redux/slices/authSlice";
import ColorCheckboxGroup from "@/components/global/checkbox/ColorCheckboxGroup";
import SizeCheckboxGroup from "@/components/global/checkbox/SizeCheckboxGroup";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProductModal = ({ isOpen, onClose }: ModalProps) => {
  const [success, setSuccess] = useState<string>("");
  const [failure, setFailure] = useState<string>("");
  // --- Form fields ---
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState<GenderValue | "">("");
  const [colors, setColors] = useState<string[]>([]);
  const [sizeType, setSizeType] = useState<SizeTypeKey | "">("");
  const [sizes, setSizes] = useState<(string | number)[]>([]);
  const [totalStock, setTotalStock] = useState<number | "">("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const messageRef = useRef<HTMLParagraphElement | null>(null);
  // --- Validation state ---
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.categories);
  const { loading } = useAppSelector((state) => state.products);

  // --- Validation Logic ---
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name) newErrors.name = "Product name is required.";
    if (!category) newErrors.category = "Category is required.";
    if (!subCategory) newErrors.subCategory = "Sub-category is required.";
    if (!description)
      newErrors.description = "Product Description is required.";
    if (!price || price <= 0) newErrors.price = "Valid price is required.";
    if (!gender) newErrors.gender = "Gender is required.";
    if (colors.length === 0) newErrors.colors = "Select at least 1 color.";
    if (sizes.length === 0) newErrors.sizes = "Select at least 1 size.";
    if (!totalStock || totalStock <= 0)
      newErrors.totalStock = "Valid total stock is required.";
    if (selectedFiles.length === 0)
      newErrors.images = "Upload at least 1 image.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const sizeMap: Record<string, any[]> = {
    euShoesSizes,
    usShoesSizes,
    ukShoesSizes,
    alphaClothingSizes,
    trouserSizes,
    kidsClothingSizes,
    capSizes,
    watchSizes,
    necklaceSizes,
    shirtNumberSizes,
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      // Build the productData object
      const productData = {
        name,
        category,
        subCategory,
        price: Number(price),
        gender,
        colors,
        sizes,
        description,
        stock: {
          total: Number(totalStock),
          sold: 0,
          damaged: 0,
          returned: 0,
          amountSold: 0,
        },
        reviews: [],
      };

      // Dispatch the createProduct thunk
      const res = await dispatch(
        createProduct({
          productData,
          files: selectedFiles,
        })
      ).unwrap(); // unwrap to throw errors if rejected
      console.log("res", res);
      setSuccess(res.message);
      messageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setTimeout(() => {
        setSuccess("");
        onClose();
        setName("");
        setCategory("");
        setSubCategory("");
        setPrice("");
        setGender("");
        setColors([]);
        setSizeType("");
        setSizes([]);
        setTotalStock("");
        setSelectedFiles([]);
        setDescription("");
      }, 2000);
    } catch (err: any) {
      console.log("error", err);
      setFailure(err);
      messageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setTimeout(() => {
        setFailure("");
      }, 2000);
    }
  };

  useEffect(() => {
    dispatch(getAll());
  }, []);
  const categoriesSelect = mapCategoriesToSelect(data || []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div ref={messageRef} className="flex flex-col w-[500px] h-auto gap-2.5">
        <label className="font-bold text-lg text-black">
          Create new product
        </label>
        <p className="font-normal text-xs text-[#737373]">
          Please choose the product category before your proceed. If the
          category you want is not available in the list of categories, go to
          categories page and create the category before proceeding
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
        <GlobalSelect
          label="Category"
          background="#f2f2f2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={categoriesSelect}
          error={errors.category}
        />
        <UniversalInput
          label="Name"
          name="name"
          placeholder="Product name"
          placeholderColor="#9CA3AF"
          outerClassName="w-full"
          background="#f2f2f2"
          inputClassName="w-full h-[40px] pl-5"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
        <UniversalInput
          label="Sub-Category"
          name="subCategory"
          placeholder="Sub category"
          placeholderColor="#9CA3AF"
          outerClassName="w-full"
          background="#f2f2f2"
          inputClassName="w-full h-[40px] pl-5"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          error={errors.subCategory}
        />

        <UniversalInput
          label="Description"
          name="description"
          placeholder="Product description"
          placeholderColor="#9CA3AF"
          outerClassName="w-full"
          background="#f2f2f2"
          inputClassName="w-full h-[40px] pl-5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={errors.description}
        />
        <UniversalInput
          label="Price"
          name="price"
          type="number"
          placeholder="Product price"
          placeholderColor="#9CA3AF"
          outerClassName="w-full"
          background="#f2f2f2"
          inputClassName="w-full h-[40px] pl-5"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          error={errors.price}
        />
        <GlobalSelect
          label="Gender"
          background="#f2f2f2"
          value={gender}
          onChange={(e) => setGender(e.target.value as GenderValue)}
          options={genderSelect}
          error={errors.gender}
        />

        <UniversalInput
          label="Stock"
          name="total"
          type="number"
          placeholder="Quantity of stock"
          placeholderColor="#9CA3AF"
          outerClassName="w-full"
          background="#f2f2f2"
          inputClassName="w-full h-[40px] pl-5"
          value={totalStock}
          onChange={(e) => setTotalStock(Number(e.target.value))}
          error={errors.totalStock}
        />
        <ColorCheckboxGroup
          value={colors}
          onChange={setColors}
          error={errors.colors}
        />

        <GlobalSelect
          label="Sizing Type"
          background="#f2f2f2"
          value={sizeType}
          onChange={(e) => {
            setSizeType(e.target.value as SizeTypeKey);
            setSizes([]); // 🔥 reset when type changes
          }}
          options={sizeTypeSelect}
        />

        {sizeType && (
          <SizeCheckboxGroup
            sizeType={sizeType}
            value={sizes}
            onChange={setSizes}
            error={errors.sizes}
          />
        )}

        <GlobalImageUpload
          label="Product Images"
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          background="#f2f2f2"
          width="100%"
          borderRadius="rounded-md"
          error={errors.images}
        />

        <UniversalButton
          label={loading ? "Loading..." : "Create Product"}
          color="white"
          height="40px"
          className="bg-[#21184e] hover:bg-[#513cbf] cursor-pointer"
          onClick={handleSubmit}
        />
      </div>
    </Modal>
  );
};

export default CreateProductModal;
