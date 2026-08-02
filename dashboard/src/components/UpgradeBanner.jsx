import { useState } from 'react';
import { Info, X } from 'lucide-react';
import './UpgradeBanner.css';

export default function UpgradeBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="upgrade-banner">
      <div className="upgrade-banner__content">
        <Info className="upgrade-banner__icon" size={18} />
        <span className="upgrade-banner__text">Unlock the full potential and elevate your experience today!</span>
      </div>
      <div className="upgrade-banner__actions">
        <button className="upgrade-banner__upgrade-btn" type="button">Upgrade</button>
        <button className="upgrade-banner__close-btn" onClick={() => setVisible(false)} aria-label="Close banner" type="button">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}