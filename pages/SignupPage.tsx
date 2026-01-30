
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface SignupPageProps {
  role: UserRole;
  onSignup: (user: User) => void;
  onBack: () => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ role, onSignup, onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      setError('Please use a valid @gmail.com address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSignup({
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role,
        notificationsEnabled: true,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-12">
      <div className="absolute top-8 left-8">
        <button onClick={onBack} className="text-slate-400 hover:text-white flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
      </div>

      <div className="w-full max-w-md">
        <div className="glass rounded-3xl p-10 border border-white/10 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black mb-2 tracking-tight">Join CinemaPulse</h2>
            <p className="text-slate-400">Create <span className="text-pink-500 font-bold uppercase">{role}</span> account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@gmail.com"
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all outline-none"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Password</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all outline-none"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm font-medium">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-pink-600 to-blue-600 rounded-xl font-bold text-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : 'Sign Up'}
            </button>
          </form>

          <div className="mt-8 text-center text-slate-500 text-sm">
            Already have an account? <button onClick={onBack} className="text-white font-bold hover:text-pink-500 transition-colors">Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
};
