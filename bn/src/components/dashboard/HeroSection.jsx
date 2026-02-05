import React from 'react';
import { LayoutDashboard, Building2 } from 'lucide-react';

export const HeroSection = () => (
    <div className="relative bg-gradient-to-r from-[#E6F4EA] to-[#F3F4F6] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-4">
                    <h1 className="text-3xl md:text-5xl font-bold text-[#111827]">منصة أبشر</h1>
                    <div className="flex gap-2"><span className="px-3 py-1 bg-white/60 border border-green-200 text-[#006C35] text-[10px] font-bold rounded-full flex items-center gap-1"><LayoutDashboard className="w-3 h-3"/> منصة خدمية</span><span className="px-3 py-1 bg-white/60 border border-blue-200 text-blue-700 text-[10px] font-bold rounded-full flex items-center gap-1"><Building2 className="w-3 h-3"/> وزارة الداخلية</span></div>
                    <p className="text-gray-500 text-sm md:text-base max-w-xl leading-relaxed">المنصة الإلكترونية الرائدة لوزارة الداخلية، تهدف لتسهيل الإجراءات وتقديم الخدمات للمواطنين والمقيمين.</p>
                </div>
            </div>
        </div>
    </div>
);