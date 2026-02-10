import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, User, Lock, ArrowLeft, Check, 
  Edit3, Layers, Shield, Award, CheckCircle, XCircle, 
  Zap, Globe, MousePointer2, Timer, ShieldCheck, Eye,
  Loader2, AlertTriangle, FileText, ChevronDown, CheckSquare, X,
  Mail, Smartphone, MapPin, Twitter, Linkedin, Instagram, Facebook,
  ListTodo, Info, Smile, Meh, Frown, Search, Menu, ChevronLeft,
  LogOut, Filter, Plus, Trash2, MoreVertical, Building2, Home,
  AlertCircle, Download, Users, Calendar, PlayCircle, Briefcase,
  Monitor, Landmark, Cpu, ExternalLink, MessageSquarePlus, Layout,
  BookOpen, History, Code, Save, Cloud, FileWarning,
  ChevronUp, ArrowRight, BarChart3, Activity, PieChart as PieChartIcon
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, 
  Area, AreaChart, Legend
} from 'recharts';


/* ========================================================================
   GLOBAL CONFIG & STYLES
   ======================================================================== */
const lowComplianceData = [
  { name: 'منصة X', value: 45 },
  { name: 'منصة Y', value: 52 },
  { name: 'منصة Z', value: 58 },
  { name: 'منصة W', value: 62 },
  { name: 'منصة V', value: 65 },
];

const topComplianceData = [
  { name: 'أبشر', primary: 98, secondary: 95 },
  { name: 'توكلنا', primary: 96, secondary: 92 },
  { name: 'ناجز', primary: 95, secondary: 88 },
  { name: 'صحتي', primary: 94, secondary: 90 },
  { name: 'إحسان', primary: 92, secondary: 85 },
  { name: 'اعتماد', primary: 90, secondary: 82 },
  { name: 'قوى', primary: 88, secondary: 80 },
  { name: 'مدرستي', primary: 87, secondary: 85 },
  { name: 'سابر', primary: 85, secondary: 78 },
  { name: 'مساند', primary: 84, secondary: 75 },
];
const NavCard = ({ title, subtitle, icon: Icon, bgColor, onClick }) => (
  <div 
    onClick={onClick} 
    className={`cursor-pointer ${bgColor || 'bg-gray-800'} rounded-xl p-6 text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between h-40 relative overflow-hidden`}
  >
    <div className="relative z-10 flex flex-col h-full justify-between">
      <div className="flex justify-between items-start">
        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
          {Icon && <Icon className="w-8 h-8 text-white" />}
        </div>
        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
      </div>
      <div>
        <h3 className="text-xl font-bold mt-2">{title}</h3>
        <p className="text-sm text-white/80 mt-1 opacity-80">{subtitle}</p>
      </div>
    </div>
    <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-white opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out"></div>
  </div>
);

const COLORS = {
  primary: '#006C35', // DGA Green
  hover: '#000000',   // Black for Hover
  secondary: '#C69C6D', // Gold
  bg: '#F9FAFB',
  white: '#FFFFFF',
  border: '#E5E7EB',
  text: '#111827',
  grayText: '#6B7280',
  success: '#006C35', // Excellent
  warning: '#F59E0B', // Medium/Average
  danger: '#EF4444'   // Poor/Weak
};

// CSS للنصوص والتنسيق
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@100;200;300;400;500;600;700&display=swap');
  
  * {
    font-family: 'IBM Plex Sans Arabic', sans-serif;
  }
  
  /* تصحيح اتجاه العناصر */
  .progress-bar-rtl {
    transform: scaleX(-1);
  }
  
  /* تنسيق النصوص العربية */
  .text-right {
    text-align: right;
  }
  
  /* تنسيق للقوائم */
  ul, ol {
    list-style-position: inside;
    padding-right: 1rem;
  }
  
  /* تنسيق الأزرار */
  button {
    font-family: 'IBM Plex Sans Arabic', sans-serif;
  }
  
  /* تحسين النصوص العربية */
  .arabic-text {
    letter-spacing: 0;
    line-height: 1.8;
  }

  /* تنسيق الجداول للغة العربية */
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th {
    text-align: right;
    padding: 12px;
  }

  td {
    text-align: right;
    padding: 12px;
  }

  /* تنسيق النماذج */
  input, textarea, select {
    text-align: right;
  }

  /* تنسيق التواريخ والأرقام */
  .date-rtl {
    direction: ltr;
    display: inline-block;
    unicode-bidi: embed;
  }

  /* تنسيق العناوين */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.3;
  }

  /* تحسين شريط التقدم */
  .progress-container {
    direction: ltr;
  }
  
  .progress-bar {
    transform-origin: left center;
  }
`;

/* ========================================================================
   DATA & CONSTANTS FOR DASHBOARD
   ======================================================================== */
const PLATFORM_LIST = [
  'أبشر', 'صحتي', 'ناجز', 'توكلنا', 'بلدي', 'اعتماد', 
  'قوى', 'مدرستي', 'إحسان', 'سابر', 'مقيم', 'مساند'
];

const barData = [
  { name: 'يناير', value: 4 }, { name: 'فبراير', value: 6 }, { name: 'مارس', value: 8 },
  { name: 'أبريل', value: 7 }, { name: 'مايو', value: 9 }, { name: 'يونيو', value: 5 },
  { name: 'يوليو', value: 8 }, { name: 'أغسطس', value: 9 }, { name: 'سبتمبر', value: 6 },
  { name: 'أكتوبر', value: 8 }, { name: 'نوفمبر', value: 7 }, { name: 'ديسمبر', value: 9 },
];

const lineData = [
  { name: 'يناير', value: 600 }, { name: 'فبراير', value: 750 }, { name: 'مارس', value: 680 },
  { name: 'أبريل', value: 850 }, { name: 'مايو', value: 720 }, { name: 'يونيو', value: 890 },
  { name: 'يوليو', value: 800 }, { name: 'أغسطس', value: 950 }, { name: 'سبتمبر', value: 850 },
  { name: 'أكتوبر', value: 900 }, { name: 'نوفمبر', value: 820 }, { name: 'ديسمبر', value: 980 },
];

const dashboardTableData = [
  { id: 1, name: 'أبشر', ministry: 'وزارة الداخلية', logo: 'https://ui-avatars.com/api/?name=أبشر&background=006C35&color=fff&size=128', date: '9/12/2025', cycle: 'دورة قياس 1', status: 'تم التبني', statusStyle: 'bg-[#E6F4EA] text-[#006C35] border border-[#006C35]/20' },
  { id: 2, name: 'صحتي', ministry: 'وزارة الصحة', logo: 'https://ui-avatars.com/api/?name=صحتي&background=2563eb&color=fff&size=128', date: '11/4/2025', cycle: 'دورة قياس 1', status: 'غير معتمد', statusStyle: 'bg-gray-100 text-gray-600 border border-gray-200' },
  { id: 3, name: 'ناجز', ministry: 'وزارة العدل', logo: 'https://ui-avatars.com/api/?name=ناجز&background=C69C6D&color=fff&size=128', date: '9/7/2025', cycle: 'دورة قياس 1', status: 'قيد التنفيذ', statusStyle: 'bg-[#FFF8F1] text-[#C69C6D] border border-[#C69C6D]/20' },
];

const initialInternalUsers = [
  { id: 101, name: 'محمد الفهد', email: 'm.alfahad@dga.gov.sa', role: 'مدير نظام (كامل)', roleType: 'full', status: 'مفعل' },
  { id: 102, name: 'سارة العلي', email: 's.alali@dga.gov.sa', role: 'مدير تشغيلي', roleType: 'operational', status: 'مفعل' },
];

const initialPlatformUsers = [
  { id: 201, name: 'عبدالله القحطاني', email: 'admin@absher.sa', platform: 'أبشر', status: 'مفعل' },
  { id: 202, name: 'نورة الدوسري', email: 'contact@sehaty.sa', platform: 'صحتي', status: 'مفعل' },
];

const platformDetails = {
  name: 'أبشر',
  ownerEntity: 'وزارة الداخلية',
  sector: 'الداخلية والأمن',
  type: 'منصة خدمات أفراد وأعمال',
  manager: 'عبدالله القحطاني',
  email: 'admin@absher.sa',
  logo: 'https://ui-avatars.com/api/?name=أبشر&background=006C35&color=fff&size=128',
  url: 'https://www.absher.sa',
  currentCycle: 1,
  maxCycles: 3
};

const timelineSteps = [
  { id: 1, title: 'الفحص اليدوي', date: '1 يناير 2025', status: 'completed' },
  { id: 2, title: 'الفحص المؤتمت', date: '5 يناير 2025', status: 'completed' },
  { id: 3, title: 'إصدار النتائج (مراجعة)', date: '10 يناير 2025', status: 'completed' },
];

const mockErrorsItem2 = [
  { id: 'err-1', page: 'الرئيسية', path: '/home/index', snippet: '<img src="logo.png" style="margin: 0;" />' },
  { id: 'err-2', page: 'اتصل بنا', path: '/contact-us', snippet: '<img src="header-logo.svg" class="no-pad" />' }
];

/* ========================================================================
   FOOTER UNIFICADO
   ======================================================================== */
const UnifiedFooter = ({ isDashboard = false }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`text-white border-t border-[#374151] font-ibm text-right relative z-10 ${isDashboard ? 'bg-[#1F2937]' : 'bg-black/90'}`} dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#006C35] rounded-lg flex items-center justify-center shadow-lg shadow-green-900/50">
                  {isDashboard ? (
                    <DgaLogo className="w-6 h-6 text-white" />
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
                 <div className="w-8 h-8 rounded bg-gray-700 group-hover:bg-[#006C35] transition-colors flex items-center justify-center"><MapPin className="w-4 h-4"/></div>
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

/* ========================================================================
   COMPONENTS - EXTERNAL SCAN SYSTEM
   ======================================================================== */

// --- 1. Header ---
const Header = ({ onLoginClick }) => {
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

// --- 2. Footer OLD (مستبدل بالفوتر الموحد) ---
const Footer = () => <UnifiedFooter isDashboard={false} />;

// --- 3. Login Modal ---
const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (username === 'Farah' && password === '1234') {
      onLogin();
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn font-ibm">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden transform scale-100 transition-all">
        <div className="h-1.5 bg-[#006C35] w-full"></div>
        <button onClick={onClose} className="absolute left-4 top-4 text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        <div className="p-8 text-center">
           <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100">
               <ShieldCheck className="w-8 h-8 text-[#006C35]" />
           </div>
           <h2 className="text-2xl font-bold text-[#111827] mb-2">تسجيل الدخول</h2>
           <p className="text-gray-500 text-sm mb-8">بوابة الجهات الحكومية والمقيمين</p>
           
           <form onSubmit={handleSubmit} className="space-y-4 text-right">
             {error && (
               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                 {error}
               </div>
             )}
             
             <div>
                 <label className="block text-xs font-bold text-gray-700 mb-1.5">اسم المستخدم</label>
                 <input 
                   type="text" 
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   className="w-full bg-white border border-gray-300 rounded-lg focus:border-[#006C35] focus:ring-1 focus:ring-[#006C35] py-3 px-4 text-sm transition-colors" 
                   placeholder="أدخل اسم المستخدم" 
                   dir="ltr" 
                   required
                 />
             </div>
             <div>
                 <label className="block text-xs font-bold text-gray-700 mb-1.5">كلمة المرور</label>
                 <input 
                   type="password" 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full bg-white border border-gray-300 rounded-lg focus:border-[#006C35] focus:ring-1 focus:ring-[#006C35] py-3 px-4 text-sm transition-colors" 
                   placeholder="••••••••" 
                   dir="ltr" 
                   required
                 />
             </div>
             
             <button 
               type="submit"
               className="w-full mt-8 bg-[#006C35] hover:bg-black text-white font-bold py-3.5 rounded-lg shadow-lg transition-all active:scale-[0.98]"
             >
               تسجيل الدخول
             </button>
           </form>
           
           <div className="mt-6 text-xs text-gray-500">
             <p>بيانات الدخول الافتراضية:</p>
             <p className="font-mono mt-1">اسم المستخدم: <span className="font-bold">Farah</span></p>
             <p className="font-mono">كلمة المرور: <span className="font-bold">1234</span></p>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- 4. Scanning & Report Views ---
const ScanningLoader = ({ url, onComplete }) => {
    const [step, setStep] = useState(0);
    const [progress, setProgress] = useState(0);
    
    const steps = [
        "جارٍ الاتصال بالخادم...",
        "تحليل هيكلية الصفحة (DOM)...", 
        "التحقق من معايير الوصولية...",
        "فحص التباين والألوان...",
        "جاري إعداد التقرير النهائي..."
    ];

    useEffect(() => {
        if (step < steps.length) {
            const stepProgress = ((step + 1) / steps.length) * 100;
            setProgress(stepProgress);
            
            const timeout = setTimeout(() => {
                setStep(prev => prev + 1);
            }, 800);
            
            return () => clearTimeout(timeout);
        } else {
            setTimeout(onComplete, 500);
        }
    }, [step]);

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center animate-fadeIn my-12 font-ibm" dir="rtl">
             <div className="relative w-20 h-20 mx-auto mb-6">
                 <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                 <div className="absolute inset-0 border-4 border-[#006C35] rounded-full border-t-transparent animate-spin"></div>
                 <Globe className="absolute inset-0 w-8 h-8 m-auto text-[#006C35]" />
             </div>
             <h3 className="text-xl font-bold text-gray-900 mb-2" dir="ltr">{url}</h3>
             <p className="text-gray-500 mb-8 text-sm">{steps[Math.min(step, steps.length - 1)]}</p>
             
             {/* شريط التقدم - معدل للغة العربية */}
             <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden" dir="ltr">
                 <div 
                    className="h-full bg-[#006C35] transition-all duration-500 ease-out"
                    style={{ 
                        width: `${progress}%`,
                        transform: 'scaleX(-1)'
                    }}
                 ></div>
             </div>
             
             <div className="flex justify-between mt-2 text-xs text-gray-500">
                 <span>0%</span>
                 <span className="font-bold text-[#006C35]">{Math.round(progress)}%</span>
                 <span>100%</span>
             </div>
        </div>
    );
};

// --- 5. Manual Checklist Component ---
const ManualChecklist = () => {
    const [checkedItems, setCheckedItems] = useState({});
    
    const items = [
        { id: 1, text: "التأكد من استخدام الألوان المعتمدة (Primary, Secondary) وعدم استبدالها." },
        { id: 2, text: "التحقق من استخدام خط (IBM Plex Sans Arabic) بجميع الأوزان." },
        { id: 3, text: "التأكد من تجاوب الموقع مع الشاشات الصغيرة (Mobile Responsiveness)." },
        { id: 4, text: "التحقق من وضوح رسائل الخطأ وملاءمتها للمستخدم." },
        { id: 5, text: "التأكد من وجود شعار الرؤية وشعار الجهة في الأماكن الصحيحة." }
    ];

    const toggleItem = (id) => {
        setCheckedItems(prev => ({...prev, [id]: !prev[id]}));
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8 border-r-4 border-r-[#C69C6D] animate-fadeIn mt-8">
            <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
                <div className="bg-[#FFF8F1] p-2 rounded-lg text-[#C69C6D]">
                    <ListTodo className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-800 text-lg">قائمة التحقق اليدوية (إلزامي)</h3>
                    <p className="text-xs text-gray-500">يجب عليك التحقق من هذه العناصر بنفسك قبل اعتماد النتيجة النهائية</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-gray-200" onClick={() => toggleItem(item.id)}>
                        <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${checkedItems[item.id] ? 'bg-[#006C35] border-[#006C35] text-white' : 'border-gray-300 bg-white'}`}>
                            {checkedItems[item.id] && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className={`text-sm font-medium leading-relaxed ${checkedItems[item.id] ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{item.text}</span>
                    </div>
                ))}
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-100 p-3 rounded-lg flex items-start gap-2">
                <Info className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-yellow-700 font-medium">
                    تنبيه هام: التقييم الآلي المعروض أدناه لا يغطي الجوانب البصرية والتجربة الكاملة. يجب استيفاء القائمة أعلاه يدوياً.
                </p>
            </div>
        </div>
    );
};

// --- HELPER FOR CARDS ---
const KPICard = ({ title, value, total, colorStyles }) => (
    <div className={`rounded-xl border p-4 flex flex-col items-center justify-center text-center shadow-sm h-32 relative overflow-hidden group transition-all hover:scale-[1.02] hover:shadow-md ${colorStyles.bg} ${colorStyles.border}`}>
        <h4 className={`text-xs font-bold mb-2 ${colorStyles.title}`}>{title}</h4>
        <div className="flex items-baseline gap-1">
             <span className={`text-3xl font-bold ${colorStyles.text}`}>{value}</span>
             <span className="text-xs text-gray-400 font-medium">/ {total}</span>
        </div>
    </div>
);

const ReportView = ({ url, onReset }) => {
    const score = 58;
    let scoreColor = COLORS.warning;
    if (score >= 80) scoreColor = COLORS.success;
    else if (score < 50) scoreColor = COLORS.danger;

    const gaugeData = [
        { value: score, color: scoreColor }, 
        { value: 100 - score, color: '#E5E7EB' }
    ];
    
    return (
        <div className="w-full max-w-6xl mx-auto animate-fadeIn pb-20 font-ibm">
            <div className="mb-12 pt-8">
                 <div className="flex justify-between items-end mb-8 px-4">
                     <div>
                         <h2 className="text-2xl font-bold text-[#111827]">نتائج الفحص</h2>
                         <p className="text-sm text-gray-500 mt-1" dir="ltr">{url}</p>
                     </div>
                     <button onClick={onReset} className="text-sm text-[#006C35] hover:underline font-bold flex items-center gap-1">
                        <ArrowLeft className="w-4 h-4" />
                        فحص جديد
                     </button>
                 </div>

                 <div className="relative flex justify-center items-center max-w-3xl mx-auto mb-12">
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
                      <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-[#006C35] -z-10 transform -translate-y-1/2 translate-x-1/2"></div>
                      
                      <div className="flex justify-between w-full px-12">
                          <div className="flex flex-col items-center gap-2">
                               <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center text-gray-400 font-bold z-10">3</div>
                               <span className="text-xs text-gray-400 font-bold">النتيجة النهائية</span>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                               <div className="w-10 h-10 rounded-full bg-white border-2 border-[#006C35] flex items-center justify-center text-[#006C35] font-bold z-10">2</div>
                               <span className="text-xs text-[#006C35] font-bold">المعايير الأساسية</span>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                               <div className="w-10 h-10 rounded-full bg-[#006C35] flex items-center justify-center text-white font-bold z-10"><Check className="w-5 h-5" /></div>
                               <span className="text-xs text-[#006C35] font-bold">الفحص اليدوي</span>
                          </div>
                      </div>
                 </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-8">
                 <div className="flex justify-between items-center mb-8">
                     <h3 className="text-lg font-bold text-gray-800">ملخص النتائج</h3>
                     <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">تم التحديث للتو</span>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
                      <KPICard 
                        title="اجمالي المعايير" 
                        value="58" 
                        total="100" 
                        colorStyles={{
                            bg: 'bg-green-50', 
                            border: 'border-green-100', 
                            text: 'text-green-700', 
                            title: 'text-green-900'
                        }} 
                      />

                      <KPICard 
                        title="معايير الفحص اليدوي" 
                        value="19" 
                        total="40" 
                        colorStyles={{
                            bg: 'bg-amber-50', 
                            border: 'border-amber-100', 
                            text: 'text-amber-700', 
                            title: 'text-amber-900'
                        }}
                      />
                      
                      <KPICard 
                        title="المعايير الأساسية" 
                        value="12" 
                        total="43" 
                        colorStyles={{
                            bg: 'bg-red-50', 
                            border: 'border-red-100', 
                            text: 'text-red-700', 
                            title: 'text-red-900'
                        }}
                      />
                      
                      <KPICard 
                        title="المعايير الثانوية" 
                        value="2" 
                        total="12" 
                        colorStyles={{
                            bg: 'bg-red-50', 
                            border: 'border-red-100', 
                            text: 'text-red-700', 
                            title: 'text-red-900'
                        }}
                      />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:divide-x md:divide-x-reverse divide-gray-100">
                      <div className="flex flex-col items-center justify-center p-4">
                           <h4 className="text-sm font-bold text-gray-700 mb-8">مستوى الالتزام بالكود الموحد</h4>
                           
                           <div className="flex items-end gap-1.5 h-24 w-full max-w-xs mb-6 px-4">
                               <div className="w-1/4 h-1/3 bg-red-500 rounded-t-lg relative group transition-all hover:opacity-90"></div>
                               <div className="w-1/3 h-2/3 bg-amber-500 rounded-t-lg relative group transition-all hover:opacity-90"></div>
                               <div className="w-1/2 h-full bg-[#006C35] rounded-t-lg relative group transition-all hover:opacity-90"></div>
                           </div>

                           <div className="flex justify-between w-full max-w-xs text-center">
                               <div className="flex flex-col items-center gap-1">
                                    <Frown className="w-5 h-5 text-red-500" />
                                    <span className="text-[10px] text-red-600 font-bold">غير ممتثل</span>
                                    <span className="text-xs font-bold text-red-600">10%</span>
                               </div>
                               <div className="flex flex-col items-center gap-1">
                                    <Meh className="w-5 h-5 text-amber-500" />
                                    <span className="text-[10px] text-amber-600 font-bold">شبه ممتثل</span>
                                    <span className="text-xs font-bold text-amber-600">30%</span>
                               </div>
                               <div className="flex flex-col items-center gap-1">
                                    <Smile className="w-5 h-5 text-[#006C35]" />
                                    <span className="text-[10px] text-[#006C35] font-bold">ممتثل</span>
                                    <span className="text-xs font-bold text-[#006C35]">60%</span>
                               </div>
                           </div>
                      </div>

                      <div className="flex flex-col items-center justify-center p-4 relative">
                           <h4 className="text-sm font-bold text-gray-700 mb-4">نسبة الالتزام بالكود الموحد</h4>
                           <div className="relative w-64 h-32 overflow-hidden">
                               <ResponsiveContainer width="100%" height="200%">
                                   <PieChart>
                                       <Pie 
                                         data={gaugeData} 
                                         cx="50%" 
                                         cy="50%" 
                                         startAngle={180} 
                                         endAngle={0} 
                                         innerRadius={80} 
                                         outerRadius={100} 
                                         paddingAngle={0} 
                                         dataKey="value" 
                                         stroke="none"
                                       >
                                           {gaugeData.map((entry, index) => (
                                               <Cell key={`cell-${index}`} fill={entry.color} />
                                           ))}
                                       </Pie>
                                   </PieChart>
                               </ResponsiveContainer>
                               <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 text-center">
                                    <span className="text-5xl font-bold tracking-tighter" style={{ color: scoreColor }}>{score}%</span>
                               </div>
                           </div>
                           <div className="flex items-center gap-2 mt-4">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: scoreColor }}></span>
                                <span className="text-xs text-gray-500">النتيجة الحالية</span>
                           </div>
                      </div>
                 </div>
            </div>

            <ManualChecklist />

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-8">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <h3 className="font-bold text-gray-800">تقرير الأخطاء التفصيلي (النتائج الآلية)</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {[
                            { title: 'وجود شعار الرؤية والهيئة في الترويسة', status: 'fail', type: 'أساسي', msg: 'الشعار غير موجود أو أبعاده غير صحيحة' },
                            { title: 'سرعة تحميل الصفحة الرئيسية (< 3 ثواني)', status: 'warn', type: 'أداء', msg: 'زمن التحميل 4.2 ثانية' },
                            { title: 'وجود نصوص بديلة للصور (Accessibility)', status: 'fail', type: 'وصولية', msg: 'يوجد 5 صور بدون وصف نصي' },
                            { title: 'استخدام ألوان العلامة التجارية بشكل صحيح', status: 'pass', type: 'هوية بصرية', msg: '' },
                            { title: 'تشفير البيانات HTTPS', status: 'pass', type: 'أمان', msg: '' }
                        ].map((item, i) => (
                            <div key={i} className="p-4 hover:bg-gray-50 transition-colors flex items-start gap-4">
                                <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    item.status === 'pass' ? 'bg-green-100 text-green-600' : 
                                    item.status === 'fail' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                                }`}>
                                    {item.status === 'fail' ? <X className="w-3.5 h-3.5" /> : item.status === 'warn' ? <AlertTriangle className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-sm font-bold text-gray-800">{item.title}</h4>
                                        <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{item.type}</span>
                                    </div>
                                    {item.msg && (
                                        <p className="text-xs text-red-500 mt-1 bg-red-50/50 p-1.5 rounded w-fit border border-red-100/50">
                                            الملاحظة: {item.msg}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
        </div>
    );
};

// --- 6. Landing Page ---
const LandingPage = ({ onStartScan, scanningUrl, setScanningUrl }) => {
  return (
    <div className="min-h-screen bg-[#F3F4F6] relative flex flex-col font-ibm">
       <div className="relative w-full h-[700px] z-0 overflow-hidden shadow-2xl">
           <div className="absolute inset-0 bg-[#4B4237]">
                <img 
                    src="https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?q=80&w=2070&auto=format&fit=crop" 
                    alt="Heritage Mud Buildings" 
                    className="w-full h-full object-cover"
                />
           </div>
           
           <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#1F2937]/90"></div>

           <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 pt-20">
               <div className="animate-fadeIn space-y-4 max-w-4xl mx-auto">
                   <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tight drop-shadow-xl">
                       مرحباً بك
                   </h1>
                   <p className="text-lg md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed opacity-90">
                       نوفر لك أداة متكاملة لقياس مدى التزام منصتك <br/> بمعايير الكود الموحد للمنصات الحكومية
                   </p>
               </div>

               <div className="w-full max-w-3xl mt-12 bg-white rounded-2xl shadow-2xl p-8 animate-fadeIn delay-100 transform translate-y-8 relative z-20">
                   <h2 className="text-xl font-bold text-[#111827] mb-6">افحص منصتك الآن!</h2>
                   
                   <div className="relative mb-8">
                       <label className="block text-xs font-bold text-gray-400 mb-2 text-right">أدخل رابط المنصة في الحقل أدناه</label>
                       <div className="flex flex-col md:flex-row gap-3">
                           <input 
                             type="text" 
                             value={scanningUrl}
                             onChange={(e) => setScanningUrl(e.target.value)}
                             placeholder="https://www.example.gov.sa"
                             className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-4 text-left text-gray-800 focus:ring-2 focus:ring-[#006C35] focus:border-[#006C35] outline-none transition-all"
                             dir="ltr"
                           />
                           
                           <button 
                             onClick={onStartScan}
                             className="bg-[#006C35] hover:bg-black text-white px-10 py-4 rounded-lg font-bold transition-transform active:scale-95 shadow-lg flex items-center justify-center gap-2"
                           >
                             <Zap className="w-5 h-5 fill-current" />
                             بدء الفحص
                           </button>
                       </div>
                   </div>

                   <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-100"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-300 text-xs">تقييم منصتك يشمل</span>
                        <div className="flex-grow border-t border-gray-100"></div>
                   </div>

                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       {[
                           { name: 'تجربة المستخدم', icon: <MousePointer2 className="w-6 h-6"/> },
                           { name: 'الأداء والسرعة', icon: <Timer className="w-6 h-6"/> },
                           { name: 'الأمان الرقمي', icon: <ShieldCheck className="w-6 h-6"/> },
                           { name: 'إمكانية الوصول', icon: <Eye className="w-6 h-6"/> },
                       ].map((feat, i) => (
                           <div key={i} className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-[#E6F4EA] hover:text-[#006C35] transition-colors group cursor-default border border-transparent hover:border-[#006C35]/20">
                               <div className="text-gray-400 group-hover:text-[#006C35] transition-colors">{feat.icon}</div>
                               <span className="text-xs font-bold text-gray-600 group-hover:text-[#006C35] text-center">{feat.name}</span>
                           </div>
                       ))}
                   </div>
               </div>
           </div>
       </div>

       <div className="h-40 bg-[#F9FAFB]"></div>

       <UnifiedFooter isDashboard={false} />
    </div>
  );
};

/* ========================================================================
   DASHBOARD COMPONENTS
   ======================================================================== */

// --- DGA Logo Component ---
const DgaLogo = ({ className }) => (
  <svg viewBox="0 0 56 61" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M55.6956 29.7012C55.1673 28.9612 54.1484 28.7762 53.3937 29.2942L27.9978 46.7225L2.60185 29.2942C1.84714 28.7762 0.828269 28.9612 0.299973 29.7012C-0.228323 30.4413 -0.0396318 31.4404 0.715077 31.9584L25.1299 48.7206L17.9979 53.642C17.5073 53.383 16.9413 53.272 16.3753 53.272C14.413 53.272 12.8281 54.8261 12.8281 56.7503C12.8281 58.6744 14.413 60.2285 16.3753 60.2285C18.3375 60.2285 19.9224 58.6744 19.9224 56.7503C19.9224 56.6022 19.9224 56.4542 19.8847 56.3062L28.0355 50.7188L36.1864 56.3062C36.1864 56.4542 36.1486 56.6022 36.1486 56.7503C36.1486 58.6744 37.7335 60.2285 39.6958 60.2285C41.658 60.2285 43.2429 58.6744 43.2429 56.7503C43.2429 54.8261 41.658 53.272 39.6958 53.272C39.092 53.272 38.5637 53.42 38.0732 53.642L30.9411 48.7206L55.356 31.9584C56.0352 31.4404 56.2239 30.4413 55.6956 29.7012Z" fill="currentColor"/>
    <path d="M20.5 7.01667L28 11.35L35.5 7.01667M20.5 32.9833V24.3333L13 20M43 20L35.5 24.3333V32.9833M13.45 11.6L28 20.0167L42.55 11.6M28 36.8V20M43 26.6667V13.3333C42.9994 12.7488 42.8451 12.1747 42.5526 11.6686C42.26 11.1625 41.8396 10.7423 41.3333 10.45L29.6667 3.78333C29.1599 3.49077 28.5851 3.33675 28 3.33675C27.4149 3.33675 26.8401 3.49077 26.3333 3.78333L14.6667 10.45C14.1604 10.7423 13.74 11.1625 13.4474 11.6686C13.1549 12.1747 13.0006 12.7488 13 13.3333V26.6667C13.0006 27.2512 13.1549 27.8253 13.4474 28.3314C13.74 28.8375 14.1604 29.2577 14.6667 29.55L26.3333 36.2167C26.8401 36.5092 27.4149 36.6632 28 36.6632C28.5851 36.6632 29.1599 36.5092 29.6667 36.2167L41.3333 29.55C41.8396 29.2577 42.26 28.8375 42.5526 28.3314C42.8451 27.8253 42.9994 27.2512 43 26.6667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// --- Dashboard Header ---
const DashboardHeader = ({ activePage, setActivePage, onNavigateToPlatforms, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinkStyle = (page) => `cursor-pointer transition-colors py-5 text-sm font-medium ${activePage === page ? 'text-[#006C35] font-bold border-b-2 border-[#006C35]' : 'text-gray-600 hover:text-[#006C35]'}`;

  const handleNav = (page) => {
    setActivePage(page);
    if(page === 'platforms' && onNavigateToPlatforms) onNavigateToPlatforms();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 font-ibm print:hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNav('dashboard')}>
                <div className="w-8 h-8 bg-[#006C35] rounded-lg flex items-center justify-center text-white shadow-sm">
                   <DgaLogo className="w-5 h-5" />
                </div>
                <div className="hidden md:flex flex-col">
                   <span className="text-sm font-bold text-[#111827] leading-none">منصة الأمتثال الرقمي</span>
                   <span className="text-[9px] text-gray-500 font-light mt-0.5">هيئة الحكومة الرقمية</span>
                </div>
            </div>

            <nav className="hidden md:flex items-center gap-6 mr-4">
                <button onClick={() => handleNav('dashboard')} className={navLinkStyle('dashboard')}>الرئيسية</button>
                <button onClick={() => handleNav('platforms')} className={navLinkStyle('platforms')}>المنصات</button>
                <button onClick={() => handleNav('general_dashboard')} className={navLinkStyle('general_dashboard')}>لوحة التحكم العامة</button>
                <button onClick={() => handleNav('users')} className={navLinkStyle('users')}>إدارة المستخدمين</button>
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
        <div className="md:hidden border-t border-gray-100 bg-white animate-fadeIn shadow-lg">
            <div className="px-4 py-3 space-y-2">
                <button onClick={() => handleNav('dashboard')} className={`block w-full text-right text-sm font-bold px-3 py-2 rounded-md ${activePage === 'dashboard' ? 'bg-green-50 text-[#006C35]' : 'text-gray-600 hover:bg-gray-50'}`}>الرئيسية</button>
                <button onClick={() => handleNav('platforms')} className={`block w-full text-right text-sm font-bold px-3 py-2 rounded-md ${activePage === 'platforms' ? 'bg-green-50 text-[#006C35]' : 'text-gray-600 hover:bg-gray-50'}`}>المنصات</button>
                <button onClick={() => handleNav('general_dashboard')} className={`block w-full text-right text-sm font-bold px-3 py-2 rounded-md ${activePage === 'general_dashboard' ? 'bg-green-50 text-[#006C35]' : 'text-gray-600 hover:bg-gray-50'}`}>لوحة التحكم العامة</button>
                <button onClick={() => handleNav('users')} className={`block w-full text-right text-sm font-bold px-3 py-2 rounded-md ${activePage === 'users' ? 'bg-green-50 text-[#006C35]' : 'text-gray-600 hover:bg-gray-50'}`}>إدارة المستخدمين</button>
            </div>
        </div>
      )}
    </header>
  );
};

// --- Dashboard Footer ---
const DashboardFooter = () => <UnifiedFooter isDashboard={true} />;

// --- Dashboard Modal ---
const DashboardModal = ({ isOpen, onClose, title, children, onSave, isDelete = false, saveDisabled = false }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-xl text-right overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-100">
            <div className="sm:flex sm:items-start">
              <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${isDelete ? 'bg-red-100' : 'bg-[#E6F4EA]'} sm:mx-0 sm:h-10 sm:w-10`}>
                {isDelete ? <AlertCircle className="h-6 w-6 text-red-600" /> : <User className="h-6 w-6 text-[#006C35]" />}
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:mr-4 sm:text-right flex-1">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {title}
                </h3>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
           
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 h-full overflow-y-visible">
            {children}
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
            <button 
              type="button" 
              onClick={onSave}
              disabled={saveDisabled}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white ${isDelete ? 'bg-red-600 hover:bg-red-700' : saveDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#006C35] hover:bg-[#005a2b]'} focus:outline-none sm:ml-3 sm:w-auto sm:text-sm transition-all`}
            >
              {isDelete ? 'حذف' : 'حفظ / إرسال'}
            </button>
            <button 
              type="button" 
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Dashboard Toast ---
const DashboardToast = ({ show, message }) => (
  <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-[70] transition-all duration-300 ease-in-out ${show ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
    <div className="bg-[#E6F4EA] border border-[#006C35] text-[#006C35] px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
      <CheckCircle className="w-5 h-5" />
      <span className="font-medium text-sm">{message}</span>
    </div>
  </div>
);

// --- Searchable Dropdown ---
const SearchableDropdown = ({ options, value, onChange, placeholder, label, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2.5 text-right cursor-default focus:outline-none focus:ring-1 focus:ring-[#006C35] focus:border-[#006C35] sm:text-sm flex justify-between items-center text-gray-700"
      >
        <span className={`block truncate ${!value ? 'text-gray-500' : 'text-gray-900'}`}>
          {value || placeholder}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          <div className="sticky top-0 z-10 bg-white px-2 py-2 border-b border-gray-100">
            <div className="relative">
                <Search className="absolute right-2 top-2.5 h-3.5 w-3.5 text-gray-400" />
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md pl-2 pr-8 py-1.5 text-sm focus:outline-none focus:border-[#006C35] focus:ring-1 focus:ring-[#006C35]"
                    placeholder="بحث..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                    onClick={(e) => e.stopPropagation()} 
                />
            </div>
          </div>
          {filteredOptions.length === 0 ? (
            <div className="cursor-default select-none relative py-2 px-4 text-gray-500 text-sm text-center">
              لا توجد نتائج
            </div>
          ) : (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                className="cursor-pointer select-none relative py-2 pl-3 pr-4 hover:bg-[#E6F4EA] hover:text-[#006C35] text-gray-900 transition-colors"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
              >
                <div className="flex items-center justify-between">
                   <span className={`block truncate ${value === option ? 'font-semibold' : 'font-normal'}`}>
                    {option}
                   </span>
                   {value === option && <Check className="h-4 w-4 text-[#006C35]" />}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

// --- Compliance Status Selector ---
const ComplianceSelector = ({ value, onChange }) => {
  const options = [
    { val: 'pass', label: 'مطبق', icon: Check, activeClass: 'bg-white text-[#006C35] shadow-sm ring-1 ring-gray-200' },
    { val: 'partial', label: 'جزئي', icon: AlertTriangle, activeClass: 'bg-white text-amber-600 shadow-sm ring-1 ring-gray-200' },
    { val: 'fail', label: 'غير مطبق', icon: X, activeClass: 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200' },
  ];

  return (
    <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-200 select-none">
      {options.map((opt) => (
        <button
          key={opt.val}
          onClick={() => onChange(opt.val)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-bold rounded-md transition-all ${
            value === opt.val ? opt.activeClass : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <opt.icon className="w-4 h-4" />
          <span>{opt.label}</span>
        </button>
      ))}
    </div>
  );
};

/* ========================================================================
   DASHBOARD VIEWS
   ======================================================================== */
const NavCard2 = ({ title, subtitle, icon: Icon, bgColor, onClick }) => {
  return (
    <div 
      onClick={onClick} 
      className={`cursor-pointer ${bgColor || 'bg-gray-800'} rounded-xl p-6 text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between h-40 relative overflow-hidden`}
    >
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
            {Icon && <Icon className="w-8 h-8 text-white" />}
          </div>
          <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
        </div>
        <div>
          <h3 className="text-xl font-bold mt-2">{title}</h3>
          <p className="text-sm text-white/80 mt-1 opacity-80">{subtitle}</p>
        </div>
      </div>
      <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-white opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out"></div>
    </div>
  );
};

/* 2. تعريف مكون عرض لوحة التحكم (DashboardView) - يستقبل onNavigate */
const DashboardView = ({ onNavigateToGeneral, onNavigateToDetails }) => (
  <div className="space-y-8 animate-fadeIn">
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <NavCard 
        title="المنصات الحكومية"
        subtitle="قائمة المنصات والتقارير"
        icon={Building2}
        bgColor="bg-[#C69C6D]"
        onClick={onNavigateToDetails} // استخدام البروب الصحيح
      />
      
      <NavCard 
        title="لوحة التحكم العامة"
        subtitle="تحليلات الأداء والامتثال"
        icon={Activity}
        bgColor="bg-[#006C35]"
        onClick={onNavigateToGeneral} // استخدام البروب الصحيح
      />

      <NavCard 
        title="إدارة المستخدمين"
        subtitle="إدارة الصلاحيات والموظفين"
        icon={Users}
        bgColor="bg-[#1F2937]"
        onClick={() => {}} // يمكن ربطها لاحقاً
      />
    </section>


    <section id="platforms-list" className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden scroll-mt-24">
      <div className="p-6 border-b border-gray-100 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          <h2 className="text-lg font-bold text-[#111827] justify-self-start">قائمة المنصات الحكومية</h2>
          <div className="relative w-full max-w-md justify-self-center">
            <input type="text" placeholder="ابحث باسم المنصة أو الجهة..." className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006C35] focus:border-transparent transition-all" />
            <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
          </div>
          <div className="justify-self-end"></div>
      </div>

      <div className="px-6 py-5 bg-[#FAFAFA] border-b border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <label className="block text-xs font-medium text-gray-700 mb-1.5">تصفية حسب الدورة</label>
          <div className="relative">
            <select className="w-full bg-white border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded-md text-sm appearance-none focus:outline-none focus:border-[#006C35]">
              <option>جميع الدورات</option>
              <option>دورة قياس 1</option>
              <option>دورة قياس 2</option>
              <option>دورة قياس 3</option>
            </select>
            <ChevronDown className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="col-span-1">
          <label className="block text-xs font-medium text-gray-700 mb-1.5">تصفية حسب الحالة</label>
          <div className="relative">
            <select className="w-full bg-white border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded-md text-sm appearance-none focus:outline-none focus:border-[#006C35]">
              <option>الكل</option>
              <option>تم التبني</option>
              <option>قيد التنفيذ</option>
              <option>غير معتمد</option>
            </select>
            <ChevronDown className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="col-span-1">
          <label className="block text-xs font-medium text-gray-700 mb-1.5">تصفية حسب السنة</label>
          <div className="relative">
            <select className="w-full bg-white border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded-md text-sm appearance-none focus:outline-none focus:border-[#006C35]">
              <option>2025</option>
              <option>2024</option>
            </select>
            <ChevronDown className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="bg-white border-b border-gray-100">
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">اسم المنصة</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">الدورة</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">تاريخ التحديث</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">الحالة</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {dashboardTableData.map((item) => (
              <tr 
                key={item.id} 
                onClick={onNavigateToDetails}
                className="hover:bg-[#F9FAFB] transition-colors cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                      <img src={item.logo} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div><div className="text-sm font-bold text-gray-900">{item.name}</div><div className="text-xs text-gray-500">{item.ministry}</div></div>
                  </div>
                </td>
                <td className="px-6 py-4"><span className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded border border-gray-100">{item.cycle}</span></td>
                <td className="px-6 py-4 text-sm text-gray-500 font-medium" dir="ltr">{item.date}</td>
                <td className="px-6 py-4 text-center"><span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${item.statusStyle}`}>{item.status}</span></td>
                <td className="px-6 py-4 text-center">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onNavigateToDetails(); }}
                    className="text-xs font-bold text-[#006C35] bg-[#E6F4EA] px-3 py-1.5 rounded-lg hover:bg-[#006C35] hover:text-white transition-all"
                  >
                    عرض التقارير
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-center">
        <button className="text-sm font-medium text-[#006C35] hover:text-[#005a2b] hover:underline transition-all">عرض جميع المنصات (24 منصة)</button>
      </div>
    </section>
  </div>
);

// --- General Dashboard View ---
const GeneralDashboardView = ({ onNavigateToHome }) => {
  const [showAllCriteria, setShowAllCriteria] = useState(false);
  const displayedCriteria = showAllCriteria ? Array.from({ length: 43 }, (_, i) => ({
    name: `معيار ${i + 1}`,
    value: Math.floor(Math.random() * 100) + 10
  })).sort((a, b) => b.value - a.value) : [];

  const complianceData = [
    { name: 'ناجح', value: 67, color: '#006C35' },
    { name: 'لم يتم تحقيق المعايير', value: 33, color: '#9CA3AF' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <nav className="flex items-center text-sm text-gray-500" aria-label="Breadcrumb">
        <button onClick={onNavigateToHome} className="hover:text-[#006C35] transition-colors flex items-center gap-1">
           <Home className="w-4 h-4" />
           <span>الرئيسية</span>
        </button>
        <ChevronLeft className="w-4 h-4 mx-2 text-gray-400" />
        <span className="font-bold text-[#006C35]">لوحة التحكم العامة</span>
      </nav>

      <div className="flex flex-col gap-6">
        <div>
           <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
             <span className="w-1.5 h-6 bg-[#006C35] rounded-full inline-block"></span>
             لوحة التحكم العامة
           </h1>
           <p className="text-sm text-gray-500 mt-1 mr-4">تحليل شامل للامتثال والأداء عبر جميع المنصات</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="relative">
              <label className="block text-xs font-bold text-gray-500 mb-1">التاريخ</label>
              <input type="month" className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#006C35]" />
           </div>
           <div className="relative">
              <label className="block text-xs font-bold text-gray-500 mb-1">دورة التقييم</label>
              <div className="relative">
                <select className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-3 pr-8 rounded-lg text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-[#006C35]">
                   <option>دورة قياس 1</option>
                   <option>دورة قياس 2</option>
                   <option>دورة قياس 3</option>
                </select>
                <ChevronDown className="absolute left-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
           </div>
           <div className="relative">
              <label className="block text-xs font-bold text-gray-500 mb-1">الجهة</label>
              <div className="relative">
                <input type="text" placeholder="ابحث عن جهة..." className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-3 pr-8 rounded-lg text-sm focus:outline-none focus:border-[#006C35]" />
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              </div>
           </div>
        </div>
      </div>

      {/* 3. بطاقات الأداء (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex items-center justify-between relative overflow-hidden">
            <div>
               <p className="text-sm font-medium text-gray-500 mb-1">عدد المنصات الكلي</p>
               <h3 className="text-3xl font-bold text-[#111827]">885</h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
               <Layers className="w-6 h-6" />
            </div>
         </div>
         <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex items-center justify-between relative overflow-hidden">
            <div>
               <p className="text-sm font-medium text-gray-500 mb-1">عدد المنصات التي تم تبنيها</p>
               <h3 className="text-3xl font-bold text-[#006C35]">436</h3>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-[#006C35]">
               <CheckCircle className="w-6 h-6" />
            </div>
         </div>
      </div>

      {/* 4. الرسوم البيانية: نسبة الامتثال والمعايير */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         <div className="lg:col-span-4 bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 mb-2">نسبة المنصات في مرحلة القياس</h3>
            <div className="h-[300px] w-full relative flex flex-col items-center justify-center">
               <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                     <Pie data={complianceData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                        {complianceData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                     </Pie>
                     <Tooltip />
                     <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-3xl font-bold text-[#111827]">67%</span>
               </div>
            </div>
         </div>

         <div className="lg:col-span-8 bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex flex-col">
            <h3 className="text-base font-bold text-gray-900 mb-6">أكثر المعايير غير مستوفاة</h3>
            <div className="flex-1 w-full" dir="ltr">
               <ResponsiveContainer width="100%" height={showAllCriteria ? 1200 : 400}>
                  <BarChart layout="vertical" data={displayedCriteria} margin={{ left: 20 }}>
                     <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6" />
                     <XAxis type="number" tick={{fontSize: 11}} axisLine={false} tickLine={false} />
                     <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 11}} axisLine={false} tickLine={false} />
                     <Tooltip />
                     <Bar dataKey="value" fill="#006C35" radius={[0, 4, 4, 0]} name="عدد مرات عدم التطبيق" />
                  </BarChart>
               </ResponsiveContainer>
            </div>
            <button onClick={() => setShowAllCriteria(!showAllCriteria)} className="mt-4 text-sm font-medium text-[#006C35] flex items-center gap-2 mx-auto">
               {showAllCriteria ? 'إخفاء المعايير' : 'عرض المزيد من المعايير'} <ChevronDown className={showAllCriteria ? 'rotate-180' : ''} />
            </button>
         </div>
      </div>

      {/* 5. الرسوم البيانية: المنصات الأعلى والأقل امتثالاً */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
             <h3 className="text-base font-bold text-gray-900 mb-6">منصات منخفضة الامتثال في دورة 2</h3>
             <div className="h-[300px] w-full" dir="ltr">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={lowComplianceData} margin={{ left: 40 }}>
                     <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6" />
                     <XAxis type="number" domain={[0, 100]} />
                     <YAxis dataKey="name" type="category" width={80} />
                     <Tooltip />
                     <Bar dataKey="value" fill="#006C35" radius={[0, 4, 4, 0]} />
                  </BarChart>
               </ResponsiveContainer>
             </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
             <h3 className="text-base font-bold text-gray-900 mb-6">المنصات الأعلى امتثالية</h3>
             <div className="h-[300px] w-full" dir="ltr">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topComplianceData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                     <XAxis dataKey="name" tick={{fontSize: 10}} dy={10} />
                     <YAxis domain={[0, 100]} />
                     <Tooltip />
                     <Legend verticalAlign="top" align="right" />
                     <Bar dataKey="primary" name="المعايير الأساسية" fill="#9CA3AF" radius={[4, 4, 0, 0]} />
                     <Bar dataKey="secondary" name="المعايير الثانوية" fill="#006C35" radius={[4, 4, 0, 0]} />
                  </BarChart>
               </ResponsiveContainer>
             </div>
          </div>
      </div>

      {/* 6. الرسوم البيانية الإضافية (من التصميم الأصلي) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-6">المنصات الممتثلة (سنوي)</h3>
          <div className="h-[280px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} barSize={12}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{fontSize: 11}} dy={10} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#006C35" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-6">نسبة التبني الشهرية</h3>
          <div className="h-[280px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#006C35" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#006C35" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{fontSize: 11}} dy={10} />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#006C35" strokeWidth={2} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 7. زر التصدير */}
      <div className="flex justify-end pt-4">
         <button className="bg-[#006C35] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#005a2b] transition-colors flex items-center gap-2 shadow-sm">
            <Download className="w-4 h-4" />
            تصدير البيانات
         </button>
      </div>
    </div>
  );
};

// --- Platform Details View ---
const PlatformDetailsView = ({ onShowToast, onNavigateToHome, onNavigateToPlatforms, onNavigateToMeasurement }) => {
  const [measurementDate, setMeasurementDate] = useState('2025-12-15T10:00');
  const [selectedCycle, setSelectedCycle] = useState('cycle1');

  const handleDateChange = (e) => {
    setMeasurementDate(e.target.value);
    onShowToast("تم تحديث موعد القياس بنجاح");
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <nav className="flex items-center text-sm text-gray-500">
        <button onClick={onNavigateToHome} className="hover:text-[#006C35] flex items-center gap-1"><Home className="w-4 h-4" /><span>الرئيسية</span></button>
        <ChevronLeft className="w-4 h-4 mx-2 text-gray-400" />
        <button onClick={onNavigateToPlatforms} className="hover:text-[#006C35]">المنصات</button>
        <ChevronLeft className="w-4 h-4 mx-2 text-gray-400" />
        <span className="font-bold text-[#006C35]">تفاصيل المنصة: {platformDetails.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#006C35] rounded-full inline-block"></span>
            لوحة قياس المنصة
          </h1>
          <p className="text-sm text-gray-500 mt-1 mr-4">إدارة وقياس أداء منصة {platformDetails.name}</p>
        </div>
        
        <div className="flex items-center gap-3">
             <div className="flex flex-col items-end text-xs font-bold text-gray-600">
                <span>المحاولات المتبقية: {platformDetails.maxCycles - platformDetails.currentCycle + 1}</span>
                <span className="text-gray-400 font-normal">من أصل 3 دورات مسموحة</span>
             </div>
             <div className="h-10 w-px bg-gray-200"></div>
             <button 
                onClick={onNavigateToMeasurement}
                className="flex items-center gap-2 bg-[#006C35] hover:bg-[#005a2b] text-white px-6 py-2.5 rounded-lg shadow-lg shadow-green-900/20 transition-all font-bold text-sm"
             >
              <PlayCircle className="w-4 h-4" />
              بدء دورة قياس
             </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-[#006C35]/5 border-b border-[#006C35]/10 p-6">
           <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="w-24 h-24 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center p-2 flex-shrink-0">
                 <img src={platformDetails.logo} alt="Logo" className="w-full h-full object-contain" />
              </div>

              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <div className="space-y-4">
                    <div>
                       <h2 className="text-2xl font-bold text-[#111827] mb-1">{platformDetails.name}</h2>
                       <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Landmark className="w-4 h-4 text-[#006C35]" />
                          <span>{platformDetails.ownerEntity}</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-white p-2 rounded-lg border border-gray-100 w-fit">
                        <Briefcase className="w-4 h-4 text-[#006C35]" />
                        <span className="font-medium">القطاع:</span>
                        <span>{platformDetails.sector}</span>
                    </div>
                 </div>

                 <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                       <Monitor className="w-4 h-4 text-gray-400" />
                       <span className="text-gray-500 w-20">نوع المنصة:</span>
                       <span className="font-medium text-gray-900">{platformDetails.type}</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <User className="w-4 h-4 text-gray-400" />
                       <span className="text-gray-500 w-20">اسم الممثل:</span>
                       <span className="font-medium text-gray-900">{platformDetails.manager}</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <Mail className="w-4 h-4 text-gray-400" />
                       <span className="text-gray-500 w-20">البريد:</span>
                       <span className="font-medium text-gray-900">{platformDetails.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <Globe className="w-4 h-4 text-gray-400" />
                       <span className="text-gray-500 w-20">الرابط:</span>
                       <a href={platformDetails.url} target="_blank" rel="noreferrer" className="text-[#006C35] hover:underline truncate">{platformDetails.url}</a>
                    </div>
                 </div>

                 <div className="w-full bg-white p-4 rounded-lg border border-gray-200 shadow-sm self-start">
                    <label className="block text-xs font-bold text-[#006C35] mb-2 flex items-center gap-2">
                       <Calendar className="w-3.5 h-3.5" />
                       موعد القياس القادم (قابل للتعديل)
                    </label>
                    <div className="relative">
                       <input 
                         type="datetime-local" 
                         value={measurementDate} 
                         onChange={handleDateChange}
                         className="w-full bg-[#FAFAFA] border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-[#006C35] focus:border-[#006C35] block p-2 pl-2 text-left ltr" 
                         dir="ltr"
                       />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold text-[#111827]">نتائج القياس (تقرير موجز)</h3>
               <div className="relative w-40">
                  <select 
                    value={selectedCycle} 
                    onChange={(e) => setSelectedCycle(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-gray-200 text-gray-700 py-1.5 px-3 pr-8 rounded-lg text-sm focus:border-[#006C35] focus:ring-1 focus:ring-[#006C35] appearance-none"
                  >
                     <option value="cycle1">دورة 1</option>
                     <option value="cycle2">دورة 2</option>
                  </select>
                  <ChevronDown className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
               <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center border border-gray-100 h-full">
                  <div className="text-sm font-medium text-gray-500 mb-2">النتيجة النهائية</div>
                  <div className="relative w-32 h-32 flex items-center justify-center">
                     <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="#E5E7EB" strokeWidth="12" fill="none" />
                        <circle cx="64" cy="64" r="56" stroke="#006C35" strokeWidth="12" fill="none" strokeDasharray="351.86" strokeDashoffset="35.186" strokeLinecap="round" />
                     </svg>
                     <div className="absolute flex flex-col items-center">
                        <span className="text-3xl font-bold text-[#006C35]">90%</span>
                        <span className="text-xs text-gray-500 font-medium">ممتثل</span>
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  {[
                    { name: 'تجربة المستخدم', score: 92 },
                    { name: 'سهولة الاستخدام', score: 88 },
                    { name: 'الموثوقية', score: 95 },
                    { name: 'الأمان الرقمي', score: 98 },
                  ].map((item, idx) => (
                     <div key={idx}>
                        <div className="flex justify-between text-sm mb-1">
                           <span className="font-medium text-gray-700">{item.name}</span>
                           <span className="font-bold text-[#006C35]">{item.score}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                           <div className="bg-[#006C35] h-2 rounded-full" style={{ width: `${item.score}%` }}></div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex-1">
                <h3 className="text-lg font-bold text-[#111827] mb-6 border-b border-gray-50 pb-2">سجل التقييم</h3>
                <div className="space-y-6 relative before:absolute before:right-[15px] before:top-2 before:h-[95%] before:w-0.5 before:bg-gray-100">
                  {timelineSteps.map((step) => (
                      <div key={step.id} className="relative flex items-start gap-4">
                        <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 ${step.status === 'completed' ? 'bg-[#E6F4EA] border-[#006C35] text-[#006C35]' : step.status === 'current' ? 'bg-white border-[#C69C6D] text-[#C69C6D]' : 'bg-white border-gray-200 text-gray-300'}`}>
                            {step.status === 'completed' ? <Check className="w-4 h-4" /> : step.status === 'current' ? <div className={`w-2.5 h-2.5 rounded-full ${step.status === 'current' ? 'bg-[#C69C6D]' : 'bg-gray-200'}`}></div> : null}
                        </div>
                        <div className="pt-1">
                            <h4 className={`text-sm font-bold ${step.status === 'upcoming' ? 'text-gray-400' : 'text-[#111827]'}`}>{step.title}</h4>
                            <p className="text-xs text-gray-500">{step.date}</p>
                        </div>
                      </div>
                  ))}
                </div>
            </div>

            <div className="bg-[#FFF8F1] border border-[#C69C6D]/30 rounded-xl p-4 flex flex-col items-center text-center gap-3">
               <div className="w-10 h-10 bg-[#C69C6D]/10 rounded-full flex items-center justify-center text-[#C69C6D]">
                  <Award className="w-5 h-5" />
               </div>
               <div>
                  <h4 className="text-sm font-bold text-[#C69C6D]">شهادة الامتثال الرقمي</h4>
                  <p className="text-xs text-gray-500 mt-1">الشهادة جاهزة للإصدار بناءً على النتائج المعتمدة</p>
               </div>
               <button className="w-full bg-[#C69C6D] hover:bg-[#b0885d] text-white py-2 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" />
                  تصدير الشهادة
               </button>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-gray-50">
            <h3 className="text-lg font-bold text-[#111827]">التقارير السابقة</h3>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-right">
               <thead className="bg-[#F9FAFB] text-xs font-semibold text-gray-500 uppercase">
                  <tr>
                     <th className="px-6 py-4">اسم التقرير</th>
                     <th className="px-6 py-4">التاريخ</th>
                     <th className="px-6 py-4 text-center">النتيجة</th>
                     <th className="px-6 py-4 text-center">الحالة</th>
                     <th className="px-6 py-4 text-center">عرض</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50 text-sm">
                  {[
                    { id: 1, name: 'دورة قياس 1 2024', date: '2024-12-15', score: '60%', status: 'فشل' },
                    { id: 2, name: 'دورة قياس 2 2023', date: '2023-11-20', score: '92%', status: 'ناجح' },
                    { id: 3, name: 'دورة قياس 1 2023', date: '2023-06-10', score: '55%', status: 'فشل' },
                  ].map((report) => (
                     <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                           <FileText className="w-4 h-4 text-gray-400" />
                           {report.name}
                        </td>
                        <td className="px-6 py-4 text-gray-500" dir="ltr">{report.date}</td>
                        <td className="px-6 py-4 text-center font-bold text-[#111827]" dir="ltr">{report.score}</td>
                        <td className="px-6 py-4 text-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${report.status === 'ناجح' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {report.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                           <button className="text-gray-400 hover:text-[#006C35] transition-colors"><Eye className="w-4 h-4" /></button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

// --- Measurement Process View ---
const MeasurementProcessView = ({ onNavigateToDetails, onShowToast, onNavigateToHome }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isManualCollapsed, setIsManualCollapsed] = useState(false);
  const [manualInputs, setManualInputs] = useState({ check1: '', check2: '' });
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [autoSavedTime, setAutoSavedTime] = useState(null);
  
  const [notes, setNotes] = useState({
     check1: { isOpen: false, text: '' },
     check2: { isOpen: false, text: '' },
  });

  const [expandedDetails, setExpandedDetails] = useState({ 'item-1': false, 'item-2': false });
  
  const [ignoredErrors, setIgnoredErrors] = useState(new Set());
  
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitConfirmed, setSubmitConfirmed] = useState(false);
  const [activeErrorItem, setActiveErrorItem] = useState(null);
  const [tempIgnoredSet, setTempIgnoredSet] = useState(new Set());

  const totalManualItems = 2;
  const answeredManualItems = Object.values(manualInputs).filter(val => val !== '').length;
  const manualProgress = Math.round((answeredManualItems / totalManualItems) * 100);

  useEffect(() => {
    if (currentStep === 2) {
      setLoadingProgress(0);
      setTimeLeft(10);
      
      const progressInterval = setTimeout(() => {
        setLoadingProgress(100);
      }, 100);

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCurrentStep(3);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearTimeout(progressInterval);
        clearInterval(timer);
      };
    }
  }, [currentStep]);

  const toggleDetails = (id) => {
    setExpandedDetails(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleManualCheckChange = (id, value) => {
    setManualInputs(prev => ({ ...prev, [id]: value }));
    setAutoSavedTime(new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }));
  };

  const toggleNote = (id) => {
    setNotes(prev => ({
       ...prev,
       [id]: { ...prev[id], isOpen: !prev[id].isOpen }
    }));
  };

  const handleNoteChange = (id, text) => {
      setNotes(prev => ({
       ...prev,
       [id]: { ...prev[id], text: text }
    }));
  };

  const proceedToAutomated = () => {
    setIsManualCollapsed(true);
    setCurrentStep(2);
    setTimeout(() => {
      document.getElementById('loading-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };
  
  const handleEditManual = () => {
      if(isManualCollapsed) {
          setIsManualCollapsed(false);
          setCurrentStep(1);
      } else {
          setIsManualCollapsed(true);
      }
  };

  const openErrorModal = (itemId) => {
    setActiveErrorItem(itemId);
    setTempIgnoredSet(new Set(ignoredErrors));
    setShowErrorModal(true);
  };

  const toggleIgnoreError = (specificErrorId) => {
    const newSet = new Set(tempIgnoredSet);
    if (newSet.has(specificErrorId)) {
        newSet.delete(specificErrorId);
    } else {
        newSet.add(specificErrorId);
    }
    setTempIgnoredSet(newSet);
  };

  const saveIgnoredErrors = () => {
    setIgnoredErrors(tempIgnoredSet);
    setShowErrorModal(false);
    onShowToast("تم تحديث حالة الأخطاء");
  };

  const isItemFullyIgnored = (itemId) => {
      if (itemId === 'item-2') {
          return mockErrorsItem2.every(err => ignoredErrors.has(err.id));
      }
      return false;
  };

  const getStatusBadge = (val) => {
     if(val === 'pass') return <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold"><Check className="w-3 h-3"/> مطبق بالكامل</div>;
     if(val === 'fail') return <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold"><X className="w-3 h-3"/> غير مطبق</div>;
     if(val === 'partial') return <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs font-bold"><AlertTriangle className="w-3 h-3"/> تنفيذ جزئي</div>;
     return null;
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-20">
      <nav className="flex items-center text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
        <button onClick={onNavigateToDetails} className="hover:text-[#006C35] flex items-center gap-1"><Home className="w-4 h-4" /><span>الرئيسية</span></button>
        <ChevronLeft className="w-4 h-4 mx-2 text-gray-400" />
        <button onClick={onNavigateToDetails} className="hover:text-[#006C35]">المنصات</button>
        <ChevronLeft className="w-4 h-4 mx-2 text-gray-400" />
        <button onClick={onNavigateToDetails} className="hover:text-[#006C35]">تفاصيل المنصة: {platformDetails.name}</button>
        <ChevronLeft className="w-4 h-4 mx-2 text-gray-400" />
        <span className="font-bold text-[#006C35]">إجراء القياس</span>
      </nav>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#006C35] rounded-full inline-block"></span>
            إجراء القياس: {platformDetails.name}
          </h1>
          <p className="text-sm text-gray-500 mt-1 mr-4">دورة قياس 1 - 2025 (قيد التنفيذ)</p>
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto px-4 py-8">
          <div className="relative flex items-center justify-between">
              <div className="absolute right-[16%] top-[24px] w-[34%] h-[2px] bg-[#006C35] -z-10"></div>
              <div className={`absolute left-[16%] top-[24px] w-[34%] h-[2px] transition-colors duration-500 -z-10 ${currentStep >= 3 ? 'bg-[#006C35]' : 'bg-gray-200'}`}></div>

              <div className="flex flex-col items-center gap-3 relative z-10 w-1/3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep >= 1 ? 'bg-[#006C35] text-white shadow-lg' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>
                      <Check className="w-6 h-6" />
                  </div>
                  <span className={`text-sm font-bold ${currentStep >= 1 ? 'text-[#006C35]' : 'text-gray-500'}`}>الفحص اليدوي</span>
              </div>

              <div className="flex flex-col items-center gap-3 relative z-10 w-1/3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep > 2 ? 'bg-[#006C35] text-white shadow-lg' : currentStep === 2 ? 'bg-white border-2 border-[#006C35] text-[#006C35]' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>
                       {currentStep > 2 ? <Check className="w-6 h-6" /> : <span className="text-lg font-bold">2</span>}
                  </div>
                  <span className={`text-sm font-bold ${currentStep >= 2 ? 'text-[#006C35]' : 'text-gray-500'}`}>التقييم</span>
              </div>

              <div className="flex flex-col items-center gap-3 relative z-10 w-1/3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep === 3 ? 'bg-white border-2 border-[#006C35] text-[#006C35]' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>
                      <span className="text-lg font-bold">3</span>
                  </div>
                  <span className={`text-sm font-bold ${currentStep === 3 ? 'text-[#006C35]' : 'text-gray-500'}`}>المراجعة واعتماد النتيجة</span>
              </div>
          </div>
      </div>

      <section className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 ${isManualCollapsed ? 'opacity-100' : ''}`}>
          <div 
             onClick={handleEditManual}
             className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors select-none group gap-4"
          >
              <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-white border border-gray-200 rounded text-[#006C35] group-hover:border-[#006C35]/30 transition-colors">
                      <Edit3 className="w-5 h-5" />
                  </div>
                  <div>
                      <h2 className="text-lg font-bold text-gray-800">المعايير اليدوية</h2>
                      {isManualCollapsed ? (
                        <p className="text-xs text-gray-500">اضغط للتعديل (سيتم إعادة ضبط التقدم)</p>
                      ) : (
                        <p className="text-xs text-gray-500">يرجى تعبئة كافة الحقول</p>
                      )}
                  </div>
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                   <div className="flex-1 md:w-48">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-gray-600">الإنجاز: {manualProgress}%</span>
                            {autoSavedTime && !isManualCollapsed && (
                                <span className="text-[10px] text-[#006C35] flex items-center gap-1 animate-fadeIn">
                                    <Cloud className="w-3 h-3" />
                                    تم الحفظ تلقائياً
                                </span>
                            )}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-[#006C35] h-1.5 rounded-full transition-all duration-500" style={{ width: `${manualProgress}%` }}></div>
                        </div>
                   </div>
                   
                  <ChevronUp className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isManualCollapsed ? 'rotate-180' : ''}`} />
              </div>
          </div>

          <div className={`bg-white transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden ${isManualCollapsed ? 'max-h-0 opacity-0' : 'max-h-[3000px] opacity-100'}`}>
             <div className="p-6 space-y-6">
                <div className="group border-r-4 border-r-gray-300 border border-gray-200 rounded-lg p-5 hover:border-[#006C35]/30 hover:shadow-md transition-all bg-white">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-grow">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-gray-800 text-lg">قياس رسالة الخطأ (وضوح النص)</h3>
                                <a href="#" className="flex items-center gap-1 text-[#006C35] hover:text-[#005a2b] text-xs bg-[#E6F4EA] px-2 py-1 rounded-full w-fit" title="المرجع الخارجي">
                                    <BookOpen className="w-3 h-3" />
                                    دليل التصميم 2.1
                                </a>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed mt-2">
                                التأكد من أن رسائل الخطأ واضحة، مباشرة، وتشرح للمستخدم سبب المشكلة.
                            </p>
                        </div>
                        <div className="w-full lg:w-96 space-y-3 pt-1">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-2">حالة الامتثال</label>
                                <ComplianceSelector 
                                    value={manualInputs.check1} 
                                    onChange={(val) => handleManualCheckChange('check1', val)}
                                />
                            </div>
                            <button 
                                onClick={() => toggleNote('check1')}
                                className="text-xs text-[#006C35] hover:text-[#005a2b] font-medium flex items-center gap-1 mt-2"
                            >
                                <MessageSquarePlus className="w-3 h-3" /> 
                                {notes.check1.isOpen ? 'إخفاء الملاحظة' : 'إضافة ملاحظة'}
                            </button>
                        </div>
                    </div>
                    {notes.check1.isOpen && (
                        <div className="mt-4 pt-4 border-t border-gray-100 animate-fadeIn">
                            <label className="block text-xs font-bold text-gray-600 mb-2">ملاحظات المقيم:</label>
                            <textarea 
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-[#006C35] focus:ring-[#006C35] text-sm p-3" 
                                rows="3"
                                placeholder="اكتب ملاحظاتك هنا..."
                                value={notes.check1.text}
                                onChange={(e) => handleNoteChange('check1', e.target.value)}
                            ></textarea>
                        </div>
                    )}
                </div>

                <div className="group border-r-4 border-r-gray-300 border border-gray-200 rounded-lg p-5 hover:border-[#006C35]/30 hover:shadow-md transition-all bg-white">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-grow">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-gray-800 text-lg">قياس رسالة الخطأ (مكان الظهور)</h3>
                                <a href="#" className="flex items-center gap-1 text-[#006C35] hover:text-[#005a2b] text-xs bg-[#E6F4EA] px-2 py-1 rounded-full w-fit" title="المرجع الخارجي">
                                    <BookOpen className="w-3 h-3" />
                                    دليل التصميم 2.3
                                </a>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed mt-2">
                                يجب أن تظهر رسالة الخطأ بجانب الحقل المرتبط بها مباشرة لضمان سهولة الوصول.
                            </p>
                        </div>
                        <div className="w-full lg:w-96 space-y-3 pt-1">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-2">حالة الامتثال</label>
                                <ComplianceSelector 
                                    value={manualInputs.check2} 
                                    onChange={(val) => handleManualCheckChange('check2', val)}
                                />
                            </div>
                            <button 
                                onClick={() => toggleNote('check2')}
                                className="text-xs text-[#006C35] hover:text-[#005a2b] font-medium flex items-center gap-1 mt-2"
                            >
                                <MessageSquarePlus className="w-3 h-3" /> 
                                {notes.check2.isOpen ? 'إخفاء الملاحظة' : 'إضافة ملاحظة'}
                            </button>
                        </div>
                    </div>
                     {notes.check2.isOpen && (
                        <div className="mt-4 pt-4 border-t border-gray-100 animate-fadeIn">
                            <label className="block text-xs font-bold text-gray-600 mb-2">ملاحظات المقيم:</label>
                            <textarea 
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-[#006C35] focus:ring-[#006C35] text-sm p-3" 
                                rows="3"
                                placeholder="اكتب ملاحظاتك هنا..."
                                value={notes.check2.text}
                                onChange={(e) => handleNoteChange('check2', e.target.value)}
                            ></textarea>
                        </div>
                    )}
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-100">
                    <button 
                       onClick={proceedToAutomated}
                       disabled={manualProgress < 100}
                       className={`px-8 py-3.5 rounded-lg font-bold shadow-lg transition-all flex items-center gap-3 transform active:scale-95 ${manualProgress < 100 ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-[#006C35] hover:bg-[#005a2b] text-white'}`}
                    >
                        <span>التالي</span>
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                </div>
             </div>
          </div>
      </section>

      {currentStep === 2 && (
          <section id="loading-section" className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center animate-fadeIn mb-6">
            <div className="relative w-16 h-16 mx-auto mb-4">
               <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
               <div className="absolute inset-0 border-4 border-[#006C35] rounded-full border-t-transparent animate-spin"></div>
               <Cpu className="absolute inset-0 w-6 h-6 m-auto text-[#006C35]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">جاري معالجة البيانات...</h3>
            <p className="text-xs text-gray-500 mb-4">يتم دمج النتائج اليدوية والآلية</p>
            
            <div className="font-mono text-sm text-[#006C35] font-bold">{loadingProgress}%</div>
        </section>
      )}

      {currentStep === 3 && (
        <section id="results-section" className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-600 via-yellow-400 to-green-600"></div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col items-center">
                        <div className="relative inline-flex items-center justify-center">
                            <svg className="w-40 h-40 transform -rotate-90">
                                <circle cx="80" cy="80" r="72" stroke="#f3f4f6" strokeWidth="10" fill="transparent" />
                                <circle 
                                  cx="80" cy="80" r="72" stroke="#fdb022" strokeWidth="10" fill="transparent" 
                                  strokeDasharray="452" strokeDashoffset="185" strokeLinecap="round" 
                                />
                            </svg>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                <span className="block text-5xl font-bold text-gray-900 tracking-tight">59</span>
                                <span className="text-xs text-gray-400 uppercase tracking-widest">من 100</span>
                            </div>
                        </div>
                        <div className="mt-4 px-4 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm font-bold border border-yellow-50">
                            امتثال متوسط
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto flex-grow max-w-2xl">
                        <div className="bg-gray-50 rounded-lg p-5 border border-gray-100 text-center">
                            <div className="text-sm font-medium text-gray-500 mb-1">إجمالي المعايير</div>
                            <div className="text-3xl font-bold text-gray-900">59<span className="text-sm text-gray-400 font-normal">/100</span></div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-5 border border-gray-100 text-center">
                            <div className="text-sm font-medium text-gray-500 mb-1">المعايير الأساسية</div>
                            <div className="text-3xl font-bold text-gray-900">12<span className="text-sm text-gray-400 font-normal">/43</span></div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-5 border border-gray-100 text-center">
                            <div className="text-sm font-medium text-gray-500 mb-1">المعايير الثانوية</div>
                            <div className="text-3xl font-bold text-gray-900">2<span className="text-sm text-gray-400 font-normal">/12</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-6 bg-[#006C35] rounded-full"></div>
                    <h3 className="font-bold text-gray-800 text-lg">المعايير الأساسية</h3>
                </div>

                <div className="bg-white border-r-4 border-r-green-600 border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                    <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toggleDetails('item-1')}>
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                                <Check className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-gray-800 text-sm md:text-base">التأكد من تطبيق النسخة 1.0 من هيئة الحكومة الرقمية</span>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedDetails['item-1'] ? 'rotate-180' : ''}`} />
                    </div>
                    {expandedDetails['item-1'] && (
                        <div className="border-t border-gray-100 bg-gray-50 p-5 space-y-4">
                            <p className="text-sm text-gray-600">تم التحقق من ملفات الـ CSS والتأكد من استدعاء المكتبة بشكل صحيح.</p>
                            <div className="flex items-center gap-2">
                                <a href="#" className="flex items-center gap-1 text-[#006C35] hover:text-[#005a2b] text-xs bg-[#E6F4EA] px-2 py-1 rounded-full w-fit">
                                    <BookOpen className="w-3 h-3" />
                                    دليل التصميم 1.2
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                {(() => {
                    const isIgnored = isItemFullyIgnored('item-2');
                    return (
                        <div className={`bg-white border-r-4 border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-500 ${isIgnored ? 'border-r-green-600' : 'border-r-red-600'}`}>
                            <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toggleDetails('item-2')}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isIgnored ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                        {isIgnored ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                                    </div>
                                    <span className={`font-bold text-sm md:text-base ${isIgnored ? 'text-gray-800' : 'text-gray-800'}`}>
                                        استخدام الهوية البصرية المعتمدة في الترويسة
                                    </span>
                                    {isIgnored && (
                                        <span className="px-2 py-0.5 rounded text-[10px] bg-green-50 text-green-700 font-bold border border-green-200">
                                            تم التجاهل
                                        </span>
                                    )}
                                </div>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedDetails['item-2'] ? 'rotate-180' : ''}`} />
                            </div>
                            
                            {expandedDetails['item-2'] && (
                                <div className="border-t border-gray-100 bg-gray-50 p-5">
                                    <div className="space-y-4">
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {isIgnored ? "تم تجاوز الأخطاء المرصودة في هذا المعيار يدوياً." : "اكتشف النظام أخطاء برمجية في عدة صفحات. يرجى مراجعة التفاصيل."}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <a href="#" className="flex items-center gap-1 text-[#006C35] hover:text-[#005a2b] text-xs bg-[#E6F4EA] px-2 py-1 rounded-full w-fit">
                                                <BookOpen className="w-3 h-3" />
                                                دليل الهوية البصرية - القسم 3.1
                                            </a>
                                        </div>
                                        <div className="flex items-center justify-between pt-2">
                                            <button 
                                                onClick={() => toggleNote('item2')}
                                                className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1"
                                            >
                                                <MessageSquarePlus className="w-3 h-3" /> {notes.item2?.isOpen ? 'إخفاء الملاحظة' : 'إضافة ملاحظة'}
                                            </button>
                                            
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); openErrorModal('item-2'); }}
                                                className="flex items-center gap-2 text-red-600 hover:text-red-700 bg-white border border-red-100 hover:border-red-200 px-4 py-2 rounded-lg shadow-sm transition-all text-sm font-bold"
                                            >
                                                <Search className="w-4 h-4" />
                                                تفاصيل الأخطاء ({mockErrorsItem2.length})
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })()}
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-6 bg-gray-400 rounded-full"></div>
                    <h3 className="font-bold text-gray-800 text-lg">نتائج الفحص اليدوي</h3>
                </div>
                {manualInputs.check1 && (
                     <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="block font-bold text-gray-800 text-sm">قياس رسالة الخطأ (وضوح النص)</span>
                                <span className="text-xs text-gray-500">تم التقييم يدوياً</span>
                            </div>
                            {getStatusBadge(manualInputs.check1)}
                        </div>
                        {notes.check1.text && (
                            <div className="bg-yellow-50/50 p-3 rounded border border-yellow-100 text-xs text-gray-600 flex gap-2">
                                <MessageSquarePlus className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                                <div>
                                    <span className="font-bold text-yellow-700 block mb-1">ملاحظة من الفحص اليدوي:</span>
                                    {notes.check1.text}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                 {manualInputs.check2 && (
                     <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="block font-bold text-gray-800 text-sm">قياس رسالة الخطأ (مكان الظهور)</span>
                                <span className="text-xs text-gray-500">تم التقييم يدوياً</span>
                            </div>
                            {getStatusBadge(manualInputs.check2)}
                        </div>
                         {notes.check2.text && (
                            <div className="bg-yellow-50/50 p-3 rounded border border-yellow-100 text-xs text-gray-600 flex gap-2">
                                <MessageSquarePlus className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                                <div>
                                    <span className="font-bold text-yellow-700 block mb-1">ملاحظة من الفحص اليدوي:</span>
                                    {notes.check2.text}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="flex gap-4 pt-6">
                <button onClick={() => { setSubmitConfirmed(false); setShowSubmitModal(true); }} className="flex-[2] bg-[#006C35] hover:bg-[#005a2b] text-white py-3.5 rounded-lg font-bold shadow-md transition-all flex justify-center items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    اعتماد النتيجة وإرسال التقرير
                </button>
                <button onClick={onNavigateToDetails} className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3.5 rounded-lg font-bold transition-all flex justify-center items-center">
                    العودة لاحقا
                </button>
            </div>
        </section>
      )}

      <DashboardModal isOpen={showErrorModal} onClose={() => setShowErrorModal(false)} title="تفاصيل الأخطاء" onSave={saveIgnoredErrors}>
          <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-800 mb-2">
                    <div className="bg-yellow-50 p-1.5 rounded-full text-yellow-700 border border-yellow-100">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg">الأماكن التي ظهر فيها الخطأ</h3>
                </div>
                
                <div className="text-sm text-gray-500 mb-2">
                    يمكنك تجاهل الأخطاء بشكل فردي. لن يتم اعتبار المعيار "ناجح" أو "متجاهل" بالكامل إلا إذا تم تجاهل جميع الأخطاء.
                </div>

                <div className="space-y-3">
                     {activeErrorItem === 'item-2' && mockErrorsItem2.map((error) => (
                         <div key={error.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden p-4 group hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-500">
                                        <Layout className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className={`text-sm font-bold text-gray-800 ${tempIgnoredSet.has(error.id) ? 'line-through text-gray-400' : ''}`}>{error.page}</div>
                                        <div className="text-[10px] text-gray-400">{error.path}</div>
                                    </div>
                                </div>
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input 
                                      type="checkbox" 
                                      checked={tempIgnoredSet.has(error.id)}
                                      onChange={() => toggleIgnoreError(error.id)}
                                      className="w-4 h-4 text-[#006C35] rounded border-gray-300 focus:ring-[#006C35]" 
                                    />
                                    <span className="text-xs text-gray-500 font-medium">تجاهل</span>
                                </label>
                            </div>
                            <div className="bg-[#1e293b] rounded p-3 overflow-x-auto border border-gray-700 relative text-left" dir="ltr">
                                <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#0f172a] border-r border-gray-700 flex flex-col items-center pt-3 text-[10px] text-gray-500 font-mono select-none">
                                    <span>23</span>
                                    <span>24</span>
                                    <span>25</span>
                                </div>
                                <div className="pl-8 font-mono text-xs">
                                    <div className="text-gray-400 whitespace-pre">  &lt;div class="header"&gt;</div>
                                    <div className="relative bg-red-900/30 -mx-3 pl-3 py-0.5 border-l-2 border-red-500">
                                        <span className="text-red-200">{error.snippet}</span>
                                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[9px] bg-red-500 text-white px-1.5 rounded">خطأ</span>
                                    </div>
                                    <div className="text-gray-400 whitespace-pre">  &lt;/div&gt;</div>
                                </div>
                            </div>
                         </div>
                     ))}
                </div>
          </div>
      </DashboardModal>

      <DashboardModal 
         isOpen={showSubmitModal} 
         onClose={() => setShowSubmitModal(false)} 
         title="تأكيد الاعتماد" 
         onSave={() => {setShowSubmitModal(false); onShowToast("تم إرسال التقرير بنجاح"); onNavigateToHome();}}
         saveDisabled={!submitConfirmed}
      >
          <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                  <FileWarning className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">هل أنت متأكد من اعتماد النتيجة؟</h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  هذا الإجراء نهائي ولا يمكن التراجع عنه. سيتم إرسال التقرير الرسمي بالنسبة الحالية (59%) إلى ممثلي المنصة وإدارة الالتزام.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-right">
                  <label className="flex items-start gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="mt-1 w-4 h-4 text-[#006C35] border-gray-300 rounded focus:ring-[#006C35]" 
                        checked={submitConfirmed}
                        onChange={(e) => setSubmitConfirmed(e.target.checked)}
                      />
                      <span className="text-xs font-bold text-gray-700 leading-tight select-none">
                          أقر بأنني قمت بمراجعة كافة المعايير والأدلة المرفقة، وأن النتائج المرصودة (بما في ذلك الاستثناءات) صحيحة ومطابقة للواقع.
                      </span>
                  </label>
              </div>
          </div>
      </DashboardModal>
    </div>
  );
};

// --- User Management View ---
const UserManagementView = ({ onShowToast }) => {
  const [internalUsers, setInternalUsers] = useState(initialInternalUsers);
  const [platformUsers, setPlatformUsers] = useState(initialPlatformUsers);
  const [selectedPlatformFilter, setSelectedPlatformFilter] = useState('');
  const [newUserPlatform, setNewUserPlatform] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showAddPlatformUserModal, setShowAddPlatformUserModal] = useState(false);
  const [showEditPlatformUserModal, setShowEditPlatformUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddInternalUser = () => {
    setShowAddUserModal(false);
    onShowToast("تم اضافة المستخدم بنجاح");
  };

  const handleEditInternalUser = (user) => {
    setSelectedUser(user);
    setShowEditUserModal(true);
  };

  const handleAddPlatformUser = () => {
    setShowAddPlatformUserModal(false);
    onShowToast("تم اضافة ممثل المنصة بنجاح");
    setNewUserPlatform('');
  };

  const handleEditPlatformUser = (user) => {
    setSelectedUser(user);
    setShowEditPlatformUserModal(true);
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      <nav className="flex items-center text-sm text-gray-500" aria-label="Breadcrumb">
        <a href="#" className="hover:text-[#006C35] transition-colors flex items-center gap-1">
           <Home className="w-4 h-4" />
           <span>الرئيسية</span>
        </a>
        <ChevronLeft className="w-4 h-4 mx-2 text-gray-400" />
        <span className="font-bold text-[#006C35]">إدارة المستخدمين والصلاحيات</span>
      </nav>

      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#006C35] rounded-full inline-block"></span>
            إدارة المستخدمين والصلاحيات
          </h1>
          <p className="text-sm text-gray-500 mt-1 mr-4">إدارة حسابات موظفي الهيئة وممثلي المنصات</p>
        </div>
      </div>

      <section className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#E6F4EA] rounded-lg flex items-center justify-center text-[#006C35]">
                 <Shield className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-[#111827]">موظفي الهيئة (النظام)</h2>
           </div>
           <button 
             onClick={() => setShowAddUserModal(true)}
             className="bg-[#006C35] hover:bg-[#005a2b] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-all"
           >
             <Plus className="w-4 h-4" />
             إضافة مستخدم
           </button>
        </div>

        <div className="px-6 py-5 bg-[#FAFAFA] border-b border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-2 relative">
             <input type="text" placeholder="بحث بالاسم أو البريد الإلكتروني..." className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006C35]" />
             <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
          </div>
          <div className="col-span-1 relative">
             <select className="w-full bg-white border border-gray-200 text-gray-700 py-2.5 px-3 pr-8 rounded-lg text-sm appearance-none cursor-pointer focus:border-[#006C35] focus:ring-1 focus:ring-[#006C35]">
                <option value="">الحالة (الكل)</option>
                <option value="active">مفعل</option>
                <option value="inactive">غير مفعل</option>
             </select>
             <ChevronDown className="absolute left-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="col-span-1 relative">
             <select className="w-full bg-white border border-gray-200 text-gray-700 py-2.5 px-3 pr-8 rounded-lg text-sm appearance-none cursor-pointer focus:border-[#006C35] focus:ring-1 focus:ring-[#006C35]">
                <option value="">الصلاحيات (الكل)</option>
                <option value="full">كامل</option>
                <option value="operational">تشغيلي</option>
             </select>
             <ChevronDown className="absolute left-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
          <table className="w-full whitespace-nowrap relative">
            <thead className="sticky top-0 z-10 shadow-sm">
              <tr className="bg-white border-b border-gray-100">
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">الاسم</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">البريد الإلكتروني</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">الصلاحية</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">الحالة</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {internalUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-mono text-right" dir="ltr">{user.email}</td>
                  <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded border ${user.roleType === 'full' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                         {user.role}
                      </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'مفعل' ? 'bg-[#E6F4EA] text-[#006C35]' : 'bg-gray-100 text-gray-600'}`}>
                      {user.status === 'مفعل' && <span className="w-1.5 h-1.5 rounded-full bg-[#006C35] ml-1.5"></span>}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => handleEditInternalUser(user)} className="p-1.5 text-gray-400 hover:text-[#006C35] hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFF8F1] rounded-lg flex items-center justify-center text-[#C69C6D]">
                 <Building2 className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-[#111827]">ممثلي المنصات</h2>
           </div>
           <button 
             onClick={() => setShowAddPlatformUserModal(true)}
             className="bg-[#006C35] hover:bg-[#005a2b] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-all"
           >
             <Plus className="w-4 h-4" />
             إضافة ممثل منصة
           </button>
        </div>

        <div className="px-6 py-5 bg-[#FAFAFA] border-b border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-2 relative">
             <input type="text" placeholder="بحث بالاسم..." className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006C35]" />
             <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
          </div>
          <div className="col-span-1 relative">
             <select className="w-full bg-white border border-gray-200 text-gray-700 py-2.5 px-3 pr-8 rounded-lg text-sm appearance-none cursor-pointer focus:border-[#006C35] focus:ring-1 focus:ring-[#006C35]">
                <option value="">الحالة (الكل)</option>
                <option value="active">مفعل</option>
                <option value="inactive">غير مفعل</option>
             </select>
             <ChevronDown className="absolute left-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          
          <div className="col-span-1 relative">
             <SearchableDropdown 
                options={['الكل', ...PLATFORM_LIST]} 
                value={selectedPlatformFilter} 
                onChange={setSelectedPlatformFilter} 
                placeholder="المنصة (الكل)"
             />
          </div>
        </div>

        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
          <table className="w-full whitespace-nowrap relative">
            <thead className="sticky top-0 z-10 shadow-sm">
              <tr className="bg-white border-b border-gray-100">
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">الاسم</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">البريد الإلكتروني</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">المنصة</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">الحالة</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {platformUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-mono text-right" dir="ltr">{user.email}</td>
                  <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 rounded border bg-gray-50 text-gray-700 border-gray-200">
                         {user.platform}
                      </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'مفعل' ? 'bg-[#E6F4EA] text-[#006C35]' : 'bg-gray-100 text-gray-600'}`}>
                      {user.status === 'مفعل' && <span className="w-1.5 h-1.5 rounded-full bg-[#006C35] ml-1.5"></span>}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => handleEditPlatformUser(user)} className="p-1.5 text-gray-400 hover:text-[#006C35] hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <DashboardModal isOpen={showAddUserModal} onClose={() => setShowAddUserModal(false)} title="إضافة مستخدم جديد" onSave={handleAddInternalUser}>
         <div className="grid grid-cols-1 gap-4">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
               <input type="text" className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#006C35] focus:ring-[#006C35] text-sm py-2 px-3 border" placeholder="مثال: محمد الفهد" />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
               <input type="email" className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#006C35] focus:ring-[#006C35] text-sm py-2 px-3 border" placeholder="example@dga.gov.sa" />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">نوع الصلاحية</label>
               <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#006C35] focus:ring-[#006C35] text-sm py-2 px-3 border">
                  <option>كامل</option>
                  <option>تشغيلي</option>
               </select>
            </div>
         </div>
      </DashboardModal>

      <DashboardModal isOpen={showAddPlatformUserModal} onClose={() => setShowAddPlatformUserModal(false)} title="إضافة ممثل منصة" onSave={handleAddPlatformUser}>
         <div className="grid grid-cols-1 gap-4">
            <div className="relative">
               <SearchableDropdown 
                  label="المنصة"
                  options={PLATFORM_LIST} 
                  value={newUserPlatform} 
                  onChange={setNewUserPlatform} 
                  placeholder="اختر المنصة..."
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">اسم الممثل</label>
               <input type="text" className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#006C35] focus:ring-[#006C35] text-sm py-2 px-3 border" placeholder="مثال: عبدالله القحطاني" />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني الرسمي</label>
               <input type="email" className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#006C35] focus:ring-[#006C35] text-sm py-2 px-3 border" placeholder="admin@entity.gov.sa" />
            </div>
         </div>
      </DashboardModal>

      <DashboardModal isOpen={showEditUserModal || showEditPlatformUserModal} onClose={() => {setShowEditUserModal(false); setShowEditPlatformUserModal(false)}} title="تحرير بيانات المستخدم" onSave={() => {setShowEditUserModal(false); setShowEditPlatformUserModal(false); onShowToast("تم حفظ التغييرات بنجاح")}}>
         <div className="grid grid-cols-1 gap-4">
            <div className="p-3 bg-yellow-50 text-yellow-800 rounded-md text-xs border border-yellow-200">
               يمكنك تعديل بيانات المستخدم أو حذفه نهائياً من النظام.
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
               <input type="text" defaultValue={selectedUser?.name} className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#006C35] focus:ring-[#006C35] text-sm py-2 px-3 border" />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
               <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#006C35] focus:ring-[#006C35] text-sm py-2 px-3 border" defaultValue={selectedUser?.status === 'مفعل' ? 'active' : 'inactive'}>
                  <option value="active">مفعل</option>
                  <option value="inactive">غير مفعل</option>
               </select>
            </div>
            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
               <span className="text-sm text-gray-500">منطقة الخطر</span>
               <button type="button" className="text-red-600 text-sm hover:text-red-800 flex items-center gap-1 font-medium">
                  <Trash2 className="w-4 h-4" /> حذف المستخدم
               </button>
            </div>
         </div>
      </DashboardModal>
    </div>
  );
};

/* ========================================================================
   MAIN APP CONTROLLER
   ======================================================================== */

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [viewState, setViewState] = useState('landing');
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [activePage, setActivePage] = useState('dashboard');
  const [toast, setToast] = useState({ show: false, message: '' });

  // لازم يكون قبل أي return
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage, viewState]);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setLoginOpen(false);
    setViewState('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setViewState('landing');
    setActivePage('dashboard');
  };

  const startScan = () => {
    if (url) setViewState('scanning');
    else alert('الرجاء إدخال الرابط أولاً');
  };

  const scrollToPlatforms = () => {
    if (activePage !== 'dashboard') {
      setActivePage('dashboard');
      setTimeout(() => {
        const element = document.getElementById('platforms-list');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('platforms-list');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fontStyles = `
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');
    .font-ibm { font-family: 'IBM Plex Sans Arabic', sans-serif; }
    body { font-family: 'IBM Plex Sans Arabic', sans-serif; background-color: #F3F4F6; }
    .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `;

  // =======================
  // Logged In (Dashboard)
  // =======================
  if (isLoggedIn) {
    return (
      <>
        <style>{globalStyles}</style>

        <div
          className="min-h-screen bg-[#F8F9FA] text-[#111827]"
          dir="rtl"
          style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
        >
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');
            ::-webkit-scrollbar { width: 6px; height: 6px; }
            ::-webkit-scrollbar-track { background: transparent; }
            ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
            ::-webkit-scrollbar-thumb:hover { background: #94A3B8; }
            .recharts-tooltip-wrapper { z-index: 100; }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn {
              animation: fadeIn 0.3s ease-out forwards;
            }
          `}</style>

          <DashboardHeader
            activePage={activePage}
            setActivePage={setActivePage}
            onNavigateToPlatforms={scrollToPlatforms}
            onLogout={handleLogout}
          />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-300px)]">
            <DashboardToast show={toast.show} message={toast.message} />

            {activePage === 'dashboard' && (
              <DashboardView
                onNavigateToGeneral={() => setActivePage('general_dashboard')}
                onNavigateToDetails={() => setActivePage('platform_details')}
              />
            )}

            {activePage === 'users' && <UserManagementView onShowToast={showToast} />}

            {activePage === 'platforms' && (
              <div className="text-center py-20 text-gray-500">صفحة المنصات (قيد التطوير)</div>
            )}

            {activePage === 'general_dashboard' && (
              <GeneralDashboardView onNavigateToHome={() => setActivePage('dashboard')} />
            )}

            {activePage === 'platform_details' && (
              <PlatformDetailsView
                onShowToast={showToast}
                onNavigateToHome={() => setActivePage('dashboard')}
                onNavigateToPlatforms={scrollToPlatforms}
                onNavigateToMeasurement={() => setActivePage('measurement_process')}
              />
            )}

            {activePage === 'measurement_process' && (
              <MeasurementProcessView
                onNavigateToDetails={() => setActivePage('platform_details')}
                onShowToast={showToast}
                onNavigateToHome={() => setActivePage('dashboard')}
              />
            )}
          </main>

          <DashboardFooter />
        </div>
      </>
    );
  }

  // =======================
  // Logged Out (Landing / Scan)
  // =======================
  return (
    <>
      <style>{globalStyles}</style>

      <div className="font-ibm min-h-screen text-right flex flex-col" dir="rtl">
        <style>{fontStyles}</style>

        {viewState !== 'dashboard' && <Header onLoginClick={() => setLoginOpen(true)} />}

        <main className="flex-grow">
          {viewState === 'landing' && (
            <LandingPage scanningUrl={url} setScanningUrl={setUrl} onStartScan={startScan} />
          )}

          {viewState === 'scanning' && (
            <div className="pt-32 min-h-screen bg-[#F9FAFB] flex flex-col items-center">
              <ScanningLoader url={url} onComplete={() => setViewState('report')} />
            </div>
          )}

          {viewState === 'report' && (
            <div className="pt-24 bg-[#F9FAFB]">
              <ReportView
                url={url}
                onReset={() => {
                  setUrl('');
                  setViewState('landing');
                }}
              />
              <UnifiedFooter isDashboard={false} />
            </div>
          )}
        </main>

        <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} onLogin={handleLogin} />
      </div>
    </>
  );
};

export default App;