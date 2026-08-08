import { Info, MoreVertical } from 'lucide-react';
import './StatCard.css';

function StatCard({ title, value, change, changeType = 'positive', info = false }) {
  return (
    <article className="stat-card" aria-label={`${title}: ${value}`}>
      <div className="stat-card__header">
        <div className="stat-card__title-group">
          <h2 className="stat-card__title">{title}</h2>
          {info && <Info className="stat-card__info-icon" size={14} />}
        </div>
        <button className="stat-card__menu-btn" aria-label={`More options for ${title}`} type="button">
          <MoreVertical size={16} />
        </button>
      </div>
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__change-row">
        <span className={`stat-card__change-badge stat-card__change-badge--${changeType}`}>{change}</span>
        <span className="stat-card__change-text">vs last month</span>
      </div>
    </article>
  );
}

export default StatCard;