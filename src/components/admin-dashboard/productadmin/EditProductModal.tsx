import Modal from "@/components/global/modal/Modal";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProductModal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div></div>
    </Modal>
  );
};

export default EditProductModal;
