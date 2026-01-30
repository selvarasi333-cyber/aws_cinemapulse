
import React from 'react';
import { UserRole } from '../types';

interface RoleSelectionPageProps {
  onSelect: (role: UserRole) => void;
  onBack: () => void;
}

export const RoleSelectionPage: React.FC<RoleSelectionPageProps> = ({ onSelect, onBack }) => {
  const roles = [
    { id: UserRole.USER, title: 'User', icon: '👤', color: 'from-blue-500 to-cyan-500' },
    { id: UserRole.PRODUCER, title: 'Producer', icon: '🎬', color: 'from-pink-500 to-rose-500' },
    { id: UserRole.ANALYST, title: 'Analyst', icon: '📊', color: 'from-purple-500 to-indigo-500' },
    { id: UserRole.ADMIN, title: 'Admin', icon: '🛡️', color: 'from-orange-500 to-amber-500' },
  ];

  return (
    <div className="min-h-screen pt-24 px-6 pb-12 flex flex-col items-center">
      <button onClick={onBack} className="self-start mb-8 text-slate-400 hover:text-white flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </button>

      <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">Choose Your Role</h2>
      <p className="text-slate-400 mb-12">Select your access level to enter the CinemaPulse ecosystem</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full">
        {roles.map((role) => (
          <div 
            key={role.id}
            className="group relative h-96 rounded-3xl overflow-hidden glass border border-white/5 transition-all hover:-translate-y-4 hover:neon-border flex flex-col items-center justify-center p-8 text-center"
          >
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${role.color}`} />
            
            <div className="w-24 h-24 rounded-full bg-slate-800/50 flex items-center justify-center text-4xl mb-6 shadow-inner transition-transform group-hover:scale-110">
              {role.icon}
            </div>
            
            <h3 className="text-2xl font-bold mb-2">{role.title}</h3>
            <p className="text-sm text-slate-500 mb-8">Access professional tools for {role.title.toLowerCase()} management and feedback tracking.</p>
            
            <div className="space-y-3 w-full">
              <button 
                onClick={() => onSelect(role.id)}
                className={`w-full py-3 rounded-xl bg-gradient-to-r ${role.color} font-bold text-white transition-all hover:opacity-90 active:scale-95`}
              >
                Login
              </button>
              <button 
                onClick={() => onSelect(role.id)}
                className="w-full py-3 rounded-xl border border-white/10 hover:bg-white/5 font-bold transition-all active:scale-95"
              >
                Sign Up
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
