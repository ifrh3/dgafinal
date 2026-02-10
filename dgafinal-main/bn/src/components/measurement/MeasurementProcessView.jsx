import React, { useState } from 'react';
import { 
  Home, ChevronLeft, Edit3, Check, 
  AlertTriangle, X, ChevronDown, 
  ChevronUp, Cloud, BookOpen, 
  Lightbulb, ArrowLeft, Cpu, 
  CheckCircle, FileWarning, 
  Code, MapPin, AlertCircle, 
  Monitor, Layout, FileText, 
  MessageSquarePlus
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const MeasurementProcessView = ({ onNavigate, onShowToast }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [manualInputs, setManualInputs] = useState({ check1: '', check2: '' });
  const [loadingStep, setLoadingStep] = useState(0);
  const [activeSection, setActiveSection] = useState('manual'); // 'manual', 'result'
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [activeErrorItem, setActiveErrorItem] = useState(null);
  const [expandedItems, setExpandedItems] = useState({}); 
  const [autoSavedTime, setAutoSavedTime] = useState(null);

  // Mock Data
  const mockErrorsItem2 = [
    { id: 'err-1', page: 'الرئيسية', path: '/home/index', snippet: '<img src="logo.png" style="margin: 0;" />' },
    { id: 'err-2', page: 'اتصل بنا', path: '/contact-us', snippet: '<img src="header-logo.svg" class="no-pad" />' }
  ];

  const manualCriteriaList = [
      { id: 'check1', title: 'وضوح الهوية البصرية', desc: 'هل شعار المنصة واضح ويتبع دليل الهوية؟', guide: '1.1', recommendation: 'تأكد من استخدام الشعار الرسمي بصيغة SVG وبأبعاد لا تقل عن 120px في الترويسة.' },
      { id: 'check2', title: 'سهولة الوصول', desc: 'هل يمكن الوصول للخدمات الرئيسية من الصفحة الأولى؟', guide: '2.3', recommendation: 'يجب أن تكون الخدمات الأكثر استخداماً متاحة في الجزء العلوي من الصفحة الرئيسية.' }
  ];

  const automatedCriteriaList = [
      { id: 'auto1', title: 'فحص التباين اللوني', status: 'pass', desc: 'نسبة التباين للنصوص 4.5:1 على الأقل.', guide: '1.4' },
      { id: 'auto2', title: 'التحقق من النصوص البديلة (Alt Text)', status: 'fail', desc: 'يجب أن تحتوي جميع الصور على وصف نصي.', guide: '1.1', hasError: true },
      { id: 'auto3', title: 'سرعة استجابة الخادم', status: 'pass', desc: 'زمن استجابة الخادم أقل من 200ms.', guide: '4.1' },
      { id: 'auto4', title: 'التوافق مع الأجهزة المحمولة', status: 'pass', desc: 'الموقع متجاوب بالكامل مع جميع الشاشات.', guide: '5.0' },
      { id: 'auto5', title: 'أمان الروابط (HTTPS)', status: 'pass', desc: 'جميع الروابط تستخدم بروتوكول آمن.', guide: '6.1' },
      { id: 'auto6', title: 'هيكلية العناوين (H1-H6)', status: 'partial', desc: 'تسلسل العناوين منطقي وصحيح.', guide: '2.4' },
      { id: 'auto7', title: 'صلاحية ملفات Sitemap', status: 'pass', desc: 'ملف sitemap.xml صالح ومحدث.', guide: '3.5' }
  ];

  // Logic
  const totalManualItems = 2;
  const answeredManualItems = Object.values(manualInputs).filter(val => val !== '').length;
  const manualProgress = Math.round((answeredManualItems / totalManualItems) * 100);
  const isManualComplete = answeredManualItems === totalManualItems; // Strict check

  const calculateScore = () => {
      let score = 0;
      if(manualInputs.check1 === 'pass') score += 15;
      if(manualInputs.check2 === 'pass') score += 15;
      automatedCriteriaList.forEach(item => {
          if(item.status === 'pass') score += 10;
          if(item.status === 'partial') score += 5;
      });
      return score;
  };
  const finalScore = calculateScore();
  const isPassed = finalScore >= 70;

  // Actions
  const handleManualCheckChange = (id, value) => {
    setManualInputs(prev => ({ ...prev, [id]: value }));
    setAutoSavedTime(new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }));
  };

  const finishManual = () => {
      if (!isManualComplete) return; // Block if not complete
      setActiveSection('automated');
      setLoadingStep(0);
      const interval = setInterval(() => {
          setLoadingStep(prev => {
              if (prev >= 100) {
                  clearInterval(interval);
                  setActiveSection('result');
                  return 100;
              }
              return prev + 5;
          });
      }, 50);
  };

  const editManual = () => {
      setActiveSection('manual');
  };

  const toggleItem = (id) => {
      setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getBorderColor = (status) => {
      if(status === 'pass') return 'border-r-green-500';
      if(status === 'fail') return 'border-r-red-500';
      if(status === 'partial') return 'border-r-yellow-500';
      return 'border-r-gray-300';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 animate-fadeIn font-ibm">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <span onClick={() => onNavigate('dashboard')} className="hover:text-[#006C35] cursor-pointer transition-colors flex items-center gap-1">
             <Home className="w-3 h-3" /> الرئيسية
        </span>
        <ChevronLeft className="w-3 h-3" />
        <span className="font-bold text-[#006C35]">الفحص الذاتي</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#111827] mb-1">منصة: أبشر</h1>
        <p className="text-sm text-gray-500">الفحص الذاتي</p>
      </div>

      {/* ACCORDION 1: Manual Check */}
      <section className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-500 mb-6 ${activeSection !== 'manual' ? 'border-l-4 border-l-[#006C35]' : ''}`}>
          <div 
            onClick={activeSection !== 'manual' ? editManual : undefined}
            className={`bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 ${activeSection !== 'manual' ? 'cursor-pointer hover:bg-gray-100' : ''}`}
          >
              <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${activeSection === 'manual' ? 'bg-[#006C35] text-white' : 'bg-white border border-gray-200 text-[#006C35]'}`}>
                      <Edit3 className="w-5 h-5" />
                  </div>
                  <div>
                      <h2 className="text-lg font-bold text-gray-900">المعايير اليدوية</h2>
                      <p className="text-xs text-gray-500">
                          {activeSection === 'manual' ? 'يرجى تقييم العنصرين أدناه' : 'تم استكمال الفحص اليدوي'}
                      </p>
                  </div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                   {activeSection === 'manual' && (
                       <div className="flex-1 md:w-48">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-bold text-gray-600">{manualProgress}%</span>
                                {autoSavedTime && <span className="text-[10px] text-[#006C35] flex items-center gap-1"><Cloud className="w-3 h-3" /> تم الحفظ</span>}
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-[#006C35] h-2 rounded-full transition-all duration-500" style={{ width: `${manualProgress}%` }}></div>
                            </div>
                       </div>
                   )}
                   <ChevronUp className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${activeSection !== 'manual' ? 'rotate-180' : ''}`} />
              </div>
          </div>

          <div className={`transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden ${activeSection === 'manual' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-6 space-y-4">
                  {manualCriteriaList.map((item) => (
                      <div key={item.id} className={`border border-gray-100 rounded-xl overflow-hidden hover:shadow-sm transition-all bg-white border-r-4 ${getBorderColor(manualInputs[item.id])}`}>
                          <div className="p-5 flex flex-col lg:flex-row gap-6 items-start lg:items-center cursor-pointer" onClick={() => toggleItem(item.id)}>
                              <div className="flex-grow">
                                  <h3 className="font-bold text-gray-900 text-sm mb-1 flex items-center gap-2">
                                      {item.title}
                                      <a href="#" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 text-[#006C35] hover:text-[#005a2b] text-[10px] bg-[#E6F4EA] px-2 py-1 rounded-full w-fit">
                                          <BookOpen className="w-3 h-3" />
                                          دليل {item.guide}
                                      </a>
                                  </h3>
                                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                              </div>
                              <div className="flex items-center gap-4">
                                  {/* Status Bar (Radio Buttons) */}
                                  <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-200" onClick={(e) => e.stopPropagation()}>
                                      {[
                                          { val: 'pass', label: 'مطبق', icon: Check, color: 'text-green-700 bg-white shadow-sm border-green-100' },
                                          { val: 'partial', label: 'جزئي', icon: AlertTriangle, color: 'text-yellow-700 bg-white shadow-sm border-yellow-100' },
                                          { val: 'fail', label: 'غير مطبق', icon: X, color: 'text-red-700 bg-white shadow-sm border-red-100' }
                                      ].map((opt) => (
                                          <button
                                              key={opt.val}
                                              onClick={() => handleManualCheckChange(item.id, opt.val)}
                                              className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${
                                                  manualInputs[item.id] === opt.val 
                                                  ? `${opt.color} border` 
                                                  : 'text-gray-500 hover:bg-gray-200/50'
                                              }`}
                                          >
                                              <opt.icon className="w-3 h-3" />
                                              {opt.label}
                                          </button>
                                      ))}
                                  </div>
                                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedItems[item.id] ? 'rotate-180' : ''}`} />
                              </div>
                          </div>
                          
                          {/* Expanded Content: Recommendation */}
                          {expandedItems[item.id] && (
                              <div className="bg-gray-50 px-5 py-4 border-t border-gray-100 text-sm text-gray-600 flex items-start gap-3">
                                  <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                  <div>
                                      <span className="font-bold text-gray-800 block mb-1">التوصيات:</span>
                                      <p className="text-xs leading-relaxed">{item.recommendation}</p>
                                  </div>
                              </div>
                          )}
                      </div>
                  ))}

                  <div className="flex justify-end pt-4 border-t border-gray-100">
                      <button 
                        onClick={finishManual} 
                        disabled={!isManualComplete} 
                        className={`px-8 py-3 rounded-lg font-bold shadow-md transition-all flex items-center gap-2 ${!isManualComplete ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-[#006C35] hover:bg-[#005a2b] text-white'}`}
                        title={!isManualComplete ? "يرجى استكمال جميع المعايير اليدوية أولاً" : ""}
                      >
                          <span>التالي: النتيجة</span>
                          <ArrowLeft className="w-4 h-4" />
                      </button>
                  </div>
              </div>
          </div>
      </section>

      {/* SECTION 2: Loading (Transient) */}
      {activeSection === 'automated' && (
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center animate-fadeIn mb-6">
              <div className="relative w-16 h-16 mx-auto mb-4">
                 <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                 <div className="absolute inset-0 border-4 border-[#006C35] rounded-full border-t-transparent animate-spin"></div>
                 <Cpu className="absolute inset-0 w-6 h-6 m-auto text-[#006C35]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">جاري معالجة البيانات...</h3>
              <p className="text-xs text-gray-500">يتم دمج النتائج اليدوية والآلية</p>
          </section>
      )}

      {/* ACCORDION 3: Result (Matches Dashboard Layout) */}
      <section className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-500 ${activeSection === 'result' ? 'opacity-100' : 'opacity-60 pointer-events-none'}`}>
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${activeSection === 'result' ? 'bg-[#006C35] text-white' : 'bg-white border border-gray-200 text-[#006C35]'}`}>
                      <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                      <h2 className="text-lg font-bold text-gray-900">النتيجة النهائية</h2>
                      <p className="text-xs text-gray-500">ملخص الامتثال والتفاصيل</p>
                  </div>
              </div>
              <ChevronUp className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${activeSection !== 'result' ? 'rotate-180' : ''}`} />
          </div>

          <div className={`transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden ${activeSection === 'result' ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-8">
                  {/* DASHBOARD-STYLE RESULT CARD */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 relative overflow-hidden mb-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                          {/* Gauge (From Dashboard) */}
                          <div className="flex flex-col items-center border-b md:border-b-0 md:border-l border-gray-100 pb-8 md:pb-0 md:pl-8">
                              <div className="relative w-48 h-48 mx-auto">
                                  <div className="relative w-48 h-48 mx-auto">
                                      <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                                          <span className="text-4xl font-bold text-[#111827]">{finalScore}%</span>
                                          <span className="text-xs font-bold text-gray-400 mt-1">نسبة الامتثال</span>
                                          <div className="flex gap-4 mt-2 text-[10px] font-bold">
                                              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#006C35]"></span><span className="text-gray-600">نجاح</span></div>
                                              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-300"></span><span className="text-gray-400">لم يتم</span></div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          {/* Stats Cards (From Dashboard) */}
                          <div className="space-y-4">
                              <div className="bg-white rounded-xl p-4 border border-gray-200 flex flex-col justify-center items-center shadow-sm text-center hover:border-green-200 transition-colors">
                                  <h4 className="text-xs font-bold text-gray-500 mb-2">نسبة تطبيق المعايير الأساسية</h4>
                                  <span className="text-2xl font-bold text-[#111827]">{answeredManualItems}</span>
                              </div>
                              <div className="bg-white rounded-xl p-4 border border-gray-200 flex flex-col justify-center items-center shadow-sm text-center hover:border-[#C69C6D] transition-colors">
                                  <h4 className="text-xs font-bold text-gray-500 mb-2">نسبة تطبيق المعايير الثانوية</h4>
                                  <span className="text-2xl font-bold text-[#111827]">7</span>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Drop for details (Combined List) */}
                  <div className="space-y-3">
                      <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4">تفاصيل المعايير</h3>
                      {[
                          ...manualCriteriaList.map(i => ({...i, status: manualInputs[i.id] || 'fail', type: 'يدوي'})), 
                          ...automatedCriteriaList.map(i => ({...i, type: 'آلي'}))
                      ].map((item, idx) => (
                          <div key={idx} className={`border border-gray-100 rounded-lg overflow-hidden bg-white hover:shadow-sm transition-all border-r-4 ${getBorderColor(item.status)}`}>
                              <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50" onClick={() => toggleItem(item.id || idx)}>
                                  <div className="flex items-center gap-3">
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${item.status === 'pass' ? 'bg-green-100 text-green-700' : item.status === 'fail' ? 'bg-red-100 text-red-700' : 'bg-yellow-50 text-yellow-600'}`}>
                                          {item.status === 'pass' ? <Check className="w-4 h-4"/> : item.status === 'fail' ? <X className="w-4 h-4"/> : <AlertTriangle className="w-4 h-4"/>}
                                      </div>
                                      <div>
                                          <div className="font-bold text-gray-800 text-sm">{item.title}</div>
                                          <div className="text-[10px] text-gray-400">{item.type} - مرجع {item.guide}</div>
                                      </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                      <span className={`text-xs font-bold ${item.status === 'pass' ? 'text-green-600' : item.status === 'fail' ? 'text-red-600' : 'text-yellow-600'}`}>
                                          {item.status === 'pass' ? 'ناجح' : item.status === 'fail' ? 'فشل' : 'جزئي'}
                                      </span>
                                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedItems[item.id || idx] ? 'rotate-180' : ''}`} />
                                  </div>
                              </div>
                              
                              {expandedItems[item.id || idx] && (
                                  <div className="bg-gray-50 px-5 py-4 border-t border-gray-100 text-sm text-gray-600">
                                      <p className="mb-2"><strong>الشرح:</strong> {item.desc}</p>
                                      {item.type === 'يدوي' && (
                                          <div className="mt-2 flex items-start gap-2 bg-blue-50 p-2 rounded text-blue-800 text-xs">
                                              <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                              <span><strong>التوصية:</strong> {item.recommendation}</span>
                                          </div>
                                      )}
                                      {item.hasError && (
                                          <button 
                                              onClick={() => { setActiveErrorItem(item.id); setShowErrorModal(true); }}
                                              className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 mt-2 bg-white border border-red-200 px-3 py-1.5 rounded-lg w-fit"
                                          >
                                              <Code className="w-3 h-3" /> عرض الكود البرمجي (Snippets)
                                          </button>
                                      )}
                                  </div>
                              )}
                          </div>
                      ))}
                  </div>

                  {/* Footer Note (No Buttons) */}
                  {!isPassed && (
                      <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 animate-fadeIn">
                          <FileWarning className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                              <h4 className="font-bold text-red-800 text-sm mb-1">تنبيه: غير مستوفى لشهادة كود المنصات</h4>
                              <p className="text-xs text-red-700 leading-relaxed">
                                  نأسف، ولكن بناءً على هذه النتيجة ({finalScore}%)، لم تحقق المنصة الحد الأدنى من المعايير المطلوبة (70%) للحصول على الشهادة.
                              </p>
                          </div>
                      </div>
                  )}
                  {isPassed && (
                      <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3 animate-fadeIn">
                          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                              <h4 className="font-bold text-green-800 text-sm mb-1">تهانينا! المنصة مستوفية</h4>
                              <p className="text-xs text-green-700 leading-relaxed">
                                  تم اجتياز الفحص بنجاح ({finalScore}%). يمكنك الآن التقدم لطلب الشهادة الرسمية.
                              </p>
                          </div>
                      </div>
                  )}
              </div>
          </div>
      </section>

      {/* Error Popup (Code Snippets) */}
      <Modal isOpen={showErrorModal} onClose={() => setShowErrorModal(false)} title="الأخطاء البرمجية المرصودة">
          <div className="space-y-4">
              <div className="text-sm text-gray-600 mb-2">تم العثور على مخالفات برمجية في الملفات التالية:</div>
              {mockErrorsItem2.map((error) => (
                  <div key={error.id} className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-100 px-3 py-2 border-b border-gray-200 flex justify-between items-center">
                          <span className="text-xs font-bold text-gray-700">{error.page}</span>
                          <span className="text-[10px] font-mono text-gray-500">{error.path}</span>
                      </div>
                      <div className="p-3 bg-[#1e293b] overflow-x-auto">
                          <code className="text-xs font-mono text-red-300 whitespace-pre block dir-ltr text-left">
                              {error.snippet}
                          </code>
                      </div>
                  </div>
              ))}
          </div>
      </Modal>
    </div>
  );
};