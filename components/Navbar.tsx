
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface NavbarProps {
  user: User;
  onSignout: () => void;
  onUpdateUser: (updatedUser: Partial<User>) => void;
  onHome: () => void;
  onBack: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onSignout, onUpdateUser, onHome, onBack }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [notifOn, setNotifOn] = useState(user.notificationsEnabled);

  const handleUpdatePhoto = () => {
    const url = prompt('Enter a new profile image URL (Unsplash or direct link):');
    if (url) {
      onUpdateUser({ photo: url });
      setShowSettings(false);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ name: editName, email: editEmail });
    setShowEditModal(false);
    setShowSettings(false);
  };

  const toggleNotifs = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = !notifOn;
    setNotifOn(newState);
    onUpdateUser({ notificationsEnabled: newState });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] glass border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <button onClick={onHome} className="flex items-center gap-3 hover:scale-105 transition-transform">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-blue-600 pulse-logo shadow-[0_0_20px_rgba(236,72,153,0.5)]" />
            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent italic">
              CinemaPulse
            </span>
          </button>
          <button onClick={onBack} className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-bold text-white leading-none">{user.name}</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-pink-500 font-black mt-1">{user.role}</span>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="w-10 h-10 rounded-full border-2 border-pink-500/50 p-0.5 hover:border-pink-500 transition-all overflow-hidden flex items-center justify-center bg-slate-900"
            >
              <img 
                src={user.photo || `https://ui-avatars.com/api/?name=${user.name}&background=ec4899&color=fff`} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover" 
              />
            </button>

            {showSettings && (
              /* Added bg-slate-950/95 to prevent visual bleed-through seen in user screenshot */
              <div className="absolute right-0 mt-4 w-72 bg-slate-950/95 backdrop-blur-2xl rounded-[32px] border border-white/20 p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,1)] animate-fade-in z-[110]">
                <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 to-transparent rounded-[32px] pointer-events-none" />
                
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 relative">Settings & Profile</h4>
                
                <div className="space-y-4 relative">
                  <div className="flex items-center justify-between gap-4 p-3 hover:bg-white/5 rounded-2xl transition-colors cursor-pointer" onClick={toggleNotifs}>
                    <span className="text-xs font-bold text-slate-200">Notifications</span>
                    <button 
                      className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${notifOn ? 'bg-pink-600 shadow-[0_0_10px_rgba(236,72,153,0.5)]' : 'bg-slate-700'}`}
                    >
                      <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 ${notifOn ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div className="h-px bg-white/10" />

                  <button 
                    onClick={handleUpdatePhoto}
                    className="text-xs font-bold text-slate-200 hover:text-white w-full text-left p-3 hover:bg-white/5 rounded-2xl transition-all flex items-center gap-3"
                  >
                    <span className="text-lg">📸</span> Update Photo
                  </button>
                  
                  <button 
                    onClick={() => { setShowEditModal(true); setShowSettings(false); }}
                    className="text-xs font-bold text-slate-200 hover:text-white w-full text-left p-3 hover:bg-white/5 rounded-2xl transition-all flex items-center gap-3"
                  >
                    <span className="text-lg">✏️</span> Edit Profile
                  </button>

                  <div className="pt-4 border-t border-white/10">
                    <button 
                      onClick={() => { setShowSettings(false); onSignout(); }} 
                      className="text-xs text-rose-400 hover:text-rose-300 font-black w-full text-left p-3 hover:bg-rose-500/10 rounded-2xl flex items-center gap-3 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Profile Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setShowEditModal(false)} />
          <div className="relative glass w-full max-w-md rounded-[40px] border border-white/10 p-10 shadow-2xl animate-scale-up overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-pink-600/10 blur-[100px] rounded-full" />
            
            <div className="absolute top-0 right-0 p-8 z-10">
              <button onClick={() => setShowEditModal(false)} className="text-slate-500 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="text-center mb-8 relative">
              <div className="w-20 h-20 mx-auto rounded-full border-2 border-pink-500/30 p-1 mb-4">
                <img 
                  src={user.photo || `https://ui-avatars.com/api/?name=${user.name}&background=ec4899&color=fff`} 
                  alt="Avatar" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-black italic">Edit <span className="text-pink-500 neon-text-pink">Profile</span></h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Update your cinematic identity</p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6 relative">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Display Name</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-pink-500/50 transition-all font-bold text-white shadow-inner"
                  placeholder="Enter Name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-pink-500/50 transition-all font-bold text-white shadow-inner"
                  placeholder="name@gmail.com"
                  required
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full py-5 bg-gradient-to-r from-pink-600 to-blue-600 rounded-2xl font-black text-lg hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all active:scale-95 group overflow-hidden relative"
                >
                  <span className="relative z-10">Save Changes</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
