
import React from 'react';
import { MOVIE_DATA } from '../constants';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  // 8 movies: 3 K-Drama, 3 English, 2 Tamil (mixed as requested)
  const mixedMovies = [
    ...MOVIE_DATA.filter(m => m.category === 'K-Drama').slice(0, 3),
    ...MOVIE_DATA.filter(m => m.category === 'English').slice(0, 3),
    ...MOVIE_DATA.filter(m => m.category === 'Tamil').slice(0, 2),
  ].sort(() => Math.random() - 0.5);

  return (
    <div className="relative min-h-screen pt-24">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <div className="mb-8 inline-block">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-pink-500 via-purple-600 to-blue-600 pulse-logo shadow-[0_0_50px_rgba(236,72,153,0.4)] flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
          Cinema<span className="text-pink-500 neon-text-pink">Pulse</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          Real-time customer feedback analysis for the next generation of cinema. Premium insights powered by AWS simulation.
        </p>

        <button 
          onClick={onGetStarted}
          className="group relative px-10 py-5 bg-gradient-to-r from-pink-600 to-blue-600 rounded-full font-bold text-xl transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] active:scale-95 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            Get Started 
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>

        {/* Featured Movies Section */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-left mb-8 flex items-center gap-3">
            <span className="w-8 h-1 bg-pink-500 rounded-full" />
            Trending Right Now
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mixedMovies.map((movie) => (
              <div 
                key={movie.id} 
                className="group relative aspect-[2/3] rounded-2xl overflow-hidden glass border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-default"
              >
                <img 
                  src={movie.poster} 
                  alt={movie.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-pink-500 px-2 py-1 glass rounded-md border border-pink-500/20 mb-2 inline-block">
                    {movie.category}
                  </span>
                  <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:neon-text-blue transition-all">
                    {movie.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
