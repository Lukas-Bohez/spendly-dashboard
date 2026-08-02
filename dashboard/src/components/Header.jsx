import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, Share2 } from 'lucide-react';
import './Header.css';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const Header = () => {
  const [selectedMonth, setSelectedMonth] = useState('October');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const btnRef = useRef(null);
  const popoverRef = useRef(null);

  /* ✅ Popover API — FUTURE CSS/HTML feature
     De knop opent de popover via het native `popovertarget` attribuut
     (geen JS nodig voor open/sluit/light-dismiss). We luisteren enkel naar
     de `toggle` events om React state (aria-expanded, chevron) te syncen. */
  useEffect(() => {
    const popover = popoverRef.current;
    const btn = btnRef.current;
    if (!popover || !btn) return;

    const supportsAnchor = window.CSS?.supports?.('anchor-name: --btn');

    // Fallback positionering voor browsers zonder Anchor Positioning
    const handleBeforeToggle = (e) => {
      if (e.newState !== 'open' || supportsAnchor) return;
      const rect = btn.getBoundingClientRect();
      popover.style.insetInlineStart = `${rect.left}px`;
      popover.style.insetBlockStart = `${rect.bottom + 8}px`;
    };

    const handleToggle = (e) => setIsDropdownOpen(e.newState === 'open');

    popover.addEventListener('beforetoggle', handleBeforeToggle);
    popover.addEventListener('toggle', handleToggle);
    return () => {
      popover.removeEventListener('beforetoggle', handleBeforeToggle);
      popover.removeEventListener('toggle', handleToggle);
    };
  }, []);

  // Sluit de popover op scroll/resize (fallback positioning blijft anders hangen)
  useEffect(() => {
    const popover = popoverRef.current;
    if (!popover) return;
    const close = () => {
      if (popover.matches(':popover-open')) popover.hidePopover();
    };
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);
    return () => {
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, []);

  const selectMonth = (month) => {
    setSelectedMonth(month);
    // Guard: hidePopover gooit een error als de popover al gesloten is
    if (popoverRef.current?.matches(':popover-open')) {
      popoverRef.current.hidePopover();
    }
  };

  return (
    <header className="header">
      <div className="header__left">
        <nav className="header__breadcrumb" aria-label="Breadcrumb">
          <span>Spendly</span>
          <span className="header__breadcrumb-separator" aria-hidden="true">{">"}</span>
          <span aria-current="page">Dashboard</span>
        </nav>
        <h1 className="header__title">Welcome back, Christina</h1>
      </div>

      <div className="header__right">
        <div className="header__month-dropdown">
          {/* popovertarget = native invoker: toggle + light-dismiss werken zonder JS */}
          <button
            ref={btnRef}
            className="header__month-btn"
            popovertarget="month-popover"
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
            type="button"
          >
            <Calendar className="header__month-icon" size={16} />
            <span>{selectedMonth}</span>
            <ChevronDown className={`header__chevron ${isDropdownOpen ? 'header__chevron--open' : ''}`} size={12} />
          </button>

          <div
            id="month-popover"
            ref={popoverRef}
            className="header__month-popover"
            popover="auto"
            role="listbox"
            aria-label="Select month"
          >
            {months.map((month) => (
              <button
                key={month}
                className={`header__month-option ${month === selectedMonth ? 'header__month-option--selected' : ''}`}
                onClick={() => selectMonth(month)}
                role="option"
                aria-selected={month === selectedMonth}
                type="button"
              >
                {month}
              </button>
            ))}
          </div>
        </div>

        <button className="header__share-btn" type="button">
          <Share2 size={16} />
          <span>Share</span>
        </button>

        <div className="header__user">
          <div className="header__avatar" aria-hidden="true">CP</div>
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
