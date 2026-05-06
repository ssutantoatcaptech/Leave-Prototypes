import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './leave-detail-b.css';
import '../absence-details/absence-details-react.css';

export default function LeaveDetailCaregiverPage() {
  var location = useLocation();
  var base = location.pathname.startsWith('/claims-and-leave-mobile') ? '/claims-and-leave-mobile' : '/claims-and-leave';
  var navigate = useNavigate();
  var [timelineView, setTimelineView] = useState('protection');
  var [hoveredRow, setHoveredRow] = useState(null);
  var [expandedClaims, setExpandedClaims] = useState({ absence: true, stateleave: false });
  var [paymentsOpen, setPaymentsOpen] = useState(true);
  var [showAllTasks, setShowAllTasks] = useState(false);
  var [editingSection, setEditingSection] = useState(null);
  var [detailsForm, setDetailsForm] = useState({
    reason: 'Caring for spouse recovering from major surgery',
    duration: 'Up to 12 weeks (FMLA eligible)',
    relationship: 'Spouse',
    familyMember: 'Robert Martinez',
    provider: 'Dr. Williams (General Surgery)',
    facility: 'Valley Hospital',
    providerPhone: '(201) 555-6100',
    providerFax: '(201) 555-6101',
    providerAddress: '223 N Van Dien Ave, Ridgewood, NJ 07450',
    email: 'diana.martinez@company.com',
    phone: '(201) 555-0341',
    address: '27 Oak Lane, Glen Rock, NJ 07452',
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

      <div className="ldb-content">
        {/* Breadcrumb */}
        <div className="ldb-breadcrumb">
          <Link to={base}>Claims &amp; Leave</Link>
          <svg className="ldb-bc-sep" width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <Link to={`${base}/my-cases`}>My Cases</Link>
          <svg className="ldb-bc-sep" width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>CLM #13201</span>
        </div>

        {/* Title Card */}
        <div className="ldb-title-card">
          <div className="ldb-title-left">
            <div className="ldb-title-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="#fff" strokeWidth="1.8"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="ldb-title-text">
              <span className="ldb-status-badge ldb-title-badge" style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' }}>Approved</span>
              <h1 className="ldb-title">Caring for Family Member</h1>
              <div className="ldb-title-meta">
                <span style={{ fontSize: 14, color: '#525252', fontWeight: 600 }}>NTN - 5220</span>
                <span style={{ fontSize: 13, color: '#737373', marginLeft: 12 }}>May 5 – Jul 28, 2025 · Intermittent</span>
              </div>
            </div>
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
                    <p>How your claims provide protection and income while caregiving</p>
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
                      { id: 'njfli', label: 'NJ FLI', width: 100, accent: '#0d9488', name: 'NJ Family Leave Insurance (Caregiving)', weeks: '12 weeks', range: 'May 5 – Jul 28, 2025', pay: '85% AWW up to max', status: 'Approved', paymentValue: '~$1,048/wk' },
                    ] : [
                      { id: 'fmla', label: 'FMLA', width: 100, accent: '#0033a0', name: 'Leave Case — FMLA Protection', weeks: '12 weeks', range: 'May 5 – Jul 28, 2025', pay: 'Job protection (unpaid)', status: 'Approved' },
                      { id: 'njfli', label: 'NJ FLI', width: 100, accent: '#0d9488', name: 'NJ Family Leave Insurance (Caregiving)', weeks: '12 weeks', range: 'May 5 – Jul 28, 2025', pay: '85% AWW up to max', status: 'Approved' },
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

                  {hoveredRow && (function () {
                    var allRows = timelineView === 'payment' ? [
                      { id: 'njfli', name: 'NJ Family Leave Insurance (Caregiving)', weeks: '12 weeks', range: 'May 5 – Jul 28, 2025', pay: '85% AWW up to max', status: 'Approved', paymentValue: '~$1,048/wk' },
                    ] : [
                      { id: 'fmla', name: 'Leave Case — FMLA Protection', weeks: '12 weeks', range: 'May 5 – Jul 28, 2025', pay: 'Job protection (unpaid)', status: 'Approved' },
                      { id: 'njfli', name: 'NJ Family Leave Insurance (Caregiving)', weeks: '12 weeks', range: 'May 5 – Jul 28, 2025', pay: '85% AWW up to max', status: 'Approved' },
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

                  {hoveredRow && (function () {
                    var allRows = timelineView === 'payment' ? [
                      { id: 'njfli', name: 'NJ Family Leave Insurance (Caregiving)', weeks: '12 weeks', range: 'May 5 – Jul 28, 2025', pay: '85% AWW up to max', status: 'Approved', paymentValue: '~$1,048/wk' },
                    ] : [
                      { id: 'fmla', name: 'Leave Case — FMLA Protection', weeks: '12 weeks', range: 'May 5 – Jul 28, 2025', pay: 'Job protection (unpaid)', status: 'Approved' },
                      { id: 'njfli', name: 'NJ Family Leave Insurance (Caregiving)', weeks: '12 weeks', range: 'May 5 – Jul 28, 2025', pay: '85% AWW up to max', status: 'Approved' },
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
                  </div>

                  <div className="dlp-tl-weeks-row">
                    <div className="dlp-tl-week-label">Week</div>
                    <div className="dlp-tl-weeks">
                      {Array.from({ length: 12 }, function (_, i) {
                        return <div key={i} className="dlp-tl-week-tick"><span className="dlp-tl-week-num">{i + 1}</span></div>;
                      })}
                    </div>
                  </div>
                  <div className="dlp-tl-months">
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                  </div>

                  <div className="dlp-legend">
                    {(timelineView === 'payment' ? [
                      { id: 'fli-pay', label: 'NJ FLI (85%)', accent: '#0d9488' },
                      { id: 'unpaid', label: 'Unpaid Gap Days', accent: '#cbd5e1' },
                    ] : [
                      { id: 'fmla', label: 'FMLA Protection', accent: '#0033a0' },
                      { id: 'njfli', label: 'NJ FLI (Caregiving)', accent: '#0d9488' },
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
                      <div className="dt-payment-summary-value">$12,576</div>
                      <div className="dt-payment-summary-note">NJ FLI ($1,048/wk x 12 weeks) · Based on average weekly wage · Actual amounts may vary</div>
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
                      <div className="ldb-claim-accordion-title">Leave Case — Family Caregiver</div>
                      <div className="ldb-claim-accordion-sub">NTN-5220-ABS-30 · FMLA designation, caregiving for spouse</div>
                    </div>
                  </div>
                  <span className="ldb-claim-status" style={{ background: '#f0fdf4', color: '#166534' }}>Approved</span>
                </button>
                {expandedClaims.absence && (
                  <div className="ldb-claim-accordion-body">
                    <div className="dt-info-grid">
                      <div>
                        <div className="dt-info-field-label">Claim ID</div>
                        <div className="dt-info-field-value">NTN-5220-ABS-30</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Leave Type</div>
                        <div className="dt-info-field-value">Intermittent</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">FMLA Eligible</div>
                        <div className="dt-info-field-value">Yes — 12 weeks available</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">FMLA Used</div>
                        <div className="dt-info-field-value">0 weeks (leave not yet started)</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Qualifying Reason</div>
                        <div className="dt-info-field-value">Care for spouse with serious health condition</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Relationship</div>
                        <div className="dt-info-field-value">Spouse</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Job Protection</div>
                        <div className="dt-info-field-value">Active through Jul 28, 2025</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Schedule</div>
                        <div className="dt-info-field-value">Up to 3 days/week as needed</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 16, padding: '12px 16px', background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0', fontSize: 13, color: '#166534' }}>
                      <strong>Note:</strong> FMLA allows intermittent leave for family caregiving when medically necessary. You may take leave in separate blocks of time or reduce your work schedule. Your employer must maintain your group health benefits during FMLA leave.
                    </div>
                  </div>
                )}
              </div>

              {/* NJ FLI Caregiving Claim */}
              <div className="ldb-claim-accordion">
                <button type="button" className={'ldb-claim-accordion-header' + (expandedClaims.stateleave ? ' expanded' : '')} onClick={function () { toggleClaim('stateleave'); }}>
                  <div className="ldb-claim-accordion-left">
                    <svg className="ldb-claim-accordion-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <div>
                      <div className="ldb-claim-accordion-title">State Paid Leave — NJ FLI (Caregiving)</div>
                      <div className="ldb-claim-accordion-sub">NTN-5220-FLI-31 · NJ Family Leave Insurance — care for family member</div>
                    </div>
                  </div>
                  <span className="ldb-claim-status" style={{ background: '#f0fdfa', color: '#115e59' }}>Approved</span>
                </button>
                {expandedClaims.stateleave && (
                  <div className="ldb-claim-accordion-body">
                    <div className="dt-info-grid">
                      <div>
                        <div className="dt-info-field-label">Claim ID</div>
                        <div className="dt-info-field-value">NTN-5220-FLI-31</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Program</div>
                        <div className="dt-info-field-value">NJ Family Leave Insurance (FLI)</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Covers</div>
                        <div className="dt-info-field-value">Care for family member with serious health condition</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Relationship</div>
                        <div className="dt-info-field-value">Spouse</div>
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
                        <div className="dt-info-field-label">Duration</div>
                        <div className="dt-info-field-value">Up to 12 consecutive weeks</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Benefits Start</div>
                        <div className="dt-info-field-value">May 5, 2025</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Benefits End (Est.)</div>
                        <div className="dt-info-field-value">Jul 28, 2025</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Work State</div>
                        <div className="dt-info-field-value">New Jersey</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Payment Method</div>
                        <div className="dt-info-field-value">Direct Deposit ****3156</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Intermittent Allowed</div>
                        <div className="dt-info-field-value">Yes — can be taken in non-consecutive days</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 16, padding: '12px 16px', background: '#f0fdfa', borderRadius: 8, border: '1px solid #ccfbf1', fontSize: 13, color: '#115e59' }}>
                      <strong>Note:</strong> NJ FLI provides income replacement while you care for your spouse. Benefits are paid for days you are absent from work to provide care. You can take this intermittently — you don't have to take all 12 weeks consecutively.
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
                      <span className="ldb-payment-value">$0.00</span>
                    </div>
                    <div className="ldb-payment-item">
                      <span className="ldb-payment-label">First Expected Payment</span>
                      <span className="ldb-payment-value">May 12, 2025</span>
                    </div>
                    <div className="ldb-payment-item">
                      <span className="ldb-payment-label">Est. Weekly (Full Week)</span>
                      <span className="ldb-payment-value">$1,048.00</span>
                    </div>
                    <div className="ldb-payment-item">
                      <span className="ldb-payment-label">Payment Method</span>
                      <span className="ldb-payment-value">Direct Deposit ****3156</span>
                    </div>
                  </div>
                  <p className="ldb-card-context">Payments from NJ Family Leave Insurance (FLI). Paid for days absent to provide care.</p>
                  <div style={{ marginTop: 16, padding: '12px 16px', background: '#fffbeb', borderRadius: 8, border: '1px solid #fef3c7', fontSize: 13, color: '#92400e' }}>
                    <strong>Note:</strong> For intermittent leave, payments are calculated based on actual days taken. A full week of leave pays $1,048. Partial weeks are prorated based on your normal schedule.
                  </div>
                  <Link to={`${base}/payments?claim=NTN-5220-FLI-31&case=NTN-5220`} className="ldb-payments-view-btn" style={{ textDecoration: 'none' }}>
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
                          <div>
                            <div className="dt-info-field-label">Relationship</div>
                            <input type="text" className="ldb-detail-input" value={detailsForm.relationship} onChange={function (e) { handleDetailsChange('relationship', e.target.value); }} />
                          </div>
                          <div>
                            <div className="dt-info-field-label">Family Member</div>
                            <input type="text" className="ldb-detail-input" value={detailsForm.familyMember} onChange={function (e) { handleDetailsChange('familyMember', e.target.value); }} />
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
                        <div>
                          <div className="dt-info-field-label">Relationship</div>
                          <div className="dt-info-field-value">{detailsForm.relationship}</div>
                        </div>
                        <div>
                          <div className="dt-info-field-label">Family Member</div>
                          <div className="dt-info-field-value">{detailsForm.familyMember}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Family Member's Healthcare Provider */}
                  <div className="dt-info-block">
                    <div className="dt-info-block-header">
                      <h4>Family Member's Healthcare Provider</h4>
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
                </>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="ldb-sidebar">

            {/* 1. Items Requiring Action */}
            <div className="ldb-side-card">
              <div className="ldb-tasks-header">
                <h3 className="ldb-side-title">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Items Requiring Action
                </h3>
                <span className="ldb-tasks-count">2 needed</span>
              </div>

              <div className="ldb-action-list">
                <div className="ldb-action-item">
                  <div className="ldb-action-dot" />
                  <div className="ldb-action-content">
                    <div className="ldb-action-title">Caregiver Certification Form</div>
                    <div className="ldb-action-meta">Due May 19 · Provider must complete Section B</div>
                  </div>
                  <button type="button" className="ldb-btn-upload-inline">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 12V4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M4.5 6.5L8 3l3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 13h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    Upload
                  </button>
                </div>
                <div className="ldb-action-item">
                  <div className="ldb-action-dot" />
                  <div className="ldb-action-content">
                    <div className="ldb-action-title">Submit Intermittent Schedule</div>
                    <div className="ldb-action-meta">Due May 12 · Expected caregiving days per week</div>
                  </div>
                  <button type="button" className="ldb-btn-upload-inline">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Schedule
                  </button>
                </div>
              </div>

              {!showAllTasks && (
                <button type="button" className="ldb-tasks-expand" onClick={function () { setShowAllTasks(true); }}>
                  +3 more tasks
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
                        <div className="ldb-action-title">FMLA Eligibility Confirmed</div>
                        <div className="ldb-action-meta">Completed Apr 28 · Leave Case</div>
                      </div>
                    </div>
                    <div className="ldb-action-item done">
                      <div className="ldb-action-dot done" />
                      <div className="ldb-action-content">
                        <div className="ldb-action-title">NJ FLI Application Filed</div>
                        <div className="ldb-action-meta">Completed Apr 30 · State program</div>
                      </div>
                    </div>
                    <div className="ldb-action-item done">
                      <div className="ldb-action-dot done" />
                      <div className="ldb-action-content">
                        <div className="ldb-action-title">Employer Notification Submitted</div>
                        <div className="ldb-action-meta">Completed Apr 25 · 30-day notice provided</div>
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

            {/* 2. Quick Actions */}
            <div className="ldb-side-card ldb-side-card--shadow">
              <div className="ldb-quick-actions-label">QUICK ACTIONS</div>
              <div className="ldb-quick-actions-list">
                <button type="button" className="ldb-quick-action-item" onClick={function () { navigate(`${base}/case-detail-caregiver/return-to-work`); }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 13l3-3M13 3l-3 3M10 3H13v3M6 13H3v-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span>Manage Return to Work</span>
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="ldb-quick-action-chevron"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button type="button" className="ldb-quick-action-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span>Log Caregiving Days</span>
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="ldb-quick-action-chevron"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button type="button" className="ldb-quick-action-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" stroke="currentColor" strokeWidth="1.2"/><path d="M5 8h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  <span>Update Caregiving Schedule</span>
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
                  <div className="ldb-snapshot-date-label">Leave Start</div>
                  <div className="ldb-snapshot-date-value">May 5, 2025</div>
                </div>
                <div className="ldb-snapshot-date-card">
                  <div className="ldb-snapshot-date-label">Leave End (Est.)</div>
                  <div className="ldb-snapshot-date-value">Jul 28, 2025</div>
                </div>
              </div>
              <div className="ldb-snapshot-dates-row">
                <div className="ldb-snapshot-date-card">
                  <div className="ldb-snapshot-date-label">Schedule</div>
                  <div className="ldb-snapshot-date-value">Intermittent</div>
                </div>
                <div className="ldb-snapshot-date-card">
                  <div className="ldb-snapshot-date-label">Frequency</div>
                  <div className="ldb-snapshot-date-value">Up to 3 days/wk</div>
                </div>
              </div>
              <div className="ldb-snapshot-date-card ldb-snapshot-date-card--full">
                <div className="ldb-snapshot-date-label">Family Member's Condition</div>
                <div className="ldb-snapshot-date-value">Post-surgical recovery (6–12 weeks)</div>
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
                    <div className="ldb-doc-name">NJ_FLI_Application.pdf</div>
                    <div className="ldb-doc-meta">Uploaded on Apr 30, 2025</div>
                  </div>
                  <button type="button" className="ldb-doc-download-btn" aria-label="Download">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 4v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M4.5 9.5L8 13l3.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  </button>
                </div>
                <div className="ldb-doc-item">
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">Employer_Leave_Notice.pdf</div>
                    <div className="ldb-doc-meta">Uploaded on Apr 25, 2025</div>
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
