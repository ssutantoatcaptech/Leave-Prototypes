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

export default function LeaveDetailV2fPage() {
  var [timelineView, setTimelineView] = useState('protection');
  var [hoveredRow, setHoveredRow] = useState(null);
  var [expandedClaims, setExpandedClaims] = useState({ absence: true });
  var [paymentsOpen, setPaymentsOpen] = useState(true);
  var [showAllTasks, setShowAllTasks] = useState(false);
  var [editingSection, setEditingSection] = useState(null);
  var [detailsForm, setDetailsForm] = useState({
    reason: 'Pregnancy, childbirth, and postpartum recovery',
    duration: 'Up to 12 weeks (FMLA eligible)',
    provider: 'Dr. Williams (OB/GYN)',
    facility: 'Nebraska Methodist Hospital',
    email: 'jessica.nguyen@company.com',
    phone: '(402) 555-0234',
    address: '1827 Elm Street, Omaha, NE 68114',
  });
  var [aboutLeaveOpen, setAboutLeaveOpen] = useState(false);

  function handleDetailsChange(field, value) {
    setDetailsForm(function (prev) {
      var next = Object.assign({}, prev);
      next[field] = value;
      return next;
    });
  }

  function toggleClaim(key) {
    setExpandedClaims(function (prev) {
      var next = Object.assign({}, prev);
      next[key] = !next[key];
      return next;
    });
  }

  return (
    <div className="ldb-page">
      <SiteNav user="Jessica Nguyen" initials="JN" />

      <div className="ldb-content">
        {/* Breadcrumb */}
        <div className="ldb-breadcrumb">
          <Link to="/overview-react">Home</Link>
          <span className="ldb-bc-sep">&gt;</span>
          <Link to="/absence-history">Case History</Link>
          <span className="ldb-bc-sep">&gt;</span>
          <span>NTN-7841</span>
        </div>

        {/* Title Card */}
        <div className="ldb-title-card">
          <div className="ldb-title-left">
            <div className="ldb-title-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M9 12h6M12 9v6" stroke="#0f0f14" strokeWidth="1.5" strokeLinecap="round"/><rect x="3" y="3" width="18" height="18" rx="4" stroke="#0f0f14" strokeWidth="1.5"/></svg>
            </div>
            <div>
              <h1 className="ldb-title">NTN-7841 — Maternity Leave <span className="ldb-status-badge approved-status" style={{ fontSize: 12, marginLeft: 12, verticalAlign: 'middle' }}>Approved</span></h1>
              <div className="ldb-title-meta">
                <span style={{ fontSize: 14, color: '#525252' }}>Pregnancy, childbirth, and postpartum recovery</span>
                <span style={{ fontSize: 13, color: '#737373', marginLeft: 12 }}>Mar 10 – Jun 02, 2025 · Continuous</span>
              </div>
            </div>
          </div>
          <div className="ldb-title-actions">
            <button type="button" className="ldb-btn-secondary">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/></svg>
              Message Case Manager
            </button>
            <button type="button" className="ldb-btn-primary">
              Return to Work
            </button>
          </div>
        </div>

        <div className="ldb-v2-layout">
          {/* Left: Main content */}
          <div className="ldb-v2-main">

            {/* Coverage Timeline */}
            <div className="ldb-card dt-timeline-wrap">
                <div className="ad-section-header">
                  <div>
                    <h3>Coverage Timeline</h3>
                    <p>How your claims provide protection and income over time</p>
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
                      { id: 'std', label: 'STD', width: 50, accent: '#4b4b4b', name: 'Group Disability Claim (STD)', weeks: '6 weeks', range: 'Mar 17 – Apr 28, 2025', pay: '60% salary after 7-day wait', status: 'Approved', paymentValue: '~$1,846/wk' },
                    ] : [
                      { id: 'fmla', label: 'FMLA', width: 100, accent: '#1f1f1f', name: 'Leave Case — FMLA Protection', weeks: '12 weeks', range: 'Mar 10 – Jun 02, 2025', pay: 'Job protection (unpaid)', status: 'Approved' },
                      { id: 'std', label: 'STD', width: 50, accent: '#4b4b4b', name: 'Group Disability Claim (STD)', weeks: '6 weeks', range: 'Mar 17 – Apr 28, 2025', pay: '60% salary after 7-day wait', status: 'Approved' },
                    ]).map(function (item) {
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
                      { id: 'std', name: 'Group Disability Claim (STD)', weeks: '6 weeks', range: 'Mar 17 – Apr 28, 2025', pay: '60% salary after 7-day wait', status: 'Approved', paymentValue: '~$1,846/wk' },
                    ] : [
                      { id: 'fmla', name: 'Leave Case — FMLA Protection', weeks: '12 weeks', range: 'Mar 10 – Jun 02, 2025', pay: 'Job protection (unpaid)', status: 'Approved' },
                      { id: 'std', name: 'Group Disability Claim (STD)', weeks: '6 weeks', range: 'Mar 17 – Apr 28, 2025', pay: '60% salary after 7-day wait', status: 'Approved' },
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
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                  </div>

                  <div className="dlp-legend">
                    {(timelineView === 'payment' ? [
                      { id: 'partial-pay', label: 'STD (60%)', accent: '#4b4b4b' },
                      { id: 'unpaid', label: 'Unpaid / Bonding', accent: '#e5e7eb' },
                    ] : [
                      { id: 'fmla', label: 'FMLA Protection', accent: '#1f1f1f' },
                      { id: 'std', label: 'STD Income', accent: '#4b4b4b' },
                      { id: 'bonding', label: 'Bonding (unpaid)', accent: '#e5e7eb' },
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
                      <div className="dt-payment-summary-value">$11,076</div>
                      <div className="dt-payment-summary-note">Based on current salary · 6 weeks STD then unpaid bonding time</div>
                    </div>
                  )}
                </div>
            </div>

            {/* Associated Claims */}
            <div className="ldb-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 className="ldb-card-title" style={{ marginBottom: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  Associated Claims
                </h2>
                <span style={{ fontSize: 12, color: '#737373' }}>Click a row to expand</span>
              </div>

              {/* Leave Case Claim */}
              <div className="ldb-claim-accordion">
                <button type="button" className={'ldb-claim-accordion-header' + (expandedClaims.absence ? ' expanded' : '')} onClick={function () { toggleClaim('absence'); }}>
                  <div className="ldb-claim-accordion-left">
                    <svg className="ldb-claim-accordion-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <div>
                      <div className="ldb-claim-accordion-title">Leave Case</div>
                      <div className="ldb-claim-accordion-sub">NTN-7841-ABS-01 · FMLA designation — maternity &amp; bonding</div>
                    </div>
                  </div>
                  <span className="ldb-claim-status" style={{ background: '#dcfce7', color: '#166534' }}>Approved</span>
                </button>
                {expandedClaims.absence && (
                  <div className="ldb-claim-accordion-body">
                    <div className="dt-info-grid">
                      <div>
                        <div className="dt-info-field-label">Claim ID</div>
                        <div className="dt-info-field-value">NTN-7841-ABS-01</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Leave Type</div>
                        <div className="dt-info-field-value">Continuous</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">FMLA Eligible</div>
                        <div className="dt-info-field-value">Yes — 12 weeks available</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">FMLA Used</div>
                        <div className="dt-info-field-value">8 weeks, 1 day</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Job Protection</div>
                        <div className="dt-info-field-value">Active through Jun 02, 2025</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">RTW Date</div>
                        <div className="dt-info-field-value">Jun 02, 2025 (scheduled)</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 16, padding: '12px 16px', background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0', fontSize: 13, color: '#166534' }}>
                      <strong>Note:</strong> Your 12 weeks includes both medical recovery (6 weeks) and baby bonding time (6 weeks). STD covers the medical recovery period only.
                    </div>
                  </div>
                )}
              </div>

              {/* Group Disability Claim */}
              <div className="ldb-claim-accordion">
                <button type="button" className={'ldb-claim-accordion-header' + (expandedClaims.disability ? ' expanded' : '')} onClick={function () { toggleClaim('disability'); }}>
                  <div className="ldb-claim-accordion-left">
                    <svg className="ldb-claim-accordion-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <div>
                      <div className="ldb-claim-accordion-title">Group Disability Claim</div>
                      <div className="ldb-claim-accordion-sub">NTN-7841-GDC-01 · STD Benefit — 6 weeks at 60% of earnings</div>
                    </div>
                  </div>
                  <span className="ldb-claim-status" style={{ background: '#dcfce7', color: '#166534' }}>Approved</span>
                </button>
                {expandedClaims.disability && (
                  <div className="ldb-claim-accordion-body">
                    <div className="dt-info-grid">
                      <div>
                        <div className="dt-info-field-label">Claim ID</div>
                        <div className="dt-info-field-value">NTN-7841-GDC-01</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Benefit Type</div>
                        <div className="dt-info-field-value">Short-Term Disability (STD)</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Benefit %</div>
                        <div className="dt-info-field-value">60% of pre-disability earnings</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Elimination Period</div>
                        <div className="dt-info-field-value">7 calendar days</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Approved Duration</div>
                        <div className="dt-info-field-value">6 weeks (vaginal delivery)</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Weekly Benefit</div>
                        <div className="dt-info-field-value" style={{ fontWeight: 700 }}>$1,846.00</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Benefits Paid From</div>
                        <div className="dt-info-field-value">Mar 17, 2025</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Benefits Paid Through</div>
                        <div className="dt-info-field-value">Apr 28, 2025</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Payment Method</div>
                        <div className="dt-info-field-value">Direct Deposit ****6291</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Total Paid</div>
                        <div className="dt-info-field-value" style={{ fontWeight: 700 }}>$11,076.00</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Associated Payments */}
            <div className="ldb-card">
              <button type="button" className="ldb-card-collapse-header" onClick={function () { setPaymentsOpen(!paymentsOpen); }}>
                <h2 className="ldb-card-title" style={{ marginBottom: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" stroke="currentColor" strokeWidth="1.2"/><path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  Associated Payments
                </h2>
                <svg className={'ldb-card-collapse-chevron' + (paymentsOpen ? ' open' : '')} width="12" height="7" viewBox="0 0 12 7" fill="none"><path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              {paymentsOpen && (
                <>
                  <p className="ldb-card-context">Payments from your Group Disability Claim (STD). Paid weekly via direct deposit.</p>
                  <div className="ldb-payments-grid">
                    <div className="ldb-payment-item">
                      <span className="ldb-payment-label">Total Paid to Date</span>
                      <span className="ldb-payment-value">$11,076.00</span>
                    </div>
                    <div className="ldb-payment-item">
                      <span className="ldb-payment-label">Most Recent Payment</span>
                      <span className="ldb-payment-value">$1,846.00</span>
                    </div>
                    <div className="ldb-payment-item">
                      <span className="ldb-payment-label">STD Benefits Ended</span>
                      <span className="ldb-payment-value">Apr 28, 2025</span>
                    </div>
                    <div className="ldb-payment-item">
                      <span className="ldb-payment-label">Payment Method</span>
                      <span className="ldb-payment-value">Direct Deposit ****6291</span>
                    </div>
                  </div>
                  <div className="ldb-v2e-pmt-list">
                    <div className="ldb-v2e-pmt-row">
                      <div className="ldb-v2e-pmt-date">Apr 28, 2025</div>
                      <div className="ldb-v2e-pmt-desc">STD Weekly · GDC-01</div>
                      <div className="ldb-v2e-pmt-amount">$1,846.00</div>
                    </div>
                    <div className="ldb-v2e-pmt-row">
                      <div className="ldb-v2e-pmt-date">Apr 21, 2025</div>
                      <div className="ldb-v2e-pmt-desc">STD Weekly · GDC-01</div>
                      <div className="ldb-v2e-pmt-amount">$1,846.00</div>
                    </div>
                    <div className="ldb-v2e-pmt-row">
                      <div className="ldb-v2e-pmt-date">Apr 14, 2025</div>
                      <div className="ldb-v2e-pmt-desc">STD Weekly · GDC-01</div>
                      <div className="ldb-v2e-pmt-amount">$1,846.00</div>
                    </div>
                  </div>
                  <Link to="/claims-and-leave/payments?claim=NTN-7841-GDC-01&case=NTN-7841" className="ldb-payments-view-btn" style={{ textDecoration: 'none' }}>
                    VIEW ALL PAYMENTS
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                </>
              )}
            </div>

            {/* About This Leave */}
            <div className="ldb-card">
              <button type="button" className="ldb-card-collapse-header" onClick={function () { setAboutLeaveOpen(!aboutLeaveOpen); }}>
                <h2 className="ldb-card-title" style={{ marginBottom: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  About This Leave
                </h2>
                <svg className={'ldb-card-collapse-chevron' + (aboutLeaveOpen ? ' open' : '')} width="12" height="7" viewBox="0 0 12 7" fill="none"><path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              {aboutLeaveOpen && (
                <>
                  <div className="dt-info-block">
                    <div className="dt-info-block-header">
                      <h4>Leave Reason</h4>
                      {editingSection !== 'reason' && (
                        <button className="dt-info-edit-btn" type="button" onClick={function () { setEditingSection('reason'); }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                      )}
                    </div>
                    {editingSection === 'reason' ? (
                      <>
                        <div className="dt-info-grid">
                          <div>
                            <div className="dt-info-field-label">Reason</div>
                            <input type="text" className="ldb-detail-input" value={detailsForm.reason} onChange={function (e) { handleDetailsChange('reason', e.target.value); }} />
                          </div>
                          <div>
                            <div className="dt-info-field-label">Duration</div>
                            <input type="text" className="ldb-detail-input" value={detailsForm.duration} onChange={function (e) { handleDetailsChange('duration', e.target.value); }} />
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
                          <div className="dt-info-field-label">Reason</div>
                          <div className="dt-info-field-value">{detailsForm.reason}</div>
                        </div>
                        <div>
                          <div className="dt-info-field-label">Duration</div>
                          <div className="dt-info-field-value">{detailsForm.duration}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="dt-info-block">
                    <div className="dt-info-block-header">
                      <h4>Healthcare Provider</h4>
                    </div>
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
                  </div>
                </>
              )}
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
                <span className="ldb-tasks-count">1 needed</span>
              </div>

              <div className="ldb-action-list">
                <div className="ldb-action-item">
                  <div className="ldb-action-dot" />
                  <div className="ldb-action-content">
                    <div className="ldb-action-title">Confirm Return to Work Date</div>
                    <div className="ldb-action-meta">Due May 26 · Required for Leave Case closure</div>
                  </div>
                  <button type="button" className="ldb-btn-upload-inline">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="currentColor" strokeWidth="1.2"/></svg>
                    Confirm
                  </button>
                </div>
              </div>

              {!showAllTasks && (
                <button type="button" className="ldb-tasks-expand" onClick={function () { setShowAllTasks(true); }}>
                  +3 completed
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
                        <div className="ldb-action-title">FMLA Designation Approved</div>
                        <div className="ldb-action-meta">Completed Mar 12 · Leave Case</div>
                      </div>
                    </div>
                    <div className="ldb-action-item done">
                      <div className="ldb-action-dot done" />
                      <div className="ldb-action-content">
                        <div className="ldb-action-title">Medical Certification Received</div>
                        <div className="ldb-action-meta">Completed Mar 14 · Group Disability Claim</div>
                      </div>
                    </div>
                    <div className="ldb-action-item done">
                      <div className="ldb-action-dot done" />
                      <div className="ldb-action-content">
                        <div className="ldb-action-title">STD Claim Approved</div>
                        <div className="ldb-action-meta">Completed Mar 15 · Group Disability Claim</div>
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
                  <span className="ldb-v2-snapshot-bar-label">8.1 of 12 weeks used</span>
                  <span className="ldb-v2-snapshot-bar-sub">FMLA Protection</span>
                </div>
                <div className="ldb-v2-snapshot-bar">
                  <div className="ldb-v2-snapshot-bar-fill" style={{ width: '68%' }} />
                </div>
                <div className="ldb-v2-snapshot-stats">
                  <div className="ldb-v2-snapshot-stat">
                    <span className="ldb-v2-snapshot-stat-value">27</span>
                    <span className="ldb-v2-snapshot-stat-label">Days Left</span>
                  </div>
                  <div className="ldb-v2-snapshot-stat">
                    <span className="ldb-v2-snapshot-stat-value">Jun 02</span>
                    <span className="ldb-v2-snapshot-stat-label">Return Date</span>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 12, fontSize: 12, color: '#737373', borderTop: '1px solid #f0f0f2', paddingTop: 12 }}>
                STD benefits ended Apr 28. Currently in unpaid bonding time (FMLA protected).
              </div>
            </div>

            {/* Documents */}
            <div className="ldb-side-card">
              <div className="ldb-docs-header">
                <h3 className="ldb-side-title">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="currentColor" strokeWidth="1.2"/></svg>
                  Uploaded Documents
                </h3>
                <span className="ldb-docs-count">3 / 3 uploaded</span>
              </div>
              <div className="ldb-doc-list">
                <div className="ldb-doc-item">
                  <div className="ldb-doc-status-icon">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M5 8l2 2 4-4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">Medical_Certification.pdf</div>
                    <div className="ldb-doc-meta">Uploaded Mar 14 · Group Disability Claim</div>
                  </div>
                </div>
                <div className="ldb-doc-item">
                  <div className="ldb-doc-status-icon">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M5 8l2 2 4-4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">FMLA_Designation_Notice.pdf</div>
                    <div className="ldb-doc-meta">Uploaded Mar 12 · Leave Case</div>
                  </div>
                </div>
                <div className="ldb-doc-item">
                  <div className="ldb-doc-status-icon">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M5 8l2 2 4-4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">Birth_Certificate.pdf</div>
                    <div className="ldb-doc-meta">Uploaded Mar 11 · Leave Case</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Manage Absences Link */}
            <div className="ldb-side-card">
              <h3 className="ldb-side-title">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M5 5h6M5 8h6M5 11h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                Manage Your Absences
              </h3>
              <p style={{ fontSize: 13, color: '#525252', margin: '8px 0 12px' }}>View all of your leave, manage time off, and log intermittent hours.</p>
              <Link to="/manage-absences" className="ldb-side-link-btn">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 3h12v10H2z" stroke="currentColor" strokeWidth="1.2"/><path d="M2 6h12" stroke="currentColor" strokeWidth="1.2"/><path d="M5 2v2M11 2v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                Manage Absences &amp; Log Time
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 'auto' }}><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </div>
        </div>

      </div>
      <SiteFooter />
    </div>
  );
}
