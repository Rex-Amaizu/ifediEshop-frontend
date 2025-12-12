"use client";
import React, { useState } from "react";
import Modal from "@/components/global/modal/Modal";
import UniversalInput from "@/components/global/input/UniversalInput";
import UniversalButton from "@/components/global/button/UniversalButton";
import GlobalSelect from "@/components/global/select/GlobalSelect";
import GlobalImageUpload from "@/components/global/imageUploader/GlobalImageUpload";
import {
  categoriesSelect,
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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProductModal = ({ isOpen, onClose }: ModalProps) => {
  // --- Form fields ---
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [sizeType, setSizeType] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [totalStock, setTotalStock] = useState<number | "">("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // --- Validation state ---
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  console.log("colors", colors);
  console.log("categories", category);
  console.log("sizes", sizes);
  console.log("images", selectedFiles);
  // --- Submit handler ---
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price.toString());
      formData.append("gender", gender);
      formData.append("colors", JSON.stringify(colors));
      formData.append("sizes", JSON.stringify(sizes));

      const stock = {
        total: Number(totalStock),
        sold: 0,
        damaged: 0,
        returned: 0,
        amountSold: 0,
      };

      formData.append("stock", JSON.stringify(stock));
      formData.append("reviews", JSON.stringify([]));

      selectedFiles.forEach((file) => formData.append("images", file));

      const payload = formData;

      // const res = await fetch("/api/products", {
      //   method: "POST",
      //   body: formData,
      // });

      const data = await res.json();
      console.log("Created product:", data);

      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create product");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col w-[500px] h-auto gap-2.5">
        <label className="font-bold text-lg text-black">
          Create new product
        </label>
        <p className="font-normal text-xs text-[#737373]">
          Please choose the product category before your proceed. If the
          category you want is not available in the list of categories, go to
          categories page and create the category before proceeding
        </p>
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
          placeholder="Product price"
          placeholderColor="#9CA3AF"
          outerClassName="w-full"
          background="#f2f2f2"
          inputClassName="w-full h-[40px] pl-5"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          error={errors.price}
        />
        <UniversalInput
          label="Gender"
          name="gender"
          placeholder="Men/Women/Kids"
          placeholderColor="#9CA3AF"
          outerClassName="w-full"
          background="#f2f2f2"
          inputClassName="w-full h-[40px] pl-5"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          error={errors.gender}
        />

        <UniversalInput
          label="Stock"
          name="total"
          placeholder="Quantity of stock"
          placeholderColor="#9CA3AF"
          outerClassName="w-full"
          background="#f2f2f2"
          inputClassName="w-full h-[40px] pl-5"
          value={totalStock}
          onChange={(e) => setTotalStock(Number(e.target.value))}
          error={errors.totalStock}
        />
        <GlobalSelect
          label="Colors"
          background="#f2f2f2"
          value={colors}
          multiple
          onChange={(e) =>
            setColors(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          options={colorsSelect}
          error={errors.colors}
        />

        <GlobalSelect
          label="Sizing Type"
          background="#f2f2f2"
          value={sizeType}
          onChange={(e) => {
            setSizeType(e.target.value);
            setSizes([]); // reset sizes when type changes
          }}
          options={sizeTypeSelect}
        />

        {sizeType && (
          <GlobalSelect
            label="Sizes"
            background="#f2f2f2"
            multiple
            value={sizes}
            onChange={(e) =>
              setSizes(Array.from(e.target.selectedOptions, (opt) => opt.value))
            }
            options={sizeMap[sizeType] || []}
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
          label="Create Product"
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
