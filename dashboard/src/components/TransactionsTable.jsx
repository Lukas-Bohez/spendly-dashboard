import { useState, useRef, useCallback, useEffect } from 'react';
import { Info, MoreVertical, Search, Filter } from 'lucide-react';
import './TransactionsTable.css';

const TRANSACTIONS = [
  { id: 'SPD - 0051', amount: '$137.000', status: 'Paid' },
  { id: 'SPD - 0046', amount: '$432.100', status: 'Pending' },
  { id: 'SPD - 0165', amount: '$200.000', status: 'Paid' },
  { id: 'SPD - 6391', amount: '$365.000', status: 'Paid' },
];

export default function TransactionsTable() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPos, setFilterPos] = useState({ top: 0, left: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const filterBtnRef = useRef(null);

  const toggleFilter = useCallback(() => {
    if (!filterOpen && filterBtnRef.current) {
      const rect = filterBtnRef.current.getBoundingClientRect();
      setFilterPos({ top: rect.bottom + 8, left: rect.left });
    }
    setFilterOpen(!filterOpen);
  }, [filterOpen]);

  useEffect(() => {
    if (!filterOpen) return;
    const handleClose = () => setFilterOpen(false);
    window.addEventListener('scroll', handleClose, true);
    window.addEventListener('resize', handleClose);
    return () => {
      window.removeEventListener('scroll', handleClose, true);
      window.removeEventListener('resize', handleClose);
    };
  }, [filterOpen]);

  const filteredTransactions = searchQuery.trim()
    ? TRANSACTIONS.filter(tx => tx.id.toLowerCase().includes(searchQuery.toLowerCase()))
    : TRANSACTIONS;

  return (
    <article className="transactions-card" aria-label="Recente transacties">
      <div className="transactions-card__header">
        <div className="transactions-card__title-group">
          <h3 className="transactions-card__title">Recent Transactions</h3>
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
          <span className="transactions-card__search-shortcut">⌘F</span>
        </div>
        <button ref={filterBtnRef} className="transactions-card__filter-btn" onClick={toggleFilter} type="button">
          <Filter size={16} />
          Filter
        </button>
        {filterOpen && (
          <div className="transactions-card__filter-popover" style={{ position: 'fixed', top: `${filterPos.top}px`, left: `${filterPos.left}px` }}>
            <p>Filter opties</p>
          </div>
        )}
      </div>

      <div className="transactions-card__table-wrapper">
        <table className="transactions-card__table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">ORDER ID</th>
              <th scope="col">AMOUNT</th>
              <th scope="col">STATUS</th>
              <th scope="col"></th>
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
                <td colSpan="5" style={{ textAlign: 'center', padding: 'var(--space-4)', color: 'var(--color-text-meta)' }}>
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
