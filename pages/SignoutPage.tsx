
import React from 'react';

interface SignoutPageProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const SignoutPage: React.FC<SignoutPageProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="max-w-md w-full glass rounded-[40px] p-12 border border-white/10 text-center shadow-2xl relative animate-scale-up">
        <div className="mb-8 relative inline-block">
          <div className="w-24 h-24 mx-auto rounded-full bg-slate-900 border border-pink-500/50 flex items-center justify-center text-4xl pulse-logo shadow-[0_0_30px_rgba(236,72,153,0.3)]">
            🎬
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-4 border-[#020617] animate-ping" />
        </div>

        <h2 className="text-3xl font-black mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Ready to leave?</h2>
        <p className="text-slate-400 mb-10 leading-relaxed">
          Your cinematic session will be cleared. You can always come back for more real-time pulse analytics!
        </p>

        <div className="space-y-4">
          <button 
            onClick={onConfirm}
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl font-bold text-lg hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Confirm Sign Out
          </button>
          <button 
            onClick={onCancel}
            className="w-full py-4 glass border-white/10 hover:bg-white/5 rounded-2xl font-bold text-slate-300 transition-all active:scale-95"
          >
            Stay in the Cinema
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-bounce [animation-delay:-0.3s]" />
          <div className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-bounce [animation-delay:-0.15s]" />
          <div className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-bounce" />
        </div>
      </div>
    </div>
  );
};
