import React from 'react';
import { Play } from 'lucide-react';

export const ActionBar = ({ onStart }) => (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6 mb-12 relative z-20">
        <div className="bg-[#E5E7EB] rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-3 text-center md:text-right">
                <div><h3 className="font-bold text-gray-900 text-lg">هل أنت جاهز؟</h3><p className="text-sm text-gray-500">ابدأ خطواتك الأولى في تطبيق كود المنصات.</p></div>
            </div>
            <button onClick={onStart} className="w-full md:w-auto bg-[#006C35] hover:bg-[#005a2b] text-white px-8 py-3.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 group">
                <Play className="w-4 h-4 fill-current group-hover:text-white transition-colors" /> ابدأ التقييم الذاتي
            </button>
        </div>
    </div>
);