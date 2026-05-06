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

export default function LeaveDetailV2bPage() {
  var [activeTab, setActiveTab] = useState('claims');
  var [expandedPayments, setExpandedPayments] = useState({});
  var [openAccordions, setOpenAccordions] = useState({ fmla: true });

  function togglePaymentRow(id) {
    setExpandedPayments(function (prev) {
      var next = Object.assign({}, prev);
      next[id] = !next[id];
      return next;
    });
  }

  function toggleAccordion(key) {
    setOpenAccordions(function (prev) {
      var next = Object.assign({}, prev);
      next[key] = !next[key];
      return next;
    });
  }

  return (
    <div className="ldb-page">
      <SiteNav user="Sarah Johnson" initials="SJ" />

      <div className="ldb-content">
        {/* Breadcrumb */}
        <div className="ldb-breadcrumb">
          <Link to="/overview-react">Home</Link>
          <span className="ldb-bc-sep">&gt;</span>
          <Link to="/absence-history">Leaves</Link>
          <span className="ldb-bc-sep">&gt;</span>
          <span>Leave Detail</span>
        </div>

        {/* Title Card */}
        <div className="ldb-title-card">
          <div className="ldb-title-left">
            <div className="ldb-title-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#0f0f14" strokeWidth="1.5"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="#0f0f14" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <div>
              <h1 className="ldb-title">FMLA - Maternity Leave</h1>
              <div className="ldb-title-meta">
                <span className="ldb-title-dot" />
                <span className="ldb-title-id">LV-98230112</span>
                <span className="ldb-title-sep">&middot;</span>
                <span className="ldb-status-badge approved">Approved</span>
              </div>
            </div>
          </div>
          <div className="ldb-title-actions">
            <button type="button" className="ldb-btn-secondary">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 2h8v12H4z" stroke="currentColor" strokeWidth="1.2"/><path d="M6 5h4M6 7.5h4M6 10h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
              Print Details
            </button>
            <button type="button" className="ldb-btn-primary">
              + Report Return to Work
            </button>
          </div>
        </div>


        <div className="ldb-v2-layout">
          {/* Left: Timeline + Tabs */}
          <div className="ldb-v2-main">

            {/* Leave Details */}
            <div className="ldb-card">
              <div className="ldb-card-header-row">
                <h2 className="ldb-card-title">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  Leave Details
                </h2>
                <button type="button" className="ldb-edit-btn" aria-label="Edit">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5l2 2M2 11l-0.5 3.5L5 14l9-9-2-2-10 10z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
              <div className="ldb-v3-details-grid">
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Claim Number</span>
                  <span className="ldb-detail-value">LV-98230112</span>
                </div>
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Policy</span>
                  <span className="ldb-detail-value">FMLA — Employer Sponsored</span>
                </div>
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Leave Reason</span>
                  <span className="ldb-detail-value">Childbirth / Bonding</span>
                </div>
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Leave Start</span>
                  <span className="ldb-detail-value">Jun 03, 2024</span>
                </div>
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Leave End</span>
                  <span className="ldb-detail-value">Aug 24, 2024</span>
                </div>
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Max Duration</span>
                  <span className="ldb-detail-value">12 weeks</span>
                </div>
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Manager</span>
                  <span className="ldb-detail-value">Robert Miller</span>
                </div>
                <div className="ldb-detail-row">
                  <span className="ldb-detail-label">Case Manager</span>
                  <span className="ldb-detail-value">Benefits Hub — Team 4</span>
                </div>
              </div>
            </div>

            {/* Current Leave Timeline */}
            <div className="ldb-card">
              <div className="ldb-card-header">
                <h2 className="ldb-card-title">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M8 4.5V8l2.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Current Leave Timeline
                </h2>
              </div>

              <div className="ldb-v2-timeline">
                <div className="ldb-v2-coverage-bars">
                  <div className="ldb-v2-bar-row">
                    <span className="ldb-v2-bar-label">FMLA</span>
                    <div className="ldb-v2-bar-track">
                      <div className="ldb-v2-bar fmla" style={{ left: '0%', width: '100%' }} />
                    </div>
                    <div className="ldb-v2-bar-tooltip">
                      <div className="ldb-v2-ms-tooltip-title">FMLA Protection</div>
                      <div className="ldb-v2-ms-tooltip-date">Jun 03 – Aug 24, 2024</div>
                      <div className="ldb-v2-ms-tooltip-desc">12 weeks federal job protection. Covers entire leave duration.</div>
                    </div>
                  </div>
                  <div className="ldb-v2-bar-row">
                    <span className="ldb-v2-bar-label">STD</span>
                    <div className="ldb-v2-bar-track">
                      <div className="ldb-v2-bar std" style={{ left: '0%', width: '55%' }} />
                    </div>
                    <div className="ldb-v2-bar-tooltip">
                      <div className="ldb-v2-ms-tooltip-title">Short-Term Disability</div>
                      <div className="ldb-v2-ms-tooltip-date">Jun 03 – Jul 05, 2024</div>
                      <div className="ldb-v2-ms-tooltip-desc">60% income replacement. Weekly benefit: $850.00. Approved NTN-7729103.</div>
                    </div>
                  </div>
                  <div className="ldb-v2-bar-row">
                    <span className="ldb-v2-bar-label">PFML</span>
                    <div className="ldb-v2-bar-track">
                      <div className="ldb-v2-bar pfml" style={{ left: '35%', width: '45%' }} />
                    </div>
                    <div className="ldb-v2-bar-tooltip">
                      <div className="ldb-v2-ms-tooltip-title">Paid Family Medical Leave</div>
                      <div className="ldb-v2-ms-tooltip-date">Jun 24 – Aug 12, 2024</div>
                      <div className="ldb-v2-ms-tooltip-desc">State bonding benefit. Begins after birth date, ends 7 weeks post-delivery.</div>
                    </div>
                  </div>
                </div>

                <div className="ldb-v2-timeline-months">
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                </div>

                <div className="ldb-v2-timeline-legend">
                  <span className="ldb-legend-item"><span className="ldb-legend-dot fmla" />FMLA</span>
                  <span className="ldb-legend-item"><span className="ldb-legend-dot std" />STD</span>
                  <span className="ldb-legend-item"><span className="ldb-legend-dot pfml" />PFML</span>
                  <span className="ldb-legend-item"><span className="ldb-legend-dot unpaid" />Unpaid</span>
                </div>
              </div>
            </div>

            {/* Tabbed Content: Claims, Payments */}
            <div className="ldb-card ldb-tabbed-card">
              <div className="ldb-tabs">
                <button type="button" className={'ldb-tab' + (activeTab === 'claims' ? ' active' : '')} onClick={function () { setActiveTab('claims'); }}>Associated Claims</button>
                <button type="button" className={'ldb-tab' + (activeTab === 'payments' ? ' active' : '')} onClick={function () { setActiveTab('payments'); }}>Payments</button>
              </div>

              {activeTab === 'claims' && (
                <div className="ldb-tab-content">
                  <table className="ldb-claims-table">
                    <thead>
                      <tr>
                        <th>CLAIM TYPE</th>
                        <th>NTN / ID</th>
                        <th>STATUS</th>
                        <th>DECISION DATE</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="ldb-claim-type">Short-Term Disability (STD)</div>
                          <div className="ldb-claim-sub">Pregnancy/Childbirth</div>
                        </td>
                        <td>NTN-7729103</td>
                        <td><span className="ldb-claim-status approved">APPROVED</span></td>
                        <td>May 12, 2024</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="ldb-claim-type">Long-Term Disability (LTD)</div>
                          <div className="ldb-claim-sub">Secondary Provision</div>
                        </td>
                        <td>NTN-8812034</td>
                        <td><span className="ldb-claim-status not-eligible">NOT ELIGIBLE</span></td>
                        <td>May 14, 2024</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'payments' && (
                <div className="ldb-tab-content">
                  <div className="ldb-payment-summary">
                    <div className="ldb-payment-box">
                      <div className="ldb-payment-box-label">TOTAL PAID TO DATE</div>
                      <div className="ldb-payment-box-value">$7,650.00</div>
                    </div>
                    <div className="ldb-payment-box">
                      <div className="ldb-payment-box-label">NEXT EXPECTED PAYMENT</div>
                      <div className="ldb-payment-box-value">Jul 26, 2024</div>
                    </div>
                    <div className="ldb-payment-box">
                      <div className="ldb-payment-box-label">ESTIMATED WEEKLY BENEFIT</div>
                      <div className="ldb-payment-box-value">$850.00</div>
                    </div>
                  </div>

                  <table className="ldb-claims-table ldb-payments-table">
                    <thead>
                      <tr>
                        <th>PAYMENT DATE</th>
                        <th>PERIOD</th>
                        <th>AMOUNT</th>
                        <th>STATUS</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Jul 12, 2024</td>
                        <td>Jun 29 - Jul 12</td>
                        <td>$1,700.00</td>
                        <td><span className="ldb-claim-status processed">PROCESSED</span></td>
                        <td><button type="button" className="ldb-link ldb-pmt-toggle" onClick={function () { togglePaymentRow('p1'); }}>{expandedPayments.p1 ? 'Hide' : 'See Details'}</button></td>
                      </tr>
                      {expandedPayments.p1 && (
                        <tr className="ldb-pmt-expand-row"><td colSpan="5">
                          <div className="ldb-pmt-expand-grid">
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Gross Pay</span><span className="ldb-pmt-expand-value">$2,073.17</span></div>
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Adjustments</span><span className="ldb-pmt-expand-value">$0.00</span></div>
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Tax &amp; Deductions</span><span className="ldb-pmt-expand-value">-$373.17</span></div>
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Net Amount</span><span className="ldb-pmt-expand-value ldb-pmt-net">$1,700.00</span></div>
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Paid By</span><span className="ldb-pmt-expand-value">Benefits Hub</span></div>
                          </div>
                        </td></tr>
                      )}
                      <tr>
                        <td>Jun 28, 2024</td>
                        <td>Jun 15 - Jun 28</td>
                        <td>$1,700.00</td>
                        <td><span className="ldb-claim-status processed">PROCESSED</span></td>
                        <td><button type="button" className="ldb-link ldb-pmt-toggle" onClick={function () { togglePaymentRow('p2'); }}>{expandedPayments.p2 ? 'Hide' : 'See Details'}</button></td>
                      </tr>
                      {expandedPayments.p2 && (
                        <tr className="ldb-pmt-expand-row"><td colSpan="5">
                          <div className="ldb-pmt-expand-grid">
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Gross Pay</span><span className="ldb-pmt-expand-value">$2,073.17</span></div>
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Adjustments</span><span className="ldb-pmt-expand-value">$0.00</span></div>
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Tax &amp; Deductions</span><span className="ldb-pmt-expand-value">-$373.17</span></div>
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Net Amount</span><span className="ldb-pmt-expand-value ldb-pmt-net">$1,700.00</span></div>
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Paid By</span><span className="ldb-pmt-expand-value">Benefits Hub</span></div>
                          </div>
                        </td></tr>
                      )}
                      <tr>
                        <td>Jun 14, 2024</td>
                        <td>Jun 01 - Jun 14</td>
                        <td>$1,700.00</td>
                        <td><span className="ldb-claim-status processed">PROCESSED</span></td>
                        <td><button type="button" className="ldb-link ldb-pmt-toggle" onClick={function () { togglePaymentRow('p3'); }}>{expandedPayments.p3 ? 'Hide' : 'See Details'}</button></td>
                      </tr>
                      {expandedPayments.p3 && (
                        <tr className="ldb-pmt-expand-row"><td colSpan="5">
                          <div className="ldb-pmt-expand-grid">
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Gross Pay</span><span className="ldb-pmt-expand-value">$2,073.17</span></div>
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Adjustments</span><span className="ldb-pmt-expand-value">$0.00</span></div>
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Tax &amp; Deductions</span><span className="ldb-pmt-expand-value">-$373.17</span></div>
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Net Amount</span><span className="ldb-pmt-expand-value ldb-pmt-net">$1,700.00</span></div>
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Paid By</span><span className="ldb-pmt-expand-value">Benefits Hub</span></div>
                          </div>
                        </td></tr>
                      )}
                      <tr>
                        <td>May 31, 2024</td>
                        <td>May 18 - May 31</td>
                        <td>$850.00</td>
                        <td><span className="ldb-claim-status processed">PROCESSED</span></td>
                        <td><button type="button" className="ldb-link ldb-pmt-toggle" onClick={function () { togglePaymentRow('p4'); }}>{expandedPayments.p4 ? 'Hide' : 'See Details'}</button></td>
                      </tr>
                      {expandedPayments.p4 && (
                        <tr className="ldb-pmt-expand-row"><td colSpan="5">
                          <div className="ldb-pmt-expand-grid">
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Gross Pay</span><span className="ldb-pmt-expand-value">$1,036.59</span></div>
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Adjustments</span><span className="ldb-pmt-expand-value">$0.00</span></div>
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Tax &amp; Deductions</span><span className="ldb-pmt-expand-value">-$186.59</span></div>
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Net Amount</span><span className="ldb-pmt-expand-value ldb-pmt-net">$850.00</span></div>
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Paid By</span><span className="ldb-pmt-expand-value">State PFML Agency</span></div>
                          </div>
                        </td></tr>
                      )}
                      <tr>
                        <td>May 17, 2024</td>
                        <td>May 04 - May 17</td>
                        <td>$850.00</td>
                        <td><span className="ldb-claim-status processed">PROCESSED</span></td>
                        <td><button type="button" className="ldb-link ldb-pmt-toggle" onClick={function () { togglePaymentRow('p5'); }}>{expandedPayments.p5 ? 'Hide' : 'See Details'}</button></td>
                      </tr>
                      {expandedPayments.p5 && (
                        <tr className="ldb-pmt-expand-row"><td colSpan="5">
                          <div className="ldb-pmt-expand-grid">
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Gross Pay</span><span className="ldb-pmt-expand-value">$1,036.59</span></div>
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Adjustments</span><span className="ldb-pmt-expand-value">$0.00</span></div>
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Tax &amp; Deductions</span><span className="ldb-pmt-expand-value">-$186.59</span></div>
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Net Amount</span><span className="ldb-pmt-expand-value ldb-pmt-net">$850.00</span></div>
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Paid By</span><span className="ldb-pmt-expand-value">State PFML Agency</span></div>
                          </div>
                        </td></tr>
                      )}
                      <tr>
                        <td>May 03, 2024</td>
                        <td>Apr 20 - May 03</td>
                        <td>$850.00</td>
                        <td><span className="ldb-claim-status processed">PROCESSED</span></td>
                        <td><button type="button" className="ldb-link ldb-pmt-toggle" onClick={function () { togglePaymentRow('p6'); }}>{expandedPayments.p6 ? 'Hide' : 'See Details'}</button></td>
                      </tr>
                      {expandedPayments.p6 && (
                        <tr className="ldb-pmt-expand-row"><td colSpan="5">
                          <div className="ldb-pmt-expand-grid">
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Gross Pay</span><span className="ldb-pmt-expand-value">$1,036.59</span></div>
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Adjustments</span><span className="ldb-pmt-expand-value">$0.00</span></div>
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Tax &amp; Deductions</span><span className="ldb-pmt-expand-value">-$186.59</span></div>
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Net Amount</span><span className="ldb-pmt-expand-value ldb-pmt-net">$850.00</span></div>
                            <div className="ldb-pmt-expand-item"><span className="ldb-pmt-expand-label">Paid By</span><span className="ldb-pmt-expand-value">State PFML Agency</span></div>
                          </div>
                        </td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

            </div>

            {/* Documents */}
            <div className="ldb-card">
              <h2 className="ldb-card-title">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="currentColor" strokeWidth="1.2"/></svg>
                Documents
              </h2>
              <div className="ldb-doc-list">
                <div className="ldb-doc-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#525252" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="#525252" strokeWidth="1.2"/></svg>
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">Approval_Notice.pdf</div>
                    <div className="ldb-doc-meta">May 13, 2024 &middot; 1.2 MB</div>
                  </div>
                  <button type="button" className="ldb-icon-btn" aria-label="Download">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 2v9M4.5 7.5L8 11l3.5-3.5M3 13h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
                <div className="ldb-doc-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#525252" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="#525252" strokeWidth="1.2"/></svg>
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">Medical_Cert_SarahJ.pdf</div>
                    <div className="ldb-doc-meta">May 06, 2024 &middot; 2.4 MB</div>
                  </div>
                  <button type="button" className="ldb-icon-btn" aria-label="Download">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 2v9M4.5 7.5L8 11l3.5-3.5M3 13h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
                <div className="ldb-doc-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#525252" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="#525252" strokeWidth="1.2"/></svg>
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">Birth_Certificate_Upload.pdf</div>
                    <div className="ldb-doc-meta">Pending upload</div>
                  </div>
                  <span className="ldb-doc-pending-badge">REQUIRED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Required Tasks by Benefit */}
          <div className="ldb-sidebar">
            <div className="ldb-side-card">
              <h3 className="ldb-side-title">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Required Tasks
              </h3>

              {/* STD Tasks */}
              <div className="ldb-task-group">
                <button type="button" className={'ldb-task-group-header ldb-accordion-toggle' + (openAccordions.std ? ' open' : '')} onClick={function () { toggleAccordion('std'); }}>
                  <span className="ldb-task-group-dot std" />
                  <span className="ldb-task-group-label">STD</span>
                  <span className="ldb-task-group-count">3/3 complete</span>
                  <svg className="ldb-accordion-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                {openAccordions.std && (
                  <div className="ldb-task-timeline">
                    <div className="ldb-task-tl-item done">
                      <div className="ldb-task-tl-dot done" />
                      <div className="ldb-task-tl-content">
                        <div className="ldb-task-tl-title">Submit Medical Certification</div>
                        <div className="ldb-task-tl-meta">Completed Jun 5, 2024</div>
                      </div>
                      <span className="ldb-task-tl-badge done">Done</span>
                    </div>
                    <div className="ldb-task-tl-item done">
                      <div className="ldb-task-tl-dot done" />
                      <div className="ldb-task-tl-content">
                        <div className="ldb-task-tl-title">Employer Verification</div>
                        <div className="ldb-task-tl-meta">Completed Jun 8, 2024</div>
                      </div>
                      <span className="ldb-task-tl-badge done">Done</span>
                    </div>
                    <div className="ldb-task-tl-item done">
                      <div className="ldb-task-tl-dot done" />
                      <div className="ldb-task-tl-content">
                        <div className="ldb-task-tl-title">Claim Decision</div>
                        <div className="ldb-task-tl-meta">Approved Jun 10, 2024</div>
                      </div>
                      <span className="ldb-task-tl-badge done">Done</span>
                    </div>
                  </div>
                )}
              </div>

              {/* FMLA Tasks */}
              <div className="ldb-task-group">
                <button type="button" className={'ldb-task-group-header ldb-accordion-toggle' + (openAccordions.fmla ? ' open' : '')} onClick={function () { toggleAccordion('fmla'); }}>
                  <span className="ldb-task-group-dot fmla" />
                  <span className="ldb-task-group-label">FMLA</span>
                  <span className="ldb-task-group-count">1/3 complete</span>
                  <svg className="ldb-accordion-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                {openAccordions.fmla && (
                  <div className="ldb-task-timeline">
                    <div className="ldb-task-tl-item done">
                      <div className="ldb-task-tl-dot done" />
                      <div className="ldb-task-tl-content">
                        <div className="ldb-task-tl-title">Eligibility Confirmed</div>
                        <div className="ldb-task-tl-meta">Completed Jun 3, 2024</div>
                      </div>
                      <span className="ldb-task-tl-badge done">Done</span>
                    </div>
                    <div className="ldb-task-tl-item urgent">
                      <div className="ldb-task-tl-dot urgent" />
                      <div className="ldb-task-tl-content">
                        <div className="ldb-task-tl-title">Submit Birth Certificate</div>
                        <div className="ldb-task-tl-meta">Due by Jul 24, 2024</div>
                      </div>
                      <span className="ldb-task-tl-badge urgent">Action</span>
                    </div>
                    <div className="ldb-task-tl-item pending">
                      <div className="ldb-task-tl-dot pending" />
                      <div className="ldb-task-tl-content">
                        <div className="ldb-task-tl-title">Return to Work Confirmation</div>
                        <div className="ldb-task-tl-meta">Due by Aug 24, 2024</div>
                      </div>
                      <span className="ldb-task-tl-badge pending">Pending</span>
                    </div>
                  </div>
                )}
              </div>

              {/* PFML Tasks */}
              <div className="ldb-task-group">
                <button type="button" className={'ldb-task-group-header ldb-accordion-toggle' + (openAccordions.pfml ? ' open' : '')} onClick={function () { toggleAccordion('pfml'); }}>
                  <span className="ldb-task-group-dot pfml" />
                  <span className="ldb-task-group-label">PFML</span>
                  <span className="ldb-task-group-count">1/2 complete</span>
                  <svg className="ldb-accordion-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                {openAccordions.pfml && (
                  <div className="ldb-task-timeline">
                    <div className="ldb-task-tl-item done">
                      <div className="ldb-task-tl-dot done" />
                      <div className="ldb-task-tl-content">
                        <div className="ldb-task-tl-title">Bonding Application Submitted</div>
                        <div className="ldb-task-tl-meta">Completed Jun 25, 2024</div>
                      </div>
                      <span className="ldb-task-tl-badge done">Done</span>
                    </div>
                    <div className="ldb-task-tl-item in-progress">
                      <div className="ldb-task-tl-dot in-progress" />
                      <div className="ldb-task-tl-content">
                        <div className="ldb-task-tl-title">State Review</div>
                        <div className="ldb-task-tl-meta">In progress since Jul 1, 2024</div>
                      </div>
                      <span className="ldb-task-tl-badge in-progress">In Progress</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Leave Snapshot */}
            <div className="ldb-side-card">
              <h3 className="ldb-side-title">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Leave Snapshot
              </h3>
              {/* Time Usage */}
              <div className="ldb-v2-snapshot-section">
                <div className="ldb-v2-snapshot-bar-header">
                  <span className="ldb-v2-snapshot-bar-label">4 of 12 weeks used</span>
                  <span className="ldb-v2-snapshot-bar-sub">8 weeks remaining</span>
                </div>
                <div className="ldb-v2-snapshot-bar">
                  <div className="ldb-v2-snapshot-bar-fill" style={{ width: '33.3%' }} />
                </div>
                <div className="ldb-v2-snapshot-stats">
                  <div className="ldb-v2-snapshot-stat">
                    <span className="ldb-v2-snapshot-stat-value">40</span>
                    <span className="ldb-v2-snapshot-stat-label">Days Left</span>
                  </div>
                  <div className="ldb-v2-snapshot-stat">
                    <span className="ldb-v2-snapshot-stat-value">Aug 24</span>
                    <span className="ldb-v2-snapshot-stat-label">End Date</span>
                  </div>
                </div>
              </div>
              {/* Payment Stats */}
              <div className="ldb-v2-snapshot-section">
                <div className="ldb-v2-snapshot-divider" />
                <div className="ldb-v2-payment-summary">
                  <div className="ldb-v2-pmt-item">
                    <span className="ldb-v2-pmt-label">Total Paid</span>
                    <span className="ldb-v2-pmt-value">$5,100.00</span>
                  </div>
                  <div className="ldb-v2-pmt-item">
                    <span className="ldb-v2-pmt-label">Last Payment</span>
                    <span className="ldb-v2-pmt-value">$850.00</span>
                  </div>
                  <div className="ldb-v2-pmt-item">
                    <span className="ldb-v2-pmt-label">Next Payment</span>
                    <span className="ldb-v2-pmt-value">Jul 12</span>
                  </div>
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
