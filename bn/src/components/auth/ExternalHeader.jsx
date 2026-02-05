import React, { useState, useEffect } from 'react';
import { LayoutDashboard, User, X } from 'lucide-react';

export const ExternalHeader = ({ onLoginClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm text-white py-2 px-4 md:px-8 hidden md:block">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-ibm">
              <div className="flex gap-4 opacity-80">
                  <span>المملكة العربية السعودية</span>
                  <span>رؤية 2030</span>
              </div>
              <div className="flex gap-4 opacity-80">
                  <span className="cursor-pointer hover:text-[#C69C6D]">English</span>
                  <span className="cursor-pointer hover:text-[#C69C6D]">الدخول الموحد</span>
              </div>
          </div>
      </div>

      <div className="max-w-7xl mx-auto py-4 px-4 md:px-8 flex justify-between items-center">
         <div className="flex items-center gap-4">
            <div className={`w-8 h-8 ${isScrolled ? 'bg-[#006C35]' : 'bg-white/20'} rounded-lg flex items-center justify-center`}>
               <LayoutDashboard className={`w-5 h-5 ${isScrolled ? 'text-white' : 'text-white'}`} />
            </div>
            <div className={`w-px h-6 ${isScrolled ? 'bg-gray-300' : 'bg-white/30'}`}></div>
            <div className="flex items-center gap-3">
                <div className="flex flex-col">
                   <span className={`text-lg font-bold leading-none font-ibm ${isScrolled ? 'text-[#111827]' : 'text-white'}`}>منصة قياس</span>
                   <span className={`text-[10px] ${isScrolled ? 'text-gray-500' : 'text-white/90'} font-light font-ibm mt-1`}>هيئة الحكومة الرقمية</span>
                </div>
            </div>
         </div>

         <button 
           onClick={onLoginClick}
           className={`flex items-center gap-2 ${isScrolled ? 'bg-[#006C35] hover:bg-[#005a2b]' : 'bg-[#C69C6D] hover:bg-[#b08b5e]'} text-white px-6 py-2.5 rounded-lg transition-all font-ibm text-sm font-bold shadow-lg ${isScrolled ? 'shadow-green-900/20' : 'shadow-orange-900/20'}`}
         >
           <User className="w-4 h-4" />
           تسجيل الدخول
         </button>
      </div>
    </header>
  );
};