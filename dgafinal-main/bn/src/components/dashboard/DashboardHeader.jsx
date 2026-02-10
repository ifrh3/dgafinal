import React, { useState } from 'react';
import { 
  LayoutDashboard, LogOut, Globe, Menu, 
  ChevronLeft, ChevronDown
} from 'lucide-react';

export const DashboardHeader = ({ activePage, onNavigate, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinkStyle = (page) => `cursor-pointer transition-colors py-5 text-sm font-medium ${activePage === page ? 'text-[#006C35] font-bold border-b-2 border-[#006C35]' : 'text-gray-600 hover:text-[#006C35]'}`;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 font-ibm print:hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('dashboard')}>
                <div className="w-8 h-8 bg-[#006C35] rounded-lg flex items-center justify-center text-white shadow-sm">
                   <LayoutDashboard className="w-5 h-5" />
                </div>
                <div className="hidden md:flex flex-col">
                   <span className="text-sm font-bold text-[#111827] leading-none">UniCode</span>
                   <span className="text-[9px] text-gray-500 font-light mt-0.5">Checker</span>
                </div>
            </div>
            <nav className="hidden md:flex items-center gap-6 mr-4">
                <button onClick={() => onNavigate('dashboard')} className={navLinkStyle('dashboard')}>الرئيسية</button>
                <button onClick={() => onNavigate('reports')} className={navLinkStyle('reports')}>التقارير</button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
             <button className="flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-[#006C35]"><Globe className="w-4 h-4" /><span className="hidden md:inline">English</span></button>
             <button onClick={onLogout} className="flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 px-3 py-2 rounded-lg transition-colors"><LogOut className="w-4 h-4" /><span className="hidden md:inline">تسجيل الخروج</span></button>
             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-gray-600"><Menu className="w-5 h-5" /></button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white animate-fadeIn">
            <div className="px-4 py-3 space-y-3">
                <button onClick={() => {onNavigate('dashboard'); setIsMobileMenuOpen(false)}} className={`block w-full text-right text-sm font-bold px-3 py-2 rounded-md ${activePage === 'dashboard' ? 'bg-green-50 text-[#006C35]' : 'text-gray-600'}`}>الرئيسية</button>
                <button onClick={() => {onNavigate('reports'); setIsMobileMenuOpen(false)}} className={`block w-full text-right text-sm font-bold px-3 py-2 rounded-md ${activePage === 'reports' ? 'bg-green-50 text-[#006C35]' : 'text-gray-600'}`}>التقارير</button>
            </div>
        </div>
      )}
    </header>
  );
};