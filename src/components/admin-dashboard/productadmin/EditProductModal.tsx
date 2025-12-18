"use client";
import React, { useEffect, useRef, useState } from "react";
import Modal from "@/components/global/modal/Modal";
import UniversalInput from "@/components/global/input/UniversalInput";
import UniversalButton from "@/components/global/button/UniversalButton";
import GlobalSelect from "@/components/global/select/GlobalSelect";
import GlobalImageUpload from "@/components/global/imageUploader/GlobalImageUpload";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { getAll } from "@/redux/slices/categorySlice";
import { updateProduct } from "@/redux/slices/productSlice";
import {
  genderSelect,
  GenderValue,
  mapCategoriesToSelect,
  SizeTypeKey,
} from "@/utils/selectData";
import {
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
import ColorCheckboxGroup from "@/components/global/checkbox/ColorCheckboxGroup";
import SizeCheckboxGroup from "@/components/global/checkbox/SizeCheckboxGroup";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  stock: number;
  soldOld: number;
  priceOld: number;
  onSuccess: () => void;
  damagedOld: number;
  returnedOld: number;
  amountSoldOld: number;
}

const EditProductModal = ({
  isOpen,
  onClose,
  id,
  stock,
  damagedOld,
  soldOld,
  priceOld,
  onSuccess,
  returnedOld,
  amountSoldOld,
}: ModalProps) => {
  const [success, setSuccess] = useState<string>("");
  const [failure, setFailure] = useState<string>("");
  // --- Form fields ---
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [sold, setSold] = useState<number | "">("");
  const [returned, setReturned] = useState<number | "">("");
  const [damaged, setDamaged] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState<GenderValue | "">("");
  const [colors, setColors] = useState<string[]>([]);
  const [sizeType, setSizeType] = useState<SizeTypeKey | "">("");
  const [sizes, setSizes] = useState<(string | number)[]>([]);
  const [totalStock, setTotalStock] = useState<number | "">("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Refs for scrolling
  const modalTopRef = useRef<HTMLDivElement | null>(null);
  const errorsRef = useRef<HTMLDivElement | null>(null);

  // --- Validation state ---
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.categories);
  const { loading } = useAppSelector((state) => state.products);

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

  // Function to scroll to top of modal
  const scrollToTop = () => {
    // Try to scroll to errors container first
    if (errorsRef.current) {
      errorsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    // Fallback to modal top
    else if (modalTopRef.current) {
      modalTopRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // --- Validation Logic ---
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (price && price <= 0)
      newErrors.price = "Valid price must be a positive number.";
    if (totalStock && totalStock <= 0)
      newErrors.totalStock = "Valid stock imust be a positive number.";
    if (sold && sold <= 0)
      newErrors.sold = "Valid quantity sold must be a positive number.";
    if (returned && returned <= 0)
      newErrors.returned = "Valid quantity returned must be a positive number.";
    if (damaged && damaged <= 0)
      newErrors.damaged = "Valid quantity damaged must be a positive number.";

    setErrors(newErrors);

    // If there are errors, scroll to top
    if (Object.keys(newErrors).length > 0) {
      // Use setTimeout to ensure DOM is updated with errors first
      setTimeout(() => {
        scrollToTop();
      }, 100);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    console.log("ss", sold);
    if (!validateForm()) return;

    try {
      const productData: any = {};

      // text fields
      if (name.trim()) productData.name = name;
      if (category) productData.category = category;
      if (subCategory.trim()) productData.subCategory = subCategory;
      if (description.trim()) productData.description = description;
      if (gender) productData.gender = gender;

      // numbers (important: allow 0 only if user typed it)
      if (price !== "") productData.price = Number(price);

      // arrays
      if (colors.length > 0) productData.colors = colors;
      if (sizes.length > 0) productData.sizes = sizes;

      // stock (only include if at least one value is provided)
      if (
        totalStock !== "" || // check if additional stock is provided
        sold !== "" || // check if sold quantity is provided
        damaged !== "" || // check if damaged quantity is provided
        returned !== "" // check if returned quantity is provided
      ) {
        // Convert input values to numbers, fallback to 0 if not provided
        const soldNum = sold !== "" ? Number(sold) : 0;
        const damagedNum = damaged !== "" ? Number(damaged) : 0;
        const returnedNum = returned !== "" ? Number(returned) : 0;
        const addStock = totalStock !== "" ? Number(totalStock) : 0;

        // --- Calculate new sold and amountSold ---
        // Sold is cumulative: previous sold + newly sold
        const newSold = soldOld + soldNum - returnedNum;

        // Amount sold is previous amount + (newly sold quantity * old price)
        const newAmountSold =
          amountSoldOld + soldNum * priceOld - returnedNum * priceOld;

        // --- Calculate new damaged and returned counts ---
        // Damaged is cumulative: previous damaged + newly damaged
        const newDamaged = damagedOld + damagedNum;

        // Returned is cumulative: previous returned + newly returned
        const newReturned = returnedOld + returnedNum;

        // --- Calculate new total stock ---
        // Total stock = previous stock + added stock - sold - damaged - returned
        const newTotal = stock + addStock + returnedNum - soldNum - damagedNum;

        // Ensure total stock never goes negative
        productData.stock = {
          total: Math.max(0, newTotal),
          sold: newSold,
          amountSold: newAmountSold,
          damaged: newDamaged,
          returned: newReturned,
        };
      }

      // Dispatch the createProduct thunk
      const res = await dispatch(
        updateProduct({
          id: id,
          productData,
          files: selectedFiles,
        })
      ).unwrap(); // unwrap to throw errors if rejected
      setSuccess(res.message);
      onSuccess();
      scrollToTop();
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
      scrollToTop();
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
      <div ref={modalTopRef} className="flex flex-col w-[500px] h-auto gap-2.5">
        <label className="font-bold text-lg text-black">
          Edit product(Please read all instructions before proceeding)
        </label>

        {/* Error Messages Container at Top */}
        {(Object.keys(errors).length > 0 || success || failure) && (
          <div ref={errorsRef} className="space-y-2">
            {Object.keys(errors).length > 0 && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="font-semibold text-red-700 text-sm mb-1">
                  Please fix the following errors:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  {Object.entries(errors).map(([field, errorMsg]) => (
                    <li key={field} className="text-red-600 text-xs">
                      {errorMsg}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {success !== "" && (
              <p className="flex items-center justify-center h-10 w-full text-black font-semibold text-xs bg-green-400 rounded-md p-2">
                {success}
              </p>
            )}
            {failure !== "" && (
              <p className="flex items-center justify-center h-10 w-full text-black font-semibold text-sm bg-red-500 rounded-md p-2">
                {failure}
              </p>
            )}
          </div>
        )}

        <p className="font-normal text-xs text-[#737373]">
          Please note this product is already registered and has a category,
          only choose the product category if you wish to change the category
          this product belong to.
        </p>
        <p className="font-normal text-xs text-[#737373]">
          Also, only choose another gender if you wish to change the gender this
          product belong to.
        </p>
        <p className="font-normal text-xs text-[#737373]">
          Please note you only edit price if you want to change the price of
          that product on the website. The amount sold is calculated from the
          Quantity sold multiply current recorded price. If you sold at a new
          normal price then edit price first successfully then register items
          sold
        </p>
        <p className="font-normal text-xs text-[#737373]">
          If you want to add more products to your stock then add addtional
          stock e.g you have 45 items in stock and you want to add 10 more then
          just add 10 in add stock field so your total product stock is now 55.
        </p>
        <p className="font-normal text-xs text-[#737373]">
          If you wish to edit colors, size or images, please note you will be
          fully replacing these values for e.g if you had colors red, green,
          black available for that product and you want to add color blue, you
          have to choose red, green, black and blue so the database is updated
          with all available colors, if you choose only blue the database will
          be updated with only blue meaning your previous colors are no longer
          available, the same theory goes for sizes and images.{" "}
          <span className="font-semibold text-xs text-black">
            Simply put, if you want to add a color, size or image, add the
            existing ones again with the new one if you intend to keep the old
            ones.
          </span>
        </p>

        <GlobalSelect
          label="Category"
          background="#f2f2f2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={categoriesSelect}
        />
        <UniversalInput
          label="Name"
          name="name"
          placeholder="Edit Product name"
          placeholderColor="#9CA3AF"
          outerClassName="w-full"
          background="#f2f2f2"
          inputClassName="w-full h-[40px] pl-5"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <UniversalInput
          label="Sub-Category"
          name="subCategory"
          placeholder="Edit Sub category"
          placeholderColor="#9CA3AF"
          outerClassName="w-full"
          background="#f2f2f2"
          inputClassName="w-full h-[40px] pl-5"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
        />

        <UniversalInput
          label="Description"
          name="description"
          placeholder="Edit Product description"
          placeholderColor="#9CA3AF"
          outerClassName="w-full"
          background="#f2f2f2"
          inputClassName="w-full h-[40px] pl-5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <UniversalInput
          label="Price"
          name="price"
          type="number"
          placeholder="Edit Product price"
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
        />

        <UniversalInput
          label="Stock"
          name="total"
          type="number"
          placeholder="Add to your stock"
          placeholderColor="#9CA3AF"
          outerClassName="w-full"
          background="#f2f2f2"
          inputClassName="w-full h-[40px] pl-5"
          value={totalStock}
          onChange={(e) => setTotalStock(Number(e.target.value))}
          error={errors.totalStock}
        />
        <UniversalInput
          label="Sold"
          name="sold"
          type="number"
          placeholder="Quantity sold"
          placeholderColor="#9CA3AF"
          outerClassName="w-full"
          background="#f2f2f2"
          inputClassName="w-full h-[40px] pl-5"
          value={sold}
          onChange={(e) => setSold(Number(e.target.value))}
          error={errors.sold}
        />
        <UniversalInput
          label="Returned"
          name="returned"
          type="number"
          placeholder="Quantity returned"
          placeholderColor="#9CA3AF"
          outerClassName="w-full"
          background="#f2f2f2"
          inputClassName="w-full h-[40px] pl-5"
          value={returned}
          onChange={(e) => setReturned(Number(e.target.value))}
          error={errors.returned}
        />
        <UniversalInput
          label="Damaged"
          name="damaged"
          type="number"
          placeholder="Quantity damaged"
          placeholderColor="#9CA3AF"
          outerClassName="w-full"
          background="#f2f2f2"
          inputClassName="w-full h-[40px] pl-5"
          value={damaged}
          onChange={(e) => setDamaged(Number(e.target.value))}
          error={errors.damaged}
        />
        <ColorCheckboxGroup value={colors} onChange={setColors} />

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
          />
        )}

        <GlobalImageUpload
          label="Product Images"
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          background="#f2f2f2"
          width="100%"
          borderRadius="rounded-md"
        />

        <UniversalButton
          label={loading ? "Loading..." : "Edit Product"}
          color="white"
          height="40px"
          className="bg-[#21184e] hover:bg-[#513cbf] cursor-pointer"
          onClick={handleSubmit}
        />
      </div>
    </Modal>
  );
};

export default EditProductModal;
