import { NavLink } from 'react-router-dom';

export default function LeavePlanningPage() {
  return (
    <div className="cl-page cl-page--centered">
      <div className="cl-planning-card">
        <span className="cl-planning-eyebrow">PLAN A LEAVE</span>
        <h1 className="cl-planning-title">Plan your Leave</h1>
        <p className="cl-planning-desc">
          Use this tool to get an estimated view of your benefits, timeline, and pay during a potential leave.
          Answer a few questions and we will show you what to expect.
        </p>

        <div className="cl-planning-illustration">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="56" fill="#f0f4f8" stroke="#e5e7eb" strokeWidth="2"/>
            <rect x="38" y="35" width="44" height="50" rx="4" fill="white" stroke="#0033a0" strokeWidth="1.5"/>
            <path d="M46 31v8M74 31v8" stroke="#0033a0" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M38 47h44" stroke="#0033a0" strokeWidth="1.5"/>
            <rect x="44" y="53" width="8" height="8" rx="1" fill="#0033a0" opacity="0.15"/>
            <rect x="56" y="53" width="8" height="8" rx="1" fill="#0033a0" opacity="0.15"/>
            <rect x="68" y="53" width="8" height="8" rx="1" fill="#0033a0" opacity="0.15"/>
            <rect x="44" y="65" width="8" height="8" rx="1" fill="#0033a0" opacity="0.3"/>
            <rect x="56" y="65" width="8" height="8" rx="1" fill="#0033a0" opacity="0.3"/>
            <rect x="68" y="65" width="8" height="8" rx="1" fill="#0033a0" opacity="0.15"/>
            <rect x="44" y="77" width="8" height="8" rx="1" fill="#0033a0" opacity="0.08"/>
            <rect x="56" y="77" width="8" height="8" rx="1" fill="#0033a0" opacity="0.08"/>
          </svg>
        </div>

        <button className="cl-btn cl-btn--dark cl-btn--lg">Get Started</button>

        <p className="cl-planning-footer">
          Already know what you need?{' '}
          <NavLink to="/claims-and-leave/file-claim" className="cl-text-link">
            Request leave directly &rarr;
          </NavLink>
        </p>
      </div>
    </div>
  );
}
