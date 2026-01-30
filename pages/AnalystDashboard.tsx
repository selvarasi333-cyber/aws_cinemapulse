
import React, { useMemo, useEffect, useState } from 'react';
import { Feedback, Movie } from '../types';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, 
  LineChart, Line, CartesianGrid, AreaChart, Area
} from 'recharts';

interface AnalystDashboardProps {
  feedback: Feedback[];
  movies: Movie[];
  onBack: () => void;
}

export const AnalystDashboard: React.FC<AnalystDashboardProps> = ({ feedback, movies, onBack }) => {
  const [activeUsers, setActiveUsers] = useState(94);
  const [lastUpdate, setLastUpdate] = useState(0);

  useEffect(() => {
    const userInterval = setInterval(() => {
      setActiveUsers(prev => Math.max(80, Math.min(150, prev + (Math.random() > 0.5 ? 3 : -3))));
    }, 4000);
    
    const timeInterval = setInterval(() => {
      setLastUpdate(prev => (prev + 1) % 60);
    }, 1000);

    return () => {
      clearInterval(userInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const stats = useMemo(() => {
    const total = feedback.length;
    const avgRating = total ? (feedback.reduce((acc, curr) => acc + curr.rating, 0) / total).toFixed(1) : '0.0';
    
    const sentiments = {
      Positive: feedback.filter(f => f.sentiment === 'Positive').length,
      Neutral: feedback.filter(f => f.sentiment === 'Neutral').length,
      Negative: feedback.filter(f => f.sentiment === 'Negative').length,
    };
    
    const pieData = [
      { name: 'Positive', value: sentiments.Positive || 1, color: '#ec4899' },
      { name: 'Neutral', value: sentiments.Neutral || 1, color: '#a855f7' },
      { name: 'Negative', value: sentiments.Negative || 1, color: '#3b82f6' },
    ];

    // Generate timeline data
    const timelineData = Array.from({ length: 7 }).map((_, i) => {
      const day = new Date();
      day.setDate(day.getDate() - (6 - i));
      const count = feedback.filter(f => new Date(f.createdAt).toDateString() === day.toDateString()).length;
      return { 
        name: day.toLocaleDateString('en-US', { weekday: 'short' }), 
        count: count + Math.floor(Math.random() * 5) // Add some noise for "live" feel
      };
    });

    const dnaData = [
      { name: 'Youth', value: 72, color: '#ec4899' },
      { name: 'Family', value: 41, color: '#3b82f6' },
      { name: 'Critics', value: 88, color: '#a855f7' }
    ];

    return { total, avgRating, pieData, timelineData, dnaData };
  }, [feedback]);

  return (
    <div className="pt-24 min-h-screen pb-12 px-6 bg-grid">
      <div className="max-w-7xl mx-auto">
        {/* Live Status Strip */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="glass px-4 py-2 rounded-xl border-pink-500/20 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-widest text-pink-400">Live Feedback Stream: ON</span>
          </div>
          <div className="glass px-4 py-2 rounded-xl border-blue-500/20 flex items-center gap-2">
             <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Nodes Active: {activeUsers}</span>
          </div>
          <div className="glass px-4 py-2 rounded-xl border-purple-500/20 flex items-center gap-2">
             <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">Last Sync: {lastUpdate}s ago</span>
          </div>
        </div>

        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-5xl font-black mb-2 italic tracking-tighter">
              Insight <span className="text-pink-500 neon-text-pink">Lab</span>
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px]">Pattern Recognition Engine V4.2</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Live Metric Chips */}
          {[
            { label: 'Feedback Analyzed', val: stats.total * 10, color: 'text-pink-500', icon: '💬' },
            { label: 'Global Pulse', val: stats.avgRating, color: 'text-blue-500', icon: '⭐' },
            { label: 'Sentiment Index', val: '↑ 14%', color: 'text-green-500', icon: '📉' },
            { label: 'Real-time Nodes', val: activeUsers, color: 'text-purple-500', icon: '👥' },
          ].map((item, idx) => (
            <div key={idx} className="glass p-8 rounded-3xl border border-white/5 relative group hover:neon-border transition-all animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="absolute top-4 right-4 text-2xl opacity-20 group-hover:opacity-100 transition-opacity">{item.icon}</div>
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{item.label}</h4>
              <div className={`text-4xl font-black ${item.color} group-hover:scale-105 transition-transform origin-left`}>{item.val}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Sentiment Donut */}
          <div className="lg:col-span-1 glass p-8 rounded-[40px] border border-white/5 relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-pink-600/10 blur-[100px] group-hover:bg-pink-600/20 transition-all" />
            <h3 className="text-xl font-bold mb-8">Sentiment Pulse</h3>
            <div className="h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stats.pieData} innerRadius={70} outerRadius={100} paddingAngle={8} dataKey="value" stroke="none">
                    {stats.pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#020617', border: '1px solid #1e293b', borderRadius: '16px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                <span className="text-3xl font-black text-white">{Math.round((stats.pieData[0].value / (stats.total || 1)) * 100)}%</span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Positive</span>
              </div>
            </div>
          </div>

          {/* Timeline Intelligence */}
          <div className="lg:col-span-2 glass p-8 rounded-[40px] border border-white/5">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-xl font-bold">Timeline Intelligence</h3>
               <div className="flex gap-2">
                 <span className="w-2 h-2 rounded-full bg-pink-500" />
                 <span className="w-2 h-2 rounded-full bg-blue-500" />
               </div>
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.timelineData}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#020617', border: '1px solid #1e293b', borderRadius: '16px' }} />
                  <Area type="monotone" dataKey="count" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Audience DNA */}
          <div className="glass p-8 rounded-3xl border border-white/5">
            <h3 className="text-xl font-bold mb-8">Audience DNA</h3>
            <div className="space-y-6">
              {stats.dnaData.map((dna) => (
                <div key={dna.name}>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2 text-slate-400">
                    <span>{dna.name} Match</span>
                    <span>{dna.value}%</span>
                  </div>
                  <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${dna.value}%`, backgroundColor: dna.color, boxShadow: `0 0 10px ${dna.color}40` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Worked vs Failed */}
          <div className="glass p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-green-500/5 to-transparent">
             <h3 className="text-lg font-black mb-6 flex items-center gap-2 text-green-400 uppercase tracking-tighter">
               <span className="p-2 bg-green-500/20 rounded-lg">🔥</span> Success Factors
             </h3>
             <ul className="space-y-4">
                {[
                  { t: 'Action Choreography', d: 'Highly praised across all demographics' },
                  { t: 'Cinematography', d: 'Visual fidelity score in top 5%' },
                  { t: 'Pacing (1st Half)', d: 'Peak engagement observed' }
                ].map((item, idx) => (
                  <li key={idx} className="group cursor-default">
                    <p className="text-sm font-bold text-slate-200 group-hover:text-green-400 transition-colors">{item.t}</p>
                    <p className="text-[10px] text-slate-500">{item.d}</p>
                  </li>
                ))}
             </ul>
          </div>

          {/* Risk Radar */}
          <div className="glass p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-red-500/5 to-transparent">
             <h3 className="text-lg font-black mb-6 flex items-center gap-2 text-red-400 uppercase tracking-tighter">
               <span className="p-2 bg-red-500/20 rounded-lg">⚠️</span> Risk Radar
             </h3>
             <div className="space-y-4">
                <div className="p-4 glass border-red-500/20 rounded-2xl">
                   <p className="text-xs font-bold text-red-400 mb-1">Negative Sentiment Spike</p>
                   <p className="text-[10px] text-slate-500">Climax logic issues detected in last 200 reviews.</p>
                </div>
                <div className="p-4 glass border-orange-500/20 rounded-2xl">
                   <p className="text-xs font-bold text-orange-400 mb-1">Engagement Drop</p>
                   <p className="text-[10px] text-slate-500">Family segment engagement fell by 4% since Monday.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
