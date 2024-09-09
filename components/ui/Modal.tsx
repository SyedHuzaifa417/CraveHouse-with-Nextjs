"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { CgClose } from "react-icons/cg";

interface ModalContextProps {
  isModalOpen: boolean;
  openModal: (content: ReactNode, data?: any) => void;
  closeModal: () => void;
  modalData: any;
}

const ModalContext = createContext<ModalContextProps>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  modalData: null,
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [modalData, setModalData] = useState<any>(null);

  const openModal = (content: ReactNode, data?: any) => {
    setIsModalOpen(true);
    setModalContent(content);
    setModalData(data);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setModalData(null);
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, openModal, closeModal, modalData }}
    >
      {children}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20 overflow-y-auto ">
          <div className="bg-gray-700 rounded-lg max-w-2xl w-full my-8 shadow-lg shadow-gray-700">
            <div className="relative p-6 max-h-[80vh] overflow-y-auto  scrollbar-thin scrollbar-thumb-food_red scrollbar-track-gray-700">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-orange-500 hover:text-orange-800"
              >
                <CgClose />
              </button>
              {modalContent}
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
