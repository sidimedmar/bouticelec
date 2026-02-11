import React, { useState, useEffect } from 'react';
import { X, Save, Settings, Monitor, Lock } from 'lucide-react';
import { t } from '../translations';
import { Language, SiteContent } from '../types';

interface AdminSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currentPin: string;
  currentWhatsapp: string;
  currentSiteContent: SiteContent;
  onSave: (newPin: string, newWhatsapp: string, newContent: SiteContent) => void;
}

const AdminSettingsModal: React.FC<AdminSettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  language, 
  currentPin, 
  currentWhatsapp, 
  currentSiteContent,
  onSave 
}) => {
  const [pin, setPin] = useState(currentPin);
  const [whatsapp, setWhatsapp] = useState(currentWhatsapp);
  const [content, setContent] = useState<SiteContent>(currentSiteContent);

  // Sync state with props when modal opens or props change
  useEffect(() => {
    if (isOpen) {
      setPin(currentPin);
      setWhatsapp(currentWhatsapp);
      setContent(currentSiteContent);
    }
  }, [isOpen, currentPin, currentWhatsapp, currentSiteContent]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(pin, whatsapp, content);
    onClose();
  };

  const handleContentChange = (field: keyof SiteContent, value: any) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const handleDeepContentChange = (section: 'heroTitle' | 'heroSubtitle' | 'footerText', lang: 'fr' | 'ar', value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [lang]: value
      }
    }));
  };

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-start overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full">
          <form onSubmit={handleSubmit} className="bg-gray-50 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="bg-mru-green px-4 py-3 sm:px-6 flex justify-between items-center shrink-0">
              <h3 className="text-lg leading-6 font-medium text-white flex items-center gap-2">
                <Settings size={20} />
                {t.generalSettings[language]}
              </h3>
              <button type="button" onClick={onClose} className="text-white hover:text-gray-200">
                <X size={24} />
              </button>
            </div>

            <div className="px-4 py-5 sm:p-6 overflow-y-auto">
              <div className="space-y-8">
                
                {/* Security Section */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                   <h4 className="flex items-center gap-2 font-bold text-gray-800 mb-4 border-b pb-2">
                     <Lock size={16} /> Securité & Contact
                   </h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Whatsapp Number */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">{t.whatsappNum[language]}</label>
                        <input
                          type="text"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          className="mt-1 focus:ring-mru-green focus:border-mru-green block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                          placeholder="222..."
                        />
                      </div>

                      {/* PIN Code */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">{t.adminPin[language]}</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={pin}
                          onChange={(e) => setPin(e.target.value)}
                          className="mt-1 focus:ring-mru-green focus:border-mru-green block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                      </div>
                   </div>
                </div>

                {/* Visual Identity Section */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                   <h4 className="flex items-center gap-2 font-bold text-gray-800 mb-4 border-b pb-2">
                     <Monitor size={16} /> {t.visualSettings[language]}
                   </h4>
                   
                   <div className="space-y-4">
                      {/* Store Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">{t.storeName[language]}</label>
                        <input
                          type="text"
                          value={content.storeName}
                          onChange={(e) => handleContentChange('storeName', e.target.value)}
                          className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                      </div>

                      {/* Hero Title */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase">{t.heroTitle[language]} (FR)</label>
                            <input
                              type="text"
                              value={content.heroTitle.fr}
                              onChange={(e) => handleDeepContentChange('heroTitle', 'fr', e.target.value)}
                              className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            />
                         </div>
                         <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase text-right" dir="rtl">{t.heroTitle[language]} (AR)</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={content.heroTitle.ar}
                              onChange={(e) => handleDeepContentChange('heroTitle', 'ar', e.target.value)}
                              className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            />
                         </div>
                      </div>

                      {/* Hero Subtitle */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase">{t.heroSubtitleLabel[language]} (FR)</label>
                            <input
                              type="text"
                              value={content.heroSubtitle.fr}
                              onChange={(e) => handleDeepContentChange('heroSubtitle', 'fr', e.target.value)}
                              className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            />
                         </div>
                         <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase text-right" dir="rtl">{t.heroSubtitleLabel[language]} (AR)</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={content.heroSubtitle.ar}
                              onChange={(e) => handleDeepContentChange('heroSubtitle', 'ar', e.target.value)}
                              className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            />
                         </div>
                      </div>

                       {/* Footer Text */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase">{t.footerText[language]} (FR)</label>
                            <input
                              type="text"
                              value={content.footerText.fr}
                              onChange={(e) => handleDeepContentChange('footerText', 'fr', e.target.value)}
                              className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            />
                         </div>
                         <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase text-right" dir="rtl">{t.footerText[language]} (AR)</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={content.footerText.ar}
                              onChange={(e) => handleDeepContentChange('footerText', 'ar', e.target.value)}
                              className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            />
                         </div>
                      </div>
                   </div>
                </div>

              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200 shrink-0">
              <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-mru-green text-base font-medium text-white hover:bg-[#144a14] focus:outline-none sm:ml-3 sm:w-auto sm:text-sm items-center gap-2">
                <Save size={18} />
                {t.saveSettings[language]}
              </button>
              <button type="button" onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                {t.cancel[language]}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsModal;
