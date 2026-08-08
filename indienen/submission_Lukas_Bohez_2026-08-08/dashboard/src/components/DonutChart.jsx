/**
 * DonutChart — Interactieve SVG donut grafiek
 *
 * MICRO-INTERACTION: Segmenten klikken met keyboard/muis. 
 * Geselecteerd segment "pop out" met spring easing animatie.
 *
 * FUTURE CSS FEATURES:
 * ✅ CSS variables voor SVG kleuren
 * ✅ @scope, :where(), :is() — in bijbehorende CSS
 * ✅ @property — voor geanimeerde segment transformaties
 */
import { useState, useCallback } from 'react';

const STORAGE_DATA = [
  { label: 'Media', value: 1.4, color: 'var(--color-accent-primary)' },
  { label: 'Documenten', value: 0.9, color: 'var(--color-status-success)' },
  { label: 'Backups', value: 0.6, color: 'var(--color-status-warning)' },
  { label: 'Overige', value: 0.4, color: 'var(--color-neutral-400)' },
];

const TOTAL = 3.3;
const CHART_SIZE = 220;
const OUTER_RADIUS = 90;
const INNER_RADIUS = 58;
const CENTER = CHART_SIZE / 2;

/**
 * Converteer poolcoördinaten (hoek in graden) naar cartesische x,y.
 * SVG: 0° = 3-uur, met de klok mee positief.
 * We passen -90° offset toe zodat 0° = 12-uur.
 */
function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: Math.round((cx + r * Math.cos(rad)) * 100) / 100,
    y: Math.round((cy + r * Math.sin(rad)) * 100) / 100,
  };
}

/**
 * Maak een SVG arc path voor één donut segment.
 * Gaat van startAngle naar endAngle met de klok mee (sweep=1).
 * Tekent: outer arc → line naar inner → inner arc terug → line naar outer → close.
 */
function describeDonutSlice(cx, cy, outerR, innerR, startAngle, endAngle) {
  const outerStart = polarToCartesian(cx, cy, outerR, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerR, endAngle);
  const innerStart = polarToCartesian(cx, cy, innerR, startAngle);
  const innerEnd = polarToCartesian(cx, cy, innerR, endAngle);

  const largeArcFlag = endAngle - startAngle > 180 ? '1' : '0';

  // Path: outer arc (met de klok mee) → lijn naar inner end → inner arc (tegen de klok in) terug → close
  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ');
}

export default function DonutChart() {
  const [activeSegment, setActiveSegment] = useState(null);

  const handleSegmentHover = useCallback((i) => setActiveSegment(i), []);
  const handleSegmentLeave = useCallback(() => setActiveSegment(null), []);
  const handleSegmentClick = useCallback(
    (i) => setActiveSegment((prev) => (prev === i ? null : i)),
    [],
  );
  const handleKeyDown = useCallback(
    (e, i) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSegmentClick(i);
      }
    },
    [handleSegmentClick],
  );

  // Bouw slices op met cumulatieve hoeken
  let cumulativeAngle = 0;
  const slices = STORAGE_DATA.map((item) => {
    const sliceAngle = (item.value / TOTAL) * 360;
    const s = { ...item, startAngle: cumulativeAngle, endAngle: cumulativeAngle + sliceAngle, sliceAngle };
    cumulativeAngle += sliceAngle;
    return s;
  });

  return (
    <article className="chart-card" aria-label="Opslagverdeling — donut grafiek">
      <div className="chart-card__header">
        <h3 className="chart-card__title">Opslagverdeling</h3>
        <div className="chart-card__legend">
          <span className="legend-item"><span className="legend-dot legend-dot--donut-1"></span>Media</span>
          <span className="legend-item"><span className="legend-dot legend-dot--donut-2"></span>Docs</span>
          <span className="legend-item"><span className="legend-dot legend-dot--donut-3"></span>Backup</span>
        </div>
      </div>

      <div className="chart-card__body">
        <svg
          viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}
          width="220"
          height="220"
          role="img"
          aria-label={`Donut grafiek: ${STORAGE_DATA.map((d) => `${d.label} ${d.value} TB`).join(', ')}. Totaal ${TOTAL} TB`}
        >
          {/* Donut slices — correcte cirkelboog geometrie */}
          {slices.map((slice, i) => {
            const isActive = activeSegment === i;
            const outerR = isActive ? OUTER_RADIUS + 5 : OUTER_RADIUS;
            const percentage = Math.round((slice.value / TOTAL) * 100);
            const midAngle = slice.startAngle + slice.sliceAngle / 2;
            const labelOuterR = (outerR + INNER_RADIUS) / 2;
            const labelPos = polarToCartesian(CENTER, CENTER, labelOuterR, midAngle);

            return (
              <g
                key={slice.label}
                role="button"
                tabIndex={0}
                aria-label={`${slice.label}: ${slice.value} TB (${percentage}%)`}
                onClick={() => handleSegmentClick(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onMouseEnter={() => handleSegmentHover(i)}
                onMouseLeave={handleSegmentLeave}
                style={{ cursor: 'pointer', outline: 'none' }}
              >
                <path
                  d={describeDonutSlice(CENTER, CENTER, outerR, INNER_RADIUS, slice.startAngle, slice.endAngle)}
                  fill={slice.color}
                  stroke="var(--color-bg-card)"
                  strokeWidth="1.5"
                  style={{
                    transition: 'd 300ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 200ms ease',
                    opacity: activeSegment !== null && !isActive ? 0.45 : 1,
                  }}
                />
                {/* Percentage label halverwege de ring */}
                {slice.sliceAngle > 15 && (
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="var(--color-text-on-accent)"
                    fontSize="10"
                    fontWeight="600"
                    fontFamily="var(--font-family-sans)"
                    pointerEvents="none"
                  >
                    {percentage}%
                  </text>
                )}
              </g>
            );
          })}

          {/* Center text — totaal */}
          <text x={CENTER} y={CENTER - 8} textAnchor="middle" fill="var(--color-text-primary)" fontSize="22" fontWeight="700" fontFamily="var(--font-family-sans)">
            {TOTAL} TB
          </text>
          <text x={CENTER} y={CENTER + 14} textAnchor="middle" fill="var(--color-text-meta)" fontSize="11" fontFamily="var(--font-family-sans)">
            Totaal
          </text>
        </svg>
      </div>
    </article>
  );
}