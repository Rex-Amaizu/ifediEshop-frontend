"use client";

import React, { useRef } from "react";

type GlobalImageUploadProps = {
  label?: string;
  selectedFiles: File[];
  setSelectedFiles: (files: File[]) => void;
  background?: string;
  width?: string;
  borderRadius?: string;
  outerClassName?: string;
  error?: string;
};

const GlobalImageUpload = ({
  label,
  selectedFiles,
  setSelectedFiles,
  background = "#f2f2f2",
  width = "100%",
  borderRadius = "rounded-md",
  outerClassName = "",
  error,
}: GlobalImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setSelectedFiles([...selectedFiles, ...Array.from(e.target.files)]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRemoveFile = (index: number) => {
    const updated = [...selectedFiles];
    updated.splice(index, 1);
    setSelectedFiles(updated);
  };

  return (
    <div className={`flex flex-col gap-2 ${outerClassName}`} style={{ width }}>
      {label && (
        <label className="text-sm font-medium text-neutral-700">{label}</label>
      )}

      <div
        className={`flex flex-wrap gap-2 p-3 border border-gray-300 ${borderRadius}`}
        style={{ background }}
      >
        {selectedFiles.map((file, idx) => {
          const previewUrl = URL.createObjectURL(file);
          return (
            <div
              key={idx}
              className="relative w-20 h-20 border border-gray-200 rounded overflow-hidden"
            >
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveFile(idx)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
              >
                ×
              </button>
            </div>
          );
        })}

        <button
          type="button"
          onClick={handleUploadClick}
          className="w-20 h-20 flex items-center justify-center border border-dashed border-gray-400 rounded cursor-pointer hover:border-gray-600"
        >
          +
        </button>

        <input
          type="file"
          multiple
          accept="image/*"
          ref={inputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default GlobalImageUpload;
