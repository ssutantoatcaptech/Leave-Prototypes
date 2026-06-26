import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBasePath from './useBasePath';

const PASSWORD = 'letmein';

function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === PASSWORD) {
      sessionStorage.setItem('fc-unlocked', '1');
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#f4f6f8',
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#fff', borderRadius: 12, padding: '40px 36px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)', textAlign: 'center',
        maxWidth: 360, width: '100%',
      }}>
        <h2 style={{ margin: '0 0 8px', color: '#1a2b4a', fontSize: 20 }}>Enter Password</h2>
        <p style={{ margin: '0 0 20px', color: '#5a6a7a', fontSize: 14 }}>This page is password-protected.</p>
        <input
          type="password"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(false); }}
          placeholder="Password"
          style={{
            width: '100%', padding: '10px 14px', fontSize: 15,
            border: `1px solid ${error ? '#d32f2f' : '#cfd8e3'}`,
            borderRadius: 8, outline: 'none', boxSizing: 'border-box',
          }}
          autoFocus
        />
        {error && <p style={{ color: '#d32f2f', fontSize: 13, margin: '8px 0 0' }}>Incorrect password</p>}
        <button type="submit" style={{
          marginTop: 16, width: '100%', padding: '10px 0',
          background: '#105FA6', color: '#fff', border: 'none',
          borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer',
        }}>Unlock</button>
      </form>
    </div>
  );
}

function EllipseGroup() {
  return (
    <>
      <svg className="fc-ellipse" viewBox="0 0 517 517" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="258.1" cy="258.1" r="249.4" stroke="url(#grad1)" strokeWidth="17.56" opacity="0.25"/>
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#105FA6"/>
            <stop offset="100%" stopColor="#03A0AD"/>
          </linearGradient>
        </defs>
      </svg>
      <svg className="fc-ellipse" viewBox="0 0 517 517" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="258.1" cy="258.1" r="249.4" stroke="url(#grad2)" strokeWidth="17.56" opacity="0.25"/>
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#105FA6"/>
            <stop offset="100%" stopColor="#03A0AD"/>
          </linearGradient>
        </defs>
      </svg>
      <svg className="fc-ellipse fc-ellipse--teal" viewBox="0 0 517 517" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="258.1" cy="258.1" r="249.4" stroke="url(#grad3)" strokeWidth="17.56" opacity="0.25"/>
        <defs>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#105FA6"/>
            <stop offset="100%" stopColor="#03A0AD"/>
          </linearGradient>
        </defs>
      </svg>
    </>
  );
}

export default function FileClaimPage() {
  const navigate = useNavigate();
  const base = useBasePath();
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('fc-unlocked') === '1');

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div className="fc-page">
      <div className="fc-bg-decoration fc-bg-decoration--bottom-left">
        <EllipseGroup />
      </div>
      <div className="fc-bg-decoration fc-bg-decoration--top-right">
        <EllipseGroup />
      </div>

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
