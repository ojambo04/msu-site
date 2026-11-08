import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PageRenderer from './components/PageRenderer';
import Home from './pages/Home';
import About from './pages/About';
import Leadership from './pages/Leadership';
import Notices from './pages/Notices';
import StudentsCorner from './pages/StudentsCorner';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import NoticeDetails from './pages/NoticeDetails';
import Contact from './pages/Contact';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check local storage for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans transition-colors duration-300">
        <Navbar toggleTheme={toggleTheme} theme={theme} />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/notices/:slug" element={<NoticeDetails />} />
            <Route path="/students" element={<StudentsCorner />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:slug" element={<EventDetails />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
