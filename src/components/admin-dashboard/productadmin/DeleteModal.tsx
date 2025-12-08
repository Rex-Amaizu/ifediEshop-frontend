import Modal from "@/components/global/modal/Modal";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  name: string;
  onDelete: (id: string) => void;
  section: string;
}

const DeleteModal = ({
  isOpen,
  onClose,
  id,
  name,
  onDelete,
  section,
}: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col w-60 h-auto gap-2.5">
        <h1 className="font-medium text-sm text-[#737373]">
          Are you sure you want to delete this {section}?
        </h1>
        <p className="font-bold text-sm text-black">{name}</p>
        <div className="flex flex-row w-full justify-between gap-2.5">
          <button className="text-sm bg-red-900 hover:bg-red-950 h-6 w-full font-bold hover:text-white text-black cursor-pointer">
            Delete
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
