import { useState } from 'react';
import { Link } from 'react-router-dom';
import './leave-detail.css';

function GlobalNav({ user, initials }) {
  return (
    <nav className="ld-global-nav">
      <div className="ld-global-nav-inner">
        <div className="ld-global-nav-left">
          <span className="ld-global-nav-brand">Benefits Hub</span>
          <div className="ld-global-nav-links">
            <a href="#" className="ld-global-nav-link">Dashboard</a>
            <a href="#" className="ld-global-nav-link active">Claims &amp; Leave</a>
            <a href="#" className="ld-global-nav-link">Documents</a>
            <a href="#" className="ld-global-nav-link">Support</a>
          </div>
        </div>
        <div className="ld-global-nav-right">
          <span className="ld-global-nav-util">Messages</span>
          <div className="ld-global-nav-user">
            <div className="ld-global-nav-avatar">{initials}</div>
            <span>{user}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

function GlobalFooter() {
  return (
    <footer className="ld-global-footer">
      <div className="ld-global-footer-inner">
        <div className="ld-global-footer-grid">
          <div className="ld-global-footer-col">
            <h4>Quick Links</h4>
            <a href="#">My Profile</a>
            <a href="#">Benefits Overview</a>
            <a href="#">Claims Status</a>
            <a href="#">Forms &amp; Documents</a>
          </div>
          <div className="ld-global-footer-col">
            <h4>Resources</h4>
            <a href="#">Help Center</a>
            <a href="#">Member Handbooks</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
          <div className="ld-global-footer-col">
            <h4>Support</h4>
            <a href="#">1-800-555-0199</a>
            <span className="ld-global-footer-note">Mon - Fri, 8 AM - 5 PM CST</span>
          </div>
        </div>
        <div className="ld-global-footer-bottom">
          <span>&copy; 2026 Benefits Hub Administration. All rights reserved.</span>
          <span className="ld-global-footer-legal">Insurance products are underwritten by United of Omaha Life Insurance Company.</span>
        </div>
      </div>
    </footer>
  );
}

export default function LeaveDetailV2Page() {
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
    <div className="ld-page">
      <GlobalNav user="Sarah Jenkins" initials="SJ" />

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

        {/* Leave Details - moved below header */}
        <div className="ld-details-bar">
          <div className="ld-details-bar-item">
            <div className="ld-detail-label">EFFECTIVE DATES</div>
            <div className="ld-detail-value">Jun 03, 2026 - Aug 24, 2026</div>
          </div>
          <div className="ld-details-bar-item">
            <div className="ld-detail-label">LEAVE REASON</div>
            <div className="ld-detail-value">Childbirth / Bonding</div>
          </div>
          <div className="ld-details-bar-item">
            <div className="ld-detail-label">MANAGER / SUPERVISOR</div>
            <div className="ld-detail-value ld-detail-with-avatar">
              <div className="ld-detail-avatar">RM</div>
              Robert Miller
            </div>
          </div>
          <div className="ld-details-bar-item">
            <div className="ld-detail-label">CASE MANAGER</div>
            <div className="ld-detail-value">Benefits Hub - Team 4</div>
          </div>
        </div>

        <div className="ld-v2-layout">
          {/* Left: Timeline + Tabs */}
          <div className="ld-v2-main">
            {/* Current Leave Timeline */}
            <div className="ld-card">
              <div className="ld-card-header">
                <h2 className="ld-card-title">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M8 4.5V8l2.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Current Leave Timeline
                </h2>
              </div>

              <div className="ld-v2-timeline">
                <div className="ld-v2-coverage-bars">
                  <div className="ld-v2-bar-row">
                    <span className="ld-v2-bar-label">FMLA</span>
                    <div className="ld-v2-bar-track">
                      <div className="ld-v2-bar fmla" style={{ left: '0%', width: '100%' }} />
                    </div>
                    <div className="ld-v2-bar-tooltip">
                      <div className="ld-v2-ms-tooltip-title">FMLA Protection</div>
                      <div className="ld-v2-ms-tooltip-date">Jun 03 – Aug 24, 2026</div>
                      <div className="ld-v2-ms-tooltip-desc">12 weeks federal job protection. Covers entire leave duration.</div>
                    </div>
                  </div>
                  <div className="ld-v2-bar-row">
                    <span className="ld-v2-bar-label">STD</span>
                    <div className="ld-v2-bar-track">
                      <div className="ld-v2-bar std" style={{ left: '0%', width: '55%' }} />
                    </div>
                    <div className="ld-v2-bar-tooltip">
                      <div className="ld-v2-ms-tooltip-title">Short-Term Disability</div>
                      <div className="ld-v2-ms-tooltip-date">Jun 03 – Jul 05, 2026</div>
                      <div className="ld-v2-ms-tooltip-desc">60% income replacement. Weekly benefit: $850.00. Approved NTN-7729103.</div>
                    </div>
                  </div>
                  <div className="ld-v2-bar-row">
                    <span className="ld-v2-bar-label">PFML</span>
                    <div className="ld-v2-bar-track">
                      <div className="ld-v2-bar pfml" style={{ left: '35%', width: '45%' }} />
                    </div>
                    <div className="ld-v2-bar-tooltip">
                      <div className="ld-v2-ms-tooltip-title">Paid Family Medical Leave</div>
                      <div className="ld-v2-ms-tooltip-date">Jun 24 – Aug 12, 2026</div>
                      <div className="ld-v2-ms-tooltip-desc">State bonding benefit. Begins after birth date, ends 7 weeks post-delivery.</div>
                    </div>
                  </div>
                </div>

                <div className="ld-v2-timeline-months">
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                </div>

                <div className="ld-v2-timeline-legend">
                  <span className="ld-legend-item"><span className="ld-legend-dot fmla" />FMLA</span>
                  <span className="ld-legend-item"><span className="ld-legend-dot std" />STD</span>
                  <span className="ld-legend-item"><span className="ld-legend-dot pfml" />PFML</span>
                  <span className="ld-legend-item"><span className="ld-legend-dot unpaid" />Unpaid</span>
                </div>
              </div>
            </div>

            {/* Tabbed Content: Claims, Payments */}
            <div className="ld-card ld-tabbed-card">
              <div className="ld-tabs">
                <button type="button" className={'ld-tab' + (activeTab === 'claims' ? ' active' : '')} onClick={function () { setActiveTab('claims'); }}>Claims</button>
                <button type="button" className={'ld-tab' + (activeTab === 'payments' ? ' active' : '')} onClick={function () { setActiveTab('payments'); }}>Payments</button>
              </div>

              {activeTab === 'claims' && (
                <div className="ld-tab-content">
                  <table className="ld-claims-table">
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
                          <div className="ld-claim-type">Short-Term Disability (STD)</div>
                          <div className="ld-claim-sub">Pregnancy/Childbirth</div>
                        </td>
                        <td>NTN-7729103</td>
                        <td><span className="ld-claim-status approved">APPROVED</span></td>
                        <td>May 12, 2026</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="ld-claim-type">Long-Term Disability (LTD)</div>
                          <div className="ld-claim-sub">Secondary Provision</div>
                        </td>
                        <td>NTN-8812034</td>
                        <td><span className="ld-claim-status not-eligible">NOT ELIGIBLE</span></td>
                        <td>May 14, 2026</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'payments' && (
                <div className="ld-tab-content">
                  <div className="ld-payment-summary">
                    <div className="ld-payment-box">
                      <div className="ld-payment-box-label">TOTAL PAID TO DATE</div>
                      <div className="ld-payment-box-value">$7,650.00</div>
                    </div>
                    <div className="ld-payment-box">
                      <div className="ld-payment-box-label">NEXT EXPECTED PAYMENT</div>
                      <div className="ld-payment-box-value">Jul 26, 2026</div>
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
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Jul 12, 2026</td>
                        <td>Jun 29 - Jul 12</td>
                        <td>$1,700.00</td>
                        <td><span className="ld-claim-status processed">PROCESSED</span></td>
                        <td><button type="button" className="ld-link ld-pmt-toggle" onClick={function () { togglePaymentRow('p1'); }}>{expandedPayments.p1 ? 'Hide' : 'See Details'}</button></td>
                      </tr>
                      {expandedPayments.p1 && (
                        <tr className="ld-pmt-expand-row"><td colSpan="5">
                          <div className="ld-pmt-expand-grid">
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Gross Pay</span><span className="ld-pmt-expand-value">$2,073.17</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Adjustments</span><span className="ld-pmt-expand-value">$0.00</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Tax &amp; Deductions</span><span className="ld-pmt-expand-value">-$373.17</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Net Amount</span><span className="ld-pmt-expand-value ld-pmt-net">$1,700.00</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Paid By</span><span className="ld-pmt-expand-value">Benefits Hub</span></div>
                          </div>
                        </td></tr>
                      )}
                      <tr>
                        <td>Jun 28, 2026</td>
                        <td>Jun 15 - Jun 28</td>
                        <td>$1,700.00</td>
                        <td><span className="ld-claim-status processed">PROCESSED</span></td>
                        <td><button type="button" className="ld-link ld-pmt-toggle" onClick={function () { togglePaymentRow('p2'); }}>{expandedPayments.p2 ? 'Hide' : 'See Details'}</button></td>
                      </tr>
                      {expandedPayments.p2 && (
                        <tr className="ld-pmt-expand-row"><td colSpan="5">
                          <div className="ld-pmt-expand-grid">
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Gross Pay</span><span className="ld-pmt-expand-value">$2,073.17</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Adjustments</span><span className="ld-pmt-expand-value">$0.00</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Tax &amp; Deductions</span><span className="ld-pmt-expand-value">-$373.17</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Net Amount</span><span className="ld-pmt-expand-value ld-pmt-net">$1,700.00</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Paid By</span><span className="ld-pmt-expand-value">Benefits Hub</span></div>
                          </div>
                        </td></tr>
                      )}
                      <tr>
                        <td>Jun 14, 2026</td>
                        <td>Jun 01 - Jun 14</td>
                        <td>$1,700.00</td>
                        <td><span className="ld-claim-status processed">PROCESSED</span></td>
                        <td><button type="button" className="ld-link ld-pmt-toggle" onClick={function () { togglePaymentRow('p3'); }}>{expandedPayments.p3 ? 'Hide' : 'See Details'}</button></td>
                      </tr>
                      {expandedPayments.p3 && (
                        <tr className="ld-pmt-expand-row"><td colSpan="5">
                          <div className="ld-pmt-expand-grid">
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Gross Pay</span><span className="ld-pmt-expand-value">$2,073.17</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Adjustments</span><span className="ld-pmt-expand-value">$0.00</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Tax &amp; Deductions</span><span className="ld-pmt-expand-value">-$373.17</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Net Amount</span><span className="ld-pmt-expand-value ld-pmt-net">$1,700.00</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Paid By</span><span className="ld-pmt-expand-value">Benefits Hub</span></div>
                          </div>
                        </td></tr>
                      )}
                      <tr>
                        <td>May 31, 2026</td>
                        <td>May 18 - May 31</td>
                        <td>$850.00</td>
                        <td><span className="ld-claim-status processed">PROCESSED</span></td>
                        <td><button type="button" className="ld-link ld-pmt-toggle" onClick={function () { togglePaymentRow('p4'); }}>{expandedPayments.p4 ? 'Hide' : 'See Details'}</button></td>
                      </tr>
                      {expandedPayments.p4 && (
                        <tr className="ld-pmt-expand-row"><td colSpan="5">
                          <div className="ld-pmt-expand-grid">
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Gross Pay</span><span className="ld-pmt-expand-value">$1,036.59</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Adjustments</span><span className="ld-pmt-expand-value">$0.00</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Tax &amp; Deductions</span><span className="ld-pmt-expand-value">-$186.59</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Net Amount</span><span className="ld-pmt-expand-value ld-pmt-net">$850.00</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Paid By</span><span className="ld-pmt-expand-value">State PFML Agency</span></div>
                          </div>
                        </td></tr>
                      )}
                      <tr>
                        <td>May 17, 2026</td>
                        <td>May 04 - May 17</td>
                        <td>$850.00</td>
                        <td><span className="ld-claim-status processed">PROCESSED</span></td>
                        <td><button type="button" className="ld-link ld-pmt-toggle" onClick={function () { togglePaymentRow('p5'); }}>{expandedPayments.p5 ? 'Hide' : 'See Details'}</button></td>
                      </tr>
                      {expandedPayments.p5 && (
                        <tr className="ld-pmt-expand-row"><td colSpan="5">
                          <div className="ld-pmt-expand-grid">
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Gross Pay</span><span className="ld-pmt-expand-value">$1,036.59</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Adjustments</span><span className="ld-pmt-expand-value">$0.00</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Tax &amp; Deductions</span><span className="ld-pmt-expand-value">-$186.59</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Net Amount</span><span className="ld-pmt-expand-value ld-pmt-net">$850.00</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Paid By</span><span className="ld-pmt-expand-value">State PFML Agency</span></div>
                          </div>
                        </td></tr>
                      )}
                      <tr>
                        <td>May 03, 2026</td>
                        <td>Apr 20 - May 03</td>
                        <td>$850.00</td>
                        <td><span className="ld-claim-status processed">PROCESSED</span></td>
                        <td><button type="button" className="ld-link ld-pmt-toggle" onClick={function () { togglePaymentRow('p6'); }}>{expandedPayments.p6 ? 'Hide' : 'See Details'}</button></td>
                      </tr>
                      {expandedPayments.p6 && (
                        <tr className="ld-pmt-expand-row"><td colSpan="5">
                          <div className="ld-pmt-expand-grid">
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Gross Pay</span><span className="ld-pmt-expand-value">$1,036.59</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Adjustments</span><span className="ld-pmt-expand-value">$0.00</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Tax &amp; Deductions</span><span className="ld-pmt-expand-value">-$186.59</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Net Amount</span><span className="ld-pmt-expand-value ld-pmt-net">$850.00</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Paid By</span><span className="ld-pmt-expand-value">State PFML Agency</span></div>
                          </div>
                        </td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

            </div>

            {/* Documents */}
            <div className="ld-card">
              <h2 className="ld-card-title">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="currentColor" strokeWidth="1.2"/></svg>
                Documents
              </h2>
              <div className="ld-doc-list">
                <div className="ld-doc-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#ef4444" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="#ef4444" strokeWidth="1.2"/></svg>
                  <div className="ld-doc-info">
                    <div className="ld-doc-name">Approval_Notice.pdf</div>
                    <div className="ld-doc-meta">May 13, 2026 &middot; 1.2 MB</div>
                  </div>
                  <button type="button" className="ld-icon-btn" aria-label="Download">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 2v9M4.5 7.5L8 11l3.5-3.5M3 13h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
                <div className="ld-doc-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#ef4444" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="#ef4444" strokeWidth="1.2"/></svg>
                  <div className="ld-doc-info">
                    <div className="ld-doc-name">Medical_Cert_SarahJ.pdf</div>
                    <div className="ld-doc-meta">May 06, 2026 &middot; 2.4 MB</div>
                  </div>
                  <button type="button" className="ld-icon-btn" aria-label="Download">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 2v9M4.5 7.5L8 11l3.5-3.5M3 13h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
                <div className="ld-doc-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#ef4444" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="#ef4444" strokeWidth="1.2"/></svg>
                  <div className="ld-doc-info">
                    <div className="ld-doc-name">Birth_Certificate_Upload.pdf</div>
                    <div className="ld-doc-meta">Pending upload</div>
                  </div>
                  <span className="ld-doc-pending-badge">REQUIRED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Required Tasks by Benefit */}
          <div className="ld-sidebar">
            <div className="ld-side-card">
              <h3 className="ld-side-title">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Required Tasks
              </h3>

              {/* STD Tasks */}
              <div className="ld-task-group">
                <button type="button" className={'ld-task-group-header ld-accordion-toggle' + (openAccordions.std ? ' open' : '')} onClick={function () { toggleAccordion('std'); }}>
                  <span className="ld-task-group-dot std" />
                  <span className="ld-task-group-label">STD</span>
                  <span className="ld-task-group-count">3/3 complete</span>
                  <svg className="ld-accordion-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                {openAccordions.std && (
                  <div className="ld-task-timeline">
                    <div className="ld-task-tl-item done">
                      <div className="ld-task-tl-dot done" />
                      <div className="ld-task-tl-content">
                        <div className="ld-task-tl-title">Submit Medical Certification</div>
                        <div className="ld-task-tl-meta">Completed Jun 5, 2026</div>
                      </div>
                      <span className="ld-task-tl-badge done">Done</span>
                    </div>
                    <div className="ld-task-tl-item done">
                      <div className="ld-task-tl-dot done" />
                      <div className="ld-task-tl-content">
                        <div className="ld-task-tl-title">Employer Verification</div>
                        <div className="ld-task-tl-meta">Completed Jun 8, 2026</div>
                      </div>
                      <span className="ld-task-tl-badge done">Done</span>
                    </div>
                    <div className="ld-task-tl-item done">
                      <div className="ld-task-tl-dot done" />
                      <div className="ld-task-tl-content">
                        <div className="ld-task-tl-title">Claim Decision</div>
                        <div className="ld-task-tl-meta">Approved Jun 10, 2026</div>
                      </div>
                      <span className="ld-task-tl-badge done">Done</span>
                    </div>
                  </div>
                )}
              </div>

              {/* FMLA Tasks */}
              <div className="ld-task-group">
                <button type="button" className={'ld-task-group-header ld-accordion-toggle' + (openAccordions.fmla ? ' open' : '')} onClick={function () { toggleAccordion('fmla'); }}>
                  <span className="ld-task-group-dot fmla" />
                  <span className="ld-task-group-label">FMLA</span>
                  <span className="ld-task-group-count">1/3 complete</span>
                  <svg className="ld-accordion-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                {openAccordions.fmla && (
                  <div className="ld-task-timeline">
                    <div className="ld-task-tl-item done">
                      <div className="ld-task-tl-dot done" />
                      <div className="ld-task-tl-content">
                        <div className="ld-task-tl-title">Eligibility Confirmed</div>
                        <div className="ld-task-tl-meta">Completed Jun 3, 2026</div>
                      </div>
                      <span className="ld-task-tl-badge done">Done</span>
                    </div>
                    <div className="ld-task-tl-item urgent">
                      <div className="ld-task-tl-dot urgent" />
                      <div className="ld-task-tl-content">
                        <div className="ld-task-tl-title">Submit Birth Certificate</div>
                        <div className="ld-task-tl-meta">Due by Jul 24, 2026</div>
                      </div>
                      <span className="ld-task-tl-badge urgent">Action</span>
                    </div>
                    <div className="ld-task-tl-item pending">
                      <div className="ld-task-tl-dot pending" />
                      <div className="ld-task-tl-content">
                        <div className="ld-task-tl-title">Return to Work Confirmation</div>
                        <div className="ld-task-tl-meta">Due by Aug 24, 2026</div>
                      </div>
                      <span className="ld-task-tl-badge pending">Pending</span>
                    </div>
                  </div>
                )}
              </div>

              {/* PFML Tasks */}
              <div className="ld-task-group">
                <button type="button" className={'ld-task-group-header ld-accordion-toggle' + (openAccordions.pfml ? ' open' : '')} onClick={function () { toggleAccordion('pfml'); }}>
                  <span className="ld-task-group-dot pfml" />
                  <span className="ld-task-group-label">PFML</span>
                  <span className="ld-task-group-count">1/2 complete</span>
                  <svg className="ld-accordion-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                {openAccordions.pfml && (
                  <div className="ld-task-timeline">
                    <div className="ld-task-tl-item done">
                      <div className="ld-task-tl-dot done" />
                      <div className="ld-task-tl-content">
                        <div className="ld-task-tl-title">Bonding Application Submitted</div>
                        <div className="ld-task-tl-meta">Completed Jun 25, 2026</div>
                      </div>
                      <span className="ld-task-tl-badge done">Done</span>
                    </div>
                    <div className="ld-task-tl-item in-progress">
                      <div className="ld-task-tl-dot in-progress" />
                      <div className="ld-task-tl-content">
                        <div className="ld-task-tl-title">State Review</div>
                        <div className="ld-task-tl-meta">In progress since Jul 1, 2026</div>
                      </div>
                      <span className="ld-task-tl-badge in-progress">In Progress</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Leave Snapshot */}
            <div className="ld-side-card">
              <h3 className="ld-side-title">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Leave Snapshot
              </h3>
              {/* Time Usage */}
              <div className="ld-v2-snapshot-section">
                <div className="ld-v2-snapshot-bar-header">
                  <span className="ld-v2-snapshot-bar-label">4 of 12 weeks used</span>
                  <span className="ld-v2-snapshot-bar-sub">8 weeks remaining</span>
                </div>
                <div className="ld-v2-snapshot-bar">
                  <div className="ld-v2-snapshot-bar-fill" style={{ width: '33.3%' }} />
                </div>
                <div className="ld-v2-snapshot-stats">
                  <div className="ld-v2-snapshot-stat">
                    <span className="ld-v2-snapshot-stat-value">40</span>
                    <span className="ld-v2-snapshot-stat-label">Days Left</span>
                  </div>
                  <div className="ld-v2-snapshot-stat">
                    <span className="ld-v2-snapshot-stat-value">Aug 24</span>
                    <span className="ld-v2-snapshot-stat-label">End Date</span>
                  </div>
                </div>
              </div>
              {/* Payment Stats */}
              <div className="ld-v2-snapshot-section">
                <div className="ld-v2-snapshot-divider" />
                <div className="ld-v2-payment-summary">
                  <div className="ld-v2-pmt-item">
                    <span className="ld-v2-pmt-label">Total Paid</span>
                    <span className="ld-v2-pmt-value">$5,100.00</span>
                  </div>
                  <div className="ld-v2-pmt-item">
                    <span className="ld-v2-pmt-label">Last Payment</span>
                    <span className="ld-v2-pmt-value">$850.00</span>
                  </div>
                  <div className="ld-v2-pmt-item">
                    <span className="ld-v2-pmt-label">Next Payment</span>
                    <span className="ld-v2-pmt-value">Jul 12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <GlobalFooter />
    </div>
  );
}
