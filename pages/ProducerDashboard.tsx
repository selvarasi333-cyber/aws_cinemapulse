
import React, { useState, useMemo } from 'react';
import { Feedback, Movie } from '../types';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';

interface ProducerDashboardProps {
  feedback: Feedback[];
  movies: Movie[];
  onBack: () => void;
}

export const ProducerDashboard: React.FC<ProducerDashboardProps> = ({ feedback, movies, onBack }) => {
  const [selectedId, setSelectedId] = useState<string>(movies[0].id);
  const [compareId, setCompareId] = useState<string | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const getMovieStats = (id: string) => {
    const movie = movies.find(m => m.id === id)!;
    const movieFeedback = feedback.filter(f => f.movieId === id);
    const total = movieFeedback.length;
    
    // Rule-based derived metrics
    const pos = movieFeedback.filter(f => f.sentiment === 'Positive').length;
    const lovePercentage = total ? Math.round((pos / total) * 100) : 0;
    const engagementScore = Math.min(100, (total * 12) + (lovePercentage / 2));
    
    // Simulated metadata (Rule-based)
    const releaseDays = Math.floor(Math.random() * 30) + 1;
    const budgetRange = movie.category === 'English' ? 'HIGH' : movie.category === 'Tamil' ? 'MEDIUM' : 'LOW';
    
    // Audience Split Data
    const audienceData = [
      { name: 'Youth', value: 40 + (lovePercentage / 4), color: '#ec4899' },
      { name: 'Family', value: 30 + (total % 20), color: '#3b82f6' },
      { name: 'Mass', value: 100 - (40 + (lovePercentage / 4)) - (30 + (total % 20)), color: '#a855f7' }
    ];

    // Performance Radar
    const performanceData = [
      { subject: 'Story', A: 60 + (pos % 40), fullMark: 100 },
      { subject: 'Music', A: 50 + (total % 50), fullMark: 100 },
      { subject: 'Visuals', A: 80 + (lovePercentage % 20), fullMark: 100 },
      { subject: 'Pacing', A: 40 + (pos % 60), fullMark: 100 },
      { subject: 'Acting', A: 70 + (total % 30), fullMark: 100 },
    ];

    // Risk Indicators
    const risks = {
      wom: lovePercentage < 40 ? 'HIGH' : 'LOW',
      viral: (total > 5 && lovePercentage > 70) ? 'EXCELLENT' : 'STABLE',
      fatigue: total > 20 ? 'MODERATE' : 'LOW'
    };

    return { 
      movie, total, lovePercentage, engagementScore, 
      releaseDays, budgetRange, audienceData, 
      performanceData, risks 
    };
  };

  const currentStats = useMemo(() => getMovieStats(selectedId), [selectedId, feedback]);
  const compareStats = useMemo(() => compareId ? getMovieStats(compareId) : null, [compareId, feedback]);

  const triggerAction = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3000);
  };

  const renderStatsCard = (stats: any, isSecondary = false) => (
    <div className={`space-y-8 animate-fade-in ${isSecondary ? 'border-l border-white/10 pl-8' : ''}`}>
      {/* Header Info */}
      <div className="glass p-8 rounded-[40px] border border-white/10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 text-right z-10">
          <div className="inline-flex flex-col items-end">
             <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Release Age</span>
             <span className="text-2xl font-black text-pink-500 neon-text-pink">Day {stats.releaseDays}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
          <div className="w-40 h-56 rounded-3xl overflow-hidden shadow-2xl border border-white/10 shrink-0 float-box">
            <img src={stats.movie.poster} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
               <span className="px-3 py-1 bg-pink-500/10 border border-pink-500/30 text-pink-500 text-[9px] font-black rounded-full uppercase tracking-widest">Urban Market</span>
               <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[9px] font-black rounded-full uppercase tracking-widest">Budget: {stats.budgetRange}</span>
               <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 text-[9px] font-black rounded-full uppercase tracking-widest">Target Match: 88%</span>
            </div>
            <h2 className="text-4xl font-black mb-2 italic tracking-tighter bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">{stats.movie.title}</h2>
            <p className="text-slate-400 text-sm italic font-medium mb-6">"{stats.movie.vibe}" Theme</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="glass bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                 <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Critics</p>
                 <p className="text-2xl font-black text-pink-500">{stats.lovePercentage}%</p>
              </div>
              <div className="glass bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                 <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Momentum</p>
                 <p className="text-2xl font-black text-blue-500">↑ High</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audience Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-8 rounded-[40px] border border-white/5 relative group">
          <h3 className="text-sm font-black mb-6 uppercase tracking-widest text-slate-500">Audience Split</h3>
          <div className="h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stats.audienceData} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">
                  {stats.audienceData.map((entry: any, index: number) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#020617', border: 'none', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-lg font-black text-white">DNA</span>
            </div>
          </div>
          <div className="flex justify-between mt-4">
             {stats.audienceData.map((d: any) => (
               <div key={d.name} className="text-center">
                  <div className="w-2 h-2 rounded-full mx-auto mb-1" style={{ backgroundColor: d.color }} />
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{d.name}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="glass p-8 rounded-[40px] border border-white/5">
          <h3 className="text-sm font-black mb-6 uppercase tracking-widest text-slate-500">Region Pulse</h3>
          <div className="space-y-4">
            {[
              { l: 'Metro Cities', v: 92, c: 'bg-pink-500' },
              { l: 'Tier-2 Hubs', v: 64, c: 'bg-blue-500' },
              { l: 'Rural Belt', v: 41, c: 'bg-purple-500' },
            ].map((r, i) => (
              <div key={i}>
                <div className="flex justify-between text-[10px] font-black mb-1 uppercase tracking-widest">
                  <span className="text-slate-400">{r.l}</span>
                  <span className="text-white">{r.v}%</span>
                </div>
                <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div className={`h-full ${r.c} transition-all duration-1000`} style={{ width: `${r.v}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Peak Activity</span>
             <div className="flex items-center gap-2 text-pink-500">
                <span className="text-sm">🌙</span>
                <span className="text-[10px] font-black">20:00 - 00:00</span>
             </div>
          </div>
        </div>
      </div>

      {/* Content Intelligence */}
      <div className="glass p-8 rounded-[40px] border border-white/5">
        <h3 className="text-sm font-black mb-8 uppercase tracking-widest text-slate-500">Content Performance Signals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
           <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={stats.performanceData}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: '900' }} />
                  <Radar name="Score" dataKey="A" stroke="#ec4899" fill="#ec4899" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
           </div>
           <div className="space-y-6">
              <div className="p-4 glass border-white/5 rounded-2xl">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Story Strength</p>
                 <p className="text-sm font-bold text-green-400">SOLID RETAINED</p>
              </div>
              <div className="p-4 glass border-white/5 rounded-2xl">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Action vs Emotion Balance</p>
                 <div className="flex gap-2 items-center mt-2">
                    <span className="text-[9px] font-black text-slate-400">ACT</span>
                    <div className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden flex">
                       <div className="h-full bg-pink-500" style={{ width: '70%' }} />
                       <div className="h-full bg-blue-500" style={{ width: '30%' }} />
                    </div>
                    <span className="text-[9px] font-black text-slate-400">EMO</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Risk & Opportunity Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className={`p-5 rounded-3xl border border-white/5 ${stats.risks.wom === 'HIGH' ? 'bg-red-500/10 border-red-500/20' : 'bg-green-500/5 border-green-500/20'}`}>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">WOM Risk</p>
            <p className={`text-lg font-black ${stats.risks.wom === 'HIGH' ? 'text-red-500' : 'text-green-500'}`}>{stats.risks.wom}</p>
         </div>
         <div className="p-5 rounded-3xl border border-white/5 bg-pink-500/5 border-pink-500/20">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Viral Potential</p>
            <p className="text-lg font-black text-pink-500">{stats.risks.viral}</p>
         </div>
         <div className="p-5 rounded-3xl border border-white/5 bg-blue-500/5 border-blue-500/20">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Repeat Watch</p>
            <p className="text-lg font-black text-blue-500">MODERATE</p>
         </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
         {[
           { l: 'Boost Social', m: 'Social campaign scaling queued...' },
           { l: 'Release BTS', m: 'Exclusive clips scheduled for 18:00' },
           { l: 'Push to OTT', m: 'Early OTT transition logic enabled' },
           { l: 'Hold Promo', m: 'Promotional pause active' }
         ].map((act, i) => (
           <button 
             key={i}
             onClick={() => triggerAction(act.m)}
             className="flex-1 min-w-[140px] py-4 glass border-white/10 hover:border-pink-500/50 hover:bg-pink-500/10 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all active:scale-95"
           >
             {act.l}
           </button>
         ))}
      </div>
    </div>
  );

  return (
    <div className="pt-24 min-h-screen pb-20 px-6 bg-grid">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
           <h1 className="text-4xl font-black flex items-center gap-4 italic tracking-tighter">
             <span className="p-3 bg-pink-500/20 rounded-2xl shadow-[0_0_20px_rgba(236,72,153,0.3)]">📽️</span>
             Production <span className="text-pink-500 neon-text-pink">Console</span>
           </h1>
           <button 
             onClick={() => { setIsComparing(!isComparing); setCompareId(null); }}
             className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${isComparing ? 'bg-blue-600 shadow-xl' : 'glass border-white/10 hover:bg-white/5'}`}
           >
             {isComparing ? 'Close Comparison' : 'Compare Units'}
           </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Movie Sidebar */}
          <div className="space-y-3 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2 mb-4">Unit Grid</h3>
            {movies.map((m) => (
              <div key={m.id} className="relative group">
                <button
                  onClick={() => {
                    if (isComparing && m.id !== selectedId) setCompareId(m.id);
                    else setSelectedId(m.id);
                  }}
                  className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all text-left border ${
                    (selectedId === m.id || compareId === m.id)
                      ? 'glass border-pink-500/50 bg-pink-500/10 shadow-[0_0_25px_rgba(236,72,153,0.2)]' 
                      : 'glass border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="relative overflow-hidden rounded-lg w-10 h-14 shrink-0">
                    <img src={m.poster} className="w-full h-full object-cover" />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-xs leading-tight text-slate-200 truncate">{m.title}</h4>
                    <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest mt-1">{m.category}</p>
                  </div>
                </button>
                {selectedId === m.id && (
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-pink-500 rounded-full shadow-[0_0_10px_#ec4899]" />
                )}
                {compareId === m.id && (
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
                )}
              </div>
            ))}
          </div>

          {/* Main Insights Area */}
          <div className={`${isComparing ? 'lg:col-span-4 grid grid-cols-1 lg:grid-cols-2 gap-12' : 'lg:col-span-3'}`}>
            {renderStatsCard(currentStats)}
            {isComparing && (
              compareStats ? renderStatsCard(compareStats, true) : (
                <div className="glass rounded-[40px] border border-dashed border-white/10 flex flex-col items-center justify-center p-20 text-center">
                   <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center text-4xl mb-6 animate-pulse">➕</div>
                   <h3 className="text-xl font-bold text-slate-400">Select Unit to Compare</h3>
                   <p className="text-sm text-slate-500 mt-2 tracking-wide uppercase font-black text-[10px]">Comparative analytics mode active</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Global Toast for Actions */}
      {actionMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] animate-bounce-in">
           <div className="glass px-10 py-5 rounded-3xl border border-pink-500/50 shadow-[0_0_50px_rgba(236,72,153,0.3)] bg-slate-950/90 backdrop-blur-3xl flex items-center gap-4">
              <span className="text-2xl">⚡</span>
              <p className="font-black text-white text-sm tracking-widest uppercase">{actionMessage}</p>
           </div>
        </div>
      )}
    </div>
  );
};
