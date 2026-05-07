import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './leave-detail-b.css';
import '../absence-details/absence-details-react.css';

export default function LeaveDetailNewCasePage() {
  var location = useLocation();
  var navigate = useNavigate();
  var isMobile = location.pathname.startsWith('/claims-and-leave-mobile');
  var base = isMobile ? '/claims-and-leave-mobile' : '/claims-and-leave';

  var caseData = location.state || {};
  var caseId = caseData.id || 'NTN-0000';
  var startDate = caseData.startDate || '2026-06-01';
  var endDate = caseData.endDate || '2026-09-15';
  var leaveType = caseData.leaveType || 'continuous';
  var reason = caseData.reason || 'Illness or Injury';
  var provider = caseData.provider || 'Dr. Patel';
  var facility = caseData.facility || 'Medical Center';

  var startFormatted = formatDate(startDate);
  var endFormatted = formatDate(endDate);
  var returnDate = new Date(new Date(endDate + 'T00:00:00').getTime() + 3 * 24 * 60 * 60 * 1000);
  var returnFormatted = returnDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  var [timelineView, setTimelineView] = useState('protection');
  var [hoveredRow, setHoveredRow] = useState(null);
  var [expandedClaims, setExpandedClaims] = useState({ absence: !isMobile, disability: false });
  var [paymentsOpen, setPaymentsOpen] = useState(!isMobile);
  var [showAllTasks, setShowAllTasks] = useState(false);

  function formatDate(d) {
    if (!d) return '—';
    var dt = new Date(d + 'T00:00:00');
    return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
          <span style={{ fontSize: 11, fontWeight: 700, color: '#dc2626', background: '#fef2f2', padding: '2px 8px', borderRadius: 10 }}>2 needed</span>
        </div>
        <div className="ldb-action-list">
          <div className="ldb-action-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#dc2626" strokeWidth="1.4"/><path d="M8 5v3M8 10.5v.5" stroke="#dc2626" strokeWidth="1.4" strokeLinecap="round"/></svg>
            <div className="ldb-action-text">
              <span className="ldb-action-name">Medical Certification Form</span>
              <span className="ldb-action-due">Due within 15 days</span>
            </div>
            <button type="button" className="ldb-btn-upload-inline">Upload</button>
          </div>
          <div className="ldb-action-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#dc2626" strokeWidth="1.4"/><path d="M8 5v3M8 10.5v.5" stroke="#dc2626" strokeWidth="1.4" strokeLinecap="round"/></svg>
            <div className="ldb-action-text">
              <span className="ldb-action-name">Attending Physician Statement</span>
              <span className="ldb-action-due">Due within 15 days</span>
            </div>
            <button type="button" className="ldb-btn-upload-inline">Upload</button>
          </div>
        </div>
        {!showAllTasks ? (
          <button type="button" className="ldb-show-more-btn" onClick={function () { setShowAllTasks(true); }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 4v8M4 8h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            1 more task
          </button>
        ) : (
          <>
            <div className="ldb-action-list" style={{ marginTop: 8 }}>
              <div className="ldb-action-item ldb-action-item--done">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#16a34a" strokeWidth="1.4"/><path d="M5.5 8l2 2 3.5-3.5" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div className="ldb-action-text">
                  <span className="ldb-action-name">Initial Leave Request Form</span>
                  <span className="ldb-action-due" style={{ color: '#16a34a' }}>Completed just now</span>
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
          <Link to={`${base}/my-cases`}>My Cases</Link>
          <svg className="ldb-bc-sep" width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>{caseId}</span>
        </div>

        {/* Title Card */}
        <div className="ldb-title-card">
          <div className="ldb-title-left">
            <div className="ldb-title-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 10h8M8 13h5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            <div className="ldb-title-text">
              <span className="ldb-status-badge pending-status ldb-title-badge">Pending Review</span>
              <h1 className="ldb-title">{reason}</h1>
              <div className="ldb-title-meta">
                <span style={{ fontSize: 14, color: '#525252', fontWeight: 600 }}>{caseId}</span>
                <span style={{ fontSize: 13, color: '#737373', marginLeft: 12 }}>{startFormatted} – {endFormatted} · {leaveType === 'continuous' ? 'Continuous' : leaveType === 'intermittent' ? 'Intermittent' : 'Reduced Schedule'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* New case banner */}
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '14px 16px', marginBottom: 16, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><path d="M9 12l2 2 4-4" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="1.5"/></svg>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#166534', marginBottom: 2 }}>Request Submitted Successfully</div>
            <div style={{ fontSize: 13, color: '#15803d', lineHeight: 1.4 }}>Your leave request has been submitted and is under review. You'll receive updates as your case progresses.</div>
          </div>
        </div>

        <div className="ldb-v2-layout">
          {/* Main */}
          <div className="ldb-v2-main">


            {/* Coverage Timeline */}
            <div className="ldb-card dt-timeline-wrap">
              <div className="ad-section-header">
                <div>
                  <h3>Coverage Timeline</h3>
                  <p>Estimated coverage based on your submitted request</p>
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
                      { id: 'std', label: 'STD', width: 50, accent: '#2563eb', name: 'Group Disability Claim (STD)', weeks: 'Up to 26 wks', range: startFormatted + ' – TBD', pay: '60% of earnings', status: 'Pending', paymentValue: 'TBD' },
                    ] : [
                      { id: 'fmla', label: 'FMLA', width: 100, accent: '#0033a0', name: 'FMLA Job Protection', weeks: 'Up to 12 wks', range: startFormatted + ' – ' + endFormatted, pay: 'Job protection (unpaid)', status: 'Pending' },
                      { id: 'std', label: 'STD', width: 50, accent: '#2563eb', name: 'Group Disability Claim (STD)', weeks: 'Up to 26 wks', range: startFormatted + ' – TBD', pay: '60% of earnings', status: 'Pending' },
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

                  {/* Tooltip on hover (desktop) */}
                  {hoveredRow && (function () {
                    var allRows = timelineView === 'payment' ? [
                      { id: 'std', name: 'Group Disability Claim (STD)', weeks: 'Up to 26 wks', range: startFormatted + ' – TBD', pay: '60% of earnings', status: 'Pending', paymentValue: 'TBD' },
                    ] : [
                      { id: 'fmla', name: 'FMLA Job Protection', weeks: 'Up to 12 wks', range: startFormatted + ' – ' + endFormatted, pay: 'Job protection (unpaid)', status: 'Pending' },
                      { id: 'std', name: 'Group Disability Claim (STD)', weeks: 'Up to 26 wks', range: startFormatted + ' – TBD', pay: '60% of earnings', status: 'Pending' },
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
                            <div className="label">Status</div>
                            <div className="value">{hovered.status}</div>
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

                {/* Mobile detail accordion */}
                {hoveredRow && (function () {
                  var allRows = timelineView === 'payment' ? [
                    { id: 'std', name: 'Group Disability Claim (STD)', weeks: 'Up to 26 wks', range: startFormatted + ' – TBD', pay: '60% of earnings', status: 'Pending', paymentValue: 'TBD' },
                  ] : [
                    { id: 'fmla', name: 'FMLA Job Protection', weeks: 'Up to 12 wks', range: startFormatted + ' – ' + endFormatted, pay: 'Job protection (unpaid)', status: 'Pending' },
                    { id: 'std', name: 'Group Disability Claim (STD)', weeks: 'Up to 26 wks', range: startFormatted + ' – TBD', pay: '60% of earnings', status: 'Pending' },
                  ];
                  var selected = allRows.find(function (r) { return r.id === hoveredRow; });
                  if (!selected) return null;
                  return (
                    <div className="dlp-tl-mobile-detail">
                      <div className="dlp-tl-mobile-detail-title">{selected.name}</div>
                      <div className="dlp-tl-mobile-detail-grid">
                        <div>
                          <div className="dlp-tl-mobile-detail-label">Status</div>
                          <div className="dlp-tl-mobile-detail-value">{selected.status}</div>
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
                    {Array.from({ length: 12 }, function (_, i) {
                      return <div key={i} className="dlp-tl-week-tick"><span className="dlp-tl-week-num">{i + 1}</span></div>;
                    })}
                  </div>
                </div>
                <div className="dlp-tl-months">
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                </div>

                <div className="dlp-legend">
                  {(timelineView === 'payment' ? [
                    { id: 'std', label: 'STD (60%)', accent: '#2563eb' },
                    { id: 'unpaid', label: 'Unpaid/TBD', accent: '#cbd5e1' },
                  ] : [
                    { id: 'fmla', label: 'FMLA Protection', accent: '#0033a0' },
                    { id: 'std', label: 'STD Income', accent: '#2563eb' },
                  ]).map(function (item) {
                    return (
                      <div key={item.id} className="dlp-legend-item">
                        <div className="dlp-legend-dot" style={{ background: item.accent }} />
                        {item.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Associated Claims */}
            <div className="ldb-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 className="ldb-card-title" style={{ marginBottom: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  Associated Claims
                </h2>
                <span style={{ fontSize: 12, color: '#737373' }}>Click to expand</span>
              </div>

              {/* Absence Case */}
              <div className="ldb-claim-accordion">
                <button type="button" className={'ldb-claim-accordion-header' + (expandedClaims.absence ? ' expanded' : '')} onClick={function () { toggleClaim('absence'); }}>
                  <div className="ldb-claim-accordion-left">
                    <svg className="ldb-claim-accordion-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <div>
                      <div className="ldb-claim-accordion-title-wrap">
                        <span className="ldb-claim-accordion-title">Leave Case</span>
                        <span className="ldb-claim-status ldb-claim-status--inline" style={{ background: '#e8f0fe', color: '#0033a0' }}>Pending</span>
                      </div>
                      <div className="ldb-claim-accordion-sub">{caseId}-ABC-01 · FMLA designation pending review</div>
                    </div>
                  </div>
                  <span className="ldb-claim-status ldb-claim-status--end" style={{ background: '#e8f0fe', color: '#0033a0' }}>Pending</span>
                </button>
                {expandedClaims.absence && (
                  <div className="ldb-claim-accordion-body">
                    <div className="dt-info-grid">
                      <div>
                        <div className="dt-info-field-label">Claim ID</div>
                        <div className="dt-info-field-value">{caseId}-ABC-01</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Leave Type</div>
                        <div className="dt-info-field-value">{leaveType === 'continuous' ? 'Continuous' : leaveType === 'intermittent' ? 'Intermittent' : 'Reduced Schedule'}</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">FMLA Eligible</div>
                        <div className="dt-info-field-value">Under review</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Status</div>
                        <div className="dt-info-field-value">Pending — awaiting medical certification</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* STD Claim */}
              <div className="ldb-claim-accordion">
                <button type="button" className={'ldb-claim-accordion-header' + (expandedClaims.disability ? ' expanded' : '')} onClick={function () { toggleClaim('disability'); }}>
                  <div className="ldb-claim-accordion-left">
                    <svg className="ldb-claim-accordion-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <div>
                      <div className="ldb-claim-accordion-title-wrap">
                        <span className="ldb-claim-accordion-title">Group Disability Claim</span>
                        <span className="ldb-claim-status ldb-claim-status--inline" style={{ background: '#e8f0fe', color: '#0033a0' }}>Pending</span>
                      </div>
                      <div className="ldb-claim-accordion-sub">{caseId}-GDC-02 · STD benefit — pending eligibility review</div>
                    </div>
                  </div>
                  <span className="ldb-claim-status ldb-claim-status--end" style={{ background: '#e8f0fe', color: '#0033a0' }}>Pending</span>
                </button>
                {expandedClaims.disability && (
                  <div className="ldb-claim-accordion-body">
                    <div className="dt-info-grid">
                      <div>
                        <div className="dt-info-field-label">Claim ID</div>
                        <div className="dt-info-field-value">{caseId}-GDC-02</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Benefit Type</div>
                        <div className="dt-info-field-value">Short-Term Disability (STD)</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Expected Benefit</div>
                        <div className="dt-info-field-value">60% of pre-disability earnings</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Elimination Period</div>
                        <div className="dt-info-field-value">7 calendar days</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Status</div>
                        <div className="dt-info-field-value">Pending — medical documentation required</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payments — Pending */}
            <div className="ldb-card">
              <button type="button" className="ldb-card-collapse-header" onClick={function () { setPaymentsOpen(!paymentsOpen); }}>
                <h2 className="ldb-card-title" style={{ marginBottom: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" stroke="currentColor" strokeWidth="1.2"/><path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  Associated Payments
                </h2>
                <svg className={'ldb-card-collapse-chevron' + (paymentsOpen ? ' open' : '')} width="12" height="7" viewBox="0 0 12 7" fill="none"><path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              {paymentsOpen && (
                <div style={{ padding: '16px 0 0', color: '#737373', fontSize: 13 }}>
                  <div style={{ textAlign: 'center', padding: '24px 16px' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ margin: '0 auto 12px', display: 'block', opacity: 0.4 }}><rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M3 9h18" stroke="currentColor" strokeWidth="1.5"/></svg>
                    <div style={{ fontWeight: 600, color: '#374151', marginBottom: 4 }}>No payments yet</div>
                    <div>Payments will appear here once your claim is approved and benefits begin.</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="ldb-sidebar">
            {renderItemsRequiringAction()}

            {/* Quick Actions */}
            <div className="ldb-side-card ldb-side-card--shadow">
              <div className="ldb-quick-actions-label">QUICK ACTIONS</div>
              <div className="ldb-quick-actions-list">
                <button type="button" className="ldb-quick-action-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="currentColor" strokeWidth="1.2"/></svg>
                  <span>Upload Documents</span>
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="ldb-quick-action-chevron"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button type="button" className="ldb-quick-action-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/></svg>
                  <span>Message claims specialist</span>
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="ldb-quick-action-chevron"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button type="button" className="ldb-quick-action-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span>Enter Time</span>
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="ldb-quick-action-chevron"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>

            {/* Leave Snapshot */}
            <div className="ldb-side-card">
              <h3 className="ldb-side-title">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M2 6h12" stroke="currentColor" strokeWidth="1.2"/><path d="M5 2v2M11 2v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                Leave Snapshot
              </h3>
              <div className="ldb-snapshot-dates-row">
                <div className="ldb-snapshot-date-card">
                  <div className="ldb-snapshot-date-label">Start Date</div>
                  <div className="ldb-snapshot-date-value">{startFormatted}</div>
                </div>
                <div className="ldb-snapshot-date-card">
                  <div className="ldb-snapshot-date-label">End Date</div>
                  <div className="ldb-snapshot-date-value">{endFormatted}</div>
                </div>
              </div>
              <div className="ldb-snapshot-date-card ldb-snapshot-date-card--full">
                <div className="ldb-snapshot-date-label">Expected Return to Work</div>
                <div className="ldb-snapshot-date-value">{returnFormatted}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
