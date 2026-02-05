import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronDown, ChevronUp, 
  Download, Eye, CheckCircle
} from 'lucide-react';

export const ReportsPage = ({ onNavigate }) => {
    // تم تحديث البيانات لتطابق الصورة
    const reports = [
        { id: 1, status: 'unverified', date: '2025/12/1', score: 50, cycle: 'الأولى', cycleColor: 'text-gray-900', scoreColor: 'text-red-700 bg-red-50' },
        { id: 2, status: 'unverified', date: '2025/12/1', score: 70, cycle: 'الثانية', cycleColor: 'text-[#C69C6D]', scoreColor: 'text-yellow-700 bg-yellow-50' }, // Gold for 2nd
        { id: 3, status: 'verified', date: '2025/12/1', score: 100, cycle: 'الثالثة', cycleColor: 'text-[#006C35]', scoreColor: 'text-green-700 bg-green-50' }, // Green for 3rd
    ];

    const [filterOpen, setFilterOpen] = useState('');

    // حالة التقرير بستايل DGA
    const getStatusBadge = (status) => status === 'verified' ? (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E6F4EA] text-[#006C35] border border-green-100 shadow-sm">
            <CheckCircle className="w-3.5 h-3.5" /> 
            تم الاعتماد
        </span>
    ) : (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-500 border border-gray-200 shadow-sm">
            لم يتم الاعتماد
        </span>
    );

    // نسبة الامتثال بستايل نظيف
    const getScoreBadge = (score, colorClass) => {
        // تحديد اللون بناءً على النسبة
        let styles = 'bg-red-50 text-red-700 border-red-100';
        if (score >= 90) styles = 'bg-[#E6F4EA] text-[#006C35] border-green-100';
        else if (score >= 70) styles = 'bg-amber-50 text-amber-700 border-amber-100';

        return (
            <div className={`flex items-center justify-center w-12 h-8 rounded-lg text-sm font-bold border ${styles} mx-auto`}>
                {score}%
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 animate-fadeIn font-ibm">
            
            {/* Header Section Matches Image but Cleaner */}
            <div className="flex flex-col-reverse md:flex-row justify-between items-end mb-8 gap-4">
                 {/* Title and Breadcrumbs on Right (Now First in DOM for RTL) */}
                 <div className="text-right w-full md:w-auto order-2 md:order-1">
                     <div className="text-xs text-gray-400 mb-2 flex items-center justify-start gap-1 font-medium">
                         <span onClick={() => onNavigate('dashboard')} className="cursor-pointer hover:text-[#006C35] transition-colors">الصفحة الرئيسية</span> 
                         <ChevronLeft className="w-3 h-3 rotate-180" /> 
                         <span className="text-gray-600">قائمة التقارير</span>
                     </div>
                     <h1 className="text-3xl font-bold text-[#111827] flex items-center justify-start gap-3">
                        قائمة التقارير
                     </h1>
                 </div>

                 {/* Filters on Left (Now Last in DOM for RTL) */}
                 <div className="flex gap-3 w-full md:w-auto order-1 md:order-2 justify-end">
                     {/* Cycle Filter Dropdown */}
                     <div className="relative">
                        <button 
                            onClick={() => setFilterOpen(filterOpen === 'cycle' ? '' : 'cycle')}
                            className="flex items-center justify-between gap-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all min-w-[120px]"
                        >
                            <span>الدورة</span> 
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${filterOpen === 'cycle' ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {filterOpen === 'cycle' && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden animate-fadeIn">
                                {['الدورة الأولى', 'الدورة الثانية', 'الدورة الثالثة'].map((item) => (
                                    <button 
                                        key={item}
                                        onClick={() => setFilterOpen('')}
                                        className="w-full text-right px-4 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-[#006C35] transition-colors border-b border-gray-50 last:border-none"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        )}
                     </div>

                     <button className="flex items-center justify-between gap-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all min-w-[120px]">
                         <span>السنة</span> 
                         <ChevronDown className="w-4 h-4 text-gray-400" />
                     </button>
                 </div>
            </div>

            {/* Table Card */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden ring-1 ring-black ring-opacity-5">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                        <thead>
                            <tr className="bg-[#F9FAFB] border-b border-gray-200">
                                {/* Reversed Order: Status (Right) -> Date -> Score -> Cycle -> Actions (Left) */}
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">حالة التقرير</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center justify-center gap-1 cursor-pointer hover:text-gray-700">
                                        التاريخ <ChevronUp className="w-3 h-3"/>
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">نسبة الامتثال الاجمالي</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">رقم الدورة</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">الاجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {reports.map((r) => (
                                <tr key={r.id} className="hover:bg-gray-50/80 transition-colors group">
                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                        {getStatusBadge(r.status)}
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm font-medium text-gray-600 whitespace-nowrap dir-ltr">
                                        {r.date}
                                    </td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                        {getScoreBadge(r.score)}
                                    </td>
                                    <td className={`px-6 py-4 text-center text-sm font-bold ${r.cycleColor}`}>
                                        {r.cycle}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex justify-center gap-2">
                                            {/* Secondary Button */}
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm">
                                                <Download className="w-3.5 h-3.5" />
                                                <span className="hidden xl:inline">تصدير</span>
                                            </button>
                                            {/* Primary Button */}
                                            <button onClick={() => onNavigate('report-details')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#006C35] text-[#006C35] text-xs font-bold hover:bg-[#E6F4EA] transition-all shadow-sm">
                                                <Eye className="w-3.5 h-3.5" />
                                                <span>عرض التفاصيل</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Placeholder (Design Touch) */}
                <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-xs text-gray-500">عرض 1 إلى 3 من أصل 3 سجلات</div>
                    <div className="flex gap-1">
                        <button className="p-1 rounded hover:bg-gray-100 text-gray-400 disabled:opacity-50" disabled><ChevronLeft className="w-4 h-4 rotate-180" /></button>
                        <button className="p-1 rounded hover:bg-gray-100 text-gray-600"><ChevronLeft className="w-4 h-4" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};