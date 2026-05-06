import { useState } from 'react';
import { Link } from 'react-router-dom';
import './leave-detail-b.css';

function SiteNav({ user, initials }) {
  return (
    <div className="ldb-top-nav">
      <div className="ldb-nav-main">
        <div className="ldb-nav-main-left">
          <span className="ldb-nav-brand">my<span>Benefits</span></span>
          <div className="ldb-nav-links">
            <a href="#" className="ldb-nav-link">Dashboard</a>
            <a href="#" className="ldb-nav-link">My Coverages</a>
            <a href="#" className="ldb-nav-link">Claims</a>
            <a href="#" className="ldb-nav-link active">Leaves</a>
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
        <a href="#" className="ldb-nav-tab">My Leave</a>
        <a href="#" className="ldb-nav-tab">Plan Leave</a>
        <a href="#" className="ldb-nav-tab">Request Leave</a>
        <a href="#" className="ldb-nav-tab active">Leave History</a>
        <a href="#" className="ldb-nav-tab">Leave Documents</a>
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

export default function LeaveDetailV3bPage() {
  var [showAllTasks, setShowAllTasks] = useState(false);
  var [paymentsDrawerOpen, setPaymentsDrawerOpen] = useState(false);

  return (
    <div className="ldb-page">
      <SiteNav user="Bob Martinez" initials="BM" />

      <div className="ldb-content">
        {/* Breadcrumb */}
        <div className="ldb-breadcrumb">
          <Link to="/overview-react">Home</Link>
          <span className="ldb-bc-sep">/</span>
          <Link to="/claims-status">My Claims</Link>
          <span className="ldb-bc-sep">/</span>
          <span>STD Claim</span>
        </div>

        {/* Employer Absence Alert */}
        <div className="ldb-v3-alert ldb-alert-warning">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#525252" strokeWidth="1.2"/><path d="M8 7v4" stroke="#525252" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="5" r="0.7" fill="#525252"/></svg>
          <div className="ldb-v3-alert-content">
            <span className="ldb-v3-alert-text">Your employer manages absence and return-to-work scheduling. To request time off or report schedule changes, visit your employer's HR portal.</span>
          </div>
        </div>

        {/* Title Card */}
        <div className="ldb-title-card">
          <div className="ldb-title-left">
            <div className="ldb-title-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 12h6M12 9v6" stroke="#0f0f14" strokeWidth="1.5" strokeLinecap="round"/><rect x="3" y="3" width="18" height="18" rx="4" stroke="#0f0f14" strokeWidth="1.5"/></svg>
            </div>
            <div>
              <h1 className="ldb-title">Short-Term Disability Claim</h1>
              <div className="ldb-title-meta">
                <span className="ldb-status-badge approved">APPROVED</span>
                <span className="ldb-title-sep">|</span>
                <span className="ldb-title-id">CLM-94820</span>
                <span className="ldb-title-sep">|</span>
                <span>Filed May 4, 2024</span>
              </div>
            </div>
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
                  <span className="ldb-detail-value">CLM-94820</span>
                </div>
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Policy</span>
                  <span className="ldb-detail-value">Group STD — Employer Paid</span>
                </div>
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Diagnosis</span>
                  <span className="ldb-detail-value">Lumbar disc herniation</span>
                </div>
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Leave Start</span>
                  <span className="ldb-detail-value">May 4, 2024</span>
                </div>
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Benefits Begin</span>
                  <span className="ldb-detail-value">May 11, 2024</span>
                </div>
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Expected RTW</span>
                  <span className="ldb-detail-value">Aug 5, 2024</span>
                </div>
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Max Benefit Duration</span>
                  <span className="ldb-detail-value">12 weeks</span>
                </div>
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Weeks Remaining</span>
                  <span className="ldb-detail-value">4 of 12 weeks</span>
                </div>
              </div>

              {/* Benefit Duration Bar */}
              <div className="ldb-v3-duration">
                <div className="ldb-v3-duration-header">
                  <span className="ldb-v3-duration-label">Benefit Duration</span>
                  <span className="ldb-v3-duration-value">8 of 12 weeks used</span>
                </div>
                <div className="ldb-v3-duration-bar">
                  <div className="ldb-v3-duration-fill" style={{ width: '66.7%' }} />
                </div>
                <div className="ldb-v3-duration-dates">
                  <span>May 11, 2024</span>
                  <span>Aug 3, 2024</span>
                </div>
              </div>
            </div>

            {/* Associated Payments — V2d pattern */}
            <div className="ldb-card">
              <h2 className="ldb-card-title" style={{ marginBottom: 8 }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" stroke="currentColor" strokeWidth="1.2"/><path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                Payments
              </h2>
              <p className="ldb-card-context">Bi-weekly payments via direct deposit. Net of federal &amp; state tax withholding.</p>
              <div className="ldb-payments-grid">
                <div className="ldb-payment-item">
                  <span className="ldb-payment-label">Most Recent Payment</span>
                  <span className="ldb-payment-value">$1,036.59</span>
                </div>
                <div className="ldb-payment-item">
                  <span className="ldb-payment-label">Total Paid to Date</span>
                  <span className="ldb-payment-value">$6,219.51</span>
                </div>
                <div className="ldb-payment-item">
                  <span className="ldb-payment-label">Expected Next Payment</span>
                  <span className="ldb-payment-value">Jul 26, 2024</span>
                </div>
                <div className="ldb-payment-item">
                  <span className="ldb-payment-label">Expected Weekly Benefit</span>
                  <span className="ldb-payment-value">$1,036.59</span>
                </div>
              </div>
              <button type="button" className="ldb-payments-view-btn" onClick={function () { setPaymentsDrawerOpen(true); }}>
                VIEW ALL PAYMENTS
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>

            {/* Documents & EOBs — own section */}
            <div className="ldb-card">
              <h2 className="ldb-card-title">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="currentColor" strokeWidth="1.2"/></svg>
                Documents &amp; EOBs
              </h2>
              <div className="ldb-doc-list">
                <div className="ldb-doc-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#525252" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="#525252" strokeWidth="1.2"/></svg>
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">Explanation of Benefits — Jul 12</div>
                    <div className="ldb-doc-meta">PDF · Generated Jul 12, 2024</div>
                  </div>
                  <a href="#" className="ldb-link">Download</a>
                </div>
                <div className="ldb-doc-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#525252" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="#525252" strokeWidth="1.2"/></svg>
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">Explanation of Benefits — Jun 28</div>
                    <div className="ldb-doc-meta">PDF · Generated Jun 28, 2024</div>
                  </div>
                  <a href="#" className="ldb-link">Download</a>
                </div>
                <div className="ldb-doc-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#525252" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="#525252" strokeWidth="1.2"/></svg>
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">Explanation of Benefits — Jun 14</div>
                    <div className="ldb-doc-meta">PDF · Generated Jun 14, 2024</div>
                  </div>
                  <a href="#" className="ldb-link">Download</a>
                </div>
                <div className="ldb-doc-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#2d2d2d" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="#2d2d2d" strokeWidth="1.2"/></svg>
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">Claim Approval Letter</div>
                    <div className="ldb-doc-meta">PDF · May 10, 2024</div>
                  </div>
                  <a href="#" className="ldb-link">Download</a>
                </div>
                <div className="ldb-doc-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#737373" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="#737373" strokeWidth="1.2"/></svg>
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">Attending Physician Statement</div>
                    <div className="ldb-doc-meta">PDF · Submitted May 6, 2024</div>
                  </div>
                  <a href="#" className="ldb-link">Download</a>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="ldb-sidebar">
            {/* Your Actions — V2d pattern */}
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
                    <div className="ldb-action-title">Upload Medical Certification</div>
                    <div className="ldb-action-meta">Due Jul 25 · Required to continue benefits past Aug 3</div>
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
                        <div className="ldb-action-title">Submit Initial Documentation</div>
                        <div className="ldb-action-meta">Completed May 7, 2024</div>
                      </div>
                    </div>
                    <div className="ldb-action-item done">
                      <div className="ldb-action-dot done" />
                      <div className="ldb-action-content">
                        <div className="ldb-action-title">Attending Physician Statement</div>
                        <div className="ldb-action-meta">Completed May 6, 2024</div>
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
                <span className="ldb-status-badge approved">APPROVED</span>
                <span className="ldb-v3-status-since">Since May 10, 2024</span>
              </div>
              <div className="ldb-v3-status-timeline">
                <div className="ldb-v3-step done">
                  <div className="ldb-v3-step-dot" />
                  <div className="ldb-v3-step-content">
                    <div className="ldb-v3-step-title">Claim Filed</div>
                    <div className="ldb-v3-step-date">May 4, 2024</div>
                  </div>
                </div>
                <div className="ldb-v3-step done">
                  <div className="ldb-v3-step-dot" />
                  <div className="ldb-v3-step-content">
                    <div className="ldb-v3-step-title">Documentation Received</div>
                    <div className="ldb-v3-step-date">May 7, 2024</div>
                  </div>
                </div>
                <div className="ldb-v3-step done">
                  <div className="ldb-v3-step-dot" />
                  <div className="ldb-v3-step-content">
                    <div className="ldb-v3-step-title">Claim Approved</div>
                    <div className="ldb-v3-step-date">May 10, 2024</div>
                    <div className="ldb-v3-step-desc">7-day elimination period waived.</div>
                  </div>
                </div>
                <div className="ldb-v3-step current">
                  <div className="ldb-v3-step-dot" />
                  <div className="ldb-v3-step-content">
                    <div className="ldb-v3-step-title">Benefits In Payment</div>
                    <div className="ldb-v3-step-date">Since May 11, 2024</div>
                    <div className="ldb-v3-step-desc">Next payment Jul 26.</div>
                  </div>
                </div>
                <div className="ldb-v3-step upcoming">
                  <div className="ldb-v3-step-dot" />
                  <div className="ldb-v3-step-content">
                    <div className="ldb-v3-step-title">Expected RTW</div>
                    <div className="ldb-v3-step-date">Aug 5, 2024</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <SiteFooter />

      {/* Payments Drawer */}
      {paymentsDrawerOpen && (
        <div className="ldb-drawer-overlay" onClick={function () { setPaymentsDrawerOpen(false); }}>
          <div className="ldb-drawer" onClick={function (e) { e.stopPropagation(); }}>
            <div className="ldb-drawer-header">
              <h2>All Payments</h2>
              <button type="button" className="ldb-drawer-close" onClick={function () { setPaymentsDrawerOpen(false); }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div className="ldb-drawer-body">
              <div className="ldb-drawer-pmt-row">
                <div className="ldb-drawer-pmt-header">
                  <div>
                    <div className="ldb-drawer-pmt-date">Jul 12, 2024</div>
                    <div className="ldb-drawer-pmt-period">Jun 29 – Jul 12</div>
                  </div>
                  <div className="ldb-drawer-pmt-amount">$1,036.59</div>
                </div>
              </div>
              <div className="ldb-drawer-pmt-row">
                <div className="ldb-drawer-pmt-header">
                  <div>
                    <div className="ldb-drawer-pmt-date">Jun 28, 2024</div>
                    <div className="ldb-drawer-pmt-period">Jun 15 – Jun 28</div>
                  </div>
                  <div className="ldb-drawer-pmt-amount">$1,036.59</div>
                </div>
              </div>
              <div className="ldb-drawer-pmt-row">
                <div className="ldb-drawer-pmt-header">
                  <div>
                    <div className="ldb-drawer-pmt-date">Jun 14, 2024</div>
                    <div className="ldb-drawer-pmt-period">Jun 01 – Jun 14</div>
                  </div>
                  <div className="ldb-drawer-pmt-amount">$1,036.59</div>
                </div>
              </div>
              <div className="ldb-drawer-pmt-row">
                <div className="ldb-drawer-pmt-header">
                  <div>
                    <div className="ldb-drawer-pmt-date">May 31, 2024</div>
                    <div className="ldb-drawer-pmt-period">May 18 – May 31</div>
                  </div>
                  <div className="ldb-drawer-pmt-amount">$1,036.59</div>
                </div>
              </div>
              <div className="ldb-drawer-pmt-row">
                <div className="ldb-drawer-pmt-header">
                  <div>
                    <div className="ldb-drawer-pmt-date">May 17, 2024</div>
                    <div className="ldb-drawer-pmt-period">May 11 – May 17</div>
                  </div>
                  <div className="ldb-drawer-pmt-amount">$518.30</div>
                </div>
              </div>
              <div className="ldb-drawer-pmt-row" style={{ opacity: 0.6 }}>
                <div className="ldb-drawer-pmt-header">
                  <div>
                    <div className="ldb-drawer-pmt-date">Jul 26, 2024</div>
                    <div className="ldb-drawer-pmt-period">Jul 13 – Jul 26 · Scheduled</div>
                  </div>
                  <div className="ldb-drawer-pmt-amount">$1,036.59</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
