import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  confirmVariant?: 'primary' | 'danger';
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Konfirmasi',
  confirmVariant = 'primary'
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[101] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-[#111] w-full max-w-sm rounded-3xl p-8 shadow-2xl pointer-events-auto border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-black/5 dark:bg-white/5 rounded-2xl">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <button onClick={onClose} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-sm text-black/60 dark:text-white/60 mb-8 leading-relaxed">
                {message}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={onClose}
                  className="py-3 text-sm font-bold rounded-2xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  Batal
                </button>
                <button 
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`py-3 text-sm font-bold rounded-2xl transition-all ${
                    confirmVariant === 'danger' 
                      ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20' 
                      : 'bg-black text-white dark:bg-white dark:text-black hover:scale-[1.02]'
                  }`}
                >
                  {confirmText}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
