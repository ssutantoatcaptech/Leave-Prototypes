import { useState } from 'react';
import { Link } from 'react-router-dom';
import './leave-detail-b.css';
import '../absence-details/absence-details-react.css';

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

export default function LeaveDetailV2dPage() {
  var [timelineView, setTimelineView] = useState('protection');
  var [hoveredRow, setHoveredRow] = useState(null);
  var [editingSection, setEditingSection] = useState(null);
  var [detailsExpanded, setDetailsExpanded] = useState(false);
  var [detailsForm, setDetailsForm] = useState({
    leaveType: 'Intermittent',
    startDate: '2026-07-15',
    endDate: '',
    returnDate: '',
    duration: 'Up to 12 weeks',
    reason: 'Back surgery and post-operative recovery',
    provider: 'Dr. Patel (Orthopedic Surgery)',
    facility: 'Nebraska Medical Center',
    schedule: 'Full-time · 40 hrs/week',
    manager: 'Lisa Chen',
    email: 'marcus.thompson@company.com',
    phone: '(402) 555-0187',
    address: '4521 Maple Drive, Omaha, NE 68102',
  });
  var [openAccordions, setOpenAccordions] = useState({ std: true });
  var [paymentsDrawerOpen, setPaymentsDrawerOpen] = useState(false);
  var [expandedPayments, setExpandedPayments] = useState({});
  var [detailsCardOpen, setDetailsCardOpen] = useState(false);
  var [showAllTasks, setShowAllTasks] = useState(false);

  function handleDetailsChange(field, value) {
    setDetailsForm(function (prev) {
      var next = Object.assign({}, prev);
      next[field] = value;
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
      <SiteNav user="Marcus Thompson" initials="MT" />

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
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M9 12h6M12 9v6" stroke="#0f0f14" strokeWidth="1.5" strokeLinecap="round"/><rect x="3" y="3" width="18" height="18" rx="4" stroke="#0f0f14" strokeWidth="1.5"/></svg>
            </div>
            <div>
              <h1 className="ldb-title">Medical Leave — Back Surgery Recovery</h1>
              <div className="ldb-title-meta">
                <span className="ldb-title-dot" />
                <span className="ldb-title-id">NTN-44201987</span>
                <span className="ldb-title-sep">&middot;</span>
                <span className="ldb-status-badge pending-status">Pending</span>
              </div>
            </div>
          </div>
          <div className="ldb-title-actions">
            <button type="button" className="ldb-btn-secondary">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 2h8v12H4z" stroke="currentColor" strokeWidth="1.2"/><path d="M6 5h4M6 7.5h4M6 10h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
              Print Details
            </button>
            <button type="button" className="ldb-btn-primary" disabled>
              Return to Work
            </button>
          </div>
        </div>

        <div className="ldb-v2-layout">
          {/* Left: Main content */}
          <div className="ldb-v2-main">

            {/* Leave Timeline */}
            <div className="ldb-card dt-timeline-wrap">
                <div className="ad-section-header">
                  <div>
                    <h3>Leave Timeline</h3>
                    <p>Medical Leave — Back Surgery Recovery · <em><strong>Estimates</strong> subject to final approval</em></p>
                  </div>
                  <div className="dt-tl-toggle">
                    <button type="button" className={timelineView === 'protection' ? 'active' : ''} onClick={function () { setTimelineView('protection'); }}>Protection</button>
                    <button type="button" className={timelineView === 'payment' ? 'active' : ''} onClick={function () { setTimelineView('payment'); }}>Payment</button>
                  </div>
                </div>


                <p className="ad-section-helper">Hover over a row to see details</p>

                <div className="dlp-timeline">
                  <div className="ldb-tl-rows-wrap">
                  <div className="dlp-tl-rows">
                    {(timelineView === 'payment' ? [
                      { id: 'std', label: 'STD', width: 50, accent: '#4b4b4b', name: 'Short-Term Disability (STD)', weeks: '6 weeks', range: 'Jul 15 – Aug 26, 2026', pay: '60% salary after 7-day wait', status: 'Pending', paymentValue: '~$2,308/wk' },
                    ] : [
                      { id: 'fmla', label: 'FMLA', width: 100, accent: '#1f1f1f', name: 'FMLA (Job Protection)', weeks: '12 weeks', range: 'Jul 15 – Oct 07, 2026', pay: 'Job protection (unpaid)', status: 'Pending' },
                      { id: 'std', label: 'STD', width: 50, accent: '#4b4b4b', name: 'Short-Term Disability (STD)', weeks: '6 weeks', range: 'Jul 15 – Aug 26, 2026', pay: '60% salary after 7-day wait', status: 'Pending' },
                    ]).map(function (item, index) {
                      return (
                        <button
                          key={item.id}
                          className={'dlp-tl-row' + (hoveredRow === item.id ? ' active' : '')}
                          type="button"
                          onMouseEnter={function () { setHoveredRow(item.id); }}
                          onMouseLeave={function () { setHoveredRow(null); }}
                        >
                          <div className="dlp-tl-row-label">{item.label}</div>
                          <div className="dlp-tl-row-bar">
                            <div className="dlp-tl-seg" style={{ left: '0%', width: item.width + '%', background: item.accent }} />
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {hoveredRow && (function () {
                    var allRows = timelineView === 'payment' ? [
                      { id: 'std', name: 'Short-Term Disability (STD)', weeks: '6 weeks', range: 'Jul 15 – Aug 26, 2026', pay: '60% salary after 7-day wait', status: 'Pending', paymentValue: '~$2,308/wk' },
                    ] : [
                      { id: 'fmla', name: 'FMLA (Job Protection)', weeks: '12 weeks', range: 'Jul 15 – Oct 07, 2026', pay: 'Job protection (unpaid)', status: 'Pending' },
                      { id: 'std', name: 'Short-Term Disability (STD)', weeks: '6 weeks', range: 'Jul 15 – Aug 26, 2026', pay: '60% salary after 7-day wait', status: 'Pending' },
                    ];
                    var hovered = allRows.find(function (r) { return r.id === hoveredRow; });
                    if (!hovered) return null;
                    return (
                      <div className="ad-coverage-tooltip">
                        <div className="ad-coverage-tooltip-head">
                          <div className="title">{hovered.name}</div>
                        </div>
                        <div className="ad-coverage-tooltip-grid">
                          <div>
                            <div className="label">{timelineView === 'payment' ? 'Est. Weekly' : 'Status'}</div>
                            <div className="value">{timelineView === 'payment' ? hovered.paymentValue : hovered.status}</div>
                          </div>
                          <div>
                            <div className="label">Duration</div>
                            <div className="value">{hovered.weeks}</div>
                          </div>
                          <div>
                            <div className="label">Dates</div>
                            <div className="value">{hovered.range}</div>
                          </div>
                          <div>
                            <div className="label">Pay</div>
                            <div className="value">{hovered.pay}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                  </div>

                  <div className="dlp-tl-weeks">
                    {Array.from({ length: 13 }, function (_, i) {
                      return <div key={i} className="dlp-tl-week-tick"><span className="dlp-tl-week-num">Wk {i + 1}</span></div>;
                    })}
                  </div>
                  <div className="dlp-tl-months">
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                  </div>

                  <div className="dlp-legend">
                    {(timelineView === 'payment' ? [
                      { id: 'partial-pay', label: 'Partial Pay', accent: '#4b4b4b' },
                      { id: 'unpaid', label: 'Unpaid', accent: '#e5e7eb' },
                    ] : [
                      { id: 'fmla', label: 'FMLA', accent: '#1f1f1f' },
                      { id: 'std', label: 'STD', accent: '#4b4b4b' },
                      { id: 'unpaid', label: 'Unpaid', accent: '#e5e7eb' },
                    ]).map(function (item) {
                      return (
                        <div key={item.id} className="dlp-legend-item">
                          <div className="dlp-legend-dot" style={{ background: item.accent }} />
                          {item.label}
                        </div>
                      );
                    })}
                  </div>

                  {timelineView === 'payment' && (
                    <div className="dt-payment-summary">
                      <div className="dt-payment-summary-title">Estimated total income during leave</div>
                      <div className="dt-payment-summary-value">$13,848</div>
                      <div className="dt-payment-summary-note">Based on current salary · Actual amounts may vary after approval</div>
                    </div>
                  )}
                </div>

            </div>

            {/* Associated Claims */}
            <div className="ldb-card">
              <h2 className="ldb-card-title" style={{ marginBottom: 16 }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                Associated Claims
              </h2>
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
                      <div className="ldb-claim-type">Short-Term Disability (STD)
                        <span className="ldb-claim-info-tip">
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M8 7v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="5" r="0.7" fill="currentColor"/></svg>
                          <span className="ldb-claim-info-tip-text">Funds your weekly benefit payments during this leave</span>
                        </span>
                      </div>
                      <div className="ldb-claim-sub">Surgical Recovery</div>
                    </td>
                    <td>NTN-9920145</td>
                    <td><span className="ldb-claim-status pending-status">PENDING</span></td>
                    <td>Awaiting docs</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="ldb-claim-type">FMLA Protection
                        <span className="ldb-claim-info-tip">
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M8 7v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="5" r="0.7" fill="currentColor"/></svg>
                          <span className="ldb-claim-info-tip-text">Protects your job and benefits while on leave</span>
                        </span>
                      </div>
                      <div className="ldb-claim-sub">Medical Certification Required</div>
                    </td>
                    <td>FML-2026-0715</td>
                    <td><span className="ldb-claim-status pending-status">PENDING</span></td>
                    <td>Awaiting docs</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Associated Payments */}
            <div className="ldb-card">
              <h2 className="ldb-card-title" style={{ marginBottom: 8 }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" stroke="currentColor" strokeWidth="1.2"/><path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                Associated Payments
              </h2>
              <p className="ldb-card-context">Payments begin once your STD claim is approved. Paid weekly via direct deposit.</p>
              <div className="ldb-payments-grid">
                <div className="ldb-payment-item">
                  <span className="ldb-payment-label">Most Recent Payment</span>
                  <span className="ldb-payment-value">—</span>
                </div>
                <div className="ldb-payment-item">
                  <span className="ldb-payment-label">Total Paid to Date</span>
                  <span className="ldb-payment-value">$0.00</span>
                </div>
                <div className="ldb-payment-item">
                  <span className="ldb-payment-label">Expected Next Payment</span>
                  <span className="ldb-payment-value">After approval</span>
                </div>
                <div className="ldb-payment-item">
                  <span className="ldb-payment-label">Expected Weekly Benefit</span>
                  <span className="ldb-payment-value">$1,150.00</span>
                </div>
              </div>
              <button type="button" className="ldb-payments-view-btn" onClick={function () { setPaymentsDrawerOpen(true); }}>
                VIEW ALL PAYMENTS
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>

            {/* Leave Details */}
            <div className="ldb-card">
              <button type="button" className="ldb-card-collapse-header" onClick={function () { setDetailsCardOpen(!detailsCardOpen); }}>
                <h2 className="ldb-card-title" style={{ marginBottom: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  Leave Details
                </h2>
                <svg className={'ldb-card-collapse-chevron' + (detailsCardOpen ? ' open' : '')} width="12" height="7" viewBox="0 0 12 7" fill="none"><path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              {detailsCardOpen && (<>


              {/* Leave Information Section */}
              <div className="dt-info-block">
                <div className="dt-info-block-header">
                  <h4>Leave Information</h4>
                  {editingSection !== 'leave' && (
                    <button className="dt-info-edit-btn" type="button" aria-label="Edit Leave Information" onClick={function () { setEditingSection('leave'); }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  )}
                  {editingSection === 'leave' && (
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#525252', background: '#f0f0f2', padding: '2px 8px', borderRadius: 4 }}>Editing</span>
                  )}
                </div>
                {editingSection === 'leave' ? (
                  <>
                    <div className="dt-info-grid">
                      <div>
                        <div className="dt-info-field-label">Leave Type</div>
                        <select className="ldb-detail-input" value={detailsForm.leaveType} onChange={function (e) { handleDetailsChange('leaveType', e.target.value); }}>
                          <option value="Continuous">Continuous</option>
                          <option value="Intermittent">Intermittent</option>
                          <option value="Reduced Schedule">Reduced Schedule</option>
                        </select>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Leave Start Date</div>
                        <input type="date" className="ldb-detail-input" value={detailsForm.startDate} onChange={function (e) { handleDetailsChange('startDate', e.target.value); }} />
                      </div>
                      <div>
                        <div className="dt-info-field-label">Leave End Date</div>
                        <input type="date" className="ldb-detail-input" value={detailsForm.endDate} onChange={function (e) { handleDetailsChange('endDate', e.target.value); }} />
                      </div>
                      <div>
                        <div className="dt-info-field-label">Expected Return Date</div>
                        <input type="date" className="ldb-detail-input" value={detailsForm.returnDate} onChange={function (e) { handleDetailsChange('returnDate', e.target.value); }} />
                      </div>
                      <div>
                        <div className="dt-info-field-label">Duration</div>
                        <input type="text" className="ldb-detail-input" value={detailsForm.duration} onChange={function (e) { handleDetailsChange('duration', e.target.value); }} />
                      </div>
                      <div>
                        <div className="dt-info-field-label">Reason</div>
                        <input type="text" className="ldb-detail-input" value={detailsForm.reason} onChange={function (e) { handleDetailsChange('reason', e.target.value); }} />
                      </div>
                    </div>
                    <div className="dt-edit-actions">
                      <button type="button" className="dt-edit-save" onClick={function () { setEditingSection(null); }}>Save Changes</button>
                      <button type="button" className="dt-edit-cancel" onClick={function () { setEditingSection(null); }}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <div className="dt-info-grid">
                    <div>
                      <div className="dt-info-field-label">Leave Type</div>
                      <div className="dt-info-field-value">{detailsForm.leaveType}</div>
                    </div>
                    <div>
                      <div className="dt-info-field-label">Leave Start Date</div>
                      <div className="dt-info-field-value">Jul 15, 2026</div>
                    </div>
                    <div>
                      <div className="dt-info-field-label">Leave End Date</div>
                      <div className="dt-info-field-value">{detailsForm.endDate || 'TBD — Pending Approval'}</div>
                    </div>
                    <div>
                      <div className="dt-info-field-label">Expected Return Date</div>
                      <div className="dt-info-field-value">{detailsForm.returnDate || 'TBD'}</div>
                    </div>
                    <div>
                      <div className="dt-info-field-label">Duration</div>
                      <div className="dt-info-field-value">{detailsForm.duration}</div>
                    </div>
                    <div>
                      <div className="dt-info-field-label">Reason</div>
                      <div className="dt-info-field-value">{detailsForm.reason}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Healthcare Provider Section */}
              <div className="dt-info-block">
                <div className="dt-info-block-header">
                  <h4>Healthcare Provider</h4>
                  {editingSection !== 'provider' && (
                    <button className="dt-info-edit-btn" type="button" aria-label="Edit Healthcare Provider" onClick={function () { setEditingSection('provider'); }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  )}
                  {editingSection === 'provider' && (
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#525252', background: '#f0f0f2', padding: '2px 8px', borderRadius: 4 }}>Editing</span>
                  )}
                </div>
                {editingSection === 'provider' ? (
                  <>
                    <div className="dt-info-grid">
                      <div>
                        <div className="dt-info-field-label">Provider</div>
                        <input type="text" className="ldb-detail-input" value={detailsForm.provider} onChange={function (e) { handleDetailsChange('provider', e.target.value); }} />
                      </div>
                      <div>
                        <div className="dt-info-field-label">Facility</div>
                        <input type="text" className="ldb-detail-input" value={detailsForm.facility} onChange={function (e) { handleDetailsChange('facility', e.target.value); }} />
                      </div>
                    </div>
                    <div className="dt-edit-actions">
                      <button type="button" className="dt-edit-save" onClick={function () { setEditingSection(null); }}>Save Changes</button>
                      <button type="button" className="dt-edit-cancel" onClick={function () { setEditingSection(null); }}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <div className="dt-info-grid">
                    <div>
                      <div className="dt-info-field-label">Provider</div>
                      <div className="dt-info-field-value">{detailsForm.provider}</div>
                    </div>
                    <div>
                      <div className="dt-info-field-label">Facility</div>
                      <div className="dt-info-field-value">{detailsForm.facility}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Work Schedule Section */}
              <div className="dt-info-block">
                <div className="dt-info-block-header">
                  <h4>Work Schedule</h4>
                  {editingSection !== 'schedule' && (
                    <button className="dt-info-edit-btn" type="button" aria-label="Edit Work Schedule" onClick={function () { setEditingSection('schedule'); }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  )}
                  {editingSection === 'schedule' && (
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#525252', background: '#f0f0f2', padding: '2px 8px', borderRadius: 4 }}>Editing</span>
                  )}
                </div>
                {editingSection === 'schedule' ? (
                  <>
                    <div className="dt-info-grid">
                      <div>
                        <div className="dt-info-field-label">Schedule</div>
                        <input type="text" className="ldb-detail-input" value={detailsForm.schedule} onChange={function (e) { handleDetailsChange('schedule', e.target.value); }} />
                      </div>
                      <div>
                        <div className="dt-info-field-label">Manager</div>
                        <input type="text" className="ldb-detail-input" value={detailsForm.manager} onChange={function (e) { handleDetailsChange('manager', e.target.value); }} />
                      </div>
                    </div>
                    <div className="dt-edit-actions">
                      <button type="button" className="dt-edit-save" onClick={function () { setEditingSection(null); }}>Save Changes</button>
                      <button type="button" className="dt-edit-cancel" onClick={function () { setEditingSection(null); }}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <div className="dt-info-grid">
                    <div>
                      <div className="dt-info-field-label">Schedule</div>
                      <div className="dt-info-field-value">{detailsForm.schedule}</div>
                    </div>
                    <div>
                      <div className="dt-info-field-label">Manager</div>
                      <div className="dt-info-field-value">{detailsForm.manager}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Information Section */}
              <div className="dt-info-block">
                <div className="dt-info-block-header">
                  <h4>Contact Information</h4>
                  {editingSection !== 'contact' && (
                    <button className="dt-info-edit-btn" type="button" aria-label="Edit Contact Information" onClick={function () { setEditingSection('contact'); }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  )}
                  {editingSection === 'contact' && (
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#525252', background: '#f0f0f2', padding: '2px 8px', borderRadius: 4 }}>Editing</span>
                  )}
                </div>
                {editingSection === 'contact' ? (
                  <>
                    <div className="dt-info-grid">
                      <div>
                        <div className="dt-info-field-label">Email Address</div>
                        <input type="email" className="ldb-detail-input" value={detailsForm.email} onChange={function (e) { handleDetailsChange('email', e.target.value); }} />
                      </div>
                      <div>
                        <div className="dt-info-field-label">Phone Number</div>
                        <input type="tel" className="ldb-detail-input" value={detailsForm.phone} onChange={function (e) { handleDetailsChange('phone', e.target.value); }} />
                      </div>
                      <div>
                        <div className="dt-info-field-label">Mailing Address</div>
                        <input type="text" className="ldb-detail-input" value={detailsForm.address} onChange={function (e) { handleDetailsChange('address', e.target.value); }} />
                      </div>
                    </div>
                    <div className="dt-edit-actions">
                      <button type="button" className="dt-edit-save" onClick={function () { setEditingSection(null); }}>Save Changes</button>
                      <button type="button" className="dt-edit-cancel" onClick={function () { setEditingSection(null); }}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <div className="dt-info-grid">
                    <div>
                      <div className="dt-info-field-label">Email Address</div>
                      <div className="dt-info-field-value">{detailsForm.email}</div>
                    </div>
                    <div>
                      <div className="dt-info-field-label">Phone Number</div>
                      <div className="dt-info-field-value">{detailsForm.phone}</div>
                    </div>
                    <div>
                      <div className="dt-info-field-label">Mailing Address</div>
                      <div className="dt-info-field-value">{detailsForm.address}</div>
                    </div>
                  </div>
                )}
              </div>
              </>)}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="ldb-sidebar">
            <div className="ldb-side-card">
              <div className="ldb-tasks-header">
                <h3 className="ldb-side-title">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Items Requiring Action
                </h3>
                <span className="ldb-tasks-count">3 needed</span>
              </div>

              <div className="ldb-action-list">
                <div className="ldb-action-item">
                  <div className="ldb-action-dot" />
                  <div className="ldb-action-content">
                    <div className="ldb-action-title">Upload Medical Certification</div>
                    <div className="ldb-action-meta">Due Jul 22 · Blocks STD claim &amp; payments</div>
                  </div>
                  <button type="button" className="ldb-btn-upload-inline">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 12V4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M4.5 6.5L8 3l3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 13h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    Upload
                  </button>
                </div>
                <div className="ldb-action-item">
                  <div className="ldb-action-dot" />
                  <div className="ldb-action-content">
                    <div className="ldb-action-title">Attending Physician Statement</div>
                    <div className="ldb-action-meta">Due Jul 22 · Blocks STD claim &amp; payments</div>
                  </div>
                  <button type="button" className="ldb-btn-upload-inline">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 12V4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M4.5 6.5L8 3l3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 13h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    Upload
                  </button>
                </div>
              </div>

              {!showAllTasks && (
                <button type="button" className="ldb-tasks-expand" onClick={function () { setShowAllTasks(true); }}>
                  +4 more tasks
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              )}

              {showAllTasks && (
                <>
                <div className="ldb-action-list" style={{ borderTop: '1px solid #f0f0f2' }}>
                  <div className="ldb-action-item">
                    <div className="ldb-action-dot" />
                    <div className="ldb-action-content">
                      <div className="ldb-action-title">Submit Medical Certification</div>
                      <div className="ldb-action-meta">Due Jul 29 · Blocks job protection</div>
                    </div>
                    <button type="button" className="ldb-btn-upload-inline">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 12V4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M4.5 6.5L8 3l3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 13h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                      Upload
                    </button>
                  </div>
                </div>
                <div className="ldb-tasks-done-section">
                  <div className="ldb-tasks-done-label">Completed &amp; Pending</div>
                  <div className="ldb-action-list">
                    <div className="ldb-action-item done">
                      <div className="ldb-action-dot done" />
                      <div className="ldb-action-content">
                        <div className="ldb-action-title">Eligibility Confirmed</div>
                        <div className="ldb-action-meta">Completed Jul 15 · FMLA</div>
                      </div>
                    </div>
                    <div className="ldb-action-item pending">
                      <div className="ldb-action-dot pending" />
                      <div className="ldb-action-content">
                        <div className="ldb-action-title">Claim Decision</div>
                        <div className="ldb-action-meta">Waiting on documents · Unlocks payments</div>
                      </div>
                    </div>
                    <div className="ldb-action-item pending">
                      <div className="ldb-action-dot pending" />
                      <div className="ldb-action-content">
                        <div className="ldb-action-title">Employer Designation Notice</div>
                        <div className="ldb-action-meta">Pending certification · Unlocks job protection</div>
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

            {/* Leave Snapshot */}
            <div className="ldb-side-card">
              <h3 className="ldb-side-title">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Leave Snapshot
              </h3>
              <div className="ldb-v2-snapshot-section">
                <div className="ldb-v2-snapshot-bar-header">
                  <span className="ldb-v2-snapshot-bar-label">0 of 12 weeks used</span>
                  <span className="ldb-v2-snapshot-bar-sub">Pending approval</span>
                </div>
                <div className="ldb-v2-snapshot-bar">
                  <div className="ldb-v2-snapshot-bar-fill" style={{ width: '0%' }} />
                </div>
                <div className="ldb-v2-snapshot-stats">
                  <div className="ldb-v2-snapshot-stat">
                    <span className="ldb-v2-snapshot-stat-value">—</span>
                    <span className="ldb-v2-snapshot-stat-label">Days Left</span>
                  </div>
                  <div className="ldb-v2-snapshot-stat">
                    <span className="ldb-v2-snapshot-stat-value">TBD</span>
                    <span className="ldb-v2-snapshot-stat-label">End Date</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="ldb-side-card">
              <div className="ldb-docs-header">
                <h3 className="ldb-side-title">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="currentColor" strokeWidth="1.2"/></svg>
                  Uploaded Documents
                </h3>
                <span className="ldb-docs-count">0 / 3 uploaded</span>
              </div>
              <div className="ldb-docs-progress-bar">
                <div className="ldb-docs-progress-fill" style={{ width: '0%' }} />
              </div>
              <div className="ldb-doc-list">
                <div className="ldb-doc-item">
                  <div className="ldb-doc-status-icon">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#737373" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="#737373" strokeWidth="1.2"/></svg>
                  </div>
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">Medical_Certification.pdf</div>
                    <div className="ldb-doc-meta">Due by Jul 29, 2026</div>
                  </div>
                  <button type="button" className="ldb-doc-download-btn" aria-label="Download">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 3v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M4.5 8.5L8 12l3.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  </button>
                </div>
                <div className="ldb-doc-item">
                  <div className="ldb-doc-status-icon">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#737373" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="#737373" strokeWidth="1.2"/></svg>
                  </div>
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">Attending_Physician_Statement.pdf</div>
                    <div className="ldb-doc-meta">Due by Jul 29, 2026</div>
                  </div>
                  <button type="button" className="ldb-doc-download-btn" aria-label="Download">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 3v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M4.5 8.5L8 12l3.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  </button>
                </div>
                <div className="ldb-doc-item">
                  <div className="ldb-doc-status-icon">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#a3a3a3" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="#a3a3a3" strokeWidth="1.2"/></svg>
                  </div>
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">Surgical_Procedure_Report.pdf</div>
                    <div className="ldb-doc-meta">Optional · Speeds up processing</div>
                  </div>
                  <button type="button" className="ldb-doc-download-btn" aria-label="Download">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 3v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M4.5 8.5L8 12l3.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  </button>
                </div>
              </div>
              <button type="button" className="ldb-btn-upload-full">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="currentColor" strokeWidth="1.2"/></svg>
                See All Documents
              </button>
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
              <h2 className="ldb-drawer-title">All Payments</h2>
              <button type="button" className="ldb-drawer-close" onClick={function () { setPaymentsDrawerOpen(false); }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div className="ldb-drawer-body">
              <div className="ldb-drawer-summary">
                <div className="ldb-payments-grid">
                  <div className="ldb-payment-item">
                    <span className="ldb-payment-label">Total Paid to Date</span>
                    <span className="ldb-payment-value">$4,025.00</span>
                  </div>
                  <div className="ldb-payment-item">
                    <span className="ldb-payment-label">Most Recent Payment</span>
                    <span className="ldb-payment-value">$1,150.00</span>
                  </div>
                  <div className="ldb-payment-item">
                    <span className="ldb-payment-label">Expected Next Payment</span>
                    <span className="ldb-payment-value">Aug 19, 2026</span>
                  </div>
                  <div className="ldb-payment-item">
                    <span className="ldb-payment-label">Expected Weekly Benefit</span>
                    <span className="ldb-payment-value">$1,150.00</span>
                  </div>
                </div>
              </div>
              <div className="ldb-drawer-divider" />
              <h3 className="ldb-drawer-section-title">Payment History</h3>
              <div className="ldb-drawer-filters">
                <div className="ldb-drawer-filter-pills">
                  <button type="button" className="ldb-drawer-filter-pill active">All</button>
                  <button type="button" className="ldb-drawer-filter-pill">Last 7 days</button>
                  <button type="button" className="ldb-drawer-filter-pill">Last 30 days</button>
                  <button type="button" className="ldb-drawer-filter-pill">Last 90 days</button>
                </div>
                <div className="ldb-drawer-filter-dates">
                  <input type="date" className="ldb-drawer-date-input" />
                  <span className="ldb-drawer-date-sep">to</span>
                  <input type="date" className="ldb-drawer-date-input" />
                </div>
              </div>
              <div className="ldb-drawer-pmt-list">
                <div className="ldb-drawer-pmt-item">
                  <button type="button" className={'ldb-drawer-pmt-row clickable' + (expandedPayments.pmt1 ? ' expanded' : '')} onClick={function () { setExpandedPayments(function (p) { return Object.assign({}, p, { pmt1: !p.pmt1 }); }); }}>
                    <div className="ldb-drawer-pmt-info">
                      <span className="ldb-drawer-pmt-date">Aug 12, 2026</span>
                      <span className="ldb-drawer-pmt-type">STD Weekly · Direct Deposit</span>
                    </div>
                    <div className="ldb-drawer-pmt-right">
                      <span className="ldb-drawer-pmt-amount">$1,150.00</span>
                      <svg className={'ldb-drawer-pmt-chevron' + (expandedPayments.pmt1 ? ' open' : '')} width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </button>
                  {expandedPayments.pmt1 && (
                    <div className="ldb-drawer-pmt-details">
                      <div className="ldb-drawer-pmt-detail-row"><span>Payment ID</span><span>PMT-001</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Claim Type</span><span>Short-Term Disability</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Period Covered</span><span>Aug 5 – Aug 11, 2026</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Gross Amount</span><span>$1,150.00</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Tax Withheld</span><span>$0.00</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Offset</span><span>$0.00</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Net Amount</span><span>$1,150.00</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Deposit Account</span><span>****4872</span></div>
                    </div>
                  )}
                </div>
                <div className="ldb-drawer-pmt-item">
                  <button type="button" className={'ldb-drawer-pmt-row clickable' + (expandedPayments.pmt2 ? ' expanded' : '')} onClick={function () { setExpandedPayments(function (p) { return Object.assign({}, p, { pmt2: !p.pmt2 }); }); }}>
                    <div className="ldb-drawer-pmt-info">
                      <span className="ldb-drawer-pmt-date">Aug 5, 2026</span>
                      <span className="ldb-drawer-pmt-type">STD Weekly · Direct Deposit</span>
                    </div>
                    <div className="ldb-drawer-pmt-right">
                      <span className="ldb-drawer-pmt-amount">$1,150.00</span>
                      <svg className={'ldb-drawer-pmt-chevron' + (expandedPayments.pmt2 ? ' open' : '')} width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </button>
                  {expandedPayments.pmt2 && (
                    <div className="ldb-drawer-pmt-details">
                      <div className="ldb-drawer-pmt-detail-row"><span>Payment ID</span><span>PMT-002</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Claim Type</span><span>Short-Term Disability</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Period Covered</span><span>Jul 29 – Aug 4, 2026</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Gross Amount</span><span>$1,150.00</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Tax Withheld</span><span>$0.00</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Offset</span><span>$0.00</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Net Amount</span><span>$1,150.00</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Deposit Account</span><span>****4872</span></div>
                    </div>
                  )}
                </div>
                <div className="ldb-drawer-pmt-item">
                  <button type="button" className={'ldb-drawer-pmt-row clickable' + (expandedPayments.pmt3 ? ' expanded' : '')} onClick={function () { setExpandedPayments(function (p) { return Object.assign({}, p, { pmt3: !p.pmt3 }); }); }}>
                    <div className="ldb-drawer-pmt-info">
                      <span className="ldb-drawer-pmt-date">Jul 29, 2026</span>
                      <span className="ldb-drawer-pmt-type">STD Weekly · Direct Deposit</span>
                    </div>
                    <div className="ldb-drawer-pmt-right">
                      <span className="ldb-drawer-pmt-amount">$1,150.00</span>
                      <svg className={'ldb-drawer-pmt-chevron' + (expandedPayments.pmt3 ? ' open' : '')} width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </button>
                  {expandedPayments.pmt3 && (
                    <div className="ldb-drawer-pmt-details">
                      <div className="ldb-drawer-pmt-detail-row"><span>Payment ID</span><span>PMT-003</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Claim Type</span><span>Short-Term Disability</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Period Covered</span><span>Jul 22 – Jul 28, 2026</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Gross Amount</span><span>$1,150.00</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Tax Withheld</span><span>$0.00</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Offset</span><span>$0.00</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Net Amount</span><span>$1,150.00</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Deposit Account</span><span>****4872</span></div>
                    </div>
                  )}
                </div>
                <div className="ldb-drawer-pmt-item">
                  <button type="button" className={'ldb-drawer-pmt-row clickable' + (expandedPayments.pmt4 ? ' expanded' : '')} onClick={function () { setExpandedPayments(function (p) { return Object.assign({}, p, { pmt4: !p.pmt4 }); }); }}>
                    <div className="ldb-drawer-pmt-info">
                      <span className="ldb-drawer-pmt-date">Jul 22, 2026</span>
                      <span className="ldb-drawer-pmt-type">STD Partial · Direct Deposit</span>
                    </div>
                    <div className="ldb-drawer-pmt-right">
                      <span className="ldb-drawer-pmt-amount">$575.00</span>
                      <svg className={'ldb-drawer-pmt-chevron' + (expandedPayments.pmt4 ? ' open' : '')} width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </button>
                  {expandedPayments.pmt4 && (
                    <div className="ldb-drawer-pmt-details">
                      <div className="ldb-drawer-pmt-detail-row"><span>Payment ID</span><span>PMT-004</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Claim Type</span><span>Short-Term Disability</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Period Covered</span><span>Jul 15 – Jul 21, 2026</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Gross Amount</span><span>$575.00</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Tax Withheld</span><span>$0.00</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Offset</span><span>$0.00</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Net Amount</span><span>$575.00</span></div>
                      <div className="ldb-drawer-pmt-detail-row"><span>Deposit Account</span><span>****4872</span></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
