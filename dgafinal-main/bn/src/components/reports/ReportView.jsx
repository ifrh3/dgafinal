import React from 'react';
import { 
  ArrowLeft, Printer, Download, Layout, 
  Calendar, Clock, User, Monitor, 
  FileText, MessageSquarePlus, MapPin, 
  AlertTriangle, Code, ShieldCheck, 
  Check, X, EyeIcon, Timer, 
  MousePointer2, Smartphone, 
  MapPin as MapPinIcon, Mail
} from 'lucide-react';

export const ReportView = ({ onNavigate }) => {
  // بيانات المحاكاة
  const platformData = { name: 'أبشر', owner: 'وزارة الداخلية', cycle: 'الأولى - 2025' };
  const reportData = {
    id: 'RPT-2025-8842', date: '2025-12-15', time: '10:30 صباحاً', score: 58, status: 'غير ممتثل', statusColor: 'text-red-700 bg-red-50 border-red-200',
    summary: 'بناءً على عملية القياس، تبين أن المنصة تحقق امتثالاً جزئياً لمعايير التصميم الموحد. توجد ملاحظات جوهرية تتعلق باستخدام الهوية البصرية ورسائل الخطأ.',
    evaluator: { name: 'محمد الفهد', email: 'm.alfahad@dga.gov.sa' },
    stats: { manual: { score: 19, total: 40 }, total: { score: 58, total: 100 }, basic: { score: 12, total: 43 }, secondary: { score: 2, total: 12 } }
  };
  const evaluationNotes = [
    { id: 1, criteria: 'قياس رسالة الخطأ (وضوح النص)', reference: 'القسم 2.1 - دليل التصميم', type: 'يدوي', status: 'partial', note: 'النص المستخدم في رسائل الخطأ تقني جداً ولا يساعد المستخدم العادي.', errors: [] },
    { id: 2, criteria: 'قياس رسالة الخطأ (مكان الظهور)', reference: 'القسم 2.3 - دليل التصميم', type: 'يدوي', status: 'pass', note: 'تم التحقق، رسائل الخطأ تظهر بمحاذاة الحقل بشكل صحيح.', errors: [] },
    { id: 3, criteria: 'استخدام الهوية البصرية المعتمدة', reference: 'القسم 3.1 - الهوية', type: 'آلي', status: 'fail', note: 'تم رصد ألوان غير موجودة في مكتبة الألوان المعتمدة.', errors: [{ id: 'e1', location: '/home/index', line: 23, snippet: '<nav style="background-color: #FF0099;">' }] }
  ];

  const getStatusStyles = (status) => {
    switch(status) {
      case 'pass': return { text: 'مطبق', badge: 'text-green-700 bg-green-50 border-green-200', border: 'border-r-green-500', icon: <Check className="w-3 h-3" /> };
      case 'fail': return { text: 'غير مطبق', badge: 'text-red-700 bg-red-50 border-red-200', border: 'border-r-red-500', icon: <X className="w-3 h-3" /> };
      case 'partial': return { text: 'تنفيذ جزئي', badge: 'text-yellow-700 bg-yellow-50 border-yellow-200', border: 'border-r-yellow-500', icon: <AlertTriangle className="w-3 h-3" /> };
      default: return { text: '-', badge: 'text-gray-500 bg-gray-50', border: 'border-r-gray-300', icon: null };
    }
  };

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-ibm animate-fadeIn">
      {/* Top Bar */}
      <div className="max-w-5xl mx-auto mb-6 flex justify-between items-center print:hidden">
        <button onClick={() => onNavigate('reports')} className="text-gray-500 hover:text-[#006C35] flex items-center gap-2 transition-colors font-bold text-sm">
            <ArrowLeft className="w-4 h-4" /> عودة للوحة التحكم
        </button>
        <div className="flex gap-3">
            <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-[#111827] border border-transparent text-white rounded-lg hover:bg-black transition-colors shadow-sm font-bold text-xs">
                <Printer className="w-4 h-4" /> طباعة
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#006C35] text-white rounded-lg hover:bg-[#005a2b] transition-colors shadow-sm font-bold text-xs">
                <Download className="w-4 h-4" /> تصدير PDF
            </button>
        </div>
      </div>

      {/* Report Container */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden max-w-5xl mx-auto print:shadow-none print:border-none print:w-full">
          <div className="bg-[#006C35] h-2 w-full"></div>
          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start border-b border-gray-100 pb-8 mb-8 gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center">
                        <Layout className="w-7 h-7 text-[#006C35]" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">تقرير قياس الامتثال</h1>
                        <p className="text-gray-500 text-sm">نظام التصميم الحكومي الموحد</p>
                    </div>
                </div>
                <div className="text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded text-xs font-bold text-gray-600 mb-2">
                        المرجع: {reportData.id}
                    </div>
                    <div className="flex flex-col gap-1 text-sm text-gray-500">
                      <div className="flex items-center justify-end gap-1"><span>{reportData.date}</span><Calendar className="w-3 h-3" /></div>
                      <div className="flex items-center justify-end gap-1"><span>{reportData.time}</span><Clock className="w-3 h-3" /></div>
                    </div>
                </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <div className="flex items-center gap-2 text-[#006C35] mb-3"><User className="w-4 h-4" /><h3 className="text-xs font-bold uppercase">المقيم</h3></div>
                    <div className="font-bold text-gray-900 text-base mb-1">{reportData.evaluator.name}</div>
                    <div className="text-xs text-gray-500 dir-ltr">{reportData.evaluator.email}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                      <div className="flex items-center gap-2 text-[#006C35] mb-3"><Monitor className="w-4 h-4" /><h3 className="text-xs font-bold uppercase">المنصة</h3></div>
                    <div className="font-bold text-gray-900 text-base">{platformData.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{platformData.owner} - {platformData.cycle}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col items-center justify-center text-center">
                    <div className="text-xs font-bold text-gray-500 uppercase mb-2">النتيجة النهائية</div>
                    <div className="text-4xl font-bold text-[#006C35] mb-2">{reportData.score}%</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${reportData.statusColor}`}>{reportData.status}</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {Object.entries(reportData.stats).map(([key, val], idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 flex flex-col items-center justify-center text-center border border-gray-200 shadow-sm">
                        <h3 className="text-xs font-bold text-gray-500 mb-2 capitalize">{key === 'manual' ? 'الفحص اليدوي' : key === 'total' ? 'الإجمالي' : key === 'basic' ? 'الأساسية' : 'الثانوية'}</h3>
                        <div className="flex items-baseline gap-1 dir-ltr"><span className="text-xs text-gray-400">/{val.total}</span><span className="text-2xl font-bold text-gray-900">{val.score}</span></div>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="mb-10">
                <h3 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-2"><FileText className="w-5 h-5 text-gray-400" /> الملخص التنفيذي</h3>
                <div className="bg-white border-l-4 border-[#006C35] pl-4 py-4 pr-3 text-gray-700 leading-relaxed text-sm shadow-sm rounded-r-lg">
                    {reportData.summary}
                </div>
            </div>

            {/* Details */}
            <div className="mb-10">
                <h3 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2"><MessageSquarePlus className="w-5 h-5 text-gray-400" /> التفاصيل الفنية</h3>
                <div className="space-y-6">
                    {evaluationNotes.map((item) => {
                        const style = getStatusStyles(item.status);
                        return (
                        <div key={item.id} className={`bg-white rounded-lg border border-gray-200 border-r-4 ${style.border} overflow-hidden shadow-sm`}>
                            <div className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-gray-50 border-b border-gray-100">
                                <div>
                                    <div className="font-bold text-gray-900 text-sm flex items-center gap-2">
                                        {item.criteria}
                                        <span className="text-[10px] bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full font-normal">{item.type}</span>
                                    </div>
                                    <div className="text-[10px] text-gray-500 mt-1">{item.reference}</div>
                                </div>
                                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${style.badge}`}>
                                    {style.icon} {style.text}
                                </div>
                            </div>
                            <div className="p-4 space-y-4">
                                <div>
                                    <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-2">الملاحظات</h4>
                                    <div className="text-sm text-gray-700 bg-gray-50/50 p-3 rounded border border-gray-100">{item.note}</div>
                                </div>
                                {item.errors && item.errors.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="text-[10px] font-bold text-red-600 uppercase mb-2 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> سجل الأخطاء ({item.errors.length})</h4>
                                        <div className="space-y-2">
                                            {item.errors.map((error) => (
                                                <div key={error.id} className="bg-red-50 border border-red-100 rounded p-3 text-sm">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-2 text-red-800 font-bold text-[10px]"><MapPin className="w-3 h-3" /> {error.location}</div>
                                                        <span className="text-[10px] text-red-500 font-mono">Line: {error.line}</span>
                                                    </div>
                                                    <div className="bg-white border border-red-100 rounded p-2 font-mono text-[10px] text-gray-600 overflow-x-auto" dir="ltr">{error.snippet}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer of Report */}
            <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center md:items-end text-sm text-gray-500 gap-4">
                <div className="text-center md:text-right">
                    <p>هذا التقرير تم إنشاؤه آلياً بواسطة منصة القياس الموحدة.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#E6F4EA] rounded-full border border-[#006C35]/20">
                    <ShieldCheck className="w-5 h-5 text-[#006C35]" />
                    <span className="font-bold text-[#006C35] text-xs">وثيقة معتمدة رقمياً</span>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};