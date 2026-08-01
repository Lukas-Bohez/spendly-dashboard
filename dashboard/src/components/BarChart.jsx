/**
 * BarChart — Interactieve SVG staafdiagram
 *
 * INTERACTIE #1: Bars klikken/selecteren met keyboard (Tab + Enter/Space) en muis.
 * Hover toont exacte waarde boven de bar. Geselecteerde bar highlight met accentkleur.
 *
 * MICRO-INTERACTION: Bars animeren bij hover met spring easing (--ease-spring).
 * Waarde labels verschijnen soepel via opacity + translate animatie.
 *
 * FUTURE CSS FEATURES in dit component:
 * ✅ CSS variables voor SVG kleuren
 * ✅ Container Queries (@container) — in BarChart.css
 * ✅ :where() & :is() — in BarChart.css
 * ✅ @scope — in BarChart.css
 * ✅ @property — geanimeerde bar hoogtes
 * ✅ Individual transform properties — scale, translate
 */
import { useState, useCallback } from 'react';

const MONTHLY_DATA = [
  { label: 'Jan', value: 420 },
  { label: 'Feb', value: 380 },
  { label: 'Mrt', value: 510 },
  { label: 'Apr', value: 480 },
  { label: 'Mei', value: 640 },
  { label: 'Jun', value: 590 },
  { label: 'Jul', value: 720 },
  { label: 'Aug', value: 680 },
  { label: 'Sep', value: 560 },
  { label: 'Okt', value: 490 },
  { label: 'Nov', value: 630 },
  { label: 'Dec', value: 710 },
];

const CHART_WIDTH = 620;
const CHART_HEIGHT = 280;
const BAR_WIDTH = 34;
const TOP_MARGIN = 28;
const BOTTOM_MARGIN = 44;
const LEFT_MARGIN = 48;
const RIGHT_MARGIN = 16;
const MAX_VALUE = 800;

export default function BarChart() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleClick = useCallback((i) => {
    setSelectedIndex((prev) => (prev === i ? null : i));
  }, []);

  const handleKeyDown = useCallback(
    (e, i) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick(i);
      }
    },
    [handleClick],
  );

  const chartAreaWidth = CHART_WIDTH - LEFT_MARGIN - RIGHT_MARGIN;
  const chartAreaHeight = CHART_HEIGHT - TOP_MARGIN - BOTTOM_MARGIN;
  const gap = (chartAreaWidth - MONTHLY_DATA.length * BAR_WIDTH) / (MONTHLY_DATA.length + 1);

  return (
    <article className="chart-card" aria-label="Maandelijkse downloads — staafdiagram">
      <div className="chart-card__header">
        <h3 className="chart-card__title">Maandelijkse downloads</h3>
        <div className="chart-card__legend">
          <span className="legend-item">
            <span className="legend-dot legend-dot--bar"></span>
            Downloads
          </span>
        </div>
      </div>

      <div className="chart-card__body">
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          width="100%"
          height="auto"
          role="img"
          aria-label={`Staafdiagram: ${MONTHLY_DATA.map((d) => `${d.label} ${d.value}`).join(', ')}`}
          style={{ maxHeight: '320px' }}
        >
          {/* Y-axis grid lines met labels aan de linkerzijde — geen overlap met bars */}
          {[0, 200, 400, 600, 800].map((val) => {
            const y = TOP_MARGIN + chartAreaHeight - (val / MAX_VALUE) * chartAreaHeight;
            return (
              <g key={`grid-${val}`}>
                <line
                  x1={LEFT_MARGIN}
                  y1={y}
                  x2={CHART_WIDTH - RIGHT_MARGIN}
                  y2={y}
                  stroke="var(--color-border-default)"
                  strokeWidth="1"
                  strokeDasharray={val === 0 ? 'none' : '3 3'}
                />
                <text
                  x={LEFT_MARGIN - 8}
                  y={y + 4}
                  textAnchor="end"
                  fill="var(--color-text-meta)"
                  fontSize="11"
                  fontFamily="var(--font-family-sans)"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Bars — voldoende ruimte door grotere CHART_HEIGHT en BOTTOM_MARGIN */}
          {MONTHLY_DATA.map((item, i) => {
            const x = LEFT_MARGIN + gap + i * (BAR_WIDTH + gap);
            const barHeight = (item.value / MAX_VALUE) * chartAreaHeight;
            const y = TOP_MARGIN + chartAreaHeight - barHeight;
            const isSelected = selectedIndex === i;
            const isHovered = hoveredIndex === i;

            return (
              <g
                key={item.label}
                className="bar-group"
                role="button"
                tabIndex={0}
                aria-label={`${item.label}: ${item.value} downloads`}
                aria-pressed={isSelected}
                onClick={() => handleClick(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: 'pointer', outline: 'none' }}
              >
                {/* Transparant hit area — breder dan de bar */}
                <rect
                  x={x - 4}
                  y={TOP_MARGIN}
                  width={BAR_WIDTH + 8}
                  height={chartAreaHeight}
                  fill="transparent"
                />
                {/* De bar zelf */}
                <rect
                  x={x}
                  y={y}
                  width={BAR_WIDTH}
                  height={barHeight}
                  rx="5"
                  fill={
                    isSelected || isHovered
                      ? 'var(--color-accent-primary)'
                      : 'var(--color-accent-primary-light)'
                  }
                  style={{
                    transition: 'fill 200ms ease, height 300ms var(--ease-spring)',
                  }}
                />
                {/* Value label BOVEN de bar — voldoende ruimte door TOP_MARGIN=28 */}
                {(isHovered || isSelected) && barHeight > 10 && (
                  <text
                    x={x + BAR_WIDTH / 2}
                    y={y - 10}
                    textAnchor="middle"
                    fill="var(--color-text-primary)"
                    fontSize="12"
                    fontWeight="600"
                    fontFamily="var(--font-family-sans)"
                  >
                    {item.value}
                  </text>
                )}
                {/* Month label onder de bar — BOTTOM_MARGIN=44 geeft genoeg ruimte */}
                <text
                  x={x + BAR_WIDTH / 2}
                  y={CHART_HEIGHT - 10}
                  textAnchor="middle"
                  fill="var(--color-text-meta)"
                  fontSize="11"
                  fontFamily="var(--font-family-sans)"
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </article>
  );
}