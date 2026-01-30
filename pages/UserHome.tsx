
import React, { useState } from 'react';
import { Movie } from '../types';

interface UserHomeProps {
  movies: Movie[];
  onMovieSelect: (id: string) => void;
  featuredIds: string[];
}

export const UserHome: React.FC<UserHomeProps> = ({ movies, onMovieSelect, featuredIds }) => {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', 'Tamil', 'English', 'K-Drama', 'Animation'];

  const filteredMovies = filter === 'All' 
    ? movies 
    : filter === 'Animation' 
      ? movies.filter(m => m.category === 'Animation' || m.genre.includes('Animation'))
      : movies.filter(m => m.category === filter);

  // Sort featured movies to top
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (featuredIds.includes(a.id) && !featuredIds.includes(b.id)) return -1;
    if (!featuredIds.includes(a.id) && featuredIds.includes(b.id)) return 1;
    return 0;
  });

  return (
    <div className="pt-28 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
              Welcome Back, Critic!
              <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            </h2>
            <p className="text-slate-400">Discover and rate the latest blockbusters across the globe.</p>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
                  filter === cat 
                    ? 'bg-pink-600 shadow-[0_0_15px_rgba(236,72,153,0.5)]' 
                    : 'glass border-white/5 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {sortedMovies.map((movie) => (
            <div 
              key={movie.id}
              onClick={() => onMovieSelect(movie.id)}
              className="group cursor-pointer relative"
            >
              {featuredIds.includes(movie.id) && (
                <div className="absolute -top-2 -right-2 z-10 p-1.5 bg-yellow-500 text-black text-[8px] font-black rounded-lg shadow-xl animate-bounce">
                  FEATURED
                </div>
              )}
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden glass border border-white/10 mb-4 transition-all group-hover:-translate-y-2 group-hover:neon-border duration-300">
                <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-3 right-3 glass px-2 py-1 rounded-lg text-xs font-black flex items-center gap-1">
                  ⭐ {movie.rating}
                </div>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  <button className="w-full py-2 bg-white text-slate-950 font-black rounded-xl text-sm shadow-xl active:scale-95 transition-transform">
                    Rate Now
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-slate-200 line-clamp-1 group-hover:text-pink-500 transition-colors">{movie.title}</h3>
              <p className="text-xs text-slate-500 font-medium">{movie.genre}</p>
            </div>
          ))}
        </div>
        {sortedMovies.length === 0 && (
          <div className="text-center py-20 glass rounded-3xl border border-white/5">
            <p className="text-slate-500 italic">No movies available in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
