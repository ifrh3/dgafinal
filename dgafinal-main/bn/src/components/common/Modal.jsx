import React from 'react';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children, onSave, isDelete = false, saveDisabled = false, showFooter = true }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto font-ibm">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-xl text-right overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
               <h3 className="text-lg leading-6 font-bold text-gray-900">{title}</h3>
               <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 h-full overflow-y-visible">
            {children}
          </div>
          {showFooter && (
            <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end">
             <button onClick={onClose} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50">إغلاق</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};