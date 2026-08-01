import { useState, useRef, useCallback, useEffect } from 'react';
import { Calendar, ChevronDown, Share2 } from 'lucide-react';
import './Header.css';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef(null);
  const popoverRef = useRef(null);

  const toggleDropdown = useCallback(() => {
    if (!isDropdownOpen && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPopoverPos({
        top: rect.bottom + 8,
        left: rect.left,
      });
    }
    setIsDropdownOpen(!isDropdownOpen);
  }, [isDropdownOpen]);

  // Close on scroll/resize
  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleClose = () => setIsDropdownOpen(false);
    window.addEventListener('scroll', handleClose, true);
    window.addEventListener('resize', handleClose);
    return () => {
      window.removeEventListener('scroll', handleClose, true);
      window.removeEventListener('resize', handleClose);
    };
  }, [isDropdownOpen]);

  return (
    <header className="header">
      <div className="header__left">
        <nav className="header__breadcrumb">
          <span>Spendly</span>
          <span className="header__breadcrumb-separator">{">"}</span>
          <span>Dashboard</span>
        </nav>
        <h1 className="header__title">Welcome back, Christina</h1>
      </div>

      <div className="header__right">
        <div className="header__month-dropdown">
          {/* ✅ Popover API — FUTURE CSS: native popover with backdrop, dismiss, top-layer */}
          <button
            ref={btnRef}
            className="header__month-btn"
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
            type="button"
          >
            <Calendar className="header__month-icon" size={16} />
            <span>October</span>
            <ChevronDown className={`header__chevron ${isDropdownOpen ? 'header__chevron--open' : ''}`} size={12} />
          </button>

          <div
            ref={popoverRef}
            className="header__month-popover"
            popover="auto"
            style={isDropdownOpen ? undefined : { display: 'none' }}
          >
            <ul className="header__month-list">
              {months.map((month) => (
                <li key={month} className="header__month-item">
                  <button
                    className="header__month-option"
                    onClick={() => setIsDropdownOpen(false)}
                    type="button"
                  >
                    {month}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button className="header__share-btn" type="button">
          <Share2 size={16} />
          <span>Share</span>
        </button>

        <div className="header__user">
          <div className="header__avatar">CP</div>
          <div className="header__user-info">
            <span className="header__user-name">Christina Perri</span>
            <span className="header__user-email">edelweis@gmail.com</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;