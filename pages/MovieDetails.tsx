
import React, { useState, useEffect, useMemo } from 'react';
import { Movie, Feedback, User, UserRole } from '../types';

interface MovieDetailsProps {
  movie: Movie;
  feedback: Feedback[];
  currentUser: User;
  onBack: () => void;
  onSubmitFeedback: (movieId: string, rating: number, text: string) => void;
  onDeleteFeedback: (id: string) => void;
  onUpdateFeedback: (id: string, rating: number, text: string) => void;
}

const AnimatedCounter = ({ value, duration = 1000 }: { value: number, duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  return <span>{count}%</span>;
};

export const MovieDetails: React.FC<MovieDetailsProps> = ({ 
  movie, feedback, currentUser, onBack, onSubmitFeedback, onDeleteFeedback, onUpdateFeedback 
}) => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Sentiment calculation for the Pulse Meter
  const sentimentStats = useMemo(() => {
    const total = feedback.length;
    if (total === 0) return { loved: 60, mixed: 30, disliked: 10 }; // Default simulation values if no feedback
    const pos = feedback.filter(f => f.sentiment === 'Positive').length;
    const neu = feedback.filter(f => f.sentiment === 'Neutral').length;
    const neg = feedback.filter(f => f.sentiment === 'Negative').length;
    return {
      loved: Math.round((pos / total) * 100),
      mixed: Math.round((neu / total) * 100),
      disliked: Math.round((neg / total) * 100),
    };
  }, [feedback]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    if (editingId) {
      onUpdateFeedback(editingId, rating, text);
      setEditingId(null);
    } else {
      onSubmitFeedback(movie.id, rating, text);
    }
    setRating(0);
    setText('');
  };

  const handleEdit = (f: Feedback) => {
    setEditingId(f.id);
    setRating(f.rating);
    setText(f.text);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Grid boxes (Cast removed as it gets its own dedicated section)
  const infoBoxes = [
    { label: 'Director', value: movie.director, icon: '🎬' },
    { label: 'Hero', value: movie.hero, icon: '🦸‍♂️' },
    { label: 'Heroine', value: movie.heroine, icon: '💃' },
    { label: 'Vibe', value: movie.vibe, icon: '✨' },
    { label: 'Release Type', value: movie.releaseType, icon: '📺' },
  ];

  return (
    <div className="pt-24 min-h-screen pb-20 bg-grid">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Poster & Rating Form */}
          <div className="space-y-8">
            <div className="aspect-[2/3] rounded-3xl overflow-hidden glass border border-white/10 shadow-[0_0_30px_rgba(236,72,153,0.3)] animate-fade-in">
              <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
            </div>

            <div className="glass p-8 rounded-3xl border border-white/10 animate-slide-up shadow-xl">
              <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                <span className="text-pink-500">❤️</span>
                {editingId ? 'Update' : 'Write'} Feedback
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2 mb-4 bg-white/5 p-3 rounded-2xl justify-center">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button 
                      key={s} 
                      type="button" 
                      onClick={() => setRating(s)}
                      className={`text-2xl transition-all duration-300 ${rating >= s ? 'scale-125 drop-shadow-[0_0_12px_rgba(255,255,0,0.9)]' : 'grayscale opacity-20 hover:grayscale-0 hover:opacity-100'}`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
                <textarea 
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Share your cinematic journey..."
                  className="w-full h-32 bg-slate-900/50 border border-white/10 rounded-2xl p-4 outline-none focus:border-pink-500 transition-all font-medium text-sm"
                />
                <button 
                  type="submit" 
                  className="w-full py-4 bg-gradient-to-r from-pink-600 to-blue-600 rounded-2xl font-black hover:shadow-[0_0_25px_rgba(236,72,153,0.5)] transition-all active:scale-95 text-white tracking-widest uppercase text-xs"
                >
                  {editingId ? 'Update' : 'Post'} Review
                </button>
                {editingId && (
                  <button type="button" onClick={() => { setEditingId(null); setRating(0); setText(''); }} className="w-full text-slate-500 text-xs font-black uppercase tracking-widest hover:text-white transition-colors">Cancel Edit</button>
                )}
              </form>
            </div>
          </div>

          {/* Right: Info & Reviews */}
          <div className="lg:col-span-2 space-y-12">
            <div className="animate-fade-in">
              <span className="text-pink-500 font-black uppercase tracking-[0.3em] text-xs mb-3 block">{movie.category} • {movie.genre}</span>
              <h1 className="text-5xl md:text-7xl font-black mb-8 italic tracking-tighter bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
                {movie.title}
              </h1>

              {/* About Movie Section */}
              <div className="mb-8 glass p-8 rounded-[40px] border border-white/5 relative overflow-hidden group hover:border-pink-500/20 transition-all duration-500">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 blur-3xl rounded-full" />
                 <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-4">About Movie</h2>
                 <p className="text-slate-300 text-lg leading-relaxed font-medium">
                   {movie.description || "In this cinematic masterpiece, experience an emotional and visual journey that redefines modern storytelling. Every frame is crafted to resonate with the soul, bringing together star-power performances and legendary direction."}
                 </p>
              </div>

              {/* Refactored Cast & Crew Card */}
              <div className="mb-10 relative p-[1px] rounded-[40px] overflow-hidden group float-box transition-all duration-500 hover:shadow-[0_20px_60px_rgba(236,72,153,0.15)]">
                 <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-blue-500 opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
                 <div className="relative glass bg-[#020617]/95 rounded-[39px] p-8 transition-all duration-500 group-hover:-translate-y-2">
                    <div className="flex items-center gap-4 mb-6">
                       <div className="w-12 h-12 bg-pink-500/20 rounded-2xl flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                          👥
                       </div>
                       <div>
                          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Talent Grid</h2>
                          <h3 className="text-2xl font-black text-white italic tracking-tighter">Cast <span className="text-pink-500 neon-text-pink">&</span> Crew</h3>
                       </div>
                    </div>
                    <div className="p-6 bg-white/5 border border-white/5 rounded-3xl group-hover:border-pink-500/30 transition-all duration-500">
                       <p className="text-slate-200 text-xl font-black tracking-tight leading-relaxed">
                          {movie.cast}
                       </p>
                       <div className="mt-4 pt-4 border-t border-white/5 flex gap-6">
                          <div>
                             <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Director</p>
                             <p className="text-sm font-bold text-pink-400">{movie.director}</p>
                          </div>
                          <div>
                             <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Production</p>
                             <p className="text-sm font-bold text-blue-400">CinemaPulse Studios</p>
                          </div>
                       </div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 text-4xl opacity-0 group-hover:opacity-20 transition-opacity rotate-12">
                       ⭐
                    </div>
                 </div>
              </div>

              {/* Enhanced Audience Pulse Meter */}
              <div className="mb-12 glass p-8 rounded-[40px] border border-white/5 relative group transition-all duration-500 hover:neon-border hover:shadow-[0_0_40px_rgba(236,72,153,0.15)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-blue-500/5 opacity-50 pointer-events-none" />
                <h3 className="text-xl font-black mb-10 flex items-center gap-4 italic tracking-tight">
                  <span className="p-2 bg-pink-500/20 rounded-lg">💓</span>
                  Audience <span className="text-pink-500 neon-text-pink">Pulse Meter</span>
                </h3>
                
                <div className="space-y-8 relative z-10">
                  {/* Loved It Bar */}
                  <div className="group/bar">
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">😍</span>
                        <span className="text-xs font-black uppercase tracking-widest text-pink-400">Loved It</span>
                      </div>
                      <span className="text-2xl font-black text-pink-500 neon-text-pink">
                        <AnimatedCounter value={sentimentStats.loved} />
                      </span>
                    </div>
                    <div className="h-4 bg-slate-900/80 rounded-full border border-white/5 overflow-hidden group-hover/bar:border-pink-500/30 transition-all duration-300">
                      <div 
                        className="h-full bg-gradient-to-r from-pink-600 via-pink-400 to-rose-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(236,72,153,0.4)]"
                        style={{ width: `${sentimentStats.loved}%` }}
                      />
                    </div>
                  </div>

                  {/* Mixed Bar */}
                  <div className="group/bar">
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">😐</span>
                        <span className="text-xs font-black uppercase tracking-widest text-blue-400">Mixed Feelings</span>
                      </div>
                      <span className="text-2xl font-black text-blue-500 neon-text-blue">
                        <AnimatedCounter value={sentimentStats.mixed} />
                      </span>
                    </div>
                    <div className="h-4 bg-slate-900/80 rounded-full border border-white/5 overflow-hidden group-hover/bar:border-blue-500/30 transition-all duration-300">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                        style={{ width: `${sentimentStats.mixed}%` }}
                      />
                    </div>
                  </div>

                  {/* Disliked Bar */}
                  <div className="group/bar">
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">👎</span>
                        <span className="text-xs font-black uppercase tracking-widest text-slate-500">Disliked</span>
                      </div>
                      <span className="text-2xl font-black text-slate-400">
                        <AnimatedCounter value={sentimentStats.disliked} />
                      </span>
                    </div>
                    <div className="h-4 bg-slate-900/80 rounded-full border border-white/5 overflow-hidden group-hover/bar:border-white/10 transition-all duration-300">
                      <div 
                        className="h-full bg-gradient-to-r from-slate-700 via-slate-500 to-slate-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(148,163,184,0.3)]"
                        style={{ width: `${sentimentStats.disliked}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {infoBoxes.map((box, idx) => (
                  <div 
                    key={idx} 
                    className={`relative p-[1px] rounded-[32px] overflow-hidden group float-box animate-fade-in shadow-lg`}
                    style={{ animationDelay: `${idx * 0.15}s` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-600 opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative glass bg-[#020617]/95 rounded-[31px] p-6 h-full transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_15px_35px_rgba(236,72,153,0.3)]">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                          {box.icon}
                        </div>
                        <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest">{box.label}</span>
                      </div>
                      <p className="font-black text-lg text-slate-200 group-hover:text-pink-400 transition-colors line-clamp-2">
                        {box.value}
                      </p>
                      <div className="absolute bottom-4 right-4 text-xs opacity-0 group-hover:opacity-40 group-hover:animate-ping text-pink-500">
                        ❤️
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8 mt-12">
              <h2 className="text-3xl font-black flex items-center gap-4 italic tracking-tight">
                <span className="w-3 h-10 bg-gradient-to-b from-pink-500 to-blue-600 rounded-full" />
                Audience <span className="text-pink-500 neon-text-pink">Feedback</span>
              </h2>
              {feedback.length === 0 ? (
                <div className="glass p-16 text-center rounded-[40px] border border-dashed border-white/10">
                  <span className="text-4xl mb-4 block opacity-50">🍿</span>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Be the first to voice your opinion!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {feedback.map((f) => (
                    <div key={f.id} className="glass p-8 rounded-[35px] border border-white/5 group hover:border-pink-500/20 transition-all duration-500 hover:shadow-2xl">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center font-black text-xl text-pink-500 border border-white/10 group-hover:neon-border transition-all">
                            {f.userName[0]}
                          </div>
                          <div>
                            <h4 className="font-black text-lg text-slate-100">{f.userName}</h4>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center text-xs tracking-tighter">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <span key={i} className={i < f.rating ? 'text-yellow-400' : 'text-slate-700'}>★</span>
                                ))}
                              </div>
                              <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest border ${
                                f.sentiment === 'Positive' ? 'border-green-500/30 bg-green-500/10 text-green-500' :
                                f.sentiment === 'Negative' ? 'border-red-500/30 bg-red-500/10 text-red-500' : 'border-blue-500/30 bg-blue-500/10 text-blue-500'
                              }`}>
                                {f.sentiment}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {(currentUser.id === f.userId || currentUser.role === UserRole.ADMIN) && (
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                              {currentUser.id === f.userId && (
                                <button onClick={() => handleEdit(f)} className="p-3 glass hover:bg-white/10 rounded-xl text-slate-400 hover:text-blue-400 transition-all">
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                </button>
                              )}
                              <button onClick={() => onDeleteFeedback(f.id)} className="p-3 glass hover:bg-white/10 rounded-xl text-slate-400 hover:text-red-400 transition-all">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </div>
                          )}
                          <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">{new Date(f.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed font-medium pl-18 group-hover:text-slate-200 transition-colors">{f.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
