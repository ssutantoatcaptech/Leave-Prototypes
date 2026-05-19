import React, { useState } from 'react';
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
  var [expandedClaims, setExpandedClaims] = useState({ absence: false, stateleave: false });
  var [editingSection, setEditingSection] = useState(null);
  var [detailTab, setDetailTab] = useState('status');
  var [addlBenefitsOpen, setAddlBenefitsOpen] = useState(true);
  var [expandedPayment, setExpandedPayment] = useState(null);

  var viewingCase = (function () {
    try { return JSON.parse(sessionStorage.getItem('viewingCase') || 'null'); } catch (e) { return null; }
  })();
  var caseScenario = viewingCase && viewingCase.leaveScenario ? viewingCase.leaveScenario : 'child_nonbirth';
  var caseSentCert = viewingCase ? viewingCase.sendCertToPhysician : false;
  var [detailsForm, setDetailsForm] = useState({
    email: 'sarah.johnson@company.com',
    phone: '(555) 123-4567',
    address: '8827 SW 8th Street, Lee Summit, MO 64086',
    addressDuration: 'May 1, 2026 - Aug 15, 2026',
    absenceType: 'Continuous',
    absenceStart: '2026-04-15',
    absenceEnd: '2026-07-08',
    expectedReturn: '2026-07-09',
    duration: '84 days',
    reason: 'Bonding with newborn child',
    weeklyHours: '40 hours / week',
    scheduleType: 'Fixed',
    workDays: 'Mon, Tue, Wed, Thu, Fri',
    hoursPerDay: '8 hours',
    provider: 'Dr. Martinez (Pediatrician)',
    facility: "Children's Mercy Hospital",
    providerAddress: '2401 Gillham Rd, Kansas City, MO 64108',
    providerPhone: '(816) 234-3000',
    providerEmail: 'martinez.r@childrensmercy.org',
  });

  var [scheduleHours, setScheduleHours] = useState({ sun: 0, mon: 8, tue: 8, wed: 8, thu: 8, fri: 8, sat: 0 });

  function calcDuration(start, end) {
    if (!start || !end) return '';
    var s = new Date(start);
    var e = new Date(end);
    var diff = Math.round((e - s) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff + ' days' : '';
  }

  function formatDateDisplay(dateStr) {
    if (!dateStr) return '';
    var d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function handleDetailsChange(field, value) {
    setDetailsForm(function (prev) {
      var next = Object.assign({}, prev);
      next[field] = value;
      if (field === 'absenceStart' || field === 'absenceEnd') {
        var start = field === 'absenceStart' ? value : prev.absenceStart;
        var end = field === 'absenceEnd' ? value : prev.absenceEnd;
        next.duration = calcDuration(start, end);
        if (field === 'absenceEnd' && value) {
          var returnDate = new Date(value + 'T00:00:00');
          returnDate.setDate(returnDate.getDate() + 1);
          next.expectedReturn = returnDate.toISOString().split('T')[0];
        }
      }
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

      <div className="ldb-content">
        {/* Breadcrumb */}
        <div className="ldb-breadcrumb">
          <Link to={base}>Claims &amp; Leave</Link>
          <svg className="ldb-bc-sep" width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <Link to={`${base}/claims`}>Claims Center</Link>
          <svg className="ldb-bc-sep" width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{ fontWeight: 600, color: '#5d5d5d' }}>NTN-204871</span>
        </div>

        {/* Title */}
        <div className="ldb-title-card">
          <div className="ldb-title-left">
            <h1 className="ldb-title">Birthing Parent</h1>
            <div className="ldb-title-meta">
              <span style={{ fontWeight: 600 }}>NTN-204871</span>
              <span style={{ fontWeight: 400 }}>Mar 15 – Jun 07, 2026 · Continuous</span>
            </div>
          </div>
        </div>

        <div className="ldb-v2-layout">
          {/* Left: Main content */}
          <div className="ldb-v2-main">

            {/* Detail Tabs */}
            <div className="ldb-detail-tabs-wrapper">
              <div className="ldb-detail-tabs">
                <button type="button" className={'ldb-detail-tab' + (detailTab === 'status' ? ' active' : '')} onClick={function () { setDetailTab('status'); }}>Status Tracker</button>
                <button type="button" className={'ldb-detail-tab' + (detailTab === 'claims' ? ' active' : '')} onClick={function () { setDetailTab('claims'); }}>Coverage & Benefits</button>
                <button type="button" className={'ldb-detail-tab' + (detailTab === 'payments' ? ' active' : '')} onClick={function () { setDetailTab('payments'); }}>Payments</button>
                <button type="button" className={'ldb-detail-tab' + (detailTab === 'about' ? ' active' : '')} onClick={function () { setDetailTab('about'); }}>Leave Details</button>
                <button type="button" className={'ldb-detail-tab' + (detailTab === 'activity' ? ' active' : '')} onClick={function () { setDetailTab('activity'); }}>Communications & Activity</button>
              </div>
            </div>

            {/* Tab: Status Tracker */}
            {detailTab === 'status' && (
            <div className="ldb-card ldb-status-tracker">
              <div className="ldb-st-header">
                <h2 className="ldb-card-title" style={{ marginBottom: 0 }}>Status Tracker</h2>
                <span className="ldb-st-attention-badge">1 item needs attention</span>
              </div>

              <div className="ldb-st-steps">
                {/* Step 1: Completed */}
                <div className="ldb-st-step ldb-st-step--completed">
                  <div className="ldb-st-step-indicator">
                    <div className="ldb-st-step-circle ldb-st-step-circle--completed">
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5l3.5 3.5L11 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div className="ldb-st-step-line ldb-st-step-line--completed"></div>
                  </div>
                  <div className="ldb-st-step-content ldb-st-step-card">
                    <div className="ldb-st-step-top">
                      <span className="ldb-st-step-title">Leave Request Submitted — Case NTN-57005</span>
                      <span className="ldb-st-step-time">Completed Mar 15, 2026</span>
                    </div>
                    <p className="ldb-st-step-desc">You have successfully submitted your initial leave request. Associated claims will be filed:</p>
                    <div className="ldb-st-sub-items">
                      <div className="ldb-st-sub-item">
                        <span>FMLA Benefit NTN-57387-GDC-01-01</span>
                      </div>
                      <div className="ldb-st-sub-item">
                        <span>STD Benefit NTN-57387-GDC-01-02</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2: Active */}
                <div className="ldb-st-step ldb-st-step--active">
                  <div className="ldb-st-step-indicator">
                    <div className="ldb-st-step-circle ldb-st-step-circle--active">
                      <div className="ldb-st-step-dot"></div>
                    </div>
                    <div className="ldb-st-step-line"></div>
                  </div>
                  <div className="ldb-st-step-content ldb-st-step-card ldb-st-step-card--active">
                    <div className="ldb-st-step-top">
                      <span className="ldb-st-step-title">Complete Medical Certification</span>
                      <div className="ldb-st-step-actions">
                        <span className="ldb-st-due-badge">Due Apr 15, 2026</span>
                        <button type="button" className="ldb-st-start-btn">Start Now</button>
                      </div>
                    </div>
                    <p className="ldb-st-step-desc">Have your healthcare provider complete the required medical certification forms.</p>
                    <div className="ldb-st-sub-items ldb-st-sub-items--actions">
                      <div className="ldb-st-sub-action">
                        <div className="ldb-st-sub-action-left">
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#d4d4d4" strokeWidth="1.2"/></svg>
                          <span>Download certification form</span>
                        </div>
                        <button type="button" className="ldb-st-link-btn">Download</button>
                      </div>
                      <div className="ldb-st-sub-action">
                        <div className="ldb-st-sub-action-left">
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#d4d4d4" strokeWidth="1.2"/></svg>
                          <span>Upload completed form</span>
                        </div>
                        <button type="button" className="ldb-st-link-btn">Upload</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3: Future — Confirm Child's Arrival */}
                <div className="ldb-st-step ldb-st-step--future">
                  <div className="ldb-st-step-indicator">
                    <div className="ldb-st-step-circle ldb-st-step-circle--future"></div>
                    <div className="ldb-st-step-line"></div>
                  </div>
                  <div className="ldb-st-step-content ldb-st-step-card ldb-st-step-card--future">
                    <div className="ldb-st-step-top">
                      <span className="ldb-st-step-title">Confirm Child's Arrival</span>
                      <span className="ldb-st-locked-badge">Locked</span>
                    </div>
                    <p className="ldb-st-step-desc">Notify us when your child is born to activate the bonding portion of your leave.</p>
                  </div>
                </div>

                {/* Step 4: Future — File CA EDD bonding claim */}
                <div className="ldb-st-step ldb-st-step--future">
                  <div className="ldb-st-step-indicator">
                    <div className="ldb-st-step-circle ldb-st-step-circle--future"></div>
                    <div className="ldb-st-step-line"></div>
                  </div>
                  <div className="ldb-st-step-content ldb-st-step-card ldb-st-step-card--future">
                    <div className="ldb-st-step-top">
                      <span className="ldb-st-step-title">File your California EDD bonding claim</span>
                      <span className="ldb-st-locked-badge">Locked</span>
                    </div>
                    <p className="ldb-st-step-desc">At the start of your bonding period, submit your CA EDD bonding claim.</p>
                    <div className="ldb-st-external-link">
                      <span>California Benefit Portal</span>
                      <a href="#" className="ldb-st-link-btn">Start <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
                    </div>
                  </div>
                </div>

                {/* Step 5: Future — Confirm Return to Work */}
                <div className="ldb-st-step ldb-st-step--future ldb-st-step--last">
                  <div className="ldb-st-step-indicator">
                    <div className="ldb-st-step-circle ldb-st-step-circle--future"></div>
                  </div>
                  <div className="ldb-st-step-content ldb-st-step-card ldb-st-step-card--future">
                    <div className="ldb-st-step-top">
                      <span className="ldb-st-step-title">Confirm Return to Work Date</span>
                      <span className="ldb-st-locked-badge">Locked</span>
                    </div>
                    <p className="ldb-st-step-desc">Confirm your return to work date as your leave end date approaches.</p>
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Tab: Coverage & Benefits */}
            {detailTab === 'claims' && (
            <>
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

                <p className="ad-section-helper ad-section-helper--desktop">Hover over a benefit to see details.</p>
                <p className="ad-section-helper ad-section-helper--mobile">Tap a row to see details</p>

                <div className="dlp-timeline">
                  <div className="dlp-tl-weeks-row">
                    <div className="dlp-tl-week-label">Week</div>
                    <div className="dlp-tl-months-above">
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                    </div>
                  </div>
                  <div className="dlp-tl-weeks-row">
                    <div className="dlp-tl-week-label"></div>
                    <div className="dlp-tl-weeks">
                      {Array.from({ length: 12 }, function (_, i) {
                        return <div key={i} className="dlp-tl-week-tick"><span className="dlp-tl-week-num">{i + 1}</span></div>;
                      })}
                    </div>
                  </div>
                  <div className="ldb-tl-rows-wrap">
                  <div className="dlp-tl-rows">
                    {(timelineView === 'payment' ? [
                      { id: 'std', label: 'STD', width: 67, accent: '#2563eb', name: 'Short-Term Disability', weeks: '8 weeks', range: 'Mar 15 – May 10, 2026', pay: '60% of pre-disability earnings', status: 'Approved', paymentValue: '~$1,125/wk' },
                      { id: 'pfml', label: 'PFML', width: 33, accent: '#0d9488', name: 'Paid Family & Medical Leave', weeks: '4 weeks', range: 'May 11 – Jun 07, 2026', pay: 'State benefit', status: 'Approved', paymentValue: '~$981/wk' },
                    ] : [
                      { id: 'fmla', label: 'FMLA', width: 100, accent: '#003a70', name: 'FMLA (Birthing Parent)', weeks: '12 weeks', range: 'Mar 15 – Jun 07, 2026', pay: 'Job protection (unpaid)', status: 'Approved' },
                      { id: 'std', label: 'STD', width: 67, accent: '#2563eb', name: 'Short-Term Disability', weeks: '8 weeks', range: 'Mar 15 – May 10, 2026', pay: '60% of pre-disability earnings', status: 'Approved' },
                      { id: 'pfml', label: 'PFML', width: 33, accent: '#0d9488', name: 'Paid Family & Medical Leave', weeks: '4 weeks', range: 'May 11 – Jun 07, 2026', pay: 'State benefit', status: 'Approved' },
                    ]).map(function (item) {
                      return (
                        <div key={item.id} className="dlp-tl-row-wrap">
                          <button
                            className={'dlp-tl-row' + (hoveredRow === item.id ? ' active' : '')}
                            type="button"
                            onMouseEnter={function () { if (!('ontouchstart' in window)) setHoveredRow(item.id); }}
                            onMouseLeave={function () { if (!('ontouchstart' in window)) setHoveredRow(null); }}
                            onClick={function () { setHoveredRow(hoveredRow === item.id ? null : item.id); }}
                          >
                            <div className="dlp-tl-row-label">{item.label}</div>
                            <div className="dlp-tl-row-bar">
                              <div className="dlp-tl-seg" style={{ left: '0%', width: item.width + '%', background: item.accent }}>{item.weeks}</div>
                            </div>
                            <span className="dlp-tl-tap-hotspot"></span>
                          </button>
                          {hoveredRow === item.id && (
                            <div className="dlp-tl-mobile-accordion">
                              <div className="dlp-tl-mobile-accordion__title">{item.name}</div>
                              <div className="dlp-tl-mobile-accordion__grid">
                                <div className="dlp-tl-mobile-accordion__field">
                                  <span className="dlp-tl-mobile-accordion__label">{timelineView === 'payment' ? 'Est. Weekly' : 'Status'}</span>
                                  <span className="dlp-tl-mobile-accordion__value">{timelineView === 'payment' ? item.paymentValue : item.status}</span>
                                </div>
                                <div className="dlp-tl-mobile-accordion__field">
                                  <span className="dlp-tl-mobile-accordion__label">Duration</span>
                                  <span className="dlp-tl-mobile-accordion__value">{item.weeks}</span>
                                </div>
                                <div className="dlp-tl-mobile-accordion__field">
                                  <span className="dlp-tl-mobile-accordion__label">Dates</span>
                                  <span className="dlp-tl-mobile-accordion__value">{item.range}</span>
                                </div>
                                <div className="dlp-tl-mobile-accordion__field">
                                  <span className="dlp-tl-mobile-accordion__label">Pay</span>
                                  <span className="dlp-tl-mobile-accordion__value">{item.pay}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Desktop: tooltip on hover */}
                  {hoveredRow && (function () {
                    var allRows = timelineView === 'payment' ? [
                      { id: 'njfli', name: 'NJ Family Leave Insurance (Bonding)', weeks: '12 weeks', range: 'Apr 15 – Jul 08, 2026', pay: '85% AWW up to max', status: 'Approved', paymentValue: '~$1,048/wk' },
                    ] : [
                      { id: 'fmla', name: 'Leave Case — FMLA (Bonding)', weeks: '12 weeks', range: 'Apr 15 – Jul 08, 2026', pay: 'Job protection (unpaid)', status: 'Approved' },
                      { id: 'njfli', name: 'NJ Family Leave Insurance (Bonding)', weeks: '12 weeks', range: 'Apr 15 – Jul 08, 2026', pay: '85% AWW up to max', status: 'Approved' },
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

                  <div className="dlp-legend">
                    {(timelineView === 'payment' ? [
                      { id: 'std', label: 'STD (60%)', accent: '#2563eb' },
                      { id: 'pfml', label: 'PFML', accent: '#0d9488' },
                    ] : [
                      { id: 'fmla', label: 'FMLA', accent: '#003a70' },
                      { id: 'std', label: 'STD', accent: '#2563eb' },
                      { id: 'pfml', label: 'PFML', accent: '#0d9488' },
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
                      <div className="dt-payment-summary-value">$12,924</div>
                      <div className="dt-payment-summary-note">STD ($9,000) + PFML ($3,924) · Based on current salary · Actual amounts may vary</div>
                    </div>
                  )}
                </div>

                {/* Leave Snapshot — inline below timeline */}
                <div className="ldb-timeline-snapshot">
                  <div className="ldb-timeline-snapshot-item">
                    <div className="ldb-timeline-snapshot-label">Start Date</div>
                    <div className="ldb-timeline-snapshot-value">March 15, 2026</div>
                  </div>
                  <div className="ldb-timeline-snapshot-divider" />
                  <div className="ldb-timeline-snapshot-item">
                    <div className="ldb-timeline-snapshot-label">End Date</div>
                    <div className="ldb-timeline-snapshot-value">June 7, 2026</div>
                  </div>
                  <div className="ldb-timeline-snapshot-divider" />
                  <div className="ldb-timeline-snapshot-item">
                    <div className="ldb-timeline-snapshot-label">Return to Work</div>
                    <div className="ldb-timeline-snapshot-value">June 8, 2026</div>
                  </div>
                </div>
            </div>

            <div className="ldb-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 className="ldb-card-title" style={{ marginBottom: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  Associated Claims
                </h2>
                <span style={{ fontSize: 12, color: '#737373' }}>Click a row to expand</span>
              </div>

              {/* Leave Case — FMLA (all scenarios) */}
              <div className="ldb-claim-accordion">
                <button type="button" className={'ldb-claim-accordion-header' + (expandedClaims.absence ? ' expanded' : '')} onClick={function () { toggleClaim('absence'); }}>
                  <div className="ldb-claim-accordion-left">
                    <svg className="ldb-claim-accordion-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <div>
                      <div className="ldb-claim-accordion-title-wrap">
                        <span className="ldb-claim-accordion-title">
                          {caseScenario === 'child' ? 'Leave Case — FMLA (Pregnancy & Bonding)' : caseScenario === 'child_nonbirth' ? 'Leave Case — FMLA (Bonding)' : caseScenario === 'medical_family' ? 'Leave Case — FMLA (Family Care)' : caseScenario === 'military' ? 'Leave Case — FMLA (Military Exigency)' : 'Leave Case — FMLA (Intermittent)'}
                        </span>
                      </div>
                      <div className="ldb-claim-accordion-sub">
                        {caseScenario === 'child' ? 'CLM-12345-ABS · Continuous FMLA — pregnancy/bonding leave' : caseScenario === 'child_nonbirth' ? 'CLM-12345-ABS · Continuous FMLA — bonding leave' : caseScenario === 'medical_family' ? 'CLM-12345-ABS · FMLA — family caregiver leave' : caseScenario === 'military' ? 'CLM-12345-ABS · FMLA — qualifying exigency leave' : 'CLM-12345-ABS · Intermittent FMLA — job protection & RTW tracking'}
                      </div>
                    </div>
                  </div>
                  <span className="ldb-claim-status approved">Approved</span>
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
                        <div className="dt-info-field-value">{caseScenario === 'child' || caseScenario === 'child_nonbirth' ? 'Continuous' : caseScenario === 'medical_self' ? 'Intermittent' : 'Continuous'}</div>
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
                        <div className="dt-info-field-label">RTW Date</div>
                        <div className="dt-info-field-value">July 9, 2026</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Short-Term Disability Claim — only for medical_self and child (birthing parent) */}
              {(caseScenario === 'medical_self' || caseScenario === 'child') && (
              <div className="ldb-claim-accordion">
                <button type="button" className={'ldb-claim-accordion-header' + (expandedClaims.disability ? ' expanded' : '')} onClick={function () { toggleClaim('disability'); }}>
                  <div className="ldb-claim-accordion-left">
                    <svg className="ldb-claim-accordion-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <div>
                      <div className="ldb-claim-accordion-title-wrap">
                        <span className="ldb-claim-accordion-title">{caseScenario === 'child' ? 'Maternity Disability Claim' : 'Short-Term Disability Claim'}</span>
                      </div>
                      <div className="ldb-claim-accordion-sub">{caseScenario === 'child' ? 'CLM-12345-GDC · STD Benefit — maternity disability at 60% of earnings' : 'CLM-12345-GDC · STD Benefit — income replacement at 60% of earnings'}</div>
                    </div>
                  </div>
                  <span className="ldb-claim-status approved">Approved</span>
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
                        <div className="dt-info-field-label">Payment Method</div>
                        <div className="dt-info-field-value">Direct Deposit ****4872</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              )}


            </div>


            {/* Additional Benefits */}
            <div className="ldb-card ldb-additional-benefits">
              <button type="button" className="ldb-additional-benefits-header" onClick={function () { setAddlBenefitsOpen(!addlBenefitsOpen); }}>
                <h2 className="ldb-card-title" style={{ marginBottom: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1l2 3h3.5l-2.5 2.5 1 3.5L8 8 4 10l1-3.5L2.5 4H6L8 1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 13h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  Additional Benefits
                </h2>
                <svg className={'ldb-card-collapse-chevron' + (addlBenefitsOpen ? ' open' : '')} width="12" height="7" viewBox="0 0 12 7" fill="none"><path d="M1 1l5 5 5-5" stroke="#525252" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              {addlBenefitsOpen && (<>
              <p className="ldb-additional-benefits-subtext">Some claims must be filed directly on your state's website. Use the links below to apply.</p>
              <div className="ldb-additional-benefits-list">
                <div className="ldb-additional-benefit-row">
                  <div className="ldb-additional-benefit-info">
                    <div className="ldb-additional-benefit-name">CA State Disability Insurance</div>
                    <div className="ldb-additional-benefit-desc">Apply through your state benefits portal to determine eligibility.</div>
                  </div>
                  <div className="ldb-additional-benefit-action">
                    <span className="ldb-additional-benefit-tag">Potential Payment Source</span>
                    <button type="button" className="ldb-additional-benefit-btn">Learn More</button>
                  </div>
                </div>
                <div className="ldb-additional-benefit-row">
                  <div className="ldb-additional-benefit-info">
                    <div className="ldb-additional-benefit-name">CA Paid Family Leave</div>
                    <div className="ldb-additional-benefit-desc">May provide wage replacement during family care or bonding time.</div>
                  </div>
                  <div className="ldb-additional-benefit-action">
                    <span className="ldb-additional-benefit-tag">Potential Payment Source</span>
                    <button type="button" className="ldb-additional-benefit-btn">Learn More</button>
                  </div>
                </div>
              </div>
              </>)}
            </div>
            {/* ADA Accommodation */}
            <div className="ldb-card">
              <h2 className="ldb-card-title">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                ADA Accommodation
              </h2>
              <div className="ldb-ada-wrapper">
                <div className="ldb-ada-callout">
                  <div className="ldb-ada-callout-header">
                    <span className="ldb-ada-callout-type">Ergonomic Workstation</span>
                    <span className="cl-ml-status-pill cl-ml-status-pill--active">Active</span>
                  </div>
                  <div className="ldb-ada-callout-details">
                    <div className="ldb-ada-callout-field">
                      <span className="ldb-ada-callout-label">Period</span>
                      <span className="ldb-ada-callout-value">Jun 08, 2026 – Sep 08, 2026</span>
                    </div>
                    <div className="ldb-ada-callout-field">
                      <span className="ldb-ada-callout-label">Details</span>
                      <span className="ldb-ada-callout-value">Standing desk and ergonomic chair upon return</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </>
            )}

            {/* Tab: Payments */}
            {detailTab === 'payments' && (
            <>
            {/* Payment Summary Card */}
            <div className="ldb-card ldb-pay-summary-card">
              <h2 className="ldb-card-title" style={{ marginBottom: 16 }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" stroke="currentColor" strokeWidth="1.2"/><path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                Payment Summary
              </h2>
              <div className="ldb-pay-summary-stats">
                <div className="ldb-pay-stat">
                  <span className="ldb-pay-stat-value">$7,893.00</span>
                  <span className="ldb-pay-stat-label">Total Paid to Date</span>
                </div>
                <div className="ldb-pay-stat-divider" />
                <div className="ldb-pay-stat">
                  <span className="ldb-pay-stat-value">$2,308.00</span>
                  <span className="ldb-pay-stat-label">Most Recent Payment</span>
                </div>
                <div className="ldb-pay-stat-divider" />
                <div className="ldb-pay-stat">
                  <span className="ldb-pay-stat-value">May 19, 2026</span>
                  <span className="ldb-pay-stat-label">Expected Next Payment</span>
                </div>
                <div className="ldb-pay-stat-divider" />
                <div className="ldb-pay-stat">
                  <span className="ldb-pay-stat-value">Direct Deposit ****4872</span>
                  <span className="ldb-pay-stat-label">Payment Method</span>
                </div>
              </div>
              <p className="ldb-pay-summary-note">Payments from your Short-Term Disability Claim (STD). Paid weekly via direct deposit.</p>
            </div>

            {/* Payment History Table */}
            <div className="ldb-card ldb-pay-history-card">
              <div className="ldb-pay-history-header">
                <h2 className="ldb-card-title" style={{ marginBottom: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 14A6 6 0 108 2a6 6 0 000 12z" stroke="currentColor" strokeWidth="1.2"/><path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  Payment History
                </h2>
                <span className="ldb-pay-history-count">5 payments</span>
              </div>
              <table className="ldb-pay-table">
                <thead>
                  <tr>
                    <th>Payment Date</th>
                    <th>Claim Details</th>
                    <th>Net Amount</th>
                    <th>Method</th>
                    <th>Statement</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 1, date: 'May 12, 2026', claim: 'CLM-12345-GDC', type: 'Short-Term Disability', net: '$2,308.00', method: 'Direct Deposit', status: 'Paid', gross: '$2,692.31', deposit: 'Direct Deposit — Chase ****4872', deductions: [{ label: 'Federal Tax Withholding', amount: '-$230.77' }, { label: 'State Tax Withholding', amount: '-$92.31' }, { label: 'Social Security (FICA)', amount: '-$38.46' }, { label: 'Medicare', amount: '-$22.15' }] },
                    { id: 2, date: 'May 5, 2026', claim: 'CLM-12345-GDC', type: 'Short-Term Disability', net: '$2,308.00', method: 'Direct Deposit', status: 'Paid', gross: '$2,692.31', deposit: 'Direct Deposit — Chase ****4872', deductions: [{ label: 'Federal Tax Withholding', amount: '-$230.77' }, { label: 'State Tax Withholding', amount: '-$92.31' }, { label: 'Social Security (FICA)', amount: '-$38.46' }, { label: 'Medicare', amount: '-$22.15' }] },
                    { id: 3, date: 'Apr 28, 2026', claim: 'CLM-12345-GDC', type: 'Short-Term Disability', net: '$2,308.00', method: 'Direct Deposit', status: 'Paid', gross: '$2,692.31', deposit: 'Direct Deposit — Chase ****4872', deductions: [{ label: 'Federal Tax Withholding', amount: '-$230.77' }, { label: 'State Tax Withholding', amount: '-$92.31' }, { label: 'Social Security (FICA)', amount: '-$38.46' }, { label: 'Medicare', amount: '-$22.15' }] },
                    { id: 4, date: 'Apr 21, 2026', claim: 'CLM-12345-GDC', type: 'Short-Term Disability', net: '$969.00', method: 'Direct Deposit', status: 'Paid', gross: '$1,130.77', deposit: 'Direct Deposit — Chase ****4872', deductions: [{ label: 'Federal Tax Withholding', amount: '-$96.92' }, { label: 'State Tax Withholding', amount: '-$38.77' }, { label: 'Social Security (FICA)', amount: '-$16.15' }, { label: 'Medicare', amount: '-$9.93' }] },
                    { id: 5, date: 'May 19, 2026', claim: 'CLM-12345-GDC', type: 'Short-Term Disability', net: '$2,308.00', method: 'Direct Deposit', status: 'Scheduled', gross: '$2,692.31', deposit: 'Direct Deposit — Chase ****4872', deductions: [{ label: 'Federal Tax Withholding', amount: '-$230.77' }, { label: 'State Tax Withholding', amount: '-$92.31' }, { label: 'Social Security (FICA)', amount: '-$38.46' }, { label: 'Medicare', amount: '-$22.15' }] },
                  ].map(function (row) {
                    return (
                      <React.Fragment key={row.id}>
                        <tr className={expandedPayment === row.id ? 'ldb-pay-row--expanded' : ''}>
                          <td>{row.date}</td>
                          <td>
                            <div className="ldb-pay-claim-cell">
                              <span className="ldb-pay-claim-id">{row.claim}</span>
                              <span className="ldb-pay-claim-type">{row.type}</span>
                            </div>
                          </td>
                          <td className="ldb-pay-amount">{row.net}</td>
                          <td>{row.method}</td>
                          <td><button type="button" className="ldb-pay-link-btn">View</button></td>
                          <td>
                            <button type="button" className="ldb-pay-link-btn ldb-pay-details-btn" onClick={function () { setExpandedPayment(expandedPayment === row.id ? null : row.id); }}>
                              View Details
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 4, transform: expandedPayment === row.id ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                                <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                          </td>
                        </tr>
                        {expandedPayment === row.id && (
                          <tr className="ldb-pay-detail-row">
                            <td colSpan="6">
                              <div className="ldb-pay-breakdown">
                                <h4 className="ldb-pay-breakdown-title">Payment Breakdown</h4>
                                <div className="ldb-pay-breakdown-rows">
                                  <div className="ldb-pay-breakdown-row">
                                    <span>Gross Pay (Weekly Benefit)</span>
                                    <span>{row.gross}</span>
                                  </div>
                                  <div className="ldb-pay-breakdown-section">
                                    <div className="ldb-pay-breakdown-row ldb-pay-breakdown-row--sub">
                                      <span>Taxes &amp; Deductions</span>
                                      <span></span>
                                    </div>
                                    {row.deductions.map(function (ded, j) {
                                      return (
                                        <div key={j} className="ldb-pay-breakdown-row ldb-pay-breakdown-row--indent">
                                          <span>{ded.label}</span>
                                          <span>{ded.amount}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                  <div className="ldb-pay-breakdown-row ldb-pay-breakdown-row--total">
                                    <span>Net Amount</span>
                                    <span>{row.net}</span>
                                  </div>
                                  <div className="ldb-pay-breakdown-row ldb-pay-breakdown-row--method">
                                    <span>Deposit Method</span>
                                    <span>{row.deposit}</span>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
            </>
            )}

            {/* Tab: About This Leave */}
            {detailTab === 'about' && (
            <div className="ldb-card">
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
                            <div className="dt-info-field-label">Primary Email Address</div>
                            <input type="email" className="ldb-detail-input" value={detailsForm.email} onChange={function (e) { handleDetailsChange('email', e.target.value); }} />
                          </div>
                          <div>
                            <div className="dt-info-field-label">Phone Number</div>
                            <input type="tel" className="ldb-detail-input" value={detailsForm.phone} onChange={function (e) { handleDetailsChange('phone', e.target.value); }} />
                          </div>
                          <div>
                            <div className="dt-info-field-label">Temporary Mailing Address</div>
                            <input type="text" className="ldb-detail-input" value={detailsForm.address} onChange={function (e) { handleDetailsChange('address', e.target.value); }} />
                          </div>
                          <div>
                            <div className="dt-info-field-label">Duration at Temporary Address</div>
                            <input type="text" className="ldb-detail-input" value={detailsForm.addressDuration} onChange={function (e) { handleDetailsChange('addressDuration', e.target.value); }} />
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
                          <div className="dt-info-field-label">Primary Email Address</div>
                          <div className="dt-info-field-value">{detailsForm.email}</div>
                        </div>
                        <div>
                          <div className="dt-info-field-label">Phone Number</div>
                          <div className="dt-info-field-value">{detailsForm.phone}</div>
                        </div>
                        <div>
                          <div className="dt-info-field-label">Temporary Mailing Address</div>
                          <div className="dt-info-field-value">{detailsForm.address}</div>
                        </div>
                        <div>
                          <div className="dt-info-field-label">Duration at Temporary Address</div>
                          <div className="dt-info-field-value">{detailsForm.addressDuration}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Absence Details */}
                  <div className="dt-info-block">
                    <div className="dt-info-block-header">
                      <h4>Absence Details</h4>
                      {editingSection !== 'absence' && (
                        <button className="dt-info-edit-btn" type="button" onClick={function () { setEditingSection('absence'); }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                      )}
                      {editingSection === 'absence' && (
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#525252', background: '#f0f0f2', padding: '2px 8px', borderRadius: 4 }}>Editing</span>
                      )}
                    </div>
                    {editingSection === 'absence' ? (
                      <>
                        <div className="dt-info-grid">
                          <div>
                            <div className="dt-info-field-label">Absence Type</div>
                            <select className="ldb-detail-input" value={detailsForm.absenceType} onChange={function (e) { handleDetailsChange('absenceType', e.target.value); }}>
                              <option value="Continuous">Continuous</option>
                              <option value="Intermittent">Intermittent</option>
                              <option value="Reduced Schedule">Reduced Schedule</option>
                            </select>
                          </div>
                          <div>
                            <div className="dt-info-field-label">Absence Start Date</div>
                            <input type="date" className="ldb-detail-input" value={detailsForm.absenceStart} onChange={function (e) { handleDetailsChange('absenceStart', e.target.value); }} />
                          </div>
                          <div>
                            <div className="dt-info-field-label">Absence End Date</div>
                            <input type="date" className="ldb-detail-input" value={detailsForm.absenceEnd} onChange={function (e) { handleDetailsChange('absenceEnd', e.target.value); }} />
                          </div>
                          <div>
                            <div className="dt-info-field-label">Expected Return Date</div>
                            <input type="date" className="ldb-detail-input" value={detailsForm.expectedReturn} onChange={function (e) { handleDetailsChange('expectedReturn', e.target.value); }} />
                          </div>
                          <div>
                            <div className="dt-info-field-label">Duration</div>
                            <input type="text" className="ldb-detail-input" value={detailsForm.duration} readOnly style={{ background: '#f5f5f7', cursor: 'default' }} />
                          </div>
                          <div>
                            <div className="dt-info-field-label">Reason</div>
                            <input type="text" className="ldb-detail-input" value={detailsForm.reason} disabled style={{ background: '#f5f5f7', cursor: 'not-allowed', opacity: 0.7 }} />
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
                          <div className="dt-info-field-label">Absence Type</div>
                          <div className="dt-info-field-value">{detailsForm.absenceType}</div>
                        </div>
                        <div>
                          <div className="dt-info-field-label">Absence Start Date</div>
                          <div className="dt-info-field-value">{formatDateDisplay(detailsForm.absenceStart)}</div>
                        </div>
                        <div>
                          <div className="dt-info-field-label">Absence End Date</div>
                          <div className="dt-info-field-value">{formatDateDisplay(detailsForm.absenceEnd)}</div>
                        </div>
                        <div>
                          <div className="dt-info-field-label">Expected Return Date</div>
                          <div className="dt-info-field-value">{formatDateDisplay(detailsForm.expectedReturn)}</div>
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

                  {/* Work Schedule */}
                  <div className="dt-info-block">
                    <div className="dt-info-block-header">
                      <h4>Work Schedule</h4>
                      {editingSection !== 'schedule' && (
                        <button className="dt-info-edit-btn" type="button" onClick={function () { setEditingSection('schedule'); }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                      )}
                      {editingSection === 'schedule' && (
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#525252', background: '#f0f0f2', padding: '2px 8px', borderRadius: 4 }}>Editing</span>
                      )}
                    </div>
                    {editingSection === 'schedule' ? (
                      <>
                        <div className="ldb-schedule-container">
                          <div className="schedule-header-row" style={{ marginBottom: 12 }}>
                            <span className="dt-info-field-label" style={{ marginBottom: 0 }}>Weekly Hours</span>
                            <div className="schedule-total-badge">Weekly total <strong>{Object.values(scheduleHours).reduce(function (sum, h) { return sum + Number(h || 0); }, 0)}</strong> hrs / week</div>
                          </div>
                          <div className="schedule-grid">
                            {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(function (day, index) {
                              return (
                                <div key={day} className="schedule-day">
                                  <div className="schedule-day-label">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}</div>
                                  <div className="schedule-day-wrap">
                                    <div className={'schedule-day-box' + (Number(scheduleHours[day]) > 0 ? ' has-hours' : '') + (day === 'sun' || day === 'sat' ? ' weekend' : '')}>
                                      <input className="schedule-day-input" type="number" value={scheduleHours[day]}
                                        onChange={function (e) { setScheduleHours(function (prev) { var next = Object.assign({}, prev); next[day] = e.target.value; return next; }); }}
                                      />
                                    </div>
                                    <div className="schedule-day-unit">hrs</div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <button type="button" className="ldb-schedule-add-week">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                          Add Week
                        </button>
                        <div className="dt-edit-actions" style={{ marginTop: 16 }}>
                          <button type="button" className="dt-edit-save" onClick={function () { setEditingSection(null); }}>Save Changes</button>
                          <button type="button" className="dt-edit-cancel" onClick={function () { setEditingSection(null); }}>Cancel</button>
                        </div>
                      </>
                    ) : (
                      <div className="dt-info-grid">
                        <div>
                          <div className="dt-info-field-label">Weekly Hours</div>
                          <div className="dt-info-field-value">{Object.values(scheduleHours).reduce(function (sum, h) { return sum + Number(h || 0); }, 0)} hrs / week</div>
                        </div>
                        <div>
                          <div className="dt-info-field-label">Schedule</div>
                          <div className="dt-info-field-value">Mon–Fri, 8 hrs/day</div>
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
                            <div className="dt-info-field-label">Address</div>
                            <input type="text" className="ldb-detail-input" value={detailsForm.providerAddress} onChange={function (e) { handleDetailsChange('providerAddress', e.target.value); }} />
                          </div>
                          <div>
                            <div className="dt-info-field-label">Phone Number</div>
                            <input type="tel" className="ldb-detail-input" value={detailsForm.providerPhone} onChange={function (e) { handleDetailsChange('providerPhone', e.target.value); }} />
                          </div>
                          <div>
                            <div className="dt-info-field-label">Email</div>
                            <input type="email" className="ldb-detail-input" value={detailsForm.providerEmail} onChange={function (e) { handleDetailsChange('providerEmail', e.target.value); }} />
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
                          <div className="dt-info-field-label">Address</div>
                          <div className="dt-info-field-value">{detailsForm.providerAddress}</div>
                        </div>
                        <div>
                          <div className="dt-info-field-label">Phone Number</div>
                          <div className="dt-info-field-value">{detailsForm.providerPhone}</div>
                        </div>
                        <div>
                          <div className="dt-info-field-label">Email</div>
                          <div className="dt-info-field-value">{detailsForm.providerEmail}</div>
                        </div>
                      </div>
                    )}
                  </div>
            </div>
            )}

            {/* Tab: Communications & Activity */}
            {detailTab === 'activity' && (
            <div className="ldb-card ldb-activity-log">
              <div className="ldb-activity-filters">
                <div className="ldb-activity-filter">
                  <label>Date</label>
                  <div className="ldb-filter-select">
                    <span className="ldb-filter-value">All dates</span>
                    <svg className="ldb-filter-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="#6b7280" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
                <div className="ldb-activity-filter">
                  <label>Person</label>
                  <div className="ldb-filter-select">
                    <span className="ldb-filter-value">All</span>
                    <svg className="ldb-filter-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="#6b7280" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
                <div className="ldb-activity-filter">
                  <label>Status</label>
                  <div className="ldb-filter-select">
                    <span className="ldb-filter-value">All</span>
                    <svg className="ldb-filter-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="#6b7280" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>
              <table className="ldb-activity-table ldb-activity-table--striped">
                <thead>
                  <tr>
                    <th className="ldb-activity-th-sortable">Date & Time <svg className="ldb-sort-icon" width="10" height="12" viewBox="0 0 10 12" fill="none"><path d="M5 0L9 4H1L5 0Z" fill="#9ca3af"/><path d="M5 12L1 8H9L5 12Z" fill="#d4d4d8"/></svg></th>
                    <th className="ldb-activity-th-sortable">Activity <svg className="ldb-sort-icon" width="10" height="12" viewBox="0 0 10 12" fill="none"><path d="M5 0L9 4H1L5 0Z" fill="#d4d4d8"/><path d="M5 12L1 8H9L5 12Z" fill="#d4d4d8"/></svg></th>
                    <th className="ldb-activity-th-sortable">Completed By <svg className="ldb-sort-icon" width="10" height="12" viewBox="0 0 10 12" fill="none"><path d="M5 0L9 4H1L5 0Z" fill="#d4d4d8"/><path d="M5 12L1 8H9L5 12Z" fill="#d4d4d8"/></svg></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="ldb-activity-td-date">May 8, 2026<span className="ldb-activity-td-time">3:40 PM</span></td>
                    <td><strong>Return to work confirmed</strong> — returning on May 19 as scheduled.</td>
                    <td className="ldb-activity-td-person">Sarah Johnson<span className="ldb-activity-td-role">Employee</span></td>
                  </tr>
                  <tr>
                    <td className="ldb-activity-td-date">May 5, 2026<span className="ldb-activity-td-time">9:00 AM</span></td>
                    <td><strong>Return to work reminder</strong> — please confirm your return date by May 12.</td>
                    <td className="ldb-activity-td-person">Lisa Martinez<span className="ldb-activity-td-role">Claim Specialist</span></td>
                  </tr>
                  <tr>
                    <td className="ldb-activity-td-date">Apr 22, 2026<span className="ldb-activity-td-time">1:20 PM</span></td>
                    <td><strong>Payment scheduled</strong> — first disability payment initiated, expected in your account within 2–3 business days.</td>
                    <td className="ldb-activity-td-person">Lisa Martinez<span className="ldb-activity-td-role">Claim Specialist</span></td>
                  </tr>
                  <tr>
                    <td className="ldb-activity-td-date">Apr 21, 2026<span className="ldb-activity-td-time">4:52 PM</span></td>
                    <td><strong>Employer notified</strong> — your manager has been informed of approved leave dates and expected return.</td>
                    <td className="ldb-activity-td-person">Lisa Martinez<span className="ldb-activity-td-role">Claim Specialist</span></td>
                  </tr>
                  <tr>
                    <td className="ldb-activity-td-date">Apr 21, 2026<span className="ldb-activity-td-time">8:30 AM</span></td>
                    <td><strong>Leave decision issued</strong> — FMLA leave approved through May 19. Decision letter available in your documents. <a href="#" className="ldb-activity-doc-link"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 10v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> Decision_Letter.pdf</a></td>
                    <td className="ldb-activity-td-person">Lisa Martinez<span className="ldb-activity-td-role">Claim Specialist</span></td>
                  </tr>
                  <tr>
                    <td className="ldb-activity-td-date">Apr 16, 2026<span className="ldb-activity-td-time">11:08 AM</span></td>
                    <td><strong>Document uploaded</strong> — medical certification received and submitted for review. <a href="#" className="ldb-activity-doc-link"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 10v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> Medical_Certification.pdf</a></td>
                    <td className="ldb-activity-td-person">Sarah Johnson<span className="ldb-activity-td-role">Employee</span></td>
                  </tr>
                  <tr>
                    <td className="ldb-activity-td-date">Apr 14, 2026<span className="ldb-activity-td-time">2:15 PM</span></td>
                    <td><strong>Documentation reminder</strong> — medical certification is due within 6 days. Upload via your documents page.</td>
                    <td className="ldb-activity-td-person">Lisa Martinez<span className="ldb-activity-td-role">Claim Specialist</span></td>
                  </tr>
                  <tr>
                    <td className="ldb-activity-td-date">Apr 12, 2026<span className="ldb-activity-td-time">9:14 AM</span></td>
                    <td><strong>Additional documentation needed</strong> — supplemental forms available for download. Please complete and upload. <a href="#" className="ldb-activity-doc-link"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 10v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> Supplemental_Forms.pdf</a></td>
                    <td className="ldb-activity-td-person">Lisa Martinez<span className="ldb-activity-td-role">Claim Specialist</span></td>
                  </tr>
                  <tr>
                    <td className="ldb-activity-td-date">Apr 8, 2026<span className="ldb-activity-td-time">9:42 AM</span></td>
                    <td><strong>Leave request confirmed</strong> — eligibility notice and required forms are now available in your documents. <a href="#" className="ldb-activity-doc-link"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 10v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> Eligibility_Notice.pdf</a></td>
                    <td className="ldb-activity-td-person">Lisa Martinez<span className="ldb-activity-td-role">Claim Specialist</span></td>
                  </tr>
                  <tr>
                    <td className="ldb-activity-td-date">Apr 7, 2026<span className="ldb-activity-td-time">1:02 PM</span></td>
                    <td><strong>Leave request submitted</strong> — your request is being reviewed. You'll be notified when a decision is made.</td>
                    <td className="ldb-activity-td-person">Sarah Johnson<span className="ldb-activity-td-role">Employee</span></td>
                  </tr>
                </tbody>
              </table>

              <div className="ldb-activity-cards">
                <div className="ldb-activity-card">
                  <div className="ldb-activity-card-header">
                    <span className="ldb-activity-card-date">May 8, 2026 · 3:40 PM</span>
                    <span className="ldb-activity-card-person">Sarah Johnson<span className="ldb-activity-card-role">Employee</span></span>
                  </div>
                  <div className="ldb-activity-card-body"><strong>Return to work confirmed</strong> — returning on May 19 as scheduled.</div>
                </div>
                <div className="ldb-activity-card">
                  <div className="ldb-activity-card-header">
                    <span className="ldb-activity-card-date">May 5, 2026 · 9:00 AM</span>
                    <span className="ldb-activity-card-person">Lisa Martinez<span className="ldb-activity-card-role">Claim Specialist</span></span>
                  </div>
                  <div className="ldb-activity-card-body"><strong>Return to work reminder</strong> — please confirm your return date by May 12.</div>
                </div>
                <div className="ldb-activity-card">
                  <div className="ldb-activity-card-header">
                    <span className="ldb-activity-card-date">Apr 22, 2026 · 1:20 PM</span>
                    <span className="ldb-activity-card-person">Lisa Martinez<span className="ldb-activity-card-role">Claim Specialist</span></span>
                  </div>
                  <div className="ldb-activity-card-body"><strong>Payment scheduled</strong> — first disability payment initiated, expected in your account within 2–3 business days.</div>
                </div>
                <div className="ldb-activity-card">
                  <div className="ldb-activity-card-header">
                    <span className="ldb-activity-card-date">Apr 21, 2026 · 4:52 PM</span>
                    <span className="ldb-activity-card-person">Lisa Martinez<span className="ldb-activity-card-role">Claim Specialist</span></span>
                  </div>
                  <div className="ldb-activity-card-body"><strong>Employer notified</strong> — your manager has been informed of approved leave dates and expected return.</div>
                </div>
                <div className="ldb-activity-card">
                  <div className="ldb-activity-card-header">
                    <span className="ldb-activity-card-date">Apr 21, 2026 · 8:30 AM</span>
                    <span className="ldb-activity-card-person">Lisa Martinez<span className="ldb-activity-card-role">Claim Specialist</span></span>
                  </div>
                  <div className="ldb-activity-card-body"><strong>Leave decision issued</strong> — FMLA leave approved through May 19. Decision letter available in your documents.</div>
                  <a href="#" className="ldb-activity-doc-link"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 10v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> Decision_Letter.pdf</a>
                </div>
                <div className="ldb-activity-card">
                  <div className="ldb-activity-card-header">
                    <span className="ldb-activity-card-date">Apr 16, 2026 · 11:08 AM</span>
                    <span className="ldb-activity-card-person">Sarah Johnson<span className="ldb-activity-card-role">Employee</span></span>
                  </div>
                  <div className="ldb-activity-card-body"><strong>Document uploaded</strong> — medical certification received and submitted for review.</div>
                  <a href="#" className="ldb-activity-doc-link"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 10v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> Medical_Certification.pdf</a>
                </div>
                <div className="ldb-activity-card">
                  <div className="ldb-activity-card-header">
                    <span className="ldb-activity-card-date">Apr 14, 2026 · 2:15 PM</span>
                    <span className="ldb-activity-card-person">Lisa Martinez<span className="ldb-activity-card-role">Claim Specialist</span></span>
                  </div>
                  <div className="ldb-activity-card-body"><strong>Documentation reminder</strong> — medical certification is due within 6 days. Upload via your documents page.</div>
                </div>
                <div className="ldb-activity-card">
                  <div className="ldb-activity-card-header">
                    <span className="ldb-activity-card-date">Apr 12, 2026 · 9:14 AM</span>
                    <span className="ldb-activity-card-person">Lisa Martinez<span className="ldb-activity-card-role">Claim Specialist</span></span>
                  </div>
                  <div className="ldb-activity-card-body"><strong>Additional documentation needed</strong> — supplemental forms available for download. Please complete and upload.</div>
                  <a href="#" className="ldb-activity-doc-link"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 10v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> Supplemental_Forms.pdf</a>
                </div>
                <div className="ldb-activity-card">
                  <div className="ldb-activity-card-header">
                    <span className="ldb-activity-card-date">Apr 8, 2026 · 9:42 AM</span>
                    <span className="ldb-activity-card-person">Lisa Martinez<span className="ldb-activity-card-role">Claim Specialist</span></span>
                  </div>
                  <div className="ldb-activity-card-body"><strong>Leave request confirmed</strong> — eligibility notice and required forms are now available in your documents.</div>
                  <a href="#" className="ldb-activity-doc-link"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 10v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> Eligibility_Notice.pdf</a>
                </div>
                <div className="ldb-activity-card">
                  <div className="ldb-activity-card-header">
                    <span className="ldb-activity-card-date">Apr 7, 2026 · 1:02 PM</span>
                    <span className="ldb-activity-card-person">Sarah Johnson<span className="ldb-activity-card-role">Employee</span></span>
                  </div>
                  <div className="ldb-activity-card-body"><strong>Leave request submitted</strong> — your request is being reviewed. You'll be notified when a decision is made.</div>
                </div>
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

            {/* Quick Actions */}
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
