import { useState } from 'react';
import { Link } from 'react-router-dom';
import './leave-detail-b.css';

function SiteNav({ user, initials }) {
  return (
    <div className="ldb-top-nav">
      <div className="ldb-nav-main">
        <div className="ldb-nav-main-left">
          <a href="/" style={{ textDecoration: "none" }}><span className="ldb-nav-brand">my<span>Benefits</span></span></a>
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

export default function LeaveDetailV3cPage() {
  var [showAllTasks, setShowAllTasks] = useState(false);
  var [paymentsOpen, setPaymentsOpen] = useState(true);

  return (
    <div className="ldb-page">
      <SiteNav user="Marcus Thompson" initials="MT" />

      <div className="ldb-content">
        {/* Breadcrumb */}
        <div className="ldb-breadcrumb">
          <Link to="/overview-react">Home</Link>
          <span className="ldb-bc-sep">/</span>
          <Link to="/claims-status">My Claims</Link>
          <span className="ldb-bc-sep">/</span>
          <span>Group Disability Claim</span>
        </div>


        {/* Title Card */}
        <div className="ldb-title-card">
          <div className="ldb-title-left">
            <div className="ldb-title-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 12h6M12 9v6" stroke="#0f0f14" strokeWidth="1.5" strokeLinecap="round"/><rect x="3" y="3" width="18" height="18" rx="4" stroke="#0f0f14" strokeWidth="1.5"/></svg>
            </div>
            <div>
              <h1 className="ldb-title">Group Disability Claim (STD) <span className="ldb-status-badge pending-status" style={{ fontSize: 12, marginLeft: 12, verticalAlign: 'middle' }}>Pending</span></h1>
              <div className="ldb-title-meta">
                <span style={{ fontSize: 14, color: '#525252' }}>Back Surgery Recovery — Treatment required for a medical condition</span>
                <span style={{ fontSize: 13, color: '#737373', marginLeft: 12 }}>NTN-9312-GDC-81</span>
              </div>
            </div>
          </div>
        </div>

        {/* Linked Absence Reference */}
        <div style={{ margin: '0 0 16px', padding: '12px 20px', background: '#f8f8fa', borderRadius: 8, border: '1px solid #e5e5e7', display: 'flex', alignItems: 'center', gap: 12 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6.5 9.5l3-3M5.5 7.5L4 9a2.83 2.83 0 004 4l1.5-1.5M10.5 8.5L12 7a2.83 2.83 0 00-4-4L6.5 4.5" stroke="#525252" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: 13, color: '#525252' }}>Linked to employer absence: </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#0f0f14' }}>NTN-9312 — Medical Leave (Intermittent)</span>
            <span style={{ fontSize: 12, color: '#737373', marginLeft: 8 }}>Apr 15 – May 15, 2025</span>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="ldb-v2-layout">
          {/* Main */}
          <div className="ldb-v2-main">
            {/* Claim Details Card */}
            <div className="ldb-card">
              <h2 className="ldb-card-title">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                Claim Details
              </h2>
              <div className="ldb-v3-details-grid">
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Claim Number</span>
                  <span className="ldb-detail-value">NTN-9312-GDC-81</span>
                </div>
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Policy</span>
                  <span className="ldb-detail-value">Group STD — Employer Paid</span>
                </div>
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Condition</span>
                  <span className="ldb-detail-value">Surgical procedure — back surgery recovery</span>
                </div>
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Disability Date</span>
                  <span className="ldb-detail-value">Apr 15, 2025</span>
                </div>
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Elimination Period</span>
                  <span className="ldb-detail-value">7 calendar days</span>
                </div>
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Benefits Begin</span>
                  <span className="ldb-detail-value">Apr 22, 2025</span>
                </div>
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Benefit Rate</span>
                  <span className="ldb-detail-value">60% of pre-disability earnings</span>
                </div>
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Weekly Benefit</span>
                  <span className="ldb-detail-value" style={{ fontWeight: 700 }}>$2,308.00</span>
                </div>
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Max Benefit Duration</span>
                  <span className="ldb-detail-value">26 weeks</span>
                </div>
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Approved Through</span>
                  <span className="ldb-detail-value">May 15, 2025</span>
                </div>
              </div>

              {/* Benefit Duration Bar */}
              <div className="ldb-v3-duration">
                <div className="ldb-v3-duration-header">
                  <span className="ldb-v3-duration-label">Benefit Duration</span>
                  <span className="ldb-v3-duration-value">3.3 of 26 weeks used</span>
                </div>
                <div className="ldb-v3-duration-bar">
                  <div className="ldb-v3-duration-fill" style={{ width: '13%' }} />
                </div>
                <div className="ldb-v3-duration-dates">
                  <span>Apr 22, 2025</span>
                  <span>Oct 21, 2025</span>
                </div>
              </div>
            </div>

            {/* Payments */}
            <div className="ldb-card">
              <button type="button" className="ldb-card-collapse-header" onClick={function () { setPaymentsOpen(!paymentsOpen); }}>
                <h2 className="ldb-card-title" style={{ marginBottom: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" stroke="currentColor" strokeWidth="1.2"/><path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  Payments
                </h2>
                <svg className={'ldb-card-collapse-chevron' + (paymentsOpen ? ' open' : '')} width="12" height="7" viewBox="0 0 12 7" fill="none"><path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              {paymentsOpen && (
                <>
                  <p className="ldb-card-context">Weekly payments via direct deposit. Net of federal &amp; state tax withholding.</p>
                  <div className="ldb-payments-grid">
                    <div className="ldb-payment-item">
                      <span className="ldb-payment-label">Most Recent Payment</span>
                      <span className="ldb-payment-value">$2,308.00</span>
                    </div>
                    <div className="ldb-payment-item">
                      <span className="ldb-payment-label">Total Paid to Date</span>
                      <span className="ldb-payment-value">$7,893.00</span>
                    </div>
                    <div className="ldb-payment-item">
                      <span className="ldb-payment-label">Expected Next Payment</span>
                      <span className="ldb-payment-value">May 19, 2025</span>
                    </div>
                    <div className="ldb-payment-item">
                      <span className="ldb-payment-label">Payment Method</span>
                      <span className="ldb-payment-value">Direct Deposit ****4872</span>
                    </div>
                  </div>
                  <div className="ldb-v2e-pmt-list">
                    <div className="ldb-v2e-pmt-row">
                      <div className="ldb-v2e-pmt-date">May 12, 2025</div>
                      <div className="ldb-v2e-pmt-desc">STD Weekly Benefit</div>
                      <div className="ldb-v2e-pmt-amount">$2,308.00</div>
                    </div>
                    <div className="ldb-v2e-pmt-row">
                      <div className="ldb-v2e-pmt-date">May 5, 2025</div>
                      <div className="ldb-v2e-pmt-desc">STD Weekly Benefit</div>
                      <div className="ldb-v2e-pmt-amount">$2,308.00</div>
                    </div>
                    <div className="ldb-v2e-pmt-row">
                      <div className="ldb-v2e-pmt-date">Apr 28, 2025</div>
                      <div className="ldb-v2e-pmt-desc">STD Weekly Benefit</div>
                      <div className="ldb-v2e-pmt-amount">$2,308.00</div>
                    </div>
                  </div>
                  <Link to="/claims-and-leave/payments?claim=NTN-9312-GDC-81" className="ldb-payments-view-btn" style={{ textDecoration: 'none' }}>
                    VIEW ALL PAYMENTS
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                </>
              )}
            </div>

          </div>

          {/* Sidebar */}
          <div className="ldb-sidebar">
            {/* Your Actions */}
            <div className="ldb-side-card">
              <div className="ldb-tasks-header">
                <h3 className="ldb-side-title">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Your Actions
                </h3>
                <span className="ldb-tasks-count">1 needed</span>
              </div>

              <div className="ldb-action-list">
                <div className="ldb-action-item">
                  <div className="ldb-action-dot" />
                  <div className="ldb-action-content">
                    <div className="ldb-action-title">Upload Updated Medical Certification</div>
                    <div className="ldb-action-meta">Due May 20 · Required to continue benefits past May 15</div>
                  </div>
                  <button type="button" className="ldb-btn-upload-inline">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 12V4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M4.5 6.5L8 3l3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 13h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    Upload
                  </button>
                </div>
              </div>

              {!showAllTasks && (
                <button type="button" className="ldb-tasks-expand" onClick={function () { setShowAllTasks(true); }}>
                  +2 completed
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
                        <div className="ldb-action-title">Medical Certification Submitted</div>
                        <div className="ldb-action-meta">Completed Apr 18, 2025</div>
                      </div>
                    </div>
                    <div className="ldb-action-item done">
                      <div className="ldb-action-dot done" />
                      <div className="ldb-action-content">
                        <div className="ldb-action-title">Attending Physician Statement</div>
                        <div className="ldb-action-meta">Completed Apr 16, 2025</div>
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

            {/* Claim Status */}
            <div className="ldb-side-card">
              <h3 className="ldb-side-title">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/><path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                Claim Status
              </h3>
              <div className="ldb-v3-status-badge-wrap">
                <span className="ldb-status-badge pending-status">PENDING</span>
                <span className="ldb-v3-status-since">Awaiting continued certification</span>
              </div>
              <div className="ldb-v3-status-timeline">
                <div className="ldb-v3-step done">
                  <div className="ldb-v3-step-dot" />
                  <div className="ldb-v3-step-content">
                    <div className="ldb-v3-step-title">Claim Filed</div>
                    <div className="ldb-v3-step-date">Apr 15, 2025</div>
                  </div>
                </div>
                <div className="ldb-v3-step done">
                  <div className="ldb-v3-step-dot" />
                  <div className="ldb-v3-step-content">
                    <div className="ldb-v3-step-title">Documentation Received</div>
                    <div className="ldb-v3-step-date">Apr 18, 2025</div>
                  </div>
                </div>
                <div className="ldb-v3-step done">
                  <div className="ldb-v3-step-dot" />
                  <div className="ldb-v3-step-content">
                    <div className="ldb-v3-step-title">Initial Period Approved</div>
                    <div className="ldb-v3-step-date">Apr 22, 2025</div>
                    <div className="ldb-v3-step-desc">Approved through May 15, 2025. 7-day elimination period applied.</div>
                  </div>
                </div>
                <div className="ldb-v3-step current">
                  <div className="ldb-v3-step-dot" />
                  <div className="ldb-v3-step-content">
                    <div className="ldb-v3-step-title">Benefits In Payment</div>
                    <div className="ldb-v3-step-date">Since Apr 22, 2025</div>
                    <div className="ldb-v3-step-desc">Next payment May 19. Updated certification needed to extend.</div>
                  </div>
                </div>
                <div className="ldb-v3-step upcoming">
                  <div className="ldb-v3-step-dot" />
                  <div className="ldb-v3-step-content">
                    <div className="ldb-v3-step-title">Continued Review</div>
                    <div className="ldb-v3-step-date">May 15, 2025</div>
                    <div className="ldb-v3-step-desc">Certification required to extend benefits beyond this date.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents & EOBs */}
            <div className="ldb-side-card">
              <h3 className="ldb-side-title">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="currentColor" strokeWidth="1.2"/></svg>
                Documents &amp; EOBs
              </h3>
              <div className="ldb-doc-list">
                <div className="ldb-doc-item">
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">EOB — May 12</div>
                    <div className="ldb-doc-meta">PDF · May 12, 2025</div>
                  </div>
                  <a href="#" className="ldb-link">Download</a>
                </div>
                <div className="ldb-doc-item">
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">EOB — May 5</div>
                    <div className="ldb-doc-meta">PDF · May 5, 2025</div>
                  </div>
                  <a href="#" className="ldb-link">Download</a>
                </div>
                <div className="ldb-doc-item">
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">EOB — Apr 28</div>
                    <div className="ldb-doc-meta">PDF · Apr 28, 2025</div>
                  </div>
                  <a href="#" className="ldb-link">Download</a>
                </div>
                <div className="ldb-doc-item">
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">Medical Certification</div>
                    <div className="ldb-doc-meta">PDF · Apr 18, 2025</div>
                  </div>
                  <a href="#" className="ldb-link">Download</a>
                </div>
                <div className="ldb-doc-item">
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">Attending Physician Statement</div>
                    <div className="ldb-doc-meta">PDF · Apr 16, 2025</div>
                  </div>
                  <a href="#" className="ldb-link">Download</a>
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
