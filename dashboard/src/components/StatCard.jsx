import { Info, MoreVertical } from 'lucide-react';
import './StatCard.css';

function StatCard({ title, value, change, changeType = 'positive', info = false }) {
  return (
    <div className="stat-card">
      <div className="stat-card__header">
        <div className="stat-card__title-group">
          <span className="stat-card__title">{title}</span>
          {info && <Info className="stat-card__info-icon" size={14} />}
        </div>
        <button className="stat-card__menu-btn" aria-label="More options">
          <MoreVertical size={16} />
        </button>
      </div>
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__change-row">
        <span className={`stat-card__change-badge stat-card__change-badge--${changeType}`}>{change}</span>
        <span className="stat-card__change-text">vs last month</span>
      </div>
    </div>
  );
}

export default StatCard;