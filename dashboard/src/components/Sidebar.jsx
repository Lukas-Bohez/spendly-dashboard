import { useState, useCallback } from 'react';
import {
  Home, FileText, BarChart3, Receipt, Users, User, UserCircle,
  Settings, Shield, HelpCircle, LogOut, Search
} from 'lucide-react';
import './Sidebar.css';

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'financial', label: 'Financial Statements', icon: FileText, badge: 8 },
  { id: 'metrics', label: 'Key Metrics', icon: BarChart3 },
  { id: 'tax', label: 'Tax & Compliance', icon: Receipt, badge: 18 },
  { id: 'account-mgmt', label: 'Account Management', icon: Users, badge: 13 },
];

const ACCOUNT_ITEMS = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'member', label: 'Member', icon: UserCircle },
];

const SUPPORT_ITEMS = [
  { id: 'settings', label: 'Setting', icon: Settings },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'help', label: 'Help & center', icon: HelpCircle },
];

function Sidebar({ mobileOpen, onClose }) {
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleNavClick = useCallback((id) => {
    setActiveItem(id);
    if (mobileOpen) onClose();
  }, [mobileOpen, onClose]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && mobileOpen) onClose();
  }, [mobileOpen, onClose]);

  return (
    <>
      {mobileOpen && <div className="sidebar-overlay" onClick={onClose} aria-hidden="true" />}
      <aside
        id="sidebar-nav"
        className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}
        role="navigation"
        aria-label="Hoofdnavigatie"
        onKeyDown={handleKeyDown}
      >
        <div className="sidebar__brand">
          <div className="sidebar__logo">
            <div className="sidebar__logo-icon"></div>
          </div>
          <span className="sidebar__brand-text">Spendly</span>
        </div>

        <div className="sidebar__search">
          <Search className="sidebar__search-icon" size={16} />
          <input type="text" placeholder="Search" className="sidebar__search-input" aria-label="Zoeken" />
          <span className="sidebar__search-shortcut" aria-hidden="true">⌘F</span>
        </div>

        <nav className="sidebar__nav">
          <div className="sidebar__section">
            <span className="sidebar__section-label">MENU</span>
            <ul className="sidebar__nav-list">
              {MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      className={`sidebar__nav-item ${activeItem === item.id ? 'sidebar__nav-item--active' : ''}`}
                      onClick={() => handleNavClick(item.id)}
                      aria-current={activeItem === item.id ? 'page' : undefined}
                      type="button"
                    >
                      <Icon className="sidebar__nav-icon" size={18} />
                      <span className="sidebar__nav-label">{item.label}</span>
                      {item.badge && <span className="sidebar__nav-badge">{item.badge}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="sidebar__section">
            <span className="sidebar__section-label">ACCOUNT</span>
            <ul className="sidebar__nav-list">
              {ACCOUNT_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button className="sidebar__nav-item" onClick={() => handleNavClick(item.id)} type="button">
                      <Icon className="sidebar__nav-icon" size={18} />
                      <span className="sidebar__nav-label">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="sidebar__section">
            <span className="sidebar__section-label">SUPPORT</span>
            <ul className="sidebar__nav-list">
              {SUPPORT_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button className="sidebar__nav-item" onClick={() => handleNavClick(item.id)} type="button">
                      <Icon className="sidebar__nav-icon" size={18} />
                      <span className="sidebar__nav-label">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        <div className="sidebar__footer">
          <button className="sidebar__logout" type="button">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;