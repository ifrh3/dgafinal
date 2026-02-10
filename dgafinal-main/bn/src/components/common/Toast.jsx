import React from 'react';
import { CheckCircle } from 'lucide-react';

export const Toast = ({ show, message }) => (
  <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-[110] transition-all duration-300 ease-in-out ${show ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
    <div className="bg-[#E6F4EA] border border-[#006C35] text-[#006C35] px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 font-ibm font-bold">
      <CheckCircle className="w-5 h-5" />
      <span className="text-sm">{message}</span>
    </div>
  </div>
);