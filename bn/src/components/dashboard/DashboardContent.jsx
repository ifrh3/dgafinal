import React, { useState } from 'react';
import { GaugeChart } from './GaugeChart';
import { Bell, ChevronDown } from 'lucide-react';

export const DashboardContent = () => {
    const [filterOpen, setFilterOpen] = useState(false);

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Updates */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-full">
                        <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4"><Bell className="w-5 h-5 text-[#006C35]" /><h3 className="font-bold text-gray-900">آخر التحديثات</h3></div>
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-green-50 border border-green-100 flex items-start gap-3 hover:shadow-md transition-all cursor-pointer relative">
                                <Bell className="w-4 h-4 text-green-600 absolute left-4 top-4" />
                                <div className="mt-1 w-2 h-2 rounded-full bg-green-500 shrink-0"></div>
                                <div>
                                    <h4 className="text-sm font-bold text-green-900 mb-1">تم إصدار تقييم جديد</h4>
                                    <p className="text-xs text-green-700">اطلع عليه الآن</p>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-3 hover:shadow-md transition-all cursor-pointer relative">
                                <Bell className="w-4 h-4 text-amber-600 absolute left-4 top-4" />
                                <div className="mt-1 w-2 h-2 rounded-full bg-amber-500 shrink-0"></div>
                                <div>
                                    <h4 className="text-sm font-bold text-amber-900 mb-1">تذكير</h4>
                                    <p className="text-xs text-amber-700">يوجد تقييم لم يتم دراسته بعد</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Overview */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 relative overflow-hidden h-full">
                        <div className="flex justify-between items-start mb-8">
                            <div><h2 className="text-xl font-bold text-gray-900 flex items-center gap-2"><Bell className="w-5 h-5 text-[#C69C6D]" /> نظرة عامة</h2><p className="text-sm text-gray-400 mt-1">لسنة 2025</p></div>
                            <div className="flex items-center gap-3">
                                {/* Dashboard Filter Dropdown */}
                                <div className="relative">
                                    <button 
                                        onClick={() => setFilterOpen(!filterOpen)}
                                        className="flex items-center justify-between gap-2 bg-gray-50 border border-gray-200 text-xs font-bold text-gray-600 py-2 px-4 rounded-lg outline-none cursor-pointer hover:bg-gray-100 transition-colors min-w-[140px]"
                                    >
                                        <span>فرز حسب الدورة</span> 
                                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    
                                    {filterOpen && (
                                        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-lg shadow-lg z-10 overflow-hidden animate-fadeIn">
                                            {['الدورة الأولى', 'الدورة الثانية', 'الدورة الثالثة'].map((item) => (
                                                <button 
                                                    key={item}
                                                    onClick={() => setFilterOpen(false)}
                                                    className="w-full text-right px-4 py-2 text-xs font-bold text-gray-600 hover:bg-green-50 hover:text-[#006C35] transition-colors border-b border-gray-50 last:border-none"
                                                >
                                                    {item}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="flex flex-col items-center border-b md:border-b-0 md:border-l border-gray-100 pb-8 md:pb-0 md:pl-8">
                                <GaugeChart value={67} />
                            </div>
                            <div className="space-y-4">
                                <div className="bg-white rounded-xl p-4 border border-gray-200 flex flex-col justify-center items-center shadow-sm text-center hover:border-green-200 transition-colors"><h4 className="text-xs font-bold text-gray-500 mb-2">نسبة تطبيق المعايير الأساسية</h4><span className="text-3xl font-bold text-[#111827]">80%</span></div>
                                <div className="bg-white rounded-xl p-4 border border-gray-200 flex flex-col justify-center items-center shadow-sm text-center hover:border-[#C69C6D] transition-colors"><h4 className="text-xs font-bold text-gray-500 mb-2">نسبة تطبيق المعايير الثانوية</h4><span className="text-3xl font-bold text-[#111827]">80%</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};