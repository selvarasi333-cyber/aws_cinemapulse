
import React, { useState, useMemo } from 'react';
import { Feedback, Movie, UserRole } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AdminDashboardProps {
  feedback: Feedback[];
  movies: Movie[];
  onDeleteFeedback: (id: string) => void;
  onBack: () => void;
  hiddenMovieIds: string[];
  featuredMovieIds: string[];
  onToggleHide: (id: string) => void;
  onToggleFeature: (id: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  feedback, movies, onDeleteFeedback, onBack,
  hiddenMovieIds, featuredMovieIds, onToggleHide, onToggleFeature
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'feedback' | 'movies'>('feedback');

  const filteredFeedback = feedback.filter(f => 
    f.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const roleActivityData = [
    { name: 'Users', count: 1240, color: '#3b82f6' },
    { name: 'Producers', count: 86, color: '#ec4899' },
    { name: 'Analysts', count: 42, color: '#a855f7' },
    { name: 'Admins', count: 4, color: '#f59e0b' }
  ];

  return (
    <div className="pt-24 min-h-screen pb-20 px-6 bg-grid">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
          <div>
            <h1 className="text-5xl font-black mb-2 flex items-center gap-4">
              <span className="p-4 bg-blue-600 rounded-3xl shadow-[0_0_30px_rgba(59,130,246,0.4)]">🛡️</span>
              Control <span className="text-blue-500">Center</span>
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px]">Auth Level: ROOT (OVERRIDE ENABLED)</p>
          </div>
          
          <div className="flex gap-4 items-center">
            <div className="glass px-6 py-4 rounded-3xl border-white/5 flex flex-col">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Security Status</span>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-xs font-bold text-green-500 uppercase">ENFORCED</span>
               </div>
            </div>
            <div className="glass px-6 py-4 rounded-3xl border-white/5 flex flex-col">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">API Latency</span>
               <span className="text-xs font-bold text-blue-400">14ms</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {/* Platform Health Overview */}
          {[
            { label: 'Total Citizens', val: '1.2K', sub: 'Users', color: 'text-blue-500' },
            { label: 'Cinematic Units', val: movies.length, sub: 'Movies', color: 'text-pink-500' },
            { label: 'Neural Logs', val: feedback.length, sub: 'Feedback', color: 'text-purple-500' },
            { label: 'Live Engagement', val: '312', sub: 'Active Today', color: 'text-orange-500' },
          ].map((s, idx) => (
            <div key={idx} className="glass p-8 rounded-[32px] border border-white/5 group hover:neon-border transition-all">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{s.label}</p>
               <p className={`text-4xl font-black mb-1 ${s.color}`}>{s.val}</p>
               <p className="text-[10px] text-slate-600 font-bold uppercase">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Role Activity Monitor */}
          <div className="lg:col-span-1 glass p-8 rounded-[40px] border border-white/5">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
               <span className="w-2 h-6 bg-purple-500 rounded-full" />
               Role Distribution
            </h3>
            <div className="h-[250px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={roleActivityData} layout="vertical" margin={{ left: -20 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ background: '#020617', border: '1px solid #1e293b', borderRadius: '16px' }} />
                    <Bar dataKey="count" radius={[0, 10, 10, 0]}>
                       {roleActivityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                      ))}
                    </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
          </div>

          {/* System Integrity & Logs */}
          <div className="lg:col-span-2 glass p-8 rounded-[40px] border border-white/5">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold">Security & Integrity</h3>
                <span className="text-[10px] font-black text-slate-500 tracking-widest">ENCRYPTION: AES-256 (SIM)</span>
             </div>
             <div className="space-y-4">
                {[
                  { msg: 'Unauthorized delete attempt blocked from IP 192.168.1.14', type: 'warning' },
                  { msg: 'System integrity check completed. No data corruption found.', type: 'safe' },
                  { msg: 'Producer "StudioX" accessed Vikram analytics (3m ago)', type: 'info' },
                  { msg: 'New movie "Suzume" deployed to Theatre grid.', type: 'info' }
                ].map((log, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 glass border-white/5 rounded-2xl group">
                     <div className={`w-2 h-2 rounded-full ${log.type === 'warning' ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : log.type === 'safe' ? 'bg-green-500' : 'bg-blue-500'}`} />
                     <p className="text-xs font-medium text-slate-400 group-hover:text-white transition-colors">{log.msg}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Interaction/Moderation Hub */}
        <div className="glass rounded-[40px] border border-white/10 overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-white/5 bg-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex gap-4">
                <button 
                  onClick={() => setActiveTab('feedback')}
                  className={`px-8 py-3 rounded-2xl font-black text-xs tracking-widest uppercase transition-all ${activeTab === 'feedback' ? 'bg-blue-600 shadow-xl' : 'glass border-white/5 hover:bg-white/5'}`}
                >
                  Feedback Hub
                </button>
                <button 
                  onClick={() => setActiveTab('movies')}
                  className={`px-8 py-3 rounded-2xl font-black text-xs tracking-widest uppercase transition-all ${activeTab === 'movies' ? 'bg-blue-600 shadow-xl' : 'glass border-white/5 hover:bg-white/5'}`}
                >
                  Movie Units
                </button>
             </div>
             <div className="relative w-full md:w-80">
                <input 
                  type="text" 
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-2xl px-12 py-3 outline-none focus:border-blue-500/50 transition-all font-medium text-sm"
                />
                <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
             </div>
          </div>

          <div className="overflow-x-auto">
            {activeTab === 'feedback' ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-white/5">
                    <th className="px-8 py-6">Origin</th>
                    <th className="px-8 py-6">Subject Unit</th>
                    <th className="px-8 py-6">Spam Index</th>
                    <th className="px-8 py-6">Content</th>
                    <th className="px-8 py-6 text-right">Moderation</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filteredFeedback.map((f) => (
                    <tr key={f.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-xs text-blue-400">
                            {f.userName[0]}
                          </div>
                          <p className="font-bold text-slate-200">{f.userName}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                         <p className="font-bold text-slate-400">{movies.find(m => m.id === f.movieId)?.title}</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          f.text.length < 10 ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'
                        }`}>
                          {f.text.length < 10 ? 'FLAGGED' : 'CLEAN'}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                         <p className="text-slate-500 truncate max-w-xs">{f.text}</p>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => onDeleteFeedback(f.id)}
                          className="p-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl transition-all shadow-lg active:scale-95"
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-white/5">
                    <th className="px-8 py-6">Movie Unit</th>
                    <th className="px-8 py-6">Category</th>
                    <th className="px-8 py-6">Status</th>
                    <th className="px-8 py-6 text-right">Unit Controls</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {movies.filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase())).map((m) => (
                    <tr key={m.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <img src={m.poster} className="w-8 h-12 rounded object-cover border border-white/10" />
                          <p className="font-bold text-slate-200">{m.title}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                         <p className="text-slate-400 font-bold">{m.category}</p>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex gap-2">
                          {featuredMovieIds.includes(m.id) && <span className="text-[10px] bg-yellow-500/20 text-yellow-500 font-black px-2 py-1 rounded">FEATURED</span>}
                          {hiddenMovieIds.includes(m.id) && <span className="text-[10px] bg-red-500/20 text-red-500 font-black px-2 py-1 rounded">HIDDEN</span>}
                          {!hiddenMovieIds.includes(m.id) && !featuredMovieIds.includes(m.id) && <span className="text-[10px] bg-blue-500/20 text-blue-500 font-black px-2 py-1 rounded">NORMAL</span>}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => onToggleFeature(m.id)}
                            className={`p-2 rounded-xl transition-all ${featuredMovieIds.includes(m.id) ? 'bg-yellow-500 text-black' : 'glass border-white/5 text-slate-400 hover:text-white'}`}
                          >
                            ⭐
                          </button>
                          <button 
                            onClick={() => onToggleHide(m.id)}
                            className={`p-2 rounded-xl transition-all ${hiddenMovieIds.includes(m.id) ? 'bg-red-500 text-white' : 'glass border-white/5 text-slate-400 hover:text-white'}`}
                          >
                            {hiddenMovieIds.includes(m.id) ? '👁️‍🗨️' : '🚫'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            
            {(activeTab === 'feedback' ? filteredFeedback : movies).length === 0 && (
              <div className="p-20 text-center">
                 <p className="text-slate-500 font-bold italic">No records found matching your override filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
