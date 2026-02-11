import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';
import { t } from '../translations';
import { Language } from '../types';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (pin: string) => boolean;
  language: Language;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onLogin, language }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(pin);
    if (success) {
      setPin('');
      setError(false);
      onClose();
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-900 opacity-80"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-start overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-mru-green/10 sm:mx-0 sm:h-10 sm:w-10">
                <Lock className="h-6 w-6 text-mru-green" aria-hidden="true" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-start w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {t.admin[language]}
                </h3>
                <div className="mt-4">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="password"
                      inputMode="numeric"
                      value={pin}
                      onChange={(e) => {
                        setPin(e.target.value);
                        setError(false);
                      }}
                      placeholder={t.enterPin[language]}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 text-center text-xl tracking-widest focus:ring-mru-green focus:border-mru-green"
                      autoFocus
                    />
                    {error && (
                      <p className="text-red-600 text-sm mt-2">{t.accessDenied[language]}</p>
                    )}
                    <button
                      type="submit"
                      className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-mru-green text-base font-medium text-white hover:bg-[#144a14] focus:outline-none sm:text-sm"
                    >
                      {t.login[language]}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              {t.cancel[language]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginModal;