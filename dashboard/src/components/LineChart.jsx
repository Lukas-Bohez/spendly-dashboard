import { useState, useCallback } from 'react';
import { Info, MoreVertical, ChevronDown } from 'lucide-react';
import './LineChart.css';

const MONTHLY_DATA = [
  { month: 'May', income: 420, expense: 310 },
  { month: 'Jun', income: 510, expense: 380 },
  { month: 'Jul', income: 680, expense: 420 },
  { month: 'Aug', income: 590, expense: 450 },
  { month: 'Sep', income: 750, expense: 520 },
  { month: 'Oct', income: 640, expense: 480 },
  { month: 'Nov', income: 820, expense: 560 },
  { month: 'Dec', income: 710, expense: 490 },
];

const CHART_WIDTH = 560;
const CHART_HEIGHT = 240;
const TOP_MARGIN = 20;
const BOTTOM_MARGIN = 32;
const LEFT_MARGIN = 44;
const RIGHT_MARGIN = 16;
const MIN_VALUE = 100;
const MAX_VALUE = 900;

export default function LineChart() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = useCallback((i) => setHoveredIndex(i), []);
  const handleMouseLeave = useCallback(() => setHoveredIndex(null), []);

  const chartAreaWidth = CHART_WIDTH - LEFT_MARGIN - RIGHT_MARGIN;
  const chartAreaHeight = CHART_HEIGHT - TOP_MARGIN - BOTTOM_MARGIN;
  const valueRange = MAX_VALUE - MIN_VALUE;

  const getX = (i) => LEFT_MARGIN + (i / (MONTHLY_DATA.length - 1)) * chartAreaWidth;
  const getY = (value) => TOP_MARGIN + chartAreaHeight - ((value - MIN_VALUE) / valueRange) * chartAreaHeight;

  const generateStraightPath = (dataKey) => {
    const points = MONTHLY_DATA.map((d, i) => ({ x: getX(i), y: getY(d[dataKey]) }));
    if (points.length < 2) return '';
    return 'M ' + points.map(p => `${p.x} ${p.y}`).join(' L ');
  };

  const incomePath = generateStraightPath('income');
  const expensePath = generateStraightPath('expense');
  const yGridValues = [100, 300, 500, 700, 900];

  return (
    <article className="line-chart" aria-label="Cash Flow Analytics">
      <div className="line-chart__header">
        <div className="line-chart__title-group">
          <h3 className="line-chart__title">Cash Flow Analytics</h3>
          <Info className="line-chart__info-icon" size={14} />
        </div>
        <div className="line-chart__controls">
          <button className="line-chart__dropdown" type="button">
            Monthly
            <ChevronDown size={12} />
          </button>
          <button className="line-chart__menu-btn" aria-label="More options" type="button">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      <div className="line-chart__body">
        <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} width="100%" height="auto" role="img"
          aria-label={`Cash flow: ${MONTHLY_DATA.map(d => `${d.month} income $${d.income} expense $${d.expense}`).join(', ')}`}>
          {yGridValues.map((val) => {
            const y = getY(val);
            return (
              <g key={`grid-${val}`}>
                <line x1={LEFT_MARGIN} y1={y} x2={CHART_WIDTH - RIGHT_MARGIN} y2={y} className="line-chart__grid-line" />
                <text x={LEFT_MARGIN - 6} y={y + 4} textAnchor="end" className="line-chart__axis-label">{`$${val}`}</text>
              </g>
            );
          })}
          {MONTHLY_DATA.map((item, i) => (
            <text key={`label-${item.month}`} x={getX(i)} y={CHART_HEIGHT - 8} textAnchor="middle" className="line-chart__axis-label">{item.month}</text>
          ))}
          <path d={incomePath} className="line-chart__line line-chart__line--income" fill="none" />
          <path d={expensePath} className="line-chart__line line-chart__line--expense" fill="none" />
          {MONTHLY_DATA.map((item, i) => {
            const x = getX(i);
            const incomeY = getY(item.income);
            const expenseY = getY(item.expense);
            const isHovered = hoveredIndex === i;
            // Clamp tooltip X so it stays on screen horizontally
            const tooltipX = Math.max(80, Math.min(x, CHART_WIDTH - 80));
            // Clamp tooltip Y so it doesn't overflow above the chart
            const tooltipTopY = Math.max(0, Math.min(incomeY, expenseY) - 70);
            return (
              <g key={`points-${item.month}`} onMouseEnter={() => handleMouseEnter(i)} onMouseLeave={handleMouseLeave} style={{ cursor: 'pointer' }}>
                <rect x={x - 20} y={TOP_MARGIN} width={40} height={chartAreaHeight} fill="transparent" />
                {isHovered && <line x1={x} y1={TOP_MARGIN} x2={x} y2={TOP_MARGIN + chartAreaHeight} className="line-chart__hover-line" />}
                <circle cx={x} cy={incomeY} r={isHovered ? 6 : 4} className="line-chart__point line-chart__point--income" />
                <circle cx={x} cy={expenseY} r={isHovered ? 6 : 4} className="line-chart__point line-chart__point--expense" />
                {isHovered && (
                  <g className="line-chart__tooltip-group">
                    <rect x={tooltipX - 70} y={tooltipTopY} width={140} height={60} rx={8} className="line-chart__tooltip-bg" />
                    <text x={tooltipX} y={tooltipTopY + 20} textAnchor="middle" className="line-chart__tooltip-title">{`${item.month} 2024`}</text>
                    <text x={tooltipX - 50} y={tooltipTopY + 38} className="line-chart__tooltip-value line-chart__tooltip-value--income">{`Income: $${item.income}`}</text>
                    <text x={tooltipX - 50} y={tooltipTopY + 52} className="line-chart__tooltip-value line-chart__tooltip-value--expense">{`Expense: $${item.expense}`}</text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="line-chart__legend">
        <span className="line-chart__legend-item">
          <span className="line-chart__legend-dot line-chart__legend-dot--income"></span>
          Income
        </span>
        <span className="line-chart__legend-item">
          <span className="line-chart__legend-dot line-chart__legend-dot--expense"></span>
          Expense
        </span>
      </div>
    </article>
  );
}