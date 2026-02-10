import React, { useState } from 'react';
import { Toast } from './components/common/Toast';
import { ExternalHeader } from './components/auth/ExternalHeader';
import { LoginModal } from './components/auth/LoginModal';
import { DashboardHeader } from './components/dashboard/DashboardHeader';
import { HeroSection } from './components/dashboard/HeroSection';
import { ActionBar } from './components/dashboard/ActionBar';
import { DashboardContent } from './components/dashboard/DashboardContent';
import { ReportsPage } from './components/reports/ReportsPage';
import { ReportView } from './components/reports/ReportView';
import { MeasurementProcessView } from './components/measurement/MeasurementProcessView';
import { LandingPage } from './components/landing/LandingPage';
import { UnifiedFooter } from './components/common/Footer';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setLoginOpen(false);
    showToast('تم تسجيل الدخول بنجاح!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActivePage('dashboard');
    showToast('تم تسجيل الخروج بنجاح!');
  };

  const fontStyles = `
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');
    body { font-family: 'IBM Plex Sans Arabic', sans-serif; background-color: #F9FAFB; }
    .font-ibm { font-family: 'IBM Plex Sans Arabic', sans-serif; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #f1f1f1; }
    ::-webkit-scrollbar-thumb { background: #C69C6D; border-radius: 4px; }
    .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `;

  // إذا كان المستخدم غير مسجل، عرض الصفحة الرئيسية
  if (!isLoggedIn) {
    return (
      <div className="font-ibm min-h-screen text-right flex flex-col" dir="rtl">
        <style>{fontStyles}</style>
        
        <ExternalHeader onLoginClick={() => setLoginOpen(true)} />
        
        <main className="flex-grow">
          <LandingPage onLoginClick={() => setLoginOpen(true)} />
        </main>

        <LoginModal 
          isOpen={isLoginOpen} 
          onClose={() => setLoginOpen(false)} 
          onLogin={handleLogin} 
        />
      </div>
    );
  }

  // إذا كان المستخدم مسجل، عرض لوحة التحكم
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] font-ibm text-[#111827]" dir="rtl">
      <style>{fontStyles}</style>
      <Toast show={toast.show} message={toast.message} />
      
      <DashboardHeader activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} />
      
      <main className="flex-grow">
          {activePage === 'dashboard' && (
              <>
                <HeroSection />
                <ActionBar onStart={() => setActivePage('measurement')} />
                <DashboardContent />
              </>
          )}
          {activePage === 'reports' && <ReportsPage onNavigate={setActivePage} />}
          {activePage === 'report-details' && <ReportView onNavigate={setActivePage} />}
          {activePage === 'measurement' && <MeasurementProcessView onNavigate={setActivePage} onShowToast={showToast} />}
      </main>

      <UnifiedFooter isDashboard={true} />
    </div>
  );
};

export default App;