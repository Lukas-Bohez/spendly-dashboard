import { useState, useCallback, useMemo } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavClick = useCallback((id) => {
    setActiveItem(id);
    if (mobileOpen) onClose();
  }, [mobileOpen, onClose]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && mobileOpen) onClose();
  }, [mobileOpen, onClose]);

  const filterItems = (items) => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(item => item.label.toLowerCase().includes(q));
  };

  const filteredMenu = useMemo(() => filterItems(MENU_ITEMS), [searchQuery]);
  const filteredAccount = useMemo(() => filterItems(ACCOUNT_ITEMS), [searchQuery]);
  const filteredSupport = useMemo(() => filterItems(SUPPORT_ITEMS), [searchQuery]);
  const hasResults = filteredMenu.length > 0 || filteredAccount.length > 0 || filteredSupport.length > 0;

  const renderSection = (label, items) => {
    if (items.length === 0) return null;
    return (
      <div className="sidebar__section">
        <span className="sidebar__section-label">{label}</span>
        <ul className="sidebar__nav-list">
          {items.map((item) => {
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
    );
  };

  return (
    <>
      {mobileOpen && <div className="sidebar-overlay" onClick={onClose} aria-hidden="true" />}
      <nav
        id="sidebar-nav"
        className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}
        aria-label="Main navigation"
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
          <input
            type="text"
            placeholder="Search"
            className="sidebar__search-input"
            aria-label="Search navigation"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="sidebar__search-shortcut" aria-hidden="true">⌘F</span>
        </div>

        <div className="sidebar__nav">
          {renderSection('MENU', filteredMenu)}
          {renderSection('ACCOUNT', filteredAccount)}
          {renderSection('SUPPORT', filteredSupport)}
          {!hasResults && searchQuery.trim() && (
            <p className="sidebar__no-results">No matches found</p>
          )}
        </div>

        <div className="sidebar__footer">
          <button className="sidebar__logout" type="button">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
