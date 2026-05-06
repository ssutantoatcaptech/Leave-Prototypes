import { Link } from 'react-router-dom';
import './leave-detail.css';

function SiteNav() {
  return (
    <nav className="ld-nav">
      <div className="ld-nav-inner">
        <div className="ld-nav-left">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="4" fill="#fff"/><path d="M7 12l3 3 7-7" stroke="#0052cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="ld-nav-brand">Benefits Hub Member Portal</span>
        </div>
        <div className="ld-nav-right">
          <button type="button" className="ld-nav-bell" aria-label="Notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="ld-nav-user">
            <div className="ld-nav-avatar">SJ</div>
            <span>Sarah Jenkins</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function LeaveDetailPage() {
  return (
    <div className="ld-page">
      <SiteNav />

      <div className="ld-content">
        {/* Breadcrumb */}
        <div className="ld-breadcrumb">
          <Link to="/overview-react">Home</Link>
          <span className="ld-bc-sep">&gt;</span>
          <Link to="/absence-history">Leaves</Link>
          <span className="ld-bc-sep">&gt;</span>
          <span>Leave Detail</span>
        </div>

        {/* Title Card */}
        <div className="ld-title-card">
          <div className="ld-title-left">
            <div className="ld-title-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#0f0f14" strokeWidth="1.5"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="#0f0f14" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <div>
              <h1 className="ld-title">FMLA - Maternity Leave</h1>
              <div className="ld-title-meta">
                <span className="ld-title-dot" />
                <span className="ld-title-id">LV-98230112</span>
                <span className="ld-title-sep">&middot;</span>
                <span className="ld-status-badge approved">Approved</span>
              </div>
            </div>
          </div>
          <div className="ld-title-actions">
            <button type="button" className="ld-btn-secondary">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 2h8v12H4z" stroke="currentColor" strokeWidth="1.2"/><path d="M6 5h4M6 7.5h4M6 10h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
              Print Details
            </button>
            <button type="button" className="ld-btn-primary">
              + Report Return to Work
            </button>
          </div>
        </div>

        <div className="ld-two-col">
          {/* Left Column */}
          <div className="ld-main">
            {/* Timeline Section */}
            <div className="ld-card">
              <div className="ld-card-header">
                <h2 className="ld-card-title">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h12M2 4h12M2 12h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  Leave &amp; Payment Timeline
                </h2>
                <div className="ld-timeline-legend">
                  <span className="ld-legend-item"><span className="ld-legend-dot std" />STD</span>
                  <span className="ld-legend-item"><span className="ld-legend-dot pfml" />PFML</span>
                  <span className="ld-legend-item"><span className="ld-legend-dot payment" />PAYMENT</span>
                </div>
              </div>

              <div className="ld-timeline">
                <div className="ld-timeline-months">
                  <span>OCTOBER 2024</span>
                  <span>NOVEMBER 2024</span>
                  <span>DECEMBER 2024</span>
                </div>

                <div className="ld-timeline-row">
                  <span className="ld-timeline-label">STD Coverage</span>
                  <div className="ld-timeline-bar-wrap">
                    <div className="ld-timeline-bar std" style={{ width: '45%', left: '0%' }}>
                      <span>ACTIVE COVERAGE</span>
                    </div>
                  </div>
                </div>

                <div className="ld-timeline-row">
                  <span className="ld-timeline-label">PFML Coverage</span>
                  <div className="ld-timeline-bar-wrap">
                    <div className="ld-timeline-bar pfml" style={{ width: '40%', left: '35%' }}>
                      <span>BONDING PERIOD</span>
                    </div>
                  </div>
                </div>

                <div className="ld-timeline-row">
                  <span className="ld-timeline-label">Payments</span>
                  <div className="ld-timeline-bar-wrap ld-timeline-payments">
                    <div className="ld-payment-marker" style={{ left: '10%' }}><div className="ld-pm-dot" /><span>OCT 04</span></div>
                    <div className="ld-payment-marker" style={{ left: '22%' }}><div className="ld-pm-dot" /><span>OCT 18</span></div>
                    <div className="ld-payment-marker" style={{ left: '38%' }}><div className="ld-pm-dot" /><span>NOV 01</span></div>
                    <div className="ld-payment-marker" style={{ left: '52%' }}><div className="ld-pm-dot" /><span>NOV 15</span></div>
                    <div className="ld-payment-marker future" style={{ left: '68%' }}><div className="ld-pm-dot" /><span>NOV 29</span></div>
                    <div className="ld-payment-marker future" style={{ left: '82%' }}><div className="ld-pm-dot" /><span>DEC 13</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Associated Claims */}
            <div className="ld-card">
              <h2 className="ld-card-title">Associated Claims</h2>
              <table className="ld-claims-table">
                <thead>
                  <tr>
                    <th>CLAIM TYPE</th>
                    <th>NTN / ID</th>
                    <th>STATUS</th>
                    <th>DECISION DATE</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="ld-claim-type">Short-Term Disability (STD)</div>
                      <div className="ld-claim-sub">Pregnancy/Childbirth</div>
                    </td>
                    <td>NTN-7729103</td>
                    <td><span className="ld-claim-status approved">APPROVED</span></td>
                    <td>May 12, 2024</td>
                    <td><a href="#" className="ld-link">View Claim</a></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="ld-claim-type">Long-Term Disability (LTD)</div>
                      <div className="ld-claim-sub">Secondary Provision</div>
                    </td>
                    <td>NTN-8812034</td>
                    <td><span className="ld-claim-status not-eligible">NOT ELIGIBLE</span></td>
                    <td>May 14, 2024</td>
                    <td><a href="#" className="ld-link">View Details</a></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Associated Payments */}
            <div className="ld-card">
              <div className="ld-card-header">
                <h2 className="ld-card-title">Associated Payments</h2>
                <a href="#" className="ld-link upper">DOWNLOAD HISTORY</a>
              </div>

              <div className="ld-payment-summary">
                <div className="ld-payment-box">
                  <div className="ld-payment-box-label">TOTAL PAID TO DATE</div>
                  <div className="ld-payment-box-value">$4,250.00</div>
                </div>
                <div className="ld-payment-box">
                  <div className="ld-payment-box-label">NEXT EXPECTED PAYMENT</div>
                  <div className="ld-payment-box-value">Jun 15, 2024</div>
                </div>
                <div className="ld-payment-box">
                  <div className="ld-payment-box-label">ESTIMATED WEEKLY BENEFIT</div>
                  <div className="ld-payment-box-value">$850.00</div>
                </div>
              </div>

              <table className="ld-claims-table ld-payments-table">
                <thead>
                  <tr>
                    <th>PAYMENT DATE</th>
                    <th>PERIOD</th>
                    <th>AMOUNT</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>May 29, 2024</td>
                    <td>May 15 - May 28</td>
                    <td>$1,700.00</td>
                    <td><span className="ld-claim-status processed">PROCESSED</span></td>
                  </tr>
                  <tr>
                    <td>May 15, 2024</td>
                    <td>May 01 - May 14</td>
                    <td>$1,700.00</td>
                    <td><span className="ld-claim-status processed">PROCESSED</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="ld-sidebar">
            {/* Required Tasks */}
            <div className="ld-side-card">
              <h3 className="ld-side-title">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Required Tasks
              </h3>
              <div className="ld-task-item urgent">
                <div className="ld-task-icon urgent">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1l7 13H1L8 1z" fill="#ef4444"/><path d="M8 6v3M8 11h.01" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/></svg>
                </div>
                <div className="ld-task-content">
                  <div className="ld-task-name">Submit Birth Certificate</div>
                  <div className="ld-task-desc">Due within 30 days of birth date to finalize full approval.</div>
                  <a href="#" className="ld-task-action">UPLOAD NOW</a>
                </div>
              </div>
              <div className="ld-task-item done">
                <div className="ld-task-icon done">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" fill="#22c55e"/><path d="M5.5 8l2 2 3.5-3.5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="ld-task-content">
                  <div className="ld-task-name">Initial Medical Certification</div>
                  <div className="ld-task-desc">Received and verified on May 10, 2024.</div>
                </div>
              </div>
            </div>

            {/* Time Usage */}
            <div className="ld-side-card">
              <h3 className="ld-side-title">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Time Usage
              </h3>
              <div className="ld-time-usage">
                <div className="ld-donut-wrap">
                  <svg viewBox="0 0 120 120" className="ld-donut">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#0052cc" strokeWidth="12" strokeDasharray="104.7 314.16" strokeDashoffset="78.5" strokeLinecap="round" />
                  </svg>
                  <div className="ld-donut-center">
                    <span className="ld-donut-num">4 / 12</span>
                    <span className="ld-donut-label">WEEKS USED</span>
                  </div>
                </div>
                <div className="ld-time-stats">
                  <div className="ld-time-stat">
                    <div className="ld-time-stat-label">Days Remaining</div>
                    <div className="ld-time-stat-value">40 Days</div>
                  </div>
                  <div className="ld-time-stat">
                    <div className="ld-time-stat-label">End Date</div>
                    <div className="ld-time-stat-value">Aug 24</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="ld-side-card">
              <div className="ld-side-card-header">
                <h3 className="ld-side-title">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="currentColor" strokeWidth="1.2"/></svg>
                  Documents
                </h3>
                <button type="button" className="ld-icon-btn" aria-label="Download all">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2v9M4.5 7.5L8 11l3.5-3.5M3 13h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
              <div className="ld-doc-list">
                <div className="ld-doc-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#ef4444" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="#ef4444" strokeWidth="1.2"/></svg>
                  <div className="ld-doc-info">
                    <div className="ld-doc-name">Approval_Notice.pdf</div>
                    <div className="ld-doc-meta">May 13, 2024 &middot; 1.2 MB</div>
                  </div>
                  <button type="button" className="ld-icon-btn" aria-label="Download">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 2v9M4.5 7.5L8 11l3.5-3.5M3 13h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
                <div className="ld-doc-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#ef4444" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="#ef4444" strokeWidth="1.2"/></svg>
                  <div className="ld-doc-info">
                    <div className="ld-doc-name">Medical_Cert_SarahJ.pdf</div>
                    <div className="ld-doc-meta">May 06, 2024 &middot; 2.4 MB</div>
                  </div>
                  <button type="button" className="ld-icon-btn" aria-label="Download">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 2v9M4.5 7.5L8 11l3.5-3.5M3 13h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
              <button type="button" className="ld-view-all-btn">VIEW ALL DOCUMENTS</button>
            </div>

            {/* Leave Details */}
            <div className="ld-side-card">
              <h3 className="ld-side-title">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#0052cc" strokeWidth="1.2"/><path d="M8 5v1M8 8v3" stroke="#0052cc" strokeWidth="1.2" strokeLinecap="round"/></svg>
                Leave Details
              </h3>
              <div className="ld-details-list">
                <div className="ld-detail-row">
                  <div className="ld-detail-label">EFFECTIVE DATES</div>
                  <div className="ld-detail-value">Jun 03, 2024 - Aug 24, 2024</div>
                </div>
                <div className="ld-detail-row">
                  <div className="ld-detail-label">LEAVE REASON</div>
                  <div className="ld-detail-value">Childbirth / Bonding</div>
                </div>
                <div className="ld-detail-row">
                  <div className="ld-detail-label">MANAGER / SUPERVISOR</div>
                  <div className="ld-detail-value ld-detail-with-avatar">
                    <div className="ld-detail-avatar">RM</div>
                    Robert Miller
                  </div>
                </div>
                <div className="ld-detail-row">
                  <div className="ld-detail-label">CASE MANAGER</div>
                  <div className="ld-detail-value">Benefits Hub - Team 4</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="ld-footer">
          <div className="ld-footer-left">
            &copy; 2024 Benefits Hub
          </div>
          <div className="ld-footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Contact Support</a>
          </div>
          <div className="ld-footer-social">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M5 11V7M5 5h.01M8 11V8.5a1.5 1.5 0 013 0V11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M9 3H7.5A2.5 2.5 0 005 5.5V7h2v6h2V7h2l.5-2H9V5.5a.5.5 0 01.5-.5H11" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 4c-.5.2-1 .4-1.6.5.6-.4 1-.9 1.2-1.5-.5.3-1.1.5-1.7.7A2.8 2.8 0 008 6.5v.6A7.8 7.8 0 013 4s-2 4 2 6a4.2 4.2 0 01-3 1c4 2 8 0 8-4.5l1.5-2.5z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </footer>
      </div>
    </div>
  );
}
