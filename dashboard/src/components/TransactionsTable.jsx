import { useState, useRef, useEffect } from 'react';
import { Info, MoreVertical, Search, Filter, Check } from 'lucide-react';
import './TransactionsTable.css';

const TRANSACTIONS = [
  { id: 'SPD - 0051', amount: '$137.000', status: 'Paid' },
  { id: 'SPD - 0046', amount: '$432.100', status: 'Pending' },
  { id: 'SPD - 0165', amount: '$200.000', status: 'Paid' },
  { id: 'SPD - 6391', amount: '$365.000', status: 'Paid' },
];

const STATUS_FILTERS = ['All', 'Paid', 'Pending'];

export default function TransactionsTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [filterOpen, setFilterOpen] = useState(false);
  const filterBtnRef = useRef(null);
  const filterPopoverRef = useRef(null);

  /* ✅ Popover API — native popover via `popovertarget` op de filter knop.
     State wordt gesynct via de `toggle` events (light-dismiss, Escape). */
  useEffect(() => {
    const popover = filterPopoverRef.current;
    const btn = filterBtnRef.current;
    if (!popover || !btn) return;

    const supportsAnchor = window.CSS?.supports?.('anchor-name: --btn');

    const handleBeforeToggle = (e) => {
      if (e.newState !== 'open' || supportsAnchor) return;
      const rect = btn.getBoundingClientRect();
      popover.style.insetInlineStart = `${rect.left}px`;
      popover.style.insetBlockStart = `${rect.bottom + 8}px`;
    };

    const handleToggle = (e) => setFilterOpen(e.newState === 'open');

    popover.addEventListener('beforetoggle', handleBeforeToggle);
    popover.addEventListener('toggle', handleToggle);
    return () => {
      popover.removeEventListener('beforetoggle', handleBeforeToggle);
      popover.removeEventListener('toggle', handleToggle);
    };
  }, []);

  useEffect(() => {
    const popover = filterPopoverRef.current;
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

  const selectStatus = (status) => {
    setStatusFilter(status);
    // Guard: hidePopover gooit een error als de popover al gesloten is
    if (filterPopoverRef.current?.matches(':popover-open')) {
      filterPopoverRef.current.hidePopover();
    }
  };

  /* Live filteren op Order ID (search) én Status (filter popover) */
  const filteredTransactions = TRANSACTIONS.filter((tx) => {
    const matchesSearch = !searchQuery.trim()
      || tx.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || tx.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <article className="transactions-card" aria-labelledby="transactions-title">
      <div className="transactions-card__header">
        <div className="transactions-card__title-group">
          <h2 className="transactions-card__title" id="transactions-title">Recent Transactions</h2>
          <Info className="transactions-card__info" size={14} />
        </div>
        <button className="transactions-card__menu-btn" type="button" aria-label="More options">
          <MoreVertical size={16} />
        </button>
      </div>

      <div className="transactions-card__toolbar">
        <div className="transactions-card__search">
          <Search className="transactions-card__search-icon" size={16} />
          <input
            type="search"
            placeholder="Search"
            className="transactions-card__search-input"
            aria-label="Search transactions"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="transactions-card__search-shortcut" aria-hidden="true">⌘F</span>
        </div>

        <button
          ref={filterBtnRef}
          className="transactions-card__filter-btn"
          popovertarget="filter-popover"
          aria-expanded={filterOpen}
          type="button"
        >
          <Filter size={16} />
          Filter
          {statusFilter !== 'All' && (
            <span className="transactions-card__filter-badge">{statusFilter}</span>
          )}
        </button>

        <div
          id="filter-popover"
          ref={filterPopoverRef}
          className="transactions-card__filter-popover"
          popover="auto"
          role="group"
          aria-label="Filter by status"
        >
          <p className="transactions-card__filter-title">Status</p>
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              className={`transactions-card__filter-option ${statusFilter === status ? 'transactions-card__filter-option--active' : ''}`}
              onClick={() => selectStatus(status)}
              aria-pressed={statusFilter === status}
              type="button"
            >
              <span>{status === 'All' ? 'All statuses' : status}</span>
              {statusFilter === status && <Check size={14} aria-hidden="true" />}
            </button>
          ))}
        </div>
      </div>

      <div className="transactions-card__table-wrapper" aria-live="polite">
        <table className="transactions-card__table">
          <thead>
            <tr>
              <th scope="col"><span className="sr-only">Select</span></th>
              <th scope="col">ORDER ID</th>
              <th scope="col">AMOUNT</th>
              <th scope="col">STATUS</th>
              <th scope="col"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr key={tx.id}>
                <td><input type="checkbox" aria-label={`Select ${tx.id}`} /></td>
                <td className="transactions-card__order-id">{tx.id}</td>
                <td className="transactions-card__amount">{tx.amount}</td>
                <td>
                  <span className={`transactions-card__status transactions-card__status--${tx.status.toLowerCase()}`}>
                    {tx.status}
                  </span>
                </td>
                <td>
                  <button className="transactions-card__row-menu" type="button" aria-label={`Options for ${tx.id}`}>
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan="5" className="transactions-card__empty">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </article>
  );
}
