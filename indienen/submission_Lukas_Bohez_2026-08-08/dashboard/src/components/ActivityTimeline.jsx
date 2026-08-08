const ACTIVITIES = [
  {
    id: 1,
    type: 'download',
    title: 'ubuntu-24.04-server.iso gedownload',
    time: '2 minuten geleden',
    status: 'success',
  },
  {
    id: 2,
    type: 'user',
    title: 'Marie toegevoegd als beheerder',
    time: '27 minuten geleden',
    status: 'info',
  },
  {
    id: 3,
    type: 'playlist',
    title: 'Afspeellijst "Zomer 2026" aangemaakt',
    time: '1 uur geleden',
    status: 'info',
  },
  {
    id: 4,
    type: 'storage',
    title: 'Opslaglimiet bijna bereikt (85%)',
    time: '3 uur geleden',
    status: 'warning',
  },
  {
    id: 5,
    type: 'error',
    title: 'Download mislukt: connection timeout',
    time: '5 uur geleden',
    status: 'error',
  },
];

const STATUS_ICONS = {
  success: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
};

function ActivityTimeline() {
  return (
    <article className="timeline-card">
      <div className="card-header">
        <h3 className="card-title">Recente activiteit</h3>
        <button className="card-link" type="button">
          Alles bekijken
        </button>
      </div>

      <ul className="timeline-list">
        {ACTIVITIES.map((activity, index) => (
          <li
            key={activity.id}
            className="timeline-item"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span
              className={`timeline-icon timeline-icon--${activity.status}`}
              aria-hidden="true"
            >
              {STATUS_ICONS[activity.status]}
            </span>
            <div className="timeline-content">
              <p className="timeline-title">{activity.title}</p>
              <time className="timeline-time">{activity.time}</time>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default ActivityTimeline;