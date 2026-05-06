import { useNavigate } from 'react-router-dom';
import useBasePath from './useBasePath';

export default function FileClaimPage() {
  const navigate = useNavigate();
  const base = useBasePath();

  return (
    <div className="cl-page cl-page--centered">
      <div className="cl-file-claim-wrap">
        <h1 className="cl-page-title cl-text-center">Get Started Filing a Claim or Requesting a Leave</h1>
        <p className="cl-page-desc cl-text-center">
          Choose one of the options below to begin. We will guide you through the process step-by-step.
        </p>

        <div className="cl-card-row">
          {/* File a Claim card */}
          <div className="cl-intro-card">
            <div className="cl-intro-card-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#0033a0" opacity="0.12"/>
                <path d="M10 8h8l4 4v12a2 2 0 01-2 2H10a2 2 0 01-2-2V10a2 2 0 012-2z" stroke="#0033a0" strokeWidth="1.5" fill="none"/>
                <path d="M18 8v4h4" stroke="#0033a0" strokeWidth="1.5" fill="none"/>
                <path d="M12 18h8M12 14h4" stroke="#0033a0" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className="cl-intro-card-title">File a Claim</h2>
            <p className="cl-intro-card-desc">
              Submit a claim for disability, accidental death &amp; dismemberment, or other supplemental benefits.
            </p>
            <button className="cl-btn cl-btn--primary">Start a Claim</button>
            <span className="cl-intro-card-meta">Takes about 10-15 minutes</span>
          </div>

          {/* Request a Leave card */}
          <div className="cl-intro-card">
            <div className="cl-intro-card-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#0033a0" opacity="0.12"/>
                <rect x="9" y="10" width="14" height="14" rx="2" stroke="#0033a0" strokeWidth="1.5" fill="none"/>
                <path d="M12 8v4M20 8v4M9 15h14" stroke="#0033a0" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className="cl-intro-card-title">Request a Leave</h2>
            <p className="cl-intro-card-desc">
              Request parental leave, own illness/injury, care for a sick family member, military leave, or other job-protected time away from work.
            </p>
            <button className="cl-btn cl-btn--primary" onClick={() => navigate(`${base}/file-claim/request-leave?step=1`)}>Request Leave</button>
            <span className="cl-intro-card-meta">Takes about 5-8 minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
