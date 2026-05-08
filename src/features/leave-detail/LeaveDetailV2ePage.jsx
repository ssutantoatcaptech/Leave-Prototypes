import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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

export default function LeaveDetailV2ePage() {
  var location = useLocation();
  var isMobile = location.pathname.startsWith('/claims-and-leave-mobile');
  var base = isMobile ? '/claims-and-leave-mobile' : '/claims-and-leave';
  var navigate = useNavigate();
  var [timelineView, setTimelineView] = useState('protection');
  var [hoveredRow, setHoveredRow] = useState(null);
  var [expandedClaims, setExpandedClaims] = useState({ absence: !isMobile, stateleave: false });
  var [paymentsOpen, setPaymentsOpen] = useState(!isMobile);
  var [showAllTasks, setShowAllTasks] = useState(false);
  var [snapshotOpen, setSnapshotOpen] = useState(true);
  var [editingSection, setEditingSection] = useState(null);
  var [detailTab, setDetailTab] = useState('claims');
  var [detailsForm, setDetailsForm] = useState({
    reason: 'Chronic lower back condition — intermittent flare-ups requiring treatment',
    duration: '12 weeks intermittent (FMLA approved)',
    provider: 'Dr. Patel (Orthopedic Surgery)',
    facility: 'Hackensack University Medical Center',
    providerPhone: '(201) 555-8200',
    providerFax: '(201) 555-8201',
    providerAddress: '30 Prospect Ave, Hackensack, NJ 07601',
    email: 'marcus.thompson@company.com',
    phone: '(201) 555-0187',
    address: '142 Park Ave, Hoboken, NJ 07030',
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

  function renderItemsRequiringAction() {
    return (
      <div className="ldb-side-card ldb-side-card--shadow">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 className="ldb-side-title" style={{ marginBottom: 0 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1l1.8 5.4H15l-4.2 3.1 1.6 5-4.4-3.2L3.6 14.5l1.6-5L1 6.4h5.2L8 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>
            Items Requiring Action
          </h3>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#dc2626', background: '#fef2f2', padding: '2px 8px', borderRadius: 10 }}>1 needed</span>
        </div>
        <div className="ldb-action-list">
          <div className="ldb-action-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#dc2626" strokeWidth="1.4"/><path d="M8 5v3M8 10.5v.5" stroke="#dc2626" strokeWidth="1.4" strokeLinecap="round"/></svg>
            <div className="ldb-action-text">
              <span className="ldb-action-name">Return to Work Certification</span>
              <span className="ldb-action-due">Submit before your return date</span>
            </div>
            <button type="button" className="ldb-btn-upload-inline">Upload</button>
          </div>
        </div>
        {!showAllTasks ? (
          <button type="button" className="ldb-show-more-btn" onClick={function () { setShowAllTasks(true); }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 4v8M4 8h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            5 completed tasks
          </button>
        ) : (
          <>
            <div className="ldb-action-list" style={{ marginTop: 8 }}>
              <div className="ldb-action-item ldb-action-item--done">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#16a34a" strokeWidth="1.4"/><path d="M5.5 8l2 2 3.5-3.5" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div className="ldb-action-text">
                  <span className="ldb-action-name">Initial Leave Request Form</span>
                  <span className="ldb-action-due" style={{ color: '#16a34a' }}>Completed Apr 15</span>
                </div>
              </div>
              <div className="ldb-action-item ldb-action-item--done">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#16a34a" strokeWidth="1.4"/><path d="M5.5 8l2 2 3.5-3.5" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div className="ldb-action-text">
                  <span className="ldb-action-name">Medical Certification Form</span>
                  <span className="ldb-action-due" style={{ color: '#16a34a' }}>Completed Apr 18</span>
                </div>
              </div>
              <div className="ldb-action-item ldb-action-item--done">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#16a34a" strokeWidth="1.4"/><path d="M5.5 8l2 2 3.5-3.5" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div className="ldb-action-text">
                  <span className="ldb-action-name">Attending Physician Statement</span>
                  <span className="ldb-action-due" style={{ color: '#16a34a' }}>Completed Apr 20</span>
                </div>
              </div>
              <div className="ldb-action-item ldb-action-item--done">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#16a34a" strokeWidth="1.4"/><path d="M5.5 8l2 2 3.5-3.5" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div className="ldb-action-text">
                  <span className="ldb-action-name">Direct Deposit Authorization</span>
                  <span className="ldb-action-due" style={{ color: '#16a34a' }}>Completed Apr 16</span>
                </div>
              </div>
              <div className="ldb-action-item ldb-action-item--done">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#16a34a" strokeWidth="1.4"/><path d="M5.5 8l2 2 3.5-3.5" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div className="ldb-action-text">
                  <span className="ldb-action-name">NJ TDI Application</span>
                  <span className="ldb-action-due" style={{ color: '#16a34a' }}>Completed Apr 17</span>
                </div>
              </div>
            </div>
            <button type="button" className="ldb-show-more-btn" onClick={function () { setShowAllTasks(false); }}>
              Show less
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="ldb-page">

      <div className="ldb-content">
        {/* Breadcrumb */}
        <div className="ldb-breadcrumb">
          <Link to={base}>Claims &amp; Leave</Link>
          <svg className="ldb-bc-sep" width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <Link to={`${base}/my-cases`}>My Leave</Link>
          <svg className="ldb-bc-sep" width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>CLM #12345</span>
        </div>

        {/* Title Card — Redesigned */}
        <div className="ldb-title-card">
          <div className="ldb-title-left">
            <div className="ldb-title-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 10h8M8 13h5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            <div className="ldb-title-text">
              <span className="ldb-status-badge approved-status ldb-title-badge">Approved</span>
              <h1 className="ldb-title">Illness or Injury — Own Condition</h1>
              <div className="ldb-title-meta">
                <span style={{ fontSize: 14, color: '#525252', fontWeight: 600 }}>CLM #12345</span>
                <span style={{ fontSize: 13, color: '#737373', marginLeft: 12 }}>Apr 15 – Jul 08, 2026 · Intermittent</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ldb-v2-layout">
          {/* Left: Main content */}
          <div className="ldb-v2-main">

            {isMobile && renderItemsRequiringAction()}

            {isMobile && (
              <div className="ldb-side-card ldb-mobile-snapshot-accordion">
                <button type="button" className="ldb-accordion-toggle" onClick={function () { setSnapshotOpen(!snapshotOpen); }}>
                  <h3 className="ldb-side-title" style={{ marginBottom: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M2 6h12" stroke="currentColor" strokeWidth="1.2"/><path d="M5 2v2M11 2v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    Leave Snapshot
                  </h3>
                  <svg className={`ldb-accordion-chevron ${snapshotOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                {snapshotOpen && (
                  <div className="ldb-accordion-body">
                    <div className="ldb-snapshot-dates-row">
                      <div className="ldb-snapshot-date-card">
                        <div className="ldb-snapshot-date-label">Start Date</div>
                        <div className="ldb-snapshot-date-value">April 15, 2026</div>
                      </div>
                      <div className="ldb-snapshot-date-card">
                        <div className="ldb-snapshot-date-label">End Date</div>
                        <div className="ldb-snapshot-date-value">July 8, 2026</div>
                      </div>
                    </div>
                    <div className="ldb-snapshot-date-card ldb-snapshot-date-card--full">
                      <div className="ldb-snapshot-date-label">Return Work Date</div>
                      <div className="ldb-snapshot-date-value">July 9, 2026</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Leave Timeline */}
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

                <p className="ad-section-helper ad-section-helper--desktop">Hover over a row to see details</p>
                <p className="ad-section-helper ad-section-helper--mobile">Tap a row to see details</p>

                <div className="dlp-timeline">
                  <div className="ldb-tl-rows-wrap">
                  <div className="dlp-tl-rows">
                    {(timelineView === 'payment' ? [
                      { id: 'std', label: 'STD', width: 50, accent: '#2563eb', name: 'Group Disability Claim (STD)', weeks: '4 weeks', range: 'Apr 15 – May 15, 2026', pay: '60% salary after 7-day wait', status: 'Approved', paymentValue: '~$2,308/wk' },
                      { id: 'njtdi', label: 'NJ TDI', width: 100, accent: '#818cf8', name: 'NJ Temporary Disability Insurance', weeks: '12 weeks', range: 'Apr 15 – Jul 08, 2026', pay: '85% salary (state program)', status: 'Active', paymentValue: '~$1,048/wk' },
                    ] : [
                      { id: 'fmla', label: 'FMLA', width: 100, accent: '#0033a0', name: 'Leave Case — FMLA (Intermittent)', weeks: '12 weeks', range: 'Apr 15 – Jul 08, 2026', pay: 'Job protection (unpaid)', status: 'Approved' },
                      { id: 'std', label: 'STD', width: 35, accent: '#2563eb', name: 'Group Disability Claim (STD)', weeks: '4 weeks', range: 'Apr 15 – May 15, 2026', pay: '60% salary after 7-day wait', status: 'Approved' },
                      { id: 'njtdi', label: 'NJ TDI', width: 100, accent: '#818cf8', name: 'NJ Temporary Disability Insurance', weeks: '12 weeks', range: 'Apr 15 – Jul 08, 2026', pay: '85% salary (state program)', status: 'Active' },
                    ]).map(function (item) {
                      return (
                        <button
                          key={item.id}
                          className={'dlp-tl-row' + (hoveredRow === item.id ? ' active' : '')}
                          type="button"
                          onMouseEnter={function () { setHoveredRow(item.id); }}
                          onMouseLeave={function () { setHoveredRow(null); }}
                          onClick={function () { setHoveredRow(hoveredRow === item.id ? null : item.id); }}
                        >
                          <div className="dlp-tl-row-label">{item.label}</div>
                          <div className="dlp-tl-row-bar">
                            <div className="dlp-tl-seg" style={{ left: '0%', width: item.width + '%', background: item.accent }} />
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Desktop: tooltip on hover */}
                  {hoveredRow && (function () {
                    var allRows = timelineView === 'payment' ? [
                      { id: 'std', name: 'Group Disability Claim (STD)', weeks: '4 weeks', range: 'Apr 15 – May 15, 2026', pay: '60% salary after 7-day wait', status: 'Approved', paymentValue: '~$2,308/wk' },
                      { id: 'njtdi', name: 'NJ Temporary Disability Insurance', weeks: '12 weeks', range: 'Apr 15 – Jul 08, 2026', pay: '85% salary (state program)', status: 'Active', paymentValue: '~$1,048/wk' },
                    ] : [
                      { id: 'fmla', name: 'Leave Case — FMLA (Intermittent)', weeks: '12 weeks', range: 'Apr 15 – Jul 08, 2026', pay: 'Job protection (unpaid)', status: 'Approved' },
                      { id: 'std', name: 'Group Disability Claim (STD)', weeks: '4 weeks', range: 'Apr 15 – May 15, 2026', pay: '60% salary after 7-day wait', status: 'Approved' },
                      { id: 'njtdi', name: 'NJ Temporary Disability Insurance', weeks: '12 weeks', range: 'Apr 15 – Jul 08, 2026', pay: '85% salary (state program)', status: 'Active' },
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

                  {/* Mobile: accordion below rows */}
                  {hoveredRow && (function () {
                    var allRows = timelineView === 'payment' ? [
                      { id: 'std', name: 'Group Disability Claim (STD)', weeks: '4 weeks', range: 'Apr 15 – May 15, 2026', pay: '60% salary after 7-day wait', status: 'Approved', paymentValue: '~$2,308/wk' },
                      { id: 'njtdi', name: 'NJ Temporary Disability Insurance', weeks: '12 weeks', range: 'Apr 15 – Jul 08, 2026', pay: '85% salary (state program)', status: 'Active', paymentValue: '~$1,048/wk' },
                    ] : [
                      { id: 'fmla', name: 'Leave Case — FMLA (Intermittent)', weeks: '12 weeks', range: 'Apr 15 – Jul 08, 2026', pay: 'Job protection (unpaid)', status: 'Approved' },
                      { id: 'std', name: 'Group Disability Claim (STD)', weeks: '4 weeks', range: 'Apr 15 – May 15, 2026', pay: '60% salary after 7-day wait', status: 'Approved' },
                      { id: 'njtdi', name: 'NJ Temporary Disability Insurance', weeks: '12 weeks', range: 'Apr 15 – Jul 08, 2026', pay: '85% salary (state program)', status: 'Active' },
                    ];
                    var selected = allRows.find(function (r) { return r.id === hoveredRow; });
                    if (!selected) return null;
                    return (
                      <div className="dlp-tl-mobile-detail">
                        <div className="dlp-tl-mobile-detail-title">{selected.name}</div>
                        <div className="dlp-tl-mobile-detail-grid">
                          <div>
                            <div className="dlp-tl-mobile-detail-label">{timelineView === 'payment' ? 'Est. Weekly' : 'Status'}</div>
                            <div className="dlp-tl-mobile-detail-value">{timelineView === 'payment' ? selected.paymentValue : selected.status}</div>
                          </div>
                          <div>
                            <div className="dlp-tl-mobile-detail-label">Duration</div>
                            <div className="dlp-tl-mobile-detail-value">{selected.weeks}</div>
                          </div>
                          <div>
                            <div className="dlp-tl-mobile-detail-label">Dates</div>
                            <div className="dlp-tl-mobile-detail-value">{selected.range}</div>
                          </div>
                          <div>
                            <div className="dlp-tl-mobile-detail-label">Pay</div>
                            <div className="dlp-tl-mobile-detail-value">{selected.pay}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="dlp-tl-weeks-row">
                    <div className="dlp-tl-week-label">Week</div>
                    <div className="dlp-tl-weeks">
                      {Array.from({ length: 13 }, function (_, i) {
                        return <div key={i} className="dlp-tl-week-tick"><span className="dlp-tl-week-num">{i + 1}</span></div>;
                      })}
                    </div>
                  </div>
                  <div className="dlp-tl-months">
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                  </div>

                  <div className="dlp-legend">
                    {(timelineView === 'payment' ? [
                      { id: 'partial-pay', label: 'STD (60%)', accent: '#2563eb' },
                      { id: 'state', label: 'NJ TDI (85%)', accent: '#818cf8' },
                      { id: 'unpaid', label: 'Unpaid', accent: '#cbd5e1' },
                    ] : [
                      { id: 'fmla', label: 'FMLA Protection', accent: '#0033a0' },
                      { id: 'std', label: 'STD Income', accent: '#2563eb' },
                      { id: 'state', label: 'NJ State TDI', accent: '#818cf8' },
                      { id: 'unpaid', label: 'Unpaid', accent: '#cbd5e1' },
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
                      <div className="dt-payment-summary-value">$21,808</div>
                      <div className="dt-payment-summary-note">STD ($9,232) + NJ TDI ($12,576) · Based on current salary · Actual amounts may vary</div>
                    </div>
                  )}
                </div>
            </div>

            {/* Detail Tabs */}
            <div className="ldb-detail-tabs">
              <button type="button" className={'ldb-detail-tab' + (detailTab === 'claims' ? ' active' : '')} onClick={function () { setDetailTab('claims'); }}>Claims & Payments</button>
              <button type="button" className={'ldb-detail-tab' + (detailTab === 'about' ? ' active' : '')} onClick={function () { setDetailTab('about'); }}>Leave Details</button>
            </div>

            {/* Tab: Claims & Payments */}
            {detailTab === 'claims' && (
            <>
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
                      <div className="ldb-claim-accordion-title-wrap">
                        <span className="ldb-claim-accordion-title">Leave Case — FMLA (Intermittent)</span>
                        <span className="ldb-claim-status ldb-claim-status--inline" style={{ background: '#dcfce7', color: '#166534' }}>Approved</span>
                      </div>
                      <div className="ldb-claim-accordion-sub">CLM-12345-ABS · Intermittent FMLA — job protection &amp; RTW tracking</div>
                    </div>
                  </div>
                  <span className="ldb-claim-status ldb-claim-status--end" style={{ background: '#dcfce7', color: '#166534' }}>Approved</span>
                </button>
                {expandedClaims.absence && (
                  <div className="ldb-claim-accordion-body">
                    <div className="dt-info-grid">
                      <div>
                        <div className="dt-info-field-label">Claim ID</div>
                        <div className="dt-info-field-value">CLM-12345-ABS</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Leave Type</div>
                        <div className="dt-info-field-value">Intermittent</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">FMLA Eligible</div>
                        <div className="dt-info-field-value">Yes — 12 weeks approved</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">FMLA Used</div>
                        <div className="dt-info-field-value">6 weeks, 3 days</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Job Protection</div>
                        <div className="dt-info-field-value">Active through Jul 08, 2026</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">RTW Status</div>
                        <div className="dt-info-field-value" style={{ color: '#dc2626', fontWeight: 600 }}>Action needed — submit Return to Work form</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 16, padding: '12px 16px', background: '#fef2f2', borderRadius: 8, border: '1px solid #fecaca', fontSize: 16, color: '#991b1b' }}>
                      <strong>Action required:</strong> Your leave is ending soon. Submit your Return to Work Certification to confirm your return date and any work restrictions.
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
                      <div className="ldb-claim-accordion-title-wrap">
                        <span className="ldb-claim-accordion-title">Group Disability Claim</span>
                        <span className="ldb-claim-status ldb-claim-status--inline" style={{ background: '#dcfce7', color: '#166534' }}>Approved</span>
                      </div>
                      <div className="ldb-claim-accordion-sub">CLM-12345-GDC · STD Benefit — income replacement at 60% of earnings</div>
                    </div>
                  </div>
                  <span className="ldb-claim-status ldb-claim-status--end" style={{ background: '#dcfce7', color: '#166534' }}>Approved</span>
                </button>
                {expandedClaims.disability && (
                  <div className="ldb-claim-accordion-body">
                    <div className="dt-info-grid">
                      <div>
                        <div className="dt-info-field-label">Claim ID</div>
                        <div className="dt-info-field-value">CLM-12345-GDC</div>
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
                        <div className="dt-info-field-label">Max Benefit Duration</div>
                        <div className="dt-info-field-value">26 weeks</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Weekly Benefit</div>
                        <div className="dt-info-field-value" style={{ fontWeight: 700 }}>$2,308.00</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Benefits Paid From</div>
                        <div className="dt-info-field-value">Apr 22, 2026</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Benefits Paid Through</div>
                        <div className="dt-info-field-value">May 15, 2026</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Payment Method</div>
                        <div className="dt-info-field-value">Direct Deposit ****4872</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Total Paid</div>
                        <div className="dt-info-field-value" style={{ fontWeight: 700 }}>$7,893.00</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Supplemental Health Claim */}
              <div className="ldb-claim-accordion">
                <button type="button" className={'ldb-claim-accordion-header' + (expandedClaims.supplemental ? ' expanded' : '')} onClick={function () { toggleClaim('supplemental'); }}>
                  <div className="ldb-claim-accordion-left">
                    <svg className="ldb-claim-accordion-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <div>
                      <div className="ldb-claim-accordion-title-wrap">
                        <span className="ldb-claim-accordion-title">Supplemental Health Claim</span>
                        <span className="ldb-claim-status ldb-claim-status--inline" style={{ background: '#fef3c7', color: '#92400e' }}>Under Review</span>
                      </div>
                      <div className="ldb-claim-accordion-sub">NTN-9312-SC-82 · Hospital Indemnity — flat cash benefit for inpatient stays</div>
                    </div>
                  </div>
                  <span className="ldb-claim-status ldb-claim-status--end" style={{ background: '#fef3c7', color: '#92400e' }}>Under Review</span>
                </button>
                {expandedClaims.supplemental && (
                  <div className="ldb-claim-accordion-body">
                    <div className="dt-info-grid">
                      <div>
                        <div className="dt-info-field-label">Claim ID</div>
                        <div className="dt-info-field-value">NTN-9312-SC-82</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Benefit Type</div>
                        <div className="dt-info-field-value">Hospital Indemnity</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Daily Benefit</div>
                        <div className="dt-info-field-value">$200/day</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Inpatient Days</div>
                        <div className="dt-info-field-value">3 days (Apr 15–17)</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Expected Payout</div>
                        <div className="dt-info-field-value" style={{ fontWeight: 700 }}>$600.00</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Status</div>
                        <div className="dt-info-field-value">Under Review — awaiting itemized bill</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 16, padding: '12px 16px', background: '#f5f3ff', borderRadius: 8, border: '1px solid #ede9fe', fontSize: 13, color: '#5b21b6' }}>
                      <strong>Action needed:</strong> Upload itemized hospital bill to complete review. This claim pays in addition to your STD benefit.
                    </div>
                  </div>
                )}
              </div>

              {/* State Paid Leave Claim */}
              <div className="ldb-claim-accordion">
                <button type="button" className={'ldb-claim-accordion-header' + (expandedClaims.stateleave ? ' expanded' : '')} onClick={function () { toggleClaim('stateleave'); }}>
                  <div className="ldb-claim-accordion-left">
                    <svg className="ldb-claim-accordion-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <div>
                      <div className="ldb-claim-accordion-title-wrap">
                        <span className="ldb-claim-accordion-title">State Paid Leave — NJ TDI</span>
                        <span className="ldb-claim-status ldb-claim-status--inline" style={{ background: '#eef2ff', color: '#6366f1' }}>Active</span>
                      </div>
                      <div className="ldb-claim-accordion-sub">NTN-9312-STL-83 · NJ Temporary Disability Insurance — state-funded income replacement</div>
                    </div>
                  </div>
                  <span className="ldb-claim-status ldb-claim-status--end" style={{ background: '#eef2ff', color: '#6366f1' }}>Active</span>
                </button>
                {expandedClaims.stateleave && (
                  <div className="ldb-claim-accordion-body">
                    <div className="dt-info-grid">
                      <div>
                        <div className="dt-info-field-label">Claim ID</div>
                        <div className="dt-info-field-value">NTN-9312-STL-83</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Program</div>
                        <div className="dt-info-field-value">NJ Temporary Disability Insurance (TDI)</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Benefit %</div>
                        <div className="dt-info-field-value">85% of average weekly wage</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Weekly Benefit</div>
                        <div className="dt-info-field-value" style={{ fontWeight: 700 }}>$1,048.00</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Max Duration</div>
                        <div className="dt-info-field-value">26 weeks</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Work State</div>
                        <div className="dt-info-field-value">New Jersey</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Benefits Start</div>
                        <div className="dt-info-field-value">Apr 15, 2026</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Benefits End (Est.)</div>
                        <div className="dt-info-field-value">Jul 08, 2026</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Total Paid</div>
                        <div className="dt-info-field-value" style={{ fontWeight: 700 }}>$4,192.00</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Payment Method</div>
                        <div className="dt-info-field-value">Direct Deposit ****4872</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 16, padding: '12px 16px', background: '#eef2ff', borderRadius: 8, border: '1px solid #e0e7ff', fontSize: 13, color: '#3730a3' }}>
                      <strong>Note:</strong> NJ TDI is paid separately from your employer STD benefit. Combined, you receive approximately 85% income replacement during your leave. This benefit is funded by NJ state payroll contributions.
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
                  <div className="ldb-payments-grid">
                    <div className="ldb-payment-item">
                      <span className="ldb-payment-label">Total Paid to Date</span>
                      <span className="ldb-payment-value">$7,893.00</span>
                    </div>
                    <div className="ldb-payment-item">
                      <span className="ldb-payment-label">Most Recent Payment</span>
                      <span className="ldb-payment-value">$2,308.00</span>
                    </div>
                    <div className="ldb-payment-item">
                      <span className="ldb-payment-label">Expected Next Payment</span>
                      <span className="ldb-payment-value">May 19, 2026</span>
                    </div>
                    <div className="ldb-payment-item">
                      <span className="ldb-payment-label">Payment Method</span>
                      <span className="ldb-payment-value">Direct Deposit ****4872</span>
                    </div>
                  </div>
                  <p className="ldb-card-context">Payments from your Group Disability Claim (STD). Paid weekly via direct deposit.</p>
                  <div className="ldb-v2e-pmt-list">
                    <div className="ldb-v2e-pmt-row">
                      <div className="ldb-v2e-pmt-date">May 12, 2026</div>
                      <div className="ldb-v2e-pmt-desc">STD Weekly · GDC-81</div>
                      <div className="ldb-v2e-pmt-amount">$2,308.00</div>
                    </div>
                    <div className="ldb-v2e-pmt-row">
                      <div className="ldb-v2e-pmt-date">May 5, 2026</div>
                      <div className="ldb-v2e-pmt-desc">STD Weekly · GDC-81</div>
                      <div className="ldb-v2e-pmt-amount">$2,308.00</div>
                    </div>
                    <div className="ldb-v2e-pmt-row">
                      <div className="ldb-v2e-pmt-date">Apr 28, 2026</div>
                      <div className="ldb-v2e-pmt-desc">STD Weekly · GDC-81</div>
                      <div className="ldb-v2e-pmt-amount">$2,308.00</div>
                    </div>
                  </div>
                  <Link to={`${base}/payments?claim=NTN-9312-GDC-81&case=NTN-9312`} className="ldb-payments-view-btn" style={{ textDecoration: 'none' }}>
                    VIEW ALL PAYMENTS
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                </>
              )}
            </div>
            </>
            )}

            {/* Tab: About This Leave */}
            {detailTab === 'about' && (
            <div className="ldb-card">
                  {/* Leave Reason */}
                  <div className="dt-info-block">
                    <div className="dt-info-block-header">
                      <h4>Leave Reason</h4>
                      {editingSection !== 'reason' && (
                        <button className="dt-info-edit-btn" type="button" onClick={function () { setEditingSection('reason'); }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                      )}
                      {editingSection === 'reason' && (
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#525252', background: '#f0f0f2', padding: '2px 8px', borderRadius: 4 }}>Editing</span>
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

                  {/* Healthcare Provider */}
                  <div className="dt-info-block">
                    <div className="dt-info-block-header">
                      <h4>Healthcare Provider</h4>
                      {editingSection !== 'provider' && (
                        <button className="dt-info-edit-btn" type="button" onClick={function () { setEditingSection('provider'); }}>
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
                          <div>
                            <div className="dt-info-field-label">Phone</div>
                            <input type="tel" className="ldb-detail-input" value={detailsForm.providerPhone} onChange={function (e) { handleDetailsChange('providerPhone', e.target.value); }} />
                          </div>
                          <div>
                            <div className="dt-info-field-label">Fax</div>
                            <input type="tel" className="ldb-detail-input" value={detailsForm.providerFax} onChange={function (e) { handleDetailsChange('providerFax', e.target.value); }} />
                          </div>
                          <div>
                            <div className="dt-info-field-label">Address</div>
                            <input type="text" className="ldb-detail-input" value={detailsForm.providerAddress} onChange={function (e) { handleDetailsChange('providerAddress', e.target.value); }} />
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
                        <div>
                          <div className="dt-info-field-label">Phone</div>
                          <div className="dt-info-field-value">{detailsForm.providerPhone}</div>
                        </div>
                        <div>
                          <div className="dt-info-field-label">Fax</div>
                          <div className="dt-info-field-value">{detailsForm.providerFax}</div>
                        </div>
                        <div>
                          <div className="dt-info-field-label">Address</div>
                          <div className="dt-info-field-value">{detailsForm.providerAddress}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contact Information */}
                  <div className="dt-info-block">
                    <div className="dt-info-block-header">
                      <h4>Contact Information</h4>
                      {editingSection !== 'contact' && (
                        <button className="dt-info-edit-btn" type="button" onClick={function () { setEditingSection('contact'); }}>
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
            </div>
            )}

            {/* Tab: Communications */}
            {detailTab === 'communications' && (
            <div className="ldb-card">
              <div className="ldb-comms-list">
                <div className="ldb-comms-item">
                  <div className="ldb-comms-info">
                    <div className="ldb-comms-name">FMLA Rights & Responsibilities Notice</div>
                    <div className="ldb-comms-meta">May 2, 2026 · CLM #12345</div>
                  </div>
                  <a href="#" className="ldb-comms-link">View</a>
                </div>
                <div className="ldb-comms-item">
                  <div className="ldb-comms-info">
                    <div className="ldb-comms-name">STD Claim Acknowledgement</div>
                    <div className="ldb-comms-meta">Apr 18, 2026 · NTN-9312-GDC-81</div>
                  </div>
                  <a href="#" className="ldb-comms-link">View</a>
                </div>
                <div className="ldb-comms-item">
                  <div className="ldb-comms-info">
                    <div className="ldb-comms-name">Medical Certification Request</div>
                    <div className="ldb-comms-meta">Apr 16, 2026 · CLM #12345</div>
                  </div>
                  <a href="#" className="ldb-comms-link">View</a>
                </div>
                <div className="ldb-comms-item">
                  <div className="ldb-comms-info">
                    <div className="ldb-comms-name">Leave Approval Notification</div>
                    <div className="ldb-comms-meta">Apr 15, 2026 · CLM #12345</div>
                  </div>
                  <a href="#" className="ldb-comms-link">View</a>
                </div>
                <div className="ldb-comms-item">
                  <div className="ldb-comms-info">
                    <div className="ldb-comms-name">NJ TDI Application Confirmation</div>
                    <div className="ldb-comms-meta">Apr 15, 2026 · NTN-9312-STL-83</div>
                  </div>
                  <a href="#" className="ldb-comms-link">View</a>
                </div>
              </div>
            </div>
            )}

          </div>

          {/* Right Sidebar — Redesigned */}
          <div className="ldb-sidebar">

            {/* 1. Items Requiring Action (sidebar on desktop) */}
            {!isMobile && renderItemsRequiringAction()}

            {/* 2. Quick Actions */}
            <div className="ldb-side-card ldb-side-card--shadow">
              <div className="ldb-quick-actions-label">QUICK ACTIONS</div>
              <div className="ldb-quick-actions-list">
                <button type="button" className="ldb-quick-action-item" onClick={function () { navigate(`${base}/enter-time`); }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span>Enter Time</span>
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="ldb-quick-action-chevron"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button type="button" className="ldb-quick-action-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" stroke="currentColor" strokeWidth="1.2"/><path d="M5 8h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  <span>Request ADA Accommodation</span>
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="ldb-quick-action-chevron"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button type="button" className="ldb-quick-action-item" onClick={function () { navigate(`${base}/case-detail/return-to-work`); }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 13l3-3M13 3l-3 3M10 3H13v3M6 13H3v-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span>Manage Return to Work</span>
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="ldb-quick-action-chevron"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button type="button" className="ldb-quick-action-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M5 7h6M5 9.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  <span>Manage Direct Deposit</span>
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="ldb-quick-action-chevron"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button type="button" className="ldb-quick-action-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/></svg>
                  <span>Message claims specialist</span>
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="ldb-quick-action-chevron"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>

            {/* 3. Leave Snapshot */}
            <div className="ldb-side-card">
              <h3 className="ldb-side-title">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M2 6h12" stroke="currentColor" strokeWidth="1.2"/><path d="M5 2v2M11 2v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                Leave Snapshot
              </h3>
              <div className="ldb-snapshot-dates-row">
                <div className="ldb-snapshot-date-card">
                  <div className="ldb-snapshot-date-label">Start Date</div>
                  <div className="ldb-snapshot-date-value">April 15, 2026</div>
                </div>
                <div className="ldb-snapshot-date-card">
                  <div className="ldb-snapshot-date-label">End Date</div>
                  <div className="ldb-snapshot-date-value">July 8, 2026</div>
                </div>
              </div>
              <div className="ldb-snapshot-date-card ldb-snapshot-date-card--full">
                <div className="ldb-snapshot-date-label">Return Work Date</div>
                <div className="ldb-snapshot-date-value">July 9, 2026</div>
              </div>
            </div>

            {/* 4. Uploaded Documents */}
            <div className="ldb-side-card">
              <div className="ldb-docs-header">
                <h3 className="ldb-side-title">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="currentColor" strokeWidth="1.2"/></svg>
                  Uploaded Documents
                </h3>
              </div>
              <div className="ldb-doc-list">
                <div className="ldb-doc-item">
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">Medical_Certification.pdf</div>
                    <div className="ldb-doc-meta">Uploaded on Jul 29, 2026</div>
                  </div>
                  <button type="button" className="ldb-doc-download-btn" aria-label="Download">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 4v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M4.5 9.5L8 13l3.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  </button>
                </div>
                <div className="ldb-doc-item">
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">Attending_Physician_Statement.pdf</div>
                    <div className="ldb-doc-meta">Uploaded on Jul 29, 2026</div>
                  </div>
                  <button type="button" className="ldb-doc-download-btn" aria-label="Download">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 4v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M4.5 9.5L8 13l3.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
