import React, { useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';

export const LoginModal = ({ isOpen, onClose, onLogin }) => {
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