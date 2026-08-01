import { Info, MoreVertical } from 'lucide-react';
import './GaugeChart.css';

export default function GaugeChart() {
  const percentage = 48;

  // Large gauge filling the card
  const cx = 150;
  const cy = 130;
  const radius = 120;
  const strokeWidth = 18;

  const arcStart = 135;
  const arcEnd = 45;
  const totalArcDegrees = 270;

  const toRad = (deg) => (deg * Math.PI) / 180;
  const startX = cx + radius * Math.cos(toRad(arcStart));
  const startY = cy + radius * Math.sin(toRad(arcStart));
  const endX = cx + radius * Math.cos(toRad(arcEnd));
  const endY = cy + radius * Math.sin(toRad(arcEnd));

  const largeArc = 1;
  const sweep = 1;
  const bgArcPath = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} ${sweep} ${endX} ${endY}`;

  const filledDegrees = (percentage / 100) * totalArcDegrees;
  const filledEndAngle = arcStart + filledDegrees;
  const filledEndX = cx + radius * Math.cos(toRad(filledEndAngle));
  const filledEndY = cy + radius * Math.sin(toRad(filledEndAngle));
  const filledLargeArc = filledDegrees > 180 ? 1 : 0;
  const filledArcPath = `M ${startX} ${startY} A ${radius} ${radius} 0 ${filledLargeArc} ${sweep} ${filledEndX} ${filledEndY}`;

  return (
    <article className="gauge-card" aria-label="Financial Balance — 48% from yesterday">
      <div className="gauge-card__header">
        <div className="gauge-card__title-group">
          <h3 className="gauge-card__title">Financial Balance</h3>
          <Info className="gauge-card__info" size={14} />
        </div>
        <button className="gauge-card__menu-btn" type="button" aria-label="More options">
          <MoreVertical size={16} />
        </button>
      </div>

      <div className="gauge-card__body">
        <div className="gauge-card__gauge-wrapper">
          <svg viewBox="0 0 300 270" width="100%" height="auto" role="img" aria-label={`Gauge: ${percentage}%`} style={{ maxWidth: '300px' }}>
            <path d={bgArcPath} fill="none" stroke="var(--color-chart-for-week)" strokeWidth={strokeWidth} strokeLinecap="round" />
            <path d={filledArcPath} fill="none" stroke="var(--color-chart-profit)" strokeWidth={strokeWidth} strokeLinecap="round" className="gauge-fill" />
            <text x={cx} y={cy - 4} textAnchor="middle" fill="var(--color-text-primary)" fontSize="42" fontWeight="700" fontFamily="var(--font-family-sans)">
              {percentage}%
            </text>
            <text x={cx} y={cy + 22} textAnchor="middle" fill="var(--color-text-meta)" fontSize="13" fontFamily="var(--font-family-sans)">
              from yesterday
            </text>
          </svg>
          <button className="gauge-card__detail-btn" type="button">Detail</button>
        </div>

        <div className="gauge-card__legend">
          <span className="gauge-card__legend-item">
            <span className="gauge-card__legend-dot gauge-card__legend-dot--profit"></span>
            Total Profit
          </span>
          <span className="gauge-card__legend-item">
            <span className="gauge-card__legend-dot gauge-card__legend-dot--today"></span>
            Profit Today
          </span>
          <span className="gauge-card__legend-item">
            <span className="gauge-card__legend-dot gauge-card__legend-dot--week"></span>
            For Week
          </span>
        </div>
      </div>
    </article>
  );
}