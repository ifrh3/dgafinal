import React from 'react';
import { 
  Zap, MousePointer2, Timer, 
  ShieldCheck as ShieldCheckIcon, 
  Eye as EyeIcon, Smartphone, 
  MapPin as MapPinIcon
} from 'lucide-react';
import { UnifiedFooter } from '../common/Footer';

export const LandingPage = ({ onLoginClick }) => {
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
                             placeholder="https://www.example.gov.sa"
                             className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-4 text-left text-gray-800 focus:ring-2 focus:ring-[#006C35] focus:border-[#006C35] outline-none transition-all"
                             dir="ltr"
                           />
                           
                           <button 
                             onClick={onLoginClick}
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
                           { name: 'الأمان الرقمي', icon: <ShieldCheckIcon className="w-6 h-6"/> },
                           { name: 'إمكانية الوصول', icon: <EyeIcon className="w-6 h-6"/> },
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