import { useState, useCallback, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import UpgradeBanner from './components/UpgradeBanner';
import StatCard from './components/StatCard';
import LineChart from './components/LineChart';
import GaugeChart from './components/GaugeChart';
import TransactionsTable from './components/TransactionsTable';
import TaxLiabilities from './components/TaxLiabilities';
import './App.css';

const STORAGE_KEY = 'spendly-theme';

function getInitialTheme() {
  // Check localStorage first
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') return stored;

  // Fallback to system preference
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Apply theme on mount to prevent flash
  useEffect(() => {
    applyTheme(theme);
    // Listen for system preference changes
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const sys = e.matches ? 'dark' : 'light';
        setTheme(sys);
        applyTheme(sys);
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  };

  const toggleMobileNav = useCallback(() => setMobileNavOpen(p => !p), []);
  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);

  return (
    <div className="app-layout">
      <a href="#main-content" className="skip-link">Ga direct naar inhoud</a>

      <Sidebar mobileOpen={mobileNavOpen} onClose={closeMobileNav} />

      <button
        className="mobile-nav-toggle"
        onClick={toggleMobileNav}
        aria-expanded={mobileNavOpen}
        aria-controls="sidebar-nav"
        aria-label={mobileNavOpen ? 'Sluit navigatie' : 'Open navigatie'}
        type="button"
      >
        {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <main className="main-content" id="main-content">
        <Header />
        <UpgradeBanner />
        <div className="dashboard-grid">
          <div className="scroll-progress">
            <div className="scroll-progress__bar"></div>
          </div>
          <section className="section">
            <div className="stats-grid">
              <StatCard title="Total Balance" value="$16.745,00" change="+6%" changeType="positive" />
              <StatCard title="Total Saving" value="$5.981,00" change="-2,8%" changeType="negative" />
              <StatCard title="Revenue" value="$9.116,00" change="+1,3%" changeType="positive" />
              <StatCard title="Credit" value="$4.872,00" change="+1,3%" changeType="positive" />
            </div>
          </section>
          <section className="section">
            <div className="analytics-grid">
              <LineChart />
              <GaugeChart />
            </div>
          </section>
          <section className="section">
            <div className="bottom-grid">
              <TransactionsTable />
              <TaxLiabilities />
            </div>
          </section>
        </div>
      </main>

      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme" type="button">
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </div>
  );
}

export default App;