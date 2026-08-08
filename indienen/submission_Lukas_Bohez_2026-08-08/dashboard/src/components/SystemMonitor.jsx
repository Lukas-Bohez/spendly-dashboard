const SYSTEM_METRICS = [
  { label: 'CPU', value: '45%', progressClass: 'cpu', status: 'normal' },
  { label: 'RAM', value: '62%', progressClass: 'ram', status: 'normal' },
  { label: 'Schijf', value: '85%', progressClass: 'disk', status: 'warning' },
  { label: 'Netwerk', value: '23%', progressClass: 'network', status: 'normal' },
];

function SystemMonitor() {
  return (
    <article className="system-card">
      <div className="card-header">
        <h3 className="card-title">Systeem status</h3>
        <span className="status-badge status-badge--online" aria-label="Systeem is online">
          <span className="status-badge__dot"></span>
          Online
        </span>
      </div>

      <ul className="system-list">
        {SYSTEM_METRICS.map((metric) => (
          <li key={metric.label} className="system-item">
            <div className="system-item__header">
              <span className="system-item__label">{metric.label}</span>
              <span className="system-item__value">{metric.value}</span>
            </div>
            <div className="progress-bar" role="progressbar" aria-valuenow={parseInt(metric.value)} aria-valuemin={0} aria-valuemax={100} aria-label={`${metric.label}: ${metric.value}`}>
              <div className={`progress-bar__fill progress-bar__fill--${metric.progressClass}`}></div>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default SystemMonitor;