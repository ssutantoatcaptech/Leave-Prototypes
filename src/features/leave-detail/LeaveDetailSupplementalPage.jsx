import { useState } from 'react';
import { Link } from 'react-router-dom';
import './leave-detail-b.css';
import '../absence-details/absence-details-react.css';

function SiteNav({ user, initials }) {
  return (
    <div className="ldb-top-nav">
      <div className="ldb-nav-main">
        <div className="ldb-nav-main-left">
          <span className="ldb-nav-brand">my<span>Mutual</span></span>
          <div className="ldb-nav-links">
            <a href="#" className="ldb-nav-link">Dashboard</a>
            <a href="#" className="ldb-nav-link">My Coverages</a>
            <a href="#" className="ldb-nav-link active">Claims</a>
            <a href="#" className="ldb-nav-link">Leaves</a>
            <a href="#" className="ldb-nav-link">Support</a>
          </div>
        </div>
        <div className="ldb-nav-utilities">
          <button type="button" className="ldb-nav-util">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/></svg>
            Messages
          </button>
          <button type="button" className="ldb-nav-bell">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2C5.79 2 4 3.79 4 6v2.67L3 10h10l-1-1.33V6c0-2.21-1.79-4-4-4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6.5 12a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            <span className="ldb-nav-bell-dot" />
          </button>
          <div className="ldb-nav-avatar">
            <div className="ldb-nav-avatar-circle">{initials}</div>
            <span className="ldb-nav-avatar-name">{user}</span>
          </div>
        </div>
      </div>
      <div className="ldb-nav-secondary">
        <a href="#" className="ldb-nav-tab">My Claims</a>
        <a href="#" className="ldb-nav-tab active">Claim Detail</a>
        <a href="#" className="ldb-nav-tab">Payments</a>
        <a href="#" className="ldb-nav-tab">Documents</a>
        <a href="#" className="ldb-nav-tab">Support</a>
      </div>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="ldb-site-footer">
      <div className="ldb-site-footer-inner">
        <div className="ldb-site-footer-grid">
          <div className="ldb-site-footer-col">
            <h4>Resources</h4>
            <a href="#">Leave Policies</a>
            <a href="#">FAQs</a>
            <a href="#">Forms &amp; Documents</a>
          </div>
          <div className="ldb-site-footer-col">
            <h4>Support</h4>
            <a href="#">Contact HR</a>
            <a href="#">Help Center</a>
            <a href="#">Report an Issue</a>
          </div>
          <div className="ldb-site-footer-col">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Accessibility</a>
          </div>
          <div className="ldb-site-footer-col">
            <h4>Contact</h4>
            <a href="#">Phone: 1-800-HR-HELP</a>
            <a href="#">Email: hrbenefits@company.com</a>
            <a href="#">Hours: Mon-Fri, 8am-6pm EST</a>
          </div>
        </div>
        <div className="ldb-site-footer-bottom">
          <span>&copy; 2026 HR Benefits Portal. All rights reserved.</span>
          <div className="ldb-site-footer-social">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.5v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69C6.73 19.91 6.14 18 6.14 18c-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.12 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" stroke="currentColor" strokeWidth="1.5"/></svg>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LeaveDetailSupplementalPage() {
  var [showAllTasks, setShowAllTasks] = useState(false);
  var [aboutClaimOpen, setAboutClaimOpen] = useState(true);

  return (
    <div className="ldb-page">
      <SiteNav user="Marcus Thompson" initials="MT" />

      <div className="ldb-content">
        {/* Breadcrumb */}
        <div className="ldb-breadcrumb">
          <Link to="/overview-react">Home</Link>
          <span className="ldb-bc-sep">&gt;</span>
          <Link to="/absence-history">Claims</Link>
          <span className="ldb-bc-sep">&gt;</span>
          <span>NTN-9312-SC-82</span>
        </div>

        {/* Title Card */}
        <div className="ldb-title-card">
          <div className="ldb-title-left">
            <div className="ldb-title-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="#0f0f14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 22V12M12 12L3 7M12 12l9-5" stroke="#0f0f14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <h1 className="ldb-title">NTN-9312-SC-82 — Supplemental Health <span className="ldb-status-badge" style={{ fontSize: 12, marginLeft: 12, verticalAlign: 'middle', background: '#fffbeb', color: '#92400e' }}>Under Review</span></h1>
              <div className="ldb-title-meta">
                <span style={{ fontSize: 14, color: '#525252' }}>Hospital Indemnity — flat cash benefit for inpatient stays</span>
                <span style={{ fontSize: 13, color: '#737373', marginLeft: 12 }}>Apr 15 – Apr 17, 2025 · One-time</span>
              </div>
            </div>
          </div>
          <div className="ldb-title-actions">
            <button type="button" className="ldb-btn-secondary">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/></svg>
              Message Claims Team
            </button>
          </div>
        </div>

        <div className="ldb-v2-layout">
          {/* Left: Main content */}
          <div className="ldb-v2-main">

            {/* Claim Details */}
            <div className="ldb-card">
              <button type="button" className="ldb-card-collapse-header" onClick={function () { setAboutClaimOpen(!aboutClaimOpen); }}>
                <h2 className="ldb-card-title" style={{ marginBottom: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  Claim Details
                </h2>
                <svg className={'ldb-card-collapse-chevron' + (aboutClaimOpen ? ' open' : '')} width="12" height="7" viewBox="0 0 12 7" fill="none"><path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              {aboutClaimOpen && (
                <div style={{ marginTop: 16 }}>
                  <div className="dt-info-grid">
                    <div>
                      <div className="dt-info-field-label">Claim ID</div>
                      <div className="dt-info-field-value" style={{ fontWeight: 700 }}>NTN-9312-SC-82</div>
                    </div>
                    <div>
                      <div className="dt-info-field-label">Benefit Type</div>
                      <div className="dt-info-field-value">Hospital Indemnity</div>
                    </div>
                    <div>
                      <div className="dt-info-field-label">Daily Benefit</div>
                      <div className="dt-info-field-value">$200 / day</div>
                    </div>
                    <div>
                      <div className="dt-info-field-label">Inpatient Days</div>
                      <div className="dt-info-field-value">3 days (Apr 15–17, 2025)</div>
                    </div>
                    <div>
                      <div className="dt-info-field-label">Expected Payout</div>
                      <div className="dt-info-field-value" style={{ fontWeight: 700, fontSize: 18 }}>$600.00</div>
                    </div>
                    <div>
                      <div className="dt-info-field-label">Payment Method</div>
                      <div className="dt-info-field-value">Direct Deposit ****4872</div>
                    </div>
                    <div>
                      <div className="dt-info-field-label">Status</div>
                      <div className="dt-info-field-value">Under Review — awaiting itemized bill</div>
                    </div>
                    <div>
                      <div className="dt-info-field-label">Filed</div>
                      <div className="dt-info-field-value">Apr 18, 2025</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 16, padding: '12px 16px', background: '#f5f3ff', borderRadius: 8, border: '1px solid #ede9fe', fontSize: 13, color: '#5b21b6' }}>
                    <strong>What is Hospital Indemnity?</strong> This benefit pays a flat daily cash amount for each day you are admitted as an inpatient. It pays in addition to any other disability or medical benefits.
                  </div>
                </div>
              )}
            </div>

            {/* Related Leave Case */}
            <div className="ldb-card">
              <h2 className="ldb-card-title">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Related Leave Case
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 16px', background: '#fafafa', borderRadius: 8, border: '1px solid #f0f0f2' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>NTN-9312 — Medical Leave</div>
                  <div style={{ fontSize: 13, color: '#737373', marginTop: 2 }}>Back Surgery Recovery · Apr 15 – May 15, 2025</div>
                </div>
                <span className="ldb-status-badge pending-status" style={{ fontSize: 11 }}>Pending</span>
                <Link to="/leave-detail-v2e" style={{ fontSize: 13, fontWeight: 600, color: '#0033a0', textDecoration: 'none' }}>
                  View Case &rarr;
                </Link>
              </div>
            </div>

            {/* Payment */}
            <div className="ldb-card">
              <h2 className="ldb-card-title">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" stroke="currentColor" strokeWidth="1.2"/><path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                Payment
              </h2>
              <div style={{ padding: '16px', background: '#fafafa', borderRadius: 8, border: '1px solid #f0f0f2' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                  <div>
                    <div className="dt-info-field-label">Amount</div>
                    <div className="dt-info-field-value" style={{ fontWeight: 700, fontSize: 18 }}>$600.00</div>
                  </div>
                  <div>
                    <div className="dt-info-field-label">Status</div>
                    <div className="dt-info-field-value">Pending — awaiting approval</div>
                  </div>
                  <div>
                    <div className="dt-info-field-label">Method</div>
                    <div className="dt-info-field-value">Direct Deposit ****4872</div>
                  </div>
                </div>
                <div style={{ marginTop: 12, fontSize: 13, color: '#737373' }}>
                  Payment will be issued as a one-time lump sum once the claim is approved.
                </div>
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="ldb-sidebar">
            {/* Action Items */}
            <div className="ldb-side-card">
              <div className="ldb-tasks-header">
                <h3 className="ldb-side-title">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Items Requiring Action
                </h3>
                <span className="ldb-tasks-count">1 needed</span>
              </div>

              <div className="ldb-action-list">
                <div className="ldb-action-item">
                  <div className="ldb-action-dot" />
                  <div className="ldb-action-content">
                    <div className="ldb-action-title">Upload Itemized Hospital Bill</div>
                    <div className="ldb-action-meta">Required to complete claim review</div>
                  </div>
                  <button type="button" className="ldb-btn-upload-inline">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 12V4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M4.5 6.5L8 3l3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 13h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    Upload
                  </button>
                </div>
              </div>

              {!showAllTasks && (
                <button type="button" className="ldb-tasks-expand" onClick={function () { setShowAllTasks(true); }}>
                  +1 completed
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              )}

              {showAllTasks && (
                <>
                <div className="ldb-tasks-done-section">
                  <div className="ldb-tasks-done-label">Completed</div>
                  <div className="ldb-action-list">
                    <div className="ldb-action-item done">
                      <div className="ldb-action-dot done" />
                      <div className="ldb-action-content">
                        <div className="ldb-action-title">Claim Filed</div>
                        <div className="ldb-action-meta">Completed Apr 18, 2025</div>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="button" className="ldb-tasks-expand" onClick={function () { setShowAllTasks(false); }}>
                  Show less
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: 'rotate(180deg)' }}><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                </>
              )}
            </div>

            {/* Claim Summary */}
            <div className="ldb-side-card">
              <h3 className="ldb-side-title">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Claim Summary
              </h3>
              <div className="ldb-v2-snapshot-section">
                <div className="ldb-v2-snapshot-stats">
                  <div className="ldb-v2-snapshot-stat">
                    <span className="ldb-v2-snapshot-stat-value">$600</span>
                    <span className="ldb-v2-snapshot-stat-label">Expected Payout</span>
                  </div>
                  <div className="ldb-v2-snapshot-stat">
                    <span className="ldb-v2-snapshot-stat-value">3 days</span>
                    <span className="ldb-v2-snapshot-stat-label">Inpatient Stay</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="ldb-side-card">
              <div className="ldb-docs-header">
                <h3 className="ldb-side-title">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="currentColor" strokeWidth="1.2"/></svg>
                  Documents
                </h3>
                <span className="ldb-docs-count">0 / 1 uploaded</span>
              </div>
              <div className="ldb-doc-list">
                <div className="ldb-doc-item">
                  <div className="ldb-doc-status-icon">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" stroke="#f59e0b" strokeWidth="1.5"/></svg>
                  </div>
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">Itemized_Hospital_Bill.pdf</div>
                    <div className="ldb-doc-meta">Required · Blocks claim approval</div>
                  </div>
                  <button type="button" className="ldb-doc-download-btn" aria-label="Upload">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 12V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M4.5 6.5L8 3l3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <SiteFooter />
    </div>
  );
}
