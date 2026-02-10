import React from 'react';
import { 
  LayoutDashboard, Twitter, Linkedin, Instagram, Facebook, 
  Smartphone, MapPin as MapPinIcon, Mail
} from 'lucide-react';

export const UnifiedFooter = ({ isDashboard = false }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`text-white border-t border-[#374151] font-ibm text-right relative z-10 ${isDashboard ? 'bg-[#1F2937]' : 'bg-black/90'}`} dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#006C35] rounded-lg flex items-center justify-center shadow-lg shadow-green-900/50">
                  {isDashboard ? (
                    <LayoutDashboard className="w-6 h-6 text-white" />
                  ) : (
                    <LayoutDashboard className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{isDashboard ? 'منصة الأمتثال الرقمي' : 'منصة قياس'}</h3>
                  <p className="text-xs text-gray-400">هيئة الحكومة الرقمية</p>
                </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              {isDashboard 
                ? 'المنصة الوطنية الموحدة لقياس أداء الخدمات الرقمية والامتثال لمعايير التجربة الرقمية في المملكة.'
                : 'المرجع الوطني الموحد لقياس جودة وكفاءة الخدمات الرقمية الحكومية، نهدف لرفع مستوى الامتثال وتحسين تجربة المستفيد وفق أعلى المعايير.'
              }
            </p>
            <div className="flex gap-3">
                <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-[#006C35] rounded-full flex items-center justify-center transition-colors"><Twitter className="w-4 h-4"/></a>
                <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-[#006C35] rounded-full flex items-center justify-center transition-colors"><Linkedin className="w-4 h-4"/></a>
                <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-[#006C35] rounded-full flex items-center justify-center transition-colors"><Instagram className="w-4 h-4"/></a>
                <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-[#006C35] rounded-full flex items-center justify-center transition-colors"><Facebook className="w-4 h-4"/></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-[#C69C6D] uppercase tracking-wider mb-4 border-b border-gray-700 pb-2 w-fit">عن المنصة</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-all inline-block hover:pr-2">الرؤية والرسالة</a></li>
              <li><a href="#" className="hover:text-white transition-all inline-block hover:pr-2">مجلس الإدارة</a></li>
              <li><a href="#" className="hover:text-white transition-all inline-block hover:pr-2">الشركاء الاستراتيجيين</a></li>
              <li><a href="#" className="hover:text-white transition-all inline-block hover:pr-2">المركز الإعلامي</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#C69C6D] uppercase tracking-wider mb-4 border-b border-gray-700 pb-2 w-fit">الخدمات والمعايير</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-all inline-block hover:pr-2">نظام التصميم الموحد</a></li>
              <li><a href="#" className="hover:text-white transition-all inline-block hover:pr-2">أدوات القياس</a></li>
              <li><a href="#" className="hover:text-white transition-all inline-block hover:pr-2">الشهادات الرقمية</a></li>
              <li><a href="#" className="hover:text-white transition-all inline-block hover:pr-2">البيانات المفتوحة</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#C69C6D] uppercase tracking-wider mb-4 border-b border-gray-700 pb-2 w-fit">تواصل معنا</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-3 group">
                 <div className="w-8 h-8 rounded bg-gray-700 group-hover:bg-[#006C35] transition-colors flex items-center justify-center"><Mail className="w-4 h-4"/></div>
                 <span>info@dga.gov.sa</span>
              </li>
              <li className="flex items-center gap-3 group">
                 <div className="w-8 h-8 rounded bg-gray-700 group-hover:bg-[#006C35] transition-colors flex items-center justify-center"><Smartphone className="w-4 h-4"/></div>
                 <span>19900</span>
              </li>
              <li className="flex items-center gap-3 group">
                 <div className="w-8 h-8 rounded bg-gray-700 group-hover:bg-[#006C35] transition-colors flex items-center justify-center"><MapPinIcon className="w-4 h-4"/></div>
                 <span>الرياض، المملكة العربية السعودية</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#374151] pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <div className="flex items-center gap-2">
              <p>© {currentYear} هيئة الحكومة الرقمية. جميع الحقوق محفوظة.</p>
          </div>
          <div className="flex gap-6 flex-wrap justify-center">
            <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-white transition-colors">شروط الاستخدام</a>
            <a href="#" className="hover:text-white transition-colors">خارطة الموقع</a>
            <a href="#" className="hover:text-white transition-colors">إمكانية الوصول</a>
          </div>
        </div>
      </div>
    </footer>
  );
};