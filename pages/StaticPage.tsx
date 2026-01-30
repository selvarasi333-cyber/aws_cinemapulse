
import React from 'react';

interface StaticPageProps {
  type: 'contact' | 'help-center' | 'privacy' | 'terms';
  onBack: () => void;
}

export const StaticPage: React.FC<StaticPageProps> = ({ type, onBack }) => {
  const renderContent = () => {
    switch (type) {
      case 'contact':
        return (
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black mb-6 bg-gradient-to-r from-white to-pink-500 bg-clip-text text-transparent">Connect with CinemaPulse</h1>
            <p className="text-slate-400 mb-12 text-lg">Have a suggestion or facing a technical glitch? Our cinematic support team is here for you.</p>
            
            <div className="glass p-10 rounded-3xl border border-white/10 shadow-2xl">
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully! (Simulation)'); onBack(); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Your Name</label>
                    <input type="text" required className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-pink-500/50 outline-none" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Email Address</label>
                    <input type="email" required className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-pink-500/50 outline-none" placeholder="john@gmail.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Subject</label>
                  <input type="text" required className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-pink-500/50 outline-none" placeholder="Feedback / Inquiry" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Message</label>
                  <textarea required className="w-full h-40 bg-slate-900/50 border border-white/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-pink-500/50 outline-none resize-none" placeholder="Type your message here..."></textarea>
                </div>
                <button type="submit" className="w-full py-5 bg-gradient-to-r from-pink-600 to-blue-600 rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all active:scale-95">Send Cinematic Pulse</button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="glass p-6 rounded-2xl border border-white/5 text-center">
                <span className="text-2xl mb-2 block">📍</span>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">HQ</p>
                <p className="text-sm font-bold">Cinema Lane, LA</p>
              </div>
              <div className="glass p-6 rounded-2xl border border-white/5 text-center">
                <span className="text-2xl mb-2 block">📧</span>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Email</p>
                <p className="text-sm font-bold">pulse@cinemapulse.com</p>
              </div>
              <div className="glass p-6 rounded-2xl border border-white/5 text-center">
                <span className="text-2xl mb-2 block">📱</span>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Social</p>
                <p className="text-sm font-bold">@CinemaPulse</p>
              </div>
            </div>
          </div>
        );
      case 'help-center':
        return (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-black mb-4">Support Hub</h1>
            <p className="text-slate-400 mb-12">Find answers to common questions about our feedback simulation ecosystem.</p>
            
            <div className="space-y-4">
              {[
                { q: "How do I submit movie feedback?", a: "Once you log in as a User, select any movie from your home feed. Scroll to the feedback section, pick a star rating, write your thoughts, and hit 'Post Review'!" },
                { q: "Can I edit my feedback later?", a: "Yes! You have full control over your own reviews. Simply go back to the movie details page, find your comment, and click the edit icon." },
                { q: "What is the Analyst Dashboard?", a: "The Analyst Dashboard is a premium tool for data-driven professionals to monitor real-time audience sentiments, genre performance, and engagement trends." },
                { q: "Is CinemaPulse free to use?", a: "CinemaPulse is a concept simulation platform designed for high-end OTT feedback analysis demonstration." },
                { q: "How do roles work?", a: "There are four roles: User (audience), Producer (strategic insights), Analyst (data trends), and Admin (moderation and system control)." }
              ].map((faq, idx) => (
                <div key={idx} className="glass p-8 rounded-3xl border border-white/5 hover:border-pink-500/30 transition-all group">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-500 flex items-center justify-center text-xs font-black">Q</span>
                    {faq.q}
                  </h3>
                  <p className="text-slate-400 leading-relaxed pl-9">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'privacy':
        return (
          <div className="max-w-3xl mx-auto prose prose-invert">
            <h1 className="text-5xl font-black mb-8">Privacy Policy</h1>
            <p className="text-pink-500 font-bold mb-8">Last Updated: October 2024</p>
            
            <div className="glass p-10 rounded-3xl border border-white/5 space-y-8 text-slate-300">
              <section>
                <h3 className="text-white font-bold text-xl mb-4">1. Information We Simulate</h3>
                <p>We take your imaginary privacy seriously. On CinemaPulse, we only collect data that helps improve the simulation experience, including your simulated name, email address, and role-based activity logs.</p>
              </section>
              <section>
                <h3 className="text-white font-bold text-xl mb-4">2. How Your Data is Used</h3>
                <p>Data gathered during your sessions is used to calculate the real-time analytics seen on the Producer and Analyst dashboards. This data never leaves the local browser environment in this concept build.</p>
              </section>
              <section>
                <h3 className="text-white font-bold text-xl mb-4">3. Data Security</h3>
                <p>Your passwords are simulated and stored locally. We use glassmorphism encryption (metaphorically) to ensure that your cinematic journey remains yours and yours alone.</p>
              </section>
              <section>
                <h3 className="text-white font-bold text-xl mb-4">4. Third-Party Access</h3>
                <p>CinemaPulse does not sell your data to movie theaters, streaming giants, or popcorn vendors. This is a strictly controlled feedback simulation environment.</p>
              </section>
            </div>
          </div>
        );
      case 'terms':
        return (
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black mb-8 bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent">Terms of Service</h1>
            <p className="text-blue-500 font-bold mb-12">Comprehensive Framework for Professional Cinematic Analysis</p>
            
            <div className="space-y-8 text-slate-300">
              {/* User Rules */}
              <div className="glass p-8 rounded-3xl border border-white/10 border-l-4 border-l-blue-500">
                <h3 className="text-white font-black text-xl mb-4 flex items-center gap-3">
                  <span className="text-2xl">👤</span> 1. User Responsibilities
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-sm text-slate-400">
                  <li>Users must provide authentic, constructive feedback based on personal viewing experience.</li>
                  <li>Spamming, offensive language, or commercially motivated ratings are strictly prohibited.</li>
                  <li>Users retain the right to edit or delete their own feedback at any time.</li>
                  <li>Account sharing is permitted only for simulated familial environments.</li>
                </ul>
              </div>

              {/* Producer Rules */}
              <div className="glass p-8 rounded-3xl border border-white/10 border-l-4 border-l-pink-500">
                <h3 className="text-white font-black text-xl mb-4 flex items-center gap-3">
                  <span className="text-2xl">🎬</span> 2. Producer Guidelines
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-sm text-slate-400">
                  <li>Producers access aggregate data to drive strategic production decisions.</li>
                  <li>Attempting to manipulate user ratings or purchase fake sentiment is against the platform's core ethics.</li>
                  <li>ROI projections provided in dashboards are simulated and should not be used for real-world financial commitments.</li>
                  <li>Producers must respect audience privacy and only use anonymized sentiment metrics.</li>
                </ul>
              </div>

              {/* Analyst Rules */}
              <div className="glass p-8 rounded-3xl border border-white/10 border-l-4 border-l-purple-500">
                <h3 className="text-white font-black text-xl mb-4 flex items-center gap-3">
                  <span className="text-2xl">📊</span> 3. Analyst Code of Conduct
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-sm text-slate-400">
                  <li>Analysts are responsible for maintaining the integrity of the Live Monitoring Engine.</li>
                  <li>Data interpretations must be objective and free from production bias.</li>
                  <li>Analysts must report system anomalies or irregular voting patterns to the Admin immediately.</li>
                  <li>Unauthorized extraction of raw interaction logs for external use is forbidden.</li>
                </ul>
              </div>

              {/* Admin Rules */}
              <div className="glass p-8 rounded-3xl border border-white/10 border-l-4 border-l-orange-500">
                <h3 className="text-white font-black text-xl mb-4 flex items-center gap-3">
                  <span className="text-2xl">🛡️</span> 4. Admin Authority (ROOT)
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-sm text-slate-400">
                  <li>Admins have full override capabilities over all content and user interactions.</li>
                  <li>The right to delete low-quality, abusive, or irrelevant feedback is held exclusively by Admins.</li>
                  <li>Admins monitor Producer and Analyst activity to ensure platform compliance.</li>
                  <li>All Admin actions are final and non-negotiable within the CinemaPulse ecosystem.</li>
                </ul>
              </div>

              <div className="p-8 text-center text-xs text-slate-500 italic">
                By interacting with the CinemaPulse platform, you agree to these role-based mandates.
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="pt-28 px-6 pb-20 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack} 
          className="mb-12 group flex items-center gap-2 text-slate-500 hover:text-white transition-all font-bold uppercase tracking-widest text-xs"
        >
          <div className="p-2 glass rounded-full group-hover:bg-white/10 transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          Return to Previous Page
        </button>

        {renderContent()}
      </div>
    </div>
  );
};
