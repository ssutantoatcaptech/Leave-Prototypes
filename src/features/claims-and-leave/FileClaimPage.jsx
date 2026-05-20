import { useNavigate } from 'react-router-dom';
import useBasePath from './useBasePath';

export default function FileClaimPage() {
  const navigate = useNavigate();
  const base = useBasePath();

  return (
    <div className="fc-page">
      <div className="fc-content">
        <div className="fc-header">
          <h1 className="fc-title">Get Started Filing a Claim or Requesting a Leave</h1>
          <p className="fc-subtitle">
            Select the option that best describes your situation. We'll guide you through the process step-by-step.
          </p>
        </div>

        <div className="fc-cards">
          {/* Request a Leave card */}
          <div className="fc-card">
            <div className="fc-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--color-brand-navy)">
                <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/>
              </svg>
            </div>
            <div className="fc-card-body">
              <h2 className="fc-card-title">Request a Leave</h2>
              <p className="fc-card-desc">
                Choose this if you need to request time off work for FMLA, state-mandated leave, or company-sponsored leave programs.
              </p>
            </div>
            <div className="fc-card-footer">
              <button
                className="fc-btn-primary"
                onClick={() => {
                  sessionStorage.removeItem('planTransfer');
                  sessionStorage.removeItem('requestLeaveReactDraft');
                  navigate(`${base}/file-claim/request-leave?step=1`);
                }}
              >
                Start a Leave
              </button>
              <span className="fc-card-meta">Takes about 5-8 minutes</span>
            </div>
          </div>

          {/* File a Claim card */}
          <div className="fc-card">
            <div className="fc-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--color-brand-navy)">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
            </div>
            <div className="fc-card-body">
              <h2 className="fc-card-title">File a Claim</h2>
              <p className="fc-card-desc">
                Choose this if you need to submit a claim for disability, accidental death, critical illness, or hospital indemnity.
              </p>
            </div>
            <div className="fc-card-footer">
              <button
                className="fc-btn-primary"
                onClick={() => {
                  sessionStorage.removeItem('fileClaimWizardDraft');
                  navigate(`${base}/file-claim/start-claim?step=0`);
                }}
              >Start a Claim</button>
              <span className="fc-card-meta">Takes about 10-15 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
