import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

export default function LeaveDetailV3Page() {
  var location = useLocation();
  var [activeTab, setActiveTab] = useState('payments');
  var [expandedPayments, setExpandedPayments] = useState({});

  function togglePaymentRow(id) {
    setExpandedPayments(function (prev) {
      var next = Object.assign({}, prev);
      next[id] = !next[id];
      return next;
    });
  }

  return (
    <div className="ld-page">
      <GlobalNav user="Bob Martinez" initials="BM" />

      <div className="ld-content">
        {/* Breadcrumb */}
        <div className="ld-breadcrumb">
          <Link to="/overview-react">Home</Link>
          <span className="ld-bc-sep">/</span>
          <Link to="/claims-status">My Claims</Link>
          <span className="ld-bc-sep">/</span>
          <span>STD Claim</span>
        </div>

        {/* Employer Absence Alert */}
        <div className="ld-v3-alert">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#105fa8"/><path d="M12 8v4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="#fff"/></svg>
          <div className="ld-v3-alert-content">
            <span className="ld-v3-alert-text"><strong>Important.</strong> Your employer manages absence and return-to-work scheduling. To request time off or report schedule changes, visit your employer's HR portal.</span>
          </div>
        </div>

        {/* Title Card */}
        <div className="ld-title-card">
          <div className="ld-title-left">
            <div className="ld-title-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 12h6M12 9v6" stroke="#0052cc" strokeWidth="1.5" strokeLinecap="round"/><rect x="3" y="3" width="18" height="18" rx="4" stroke="#0052cc" strokeWidth="1.5"/></svg>
            </div>
            <div>
              <h1 className="ld-title">Short-Term Disability Claim</h1>
              <div className="ld-title-meta">
                <span className="ld-title-dot" />
                <span className="ld-title-id">CLM-94820</span>
                <span className="ld-title-sep">|</span>
                <span>Filed May 4, 2026</span>
              </div>
            </div>
          </div>
          <div className="ld-title-actions">
            <span className="ld-status-badge approved">APPROVED</span>
          </div>
        </div>


        {/* Two Column Layout */}
        <div className="ld-v2-layout">
          {/* Main */}
          <div>
            {/* Claim Details Card */}
            <div className="ld-card">
              <h2 className="ld-card-title">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                Claim Details
              </h2>
              <div className="ld-v3-details-grid">
                <div className="ld-detail-row">
                  <span className="ld-detail-label">Claim Number</span>
                  <span className="ld-detail-value">CLM-94820</span>
                </div>
                <div className="ld-detail-row">
                  <span className="ld-detail-label">Policy</span>
                  <span className="ld-detail-value">Group STD — Employer Paid</span>
                </div>
                <div className="ld-detail-row">
                  <span className="ld-detail-label">Diagnosis</span>
                  <span className="ld-detail-value">Lumbar disc herniation</span>
                </div>
                <div className="ld-detail-row">
                  <span className="ld-detail-label">Leave Start</span>
                  <span className="ld-detail-value">May 4, 2026</span>
                </div>
                <div className="ld-detail-row">
                  <span className="ld-detail-label">Benefits Begin</span>
                  <span className="ld-detail-value">May 11, 2026</span>
                </div>
                <div className="ld-detail-row">
                  <span className="ld-detail-label">Expected RTW</span>
                  <span className="ld-detail-value">Aug 5, 2026</span>
                </div>
                <div className="ld-detail-row">
                  <span className="ld-detail-label">Max Benefit Duration</span>
                  <span className="ld-detail-value">12 weeks</span>
                </div>
                <div className="ld-detail-row">
                  <span className="ld-detail-label">Weeks Remaining</span>
                  <span className="ld-detail-value">4 of 12 weeks</span>
                </div>
              </div>

              {/* Benefit Duration Bar */}
              <div className="ld-v3-duration">
                <div className="ld-v3-duration-header">
                  <span className="ld-v3-duration-label">Benefit Duration</span>
                  <span className="ld-v3-duration-value">8 of 12 weeks used</span>
                </div>
                <div className="ld-v3-duration-bar">
                  <div className="ld-v3-duration-fill" style={{ width: '66.7%' }} />
                </div>
                <div className="ld-v3-duration-dates">
                  <span>May 11, 2026</span>
                  <span>Aug 3, 2026</span>
                </div>
              </div>
            </div>

            {/* Payments & Documents Tabs */}
            <div className="ld-card ld-tabbed-card">
              <div className="ld-tabs">
                <button type="button" className={'ld-tab' + (activeTab === 'payments' ? ' active' : '')} onClick={function () { setActiveTab('payments'); }}>Payments</button>
                <button type="button" className={'ld-tab' + (activeTab === 'documents' ? ' active' : '')} onClick={function () { setActiveTab('documents'); }}>Documents &amp; EOBs</button>
              </div>

              {activeTab === 'payments' && (
                <div className="ld-tab-content">
                  <div className="ld-payment-summary">
                    <div className="ld-payment-box">
                      <div className="ld-payment-box-label">Total Paid</div>
                      <div className="ld-payment-box-value">$6,219.51</div>
                    </div>
                    <div className="ld-payment-box">
                      <div className="ld-payment-box-label">Last Payment</div>
                      <div className="ld-payment-box-value">$1,036.59</div>
                    </div>
                    <div className="ld-payment-box">
                      <div className="ld-payment-box-label">Next Payment</div>
                      <div className="ld-payment-box-value">Jul 26</div>
                    </div>
                  </div>

                  <table className="ld-claims-table">
                    <thead>
                      <tr>
                        <th>Paid Date</th>
                        <th>Period</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Jul 12, 2026</td>
                        <td>Jun 29 - Jul 12</td>
                        <td>$1,036.59</td>
                        <td><span className="ld-claim-status processed">PAID</span></td>
                        <td><button type="button" className="ld-link ld-pmt-toggle" onClick={function () { togglePaymentRow('p1'); }}>{expandedPayments.p1 ? 'Hide' : 'See Details'}</button></td>
                      </tr>
                      {expandedPayments.p1 && (
                        <tr className="ld-pmt-expand-row"><td colSpan="5">
                          <div className="ld-pmt-expand-grid">
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Gross Pay</span><span className="ld-pmt-expand-value">$1,296.99</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Adjustments</span><span className="ld-pmt-expand-value">$0.00</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Tax &amp; Deductions</span><span className="ld-pmt-expand-value">-$260.40</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Net Amount</span><span className="ld-pmt-expand-value ld-pmt-net">$1,036.59</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Paid By</span><span className="ld-pmt-expand-value">Benefits Hub</span></div>
                          </div>
                        </td></tr>
                      )}
                      <tr>
                        <td>Jun 28, 2026</td>
                        <td>Jun 15 - Jun 28</td>
                        <td>$1,036.59</td>
                        <td><span className="ld-claim-status processed">PAID</span></td>
                        <td><button type="button" className="ld-link ld-pmt-toggle" onClick={function () { togglePaymentRow('p2'); }}>{expandedPayments.p2 ? 'Hide' : 'See Details'}</button></td>
                      </tr>
                      {expandedPayments.p2 && (
                        <tr className="ld-pmt-expand-row"><td colSpan="5">
                          <div className="ld-pmt-expand-grid">
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Gross Pay</span><span className="ld-pmt-expand-value">$1,296.99</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Adjustments</span><span className="ld-pmt-expand-value">$0.00</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Tax &amp; Deductions</span><span className="ld-pmt-expand-value">-$260.40</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Net Amount</span><span className="ld-pmt-expand-value ld-pmt-net">$1,036.59</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Paid By</span><span className="ld-pmt-expand-value">Benefits Hub</span></div>
                          </div>
                        </td></tr>
                      )}
                      <tr>
                        <td>Jun 14, 2026</td>
                        <td>Jun 01 - Jun 14</td>
                        <td>$1,036.59</td>
                        <td><span className="ld-claim-status processed">PAID</span></td>
                        <td><button type="button" className="ld-link ld-pmt-toggle" onClick={function () { togglePaymentRow('p3'); }}>{expandedPayments.p3 ? 'Hide' : 'See Details'}</button></td>
                      </tr>
                      {expandedPayments.p3 && (
                        <tr className="ld-pmt-expand-row"><td colSpan="5">
                          <div className="ld-pmt-expand-grid">
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Gross Pay</span><span className="ld-pmt-expand-value">$1,296.99</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Adjustments</span><span className="ld-pmt-expand-value">$0.00</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Tax &amp; Deductions</span><span className="ld-pmt-expand-value">-$260.40</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Net Amount</span><span className="ld-pmt-expand-value ld-pmt-net">$1,036.59</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Paid By</span><span className="ld-pmt-expand-value">Benefits Hub</span></div>
                          </div>
                        </td></tr>
                      )}
                      <tr>
                        <td>May 31, 2026</td>
                        <td>May 18 - May 31</td>
                        <td>$1,036.59</td>
                        <td><span className="ld-claim-status processed">PAID</span></td>
                        <td><button type="button" className="ld-link ld-pmt-toggle" onClick={function () { togglePaymentRow('p4'); }}>{expandedPayments.p4 ? 'Hide' : 'See Details'}</button></td>
                      </tr>
                      {expandedPayments.p4 && (
                        <tr className="ld-pmt-expand-row"><td colSpan="5">
                          <div className="ld-pmt-expand-grid">
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Gross Pay</span><span className="ld-pmt-expand-value">$1,296.99</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Adjustments</span><span className="ld-pmt-expand-value">$0.00</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Tax &amp; Deductions</span><span className="ld-pmt-expand-value">-$260.40</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Net Amount</span><span className="ld-pmt-expand-value ld-pmt-net">$1,036.59</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Paid By</span><span className="ld-pmt-expand-value">Benefits Hub</span></div>
                          </div>
                        </td></tr>
                      )}
                      <tr>
                        <td>May 17, 2026</td>
                        <td>May 11 - May 17</td>
                        <td>$518.30</td>
                        <td><span className="ld-claim-status processed">PAID</span></td>
                        <td><button type="button" className="ld-link ld-pmt-toggle" onClick={function () { togglePaymentRow('p5'); }}>{expandedPayments.p5 ? 'Hide' : 'See Details'}</button></td>
                      </tr>
                      {expandedPayments.p5 && (
                        <tr className="ld-pmt-expand-row"><td colSpan="5">
                          <div className="ld-pmt-expand-grid">
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Gross Pay</span><span className="ld-pmt-expand-value">$648.49</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Adjustments</span><span className="ld-pmt-expand-value">$0.00</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Tax &amp; Deductions</span><span className="ld-pmt-expand-value">-$130.19</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Net Amount</span><span className="ld-pmt-expand-value ld-pmt-net">$518.30</span></div>
                            <div className="ld-pmt-expand-item"><span className="ld-pmt-expand-label">Paid By</span><span className="ld-pmt-expand-value">Benefits Hub</span></div>
                          </div>
                        </td></tr>
                      )}
                      <tr>
                        <td>Jul 26, 2026</td>
                        <td>Jul 13 - Jul 26</td>
                        <td>$1,036.59</td>
                        <td><span className="ld-claim-status pending-status">SCHEDULED</span></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="ld-tab-content">
                  <div className="ld-doc-list">
                    <div className="ld-doc-item">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#0052cc" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="#0052cc" strokeWidth="1.2"/></svg>
                      <div className="ld-doc-info">
                        <div className="ld-doc-name">Explanation of Benefits — Jul 12</div>
                        <div className="ld-doc-meta">PDF · Generated Jul 12, 2026</div>
                      </div>
                      <a href="#" className="ld-link">Download</a>
                    </div>
                    <div className="ld-doc-item">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#0052cc" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="#0052cc" strokeWidth="1.2"/></svg>
                      <div className="ld-doc-info">
                        <div className="ld-doc-name">Explanation of Benefits — Jun 28</div>
                        <div className="ld-doc-meta">PDF · Generated Jun 28, 2026</div>
                      </div>
                      <a href="#" className="ld-link">Download</a>
                    </div>
                    <div className="ld-doc-item">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#0052cc" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="#0052cc" strokeWidth="1.2"/></svg>
                      <div className="ld-doc-info">
                        <div className="ld-doc-name">Explanation of Benefits — Jun 14</div>
                        <div className="ld-doc-meta">PDF · Generated Jun 14, 2026</div>
                      </div>
                      <a href="#" className="ld-link">Download</a>
                    </div>
                    <div className="ld-doc-item">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#22c55e" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="#22c55e" strokeWidth="1.2"/></svg>
                      <div className="ld-doc-info">
                        <div className="ld-doc-name">Claim Approval Letter</div>
                        <div className="ld-doc-meta">PDF · May 10, 2026</div>
                      </div>
                      <a href="#" className="ld-link">Download</a>
                    </div>
                    <div className="ld-doc-item">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#737373" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="#737373" strokeWidth="1.2"/></svg>
                      <div className="ld-doc-info">
                        <div className="ld-doc-name">Attending Physician Statement</div>
                        <div className="ld-doc-meta">PDF · Submitted May 6, 2026</div>
                      </div>
                      <a href="#" className="ld-link">Download</a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="ld-sidebar">
            {/* Claim Status */}
            <div className="ld-side-card">
              <h3 className="ld-side-title">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/><path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                Claim Status
              </h3>
              <div className="ld-v3-status-badge-wrap">
                <span className="ld-status-badge approved">APPROVED</span>
                <span className="ld-v3-status-since">Since May 10, 2026</span>
              </div>
              <div className="ld-v3-status-timeline">
                <div className="ld-v3-step done">
                  <div className="ld-v3-step-dot" />
                  <div className="ld-v3-step-content">
                    <div className="ld-v3-step-title">Claim Filed</div>
                    <div className="ld-v3-step-date">May 4, 2026</div>
                  </div>
                </div>
                <div className="ld-v3-step done">
                  <div className="ld-v3-step-dot" />
                  <div className="ld-v3-step-content">
                    <div className="ld-v3-step-title">Documentation Received</div>
                    <div className="ld-v3-step-date">May 7, 2026</div>
                  </div>
                </div>
                <div className="ld-v3-step done">
                  <div className="ld-v3-step-dot" />
                  <div className="ld-v3-step-content">
                    <div className="ld-v3-step-title">Claim Approved</div>
                    <div className="ld-v3-step-date">May 10, 2026</div>
                    <div className="ld-v3-step-desc">7-day elimination period waived.</div>
                  </div>
                </div>
                <div className="ld-v3-step current">
                  <div className="ld-v3-step-dot" />
                  <div className="ld-v3-step-content">
                    <div className="ld-v3-step-title">Benefits In Payment</div>
                    <div className="ld-v3-step-date">Since May 11, 2026</div>
                    <div className="ld-v3-step-desc">Next payment Jul 26.</div>
                    <div className="ld-v3-step-action">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#ef4444" strokeWidth="1.2"/><path d="M8 5v3" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="11" r="0.7" fill="#ef4444"/></svg>
                      <div>
                        <div className="ld-v3-step-action-title">Updated Medical Certification</div>
                        <div className="ld-v3-step-action-desc">Required to continue benefits past Aug 3. Due Jul 25.</div>
                        <a href="#" className="ld-task-action">Upload Document →</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ld-v3-step upcoming">
                  <div className="ld-v3-step-dot" />
                  <div className="ld-v3-step-content">
                    <div className="ld-v3-step-title">Expected RTW</div>
                    <div className="ld-v3-step-date">Aug 5, 2026</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="ld-side-card">
              <h3 className="ld-side-title">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/></svg>
                Your Claim Examiner
              </h3>
              <div className="ld-v3-contact">
                <div className="ld-v3-contact-avatar">KR</div>
                <div className="ld-v3-contact-info">
                  <div className="ld-v3-contact-name">Karen Rodriguez</div>
                  <div className="ld-v3-contact-role">Claim Examiner · STD</div>
                </div>
              </div>
              <div className="ld-v3-contact-actions">
                <button type="button" className="ld-btn-secondary">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/></svg>
                  Send Message
                </button>
                <button type="button" className="ld-btn-secondary">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M14 11.5v2a1.5 1.5 0 01-1.5 1.5h-1A9.5 9.5 0 012 5.5v-1A1.5 1.5 0 013.5 3h2l1.5 3-1.5 1.5a7 7 0 004 4L11 10l3 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Call
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <GlobalFooter />

      {/* Version Toolbar */}
      <div className="ld-version-toolbar">
        {location.pathname.includes('claims-and-leave') ? (
          <>
            <Link to={location.pathname.replace(/\/case-detail.*/, '/case-detail')} className="">V2</Link>
            <Link to={location.pathname.replace(/\/case-detail.*/, '/case-detail-v3')} className="active">V3</Link>
          </>
        ) : (
          <>
            <Link to="/leave-detail" className="">V1</Link>
            <Link to="/leave-detail-v2" className="">V2</Link>
            <Link to="/leave-detail-v3" className="active">V3</Link>
          </>
        )}
      </div>
    </div>
  );
}
