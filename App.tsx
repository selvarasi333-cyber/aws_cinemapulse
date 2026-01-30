
import React, { useState, useEffect, useMemo } from 'react';
import { User, UserRole, Movie, Feedback, Notification, AppState } from './types';
import { MOVIE_DATA, FUNNY_MESSAGES } from './constants';
import { LandingPage } from './pages/LandingPage';
import { RoleSelectionPage } from './pages/RoleSelectionPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { UserHome } from './pages/UserHome';
import { MovieDetails } from './pages/MovieDetails';
import { AnalystDashboard } from './pages/AnalystDashboard';
import { ProducerDashboard } from './pages/ProducerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { StaticPage } from './pages/StaticPage';
import { SignoutPage } from './pages/SignoutPage';
import { Navbar } from './components/Navbar';

// API Bridge Configuration
const API_BASE = 'http://localhost:5000/api';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [previousPage, setPreviousPage] = useState<string>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [loginRole, setLoginRole] = useState<UserRole | null>(null);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [hiddenMovieIds, setHiddenMovieIds] = useState<string[]>([]);
  const [featuredMovieIds, setFeaturedMovieIds] = useState<string[]>([]);
  const [popup, setPopup] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  // Sync with Backend (with graceful local fallback)
  const syncData = async () => {
    try {
      const response = await fetch(`${API_BASE}/feedback`);
      if (response.ok) {
        const data = await response.json();
        // Mapping Snake Case to Camel Case from Python to React
        const mappedData = data.map((f: any) => ({
          ...f,
          movieId: f.movie_id,
          userId: f.user_id,
          userName: f.user_name,
          createdAt: f.created_at
        }));
        setFeedback(mappedData);
      }
    } catch (e) {
      console.warn("Backend not detected. Operating in high-performance simulation mode.");
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('cinemaPulse_user');
    const savedHidden = localStorage.getItem('cinemaPulse_hidden');
    const savedFeatured = localStorage.getItem('cinemaPulse_featured');

    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    if (savedHidden) setHiddenMovieIds(JSON.parse(savedHidden));
    if (savedFeatured) setFeaturedMovieIds(JSON.parse(savedFeatured));

    syncData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('cinemaPulse_user', JSON.stringify(currentUser));
      if (currentUser.role === UserRole.USER && currentPage === 'landing') setCurrentPage('user-home');
    } else {
      localStorage.removeItem('cinemaPulse_user');
    }
  }, [currentUser, currentPage]);

  useEffect(() => {
    localStorage.setItem('cinemaPulse_feedback', JSON.stringify(feedback));
    localStorage.setItem('cinemaPulse_hidden', JSON.stringify(hiddenMovieIds));
    localStorage.setItem('cinemaPulse_featured', JSON.stringify(featuredMovieIds));
  }, [feedback, hiddenMovieIds, featuredMovieIds]);

  const handleLogin = async (user: User) => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, role: user.role })
      });
      // Even if API fails, we proceed with simulation login to prevent "blank screen"
      if (!res.ok) console.warn("Backend login failed. Falling back to simulation session.");
    } catch (e) {}

    setCurrentUser(user);
    if (user.role === UserRole.USER) navigateTo('user-home');
    else if (user.role === UserRole.ANALYST) navigateTo('analyst-dashboard');
    else if (user.role === UserRole.PRODUCER) navigateTo('producer-dashboard');
    else if (user.role === UserRole.ADMIN) navigateTo('admin-dashboard');
  };

  const handleSignout = () => {
    setCurrentUser(null);
    setCurrentPage('landing');
  };

  const handleUpdateUser = (updatedUser: Partial<User>) => {
    if (!currentUser) return;
    const newUserData = { ...currentUser, ...updatedUser };
    setCurrentUser(newUserData);
  };

  const navigateTo = (page: string) => {
    setPreviousPage(currentPage);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitFeedback = async (movieId: string, rating: number, text: string) => {
    if (!currentUser) return;
    const sentiment = rating >= 4 ? 'Positive' : rating === 3 ? 'Neutral' : 'Negative';
    const newFeedback: Feedback = {
      id: Math.random().toString(36).substr(2, 9),
      movieId,
      userId: currentUser.id,
      userName: currentUser.name,
      rating,
      text,
      createdAt: new Date().toISOString(),
      sentiment
    };

    // UI Optimistic Update
    setFeedback([newFeedback, ...feedback]);
    
    // Backend Persistent Update
    try {
      await fetch(`${API_BASE}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFeedback)
      });
    } catch (e) {}

    const msg = FUNNY_MESSAGES[Math.floor(Math.random() * FUNNY_MESSAGES.length)];
    setPopup({ message: msg, visible: true });
    setTimeout(() => setPopup({ ...popup, visible: false }), 3000);
  };

  const deleteFeedback = async (feedbackId: string) => {
    setFeedback(feedback.filter(f => f.id !== feedbackId));
    try {
      await fetch(`${API_BASE}/feedback/${feedbackId}`, { method: 'DELETE' });
    } catch (e) {}
  };

  const updateFeedback = async (feedbackId: string, rating: number, text: string) => {
    const sentiment = rating >= 4 ? 'Positive' : rating === 3 ? 'Neutral' : 'Negative';
    setFeedback(feedback.map(f => f.id === feedbackId ? { ...f, rating, text, sentiment } : f));
    try {
      await fetch(`${API_BASE}/feedback/${feedbackId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, text, sentiment })
      });
    } catch (e) {}
  };

  const toggleHideMovie = (id: string) => {
    setHiddenMovieIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleFeatureMovie = (id: string) => {
    setFeaturedMovieIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={() => navigateTo('role-selection')} />;
      case 'role-selection':
        return <RoleSelectionPage 
                  onSelect={(role) => { setLoginRole(role); navigateTo('login'); }} 
                  onBack={() => navigateTo('landing')} 
                />;
      case 'login':
        return <LoginPage 
                  role={loginRole!} 
                  onLogin={handleLogin} 
                  onSignup={() => navigateTo('signup')} 
                  onBack={() => navigateTo('role-selection')} 
                />;
      case 'signup':
        return <SignupPage 
                  role={loginRole!} 
                  onSignup={handleLogin} 
                  onBack={() => navigateTo('login')} 
                />;
      case 'user-home':
        return <UserHome 
                  movies={MOVIE_DATA.filter(m => !hiddenMovieIds.includes(m.id))} 
                  onMovieSelect={(id) => { setSelectedMovieId(id); navigateTo('movie-details'); }} 
                  featuredIds={featuredMovieIds}
                />;
      case 'movie-details':
        return <MovieDetails 
                  movie={MOVIE_DATA.find(m => m.id === selectedMovieId)!} 
                  feedback={feedback.filter(f => f.movieId === selectedMovieId)}
                  currentUser={currentUser!}
                  onBack={() => navigateTo('user-home')}
                  onSubmitFeedback={submitFeedback}
                  onDeleteFeedback={deleteFeedback}
                  onUpdateFeedback={updateFeedback}
                />;
      case 'analyst-dashboard':
        return <AnalystDashboard feedback={feedback} movies={MOVIE_DATA} onBack={() => navigateTo('landing')} />;
      case 'producer-dashboard':
        return <ProducerDashboard feedback={feedback} movies={MOVIE_DATA} onBack={() => navigateTo('landing')} />;
      case 'admin-dashboard':
        return <AdminDashboard 
                  feedback={feedback} 
                  movies={MOVIE_DATA} 
                  onDeleteFeedback={deleteFeedback} 
                  onBack={() => navigateTo('landing')}
                  hiddenMovieIds={hiddenMovieIds}
                  featuredMovieIds={featuredMovieIds}
                  onToggleHide={toggleHideMovie}
                  onToggleFeature={toggleFeatureMovie}
                />;
      case 'signout':
        return <SignoutPage onConfirm={handleSignout} onCancel={() => navigateTo(previousPage)} />;
      case 'contact':
      case 'help-center':
      case 'privacy':
      case 'terms':
        return <StaticPage type={currentPage as any} onBack={() => navigateTo(previousPage)} />;
      default:
        return <LandingPage onGetStarted={() => navigateTo('role-selection')} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-pink-500/30">
      {currentUser && currentPage !== 'signout' && (
        <Navbar 
          user={currentUser} 
          onSignout={() => navigateTo('signout')} 
          onUpdateUser={handleUpdateUser}
          onHome={() => {
            if (currentUser.role === UserRole.USER) navigateTo('user-home');
            else if (currentUser.role === UserRole.ADMIN) navigateTo('admin-dashboard');
            else if (currentUser.role === UserRole.ANALYST) navigateTo('analyst-dashboard');
            else if (currentUser.role === UserRole.PRODUCER) navigateTo('producer-dashboard');
          }}
          onBack={() => {
            if (currentPage === 'movie-details') navigateTo('user-home');
            else navigateTo('landing');
          }}
        />
      )}
      
      <main className="transition-all duration-500">
        {renderPage()}
      </main>

      {popup.visible && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] animate-bounce">
          <div className="glass px-8 py-4 rounded-2xl neon-border border-pink-500 flex items-center gap-3 shadow-[0_0_30px_rgba(236,72,153,0.4)]">
            <span className="text-2xl">❤️</span>
            <p className="text-lg font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              {popup.message}
            </p>
          </div>
        </div>
      )}

      {(currentPage === 'landing' || currentPage === 'user-home' || ['contact', 'help-center', 'privacy', 'terms'].includes(currentPage)) && (
        <footer className="py-12 border-t border-white/5 bg-slate-950/50">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <button onClick={() => navigateTo('landing')} className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-blue-500 pulse-logo group-hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-all" />
                <span className="text-xl font-bold tracking-tight">CinemaPulse</span>
              </button>
            </div>
            <div className="flex gap-8 text-slate-400 text-sm">
              <button onClick={() => navigateTo('contact')} className="hover:text-pink-500 transition-colors">Contact</button>
              <button onClick={() => navigateTo('help-center')} className="hover:text-pink-500 transition-colors">Help Center</button>
              <button onClick={() => navigateTo('privacy')} className="hover:text-pink-500 transition-colors">Privacy</button>
              <button onClick={() => navigateTo('terms')} className="hover:text-pink-500 transition-colors">Terms</button>
            </div>
            <div className="text-slate-500 text-xs">
              © 2024 CinemaPulse. All rights reserved. (Concept Simulation)
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
