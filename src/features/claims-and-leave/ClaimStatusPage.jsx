import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './file-claim-wizard.css';
import './guest-file-claim.css';
import './claim-status.css';
import './claims-and-leave.css';

function GuestHeader() {
  return (
    <div className="gc-header-wrapper">
      <header className="gc-header">
        <div className="gc-header-left">
          <span className="gc-header-brand">my<strong>Mutual</strong></span>
        </div>
        <div className="gc-header-right">
          <a href="/claims-and-leave" className="gc-header-signin">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Sign In
          </a>
        </div>
      </header>
    </div>
  );
}

function GuestFooter() {
  return (
    <footer className="gc-footer">
      <div className="gc-footer-inner">
        <span className="gc-footer-brand">my<strong>Mutual</strong></span>
        <div className="gc-footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Accessibility Services</a>
        </div>
        <span className="gc-footer-copyright">&copy; 2026 Mutual of Omaha Insurance Company. All rights reserved.</span>
      </div>
    </footer>
  );
}

function CalendarIcon() {
  return (
    <svg className="input-icon input-icon--calendar" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function DateInput({ value, onChange, placeholder = 'mm/dd/yyyy', ...props }) {
  const displayValue = value ? new Date(`${value}T00:00:00`).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : '';
  return (
    <div className="date-input-wrapper">
      <input type="text" value={displayValue} readOnly placeholder={placeholder} onClick={(e) => { const hidden = e.target.nextSibling; if (hidden) hidden.showPicker?.(); }} {...props} />
      <input type="date" className="date-input-hidden" value={value} onChange={onChange} tabIndex={-1} />
      <CalendarIcon />
    </div>
  );
}

export default function ClaimStatusPage() {
  const navigate = useNavigate();
  const [claimId, setClaimId] = useState('GC-2026-48291');
  const [dob, setDob] = useState('1990-04-15');
  const [phase, setPhase] = useState('lookup'); // 'lookup' | 'loading' | 'result' | 'not-found'

  function handleLookup() {
    if (!claimId || !dob) return;
    setPhase('loading');
    setTimeout(() => {
      setPhase('result');
    }, 1800);
  }

  // === LOOKUP FORM ===
  if (phase === 'lookup') {
    return (
      <div className="gc-shell">
        <GuestHeader />
        <main className="gc-main">
          <div className="fc-wiz-shell">
            <div className="fc-wiz-wrap">
              <div className="fc-wiz-card cs-lookup-card">
                <div className="cs-lookup-header">
                  <div className="cs-lookup-icon">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                      <circle cx="11" cy="11" r="7" stroke="var(--color-brand-primary)" strokeWidth="1.5"/>
                      <path d="M16 16l4.5 4.5" stroke="var(--color-brand-primary)" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h2>Check Claim Status</h2>
                  <p className="fc-wiz-subtitle">Enter your Claim ID and Date of Birth to look up your claim.</p>
                </div>

                <div className="cs-lookup-form">
                  <div className="form-group">
                    <label>Claim ID <span className="req">*</span></label>
                    <input type="text" value={claimId} onChange={(e) => setClaimId(e.target.value)} placeholder="e.g. GC-2026-48291" />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth <span className="req">*</span></label>
                    <DateInput value={dob} onChange={(e) => setDob(e.target.value)} />
                  </div>
                  <button className="btn btn-next cs-lookup-btn" disabled={!claimId || !dob} onClick={handleLookup}>Look Up Claim</button>
                </div>

                <div className="cs-lookup-alt">
                  <span>Don't have a Claim ID?</span>
                  <button className="cs-lookup-alt-link" onClick={() => navigate('/guest-claim')}>File a new claim</button>
                </div>

                <div className="cs-signin-callout">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  <div>
                    <strong>Have an account?</strong>
                    <span>Sign in to track all your claims, upload documents, and receive real-time updates.</span>
                  </div>
                  <a href="/claims-and-leave" className="cs-signin-callout-link">Sign In</a>
                </div>
              </div>
            </div>
          </div>
        </main>
        <GuestFooter />
      </div>
    );
  }

  // === LOADING ===
  if (phase === 'loading') {
    return (
      <div className="gc-shell">
        <GuestHeader />
        <main className="gc-main">
          <div className="fc-wiz-shell">
            <div className="fc-wiz-wrap">
              <div className="fc-wiz-card" style={{ textAlign: 'center', padding: '80px 40px' }}>
                <div style={{ width: 56, height: 56, margin: '0 auto 20px', borderRadius: '50%', border: '4px solid var(--color-brand-primary)', borderTopColor: 'transparent', animation: 'fcWizSpin 1s linear infinite' }} />
                <h2>Looking up your claim...</h2>
                <p className="fc-wiz-subtitle">Verifying your information.</p>
                <style>{`@keyframes fcWizSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
              </div>
            </div>
          </div>
        </main>
        <GuestFooter />
      </div>
    );
  }

  // === RESULT ===
  if (phase === 'result') {
    return (
      <div className="gc-shell">
        <GuestHeader />
        <main className="gc-main">
          <div className="fc-wiz-shell">
            <div className="fc-wiz-wrap">
              <div className="cs-result-header">
                <button className="cs-back-btn" onClick={() => setPhase('lookup')}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Back to lookup
                </button>
                <h1 className="cs-result-title">Claim Status</h1>
                <p className="cs-result-claim-id">Claim ID: <strong>GC-2026-48291</strong></p>
              </div>

              {/* Claim Details */}
              <div className="fc-wiz-card cs-details-card">
                <div className="cs-status-top">
                  <h3 className="cs-section-title" style={{ margin: 0 }}>Claim Details</h3>
                  <div className="cs-status-badge cs-status-badge--review">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/><path d="M7 4.5v3l2 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Under Review
                  </div>
                </div>
                <div className="cs-details-grid">
                  <div className="cs-detail-item">
                    <span className="cs-detail-label">Claim Type</span>
                    <span className="cs-detail-value">Short-Term Disability</span>
                  </div>
                  <div className="cs-detail-item">
                    <span className="cs-detail-label">Claimant</span>
                    <span className="cs-detail-value">Jane Mitchell</span>
                  </div>
                  <div className="cs-detail-item">
                    <span className="cs-detail-label">Date of Event</span>
                    <span className="cs-detail-value">May 8, 2026</span>
                  </div>
                  <div className="cs-detail-item">
                    <span className="cs-detail-label">Provider</span>
                    <span className="cs-detail-value">Dr. Julia Kelly, MD</span>
                  </div>
                  <div className="cs-detail-item">
                    <span className="cs-detail-label">Filed</span>
                    <span className="cs-detail-value">May 22, 2026</span>
                  </div>
                  <div className="cs-detail-item">
                    <span className="cs-detail-label">Expected Decision</span>
                    <span className="cs-detail-value">May 27, 2026</span>
                  </div>
                </div>
              </div>

              {/* Pending Actions */}
              <div className="cldb-v2-action-item">
                <div className="cldb-v2-action-body">
                  <div className="cldb-v2-action-tag">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="#dc2626"/><path d="M7 4.5v3M7 9.5h.01" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    <span className="cldb-v2-action-tag-label cldb-v2-action-tag--red">Action Required</span>
                  </div>
                  <div className="cldb-v2-action-title-row">
                    <h3 className="cldb-v2-action-title">Upload Supporting Documents</h3>
                  </div>
                  <p className="cldb-v2-action-desc">Please upload medical certification or provider records to support your claim.</p>
                  <p className="cldb-v2-action-meta">Due: May 29, 2026</p>
                </div>
                <div className="cldb-v2-action-cta">
                  <button className="cldb-v2-btn-outline">Upload</button>
                </div>
              </div>

              {/* Status */}
              <div className="fc-wiz-card cs-timeline-card">
                <h3 className="cs-section-title">Status</h3>
                <div className="cs-tracker">
                  <div className="cs-tracker-step cs-tracker-step--done">
                    <div className="cs-tracker-dot">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6l2.5 2.5L9.5 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div className="cs-tracker-line cs-tracker-line--done" />
                    <div className="cs-tracker-content">
                      <strong>Submitted</strong>
                      <span>May 22, 2026 — 12:03 PM</span>
                    </div>
                  </div>
                  <div className="cs-tracker-step cs-tracker-step--done">
                    <div className="cs-tracker-dot">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6l2.5 2.5L9.5 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div className="cs-tracker-line cs-tracker-line--done" />
                    <div className="cs-tracker-content">
                      <strong>Eligibility Confirmed</strong>
                      <span>May 22, 2026 — 1:15 PM</span>
                    </div>
                  </div>
                  <div className="cs-tracker-step cs-tracker-step--active">
                    <div className="cs-tracker-dot" />
                    <div className="cs-tracker-line" />
                    <div className="cs-tracker-content">
                      <strong>Under Review</strong>
                      <span>Being reviewed by claims team</span>
                    </div>
                  </div>
                  <div className="cs-tracker-step">
                    <div className="cs-tracker-dot" />
                    <div className="cs-tracker-content">
                      <strong>Decision</strong>
                      <span>Expected by May 27, 2026</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="cs-bottom-section">
                <div className="cs-signin-callout">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  <div>
                    <strong>Want easier access?</strong>
                    <span>Sign in or create an account to track claims, upload documents, and get notifications.</span>
                  </div>
                  <a href="/claims-and-leave" className="cs-signin-callout-link">Sign In</a>
                </div>
                <div className="cs-bottom-actions">
                  <button className="btn btn-next" onClick={() => navigate('/guest-claim')}>File Another Claim</button>
                  <button className="btn btn-secondary" onClick={() => setPhase('lookup')}>Look Up Another Claim</button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <GuestFooter />
      </div>
    );
  }

  return null;
}
