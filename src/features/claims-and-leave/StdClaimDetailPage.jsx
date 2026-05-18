import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useBasePath from './useBasePath';
import '../leave-detail/leave-detail-b.css';
import '../absence-details/absence-details-react.css';

var CLAIM_VARIANTS = {
  std: {
    title: 'Short-Term Disability (STD) Claim',
    status: 'Closed',
    statusClass: 'cl-std-pill--closed',
    claimId: 'CLM-301822',
    filedDate: 'Feb 10, 2026',
    claimNumber: 'CLM-301822',
    policy: 'Group STD — Employer Paid',
    diagnosis: 'Post-surgical recovery (knee)',
    leaveStart: 'Feb 10, 2026',
    benefitsBegin: 'Feb 17, 2026',
    expectedRTW: 'Apr 06, 2026',
    maxDuration: '8 weeks',
    weeksRemaining: '0 of 8 weeks (Exhausted)',
    totalPaid: '$8,300.00',
    remaining: null,
    linkedClaim: { id: 'LTD-401822', kind: 'ltd', label: 'Transitioned to LTD-401822 (Active)' },
    timelineRows: [
      { id: 'std', label: 'STD', width: 100, accent: '#2563eb', name: 'Group Short-Term Disability (Completed)', weeks: '8 of 8 weeks paid', range: 'Feb 17 – Apr 06, 2026', pay: '60% of pre-disability earnings', paymentValue: '~$1,037/wk' },
    ],
    legend: [
      { id: 'std-paid', label: 'STD paid (8 wks)', accent: '#2563eb' },
    ],
    weekCount: 8,
    months: ['Feb', 'Mar', 'Apr'],
  },
  ltd: {
    title: 'Long-Term Disability (LTD) Claim',
    status: 'Active',
    statusClass: 'cl-std-pill--approved',
    claimId: 'LTD-387201',
    filedDate: 'Jan 15, 2026',
    claimNumber: 'LTD-387201',
    policy: 'Group LTD — Employer Paid',
    diagnosis: 'Degenerative disc disease',
    leaveStart: 'Jan 15, 2026',
    benefitsBegin: 'Jan 15, 2026',
    expectedRTW: 'Ongoing',
    maxDuration: '24 months',
    weeksRemaining: '18 of 24 months',
    totalPaid: '$16,200.00',
    remaining: '18 months remaining',
    linkedClaim: null,
    timelineRows: [
      { id: 'ltd', label: 'LTD', width: 100, accent: '#475569', name: 'Long-Term Disability (In Payment)', weeks: '6 months paid', range: 'Jan 15 – Jul 15, 2026', pay: '60% of pre-disability earnings', paymentValue: '~$900/wk' },
    ],
    legend: [
      { id: 'ltd-pay', label: 'LTD paid (6 months)', accent: '#475569' },
    ],
    weekCount: 26,
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  },
};

export default function StdClaimDetailPage() {
  const base = useBasePath();
  const location = useLocation();
  const isLtd = location.pathname.includes('ltd-claim-detail');
  const variant = isLtd ? CLAIM_VARIANTS.ltd : CLAIM_VARIANTS.std;
  const [completedExpanded, setCompletedExpanded] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div className="cl-std-page">
      {/* Breadcrumb */}
      <div className="cl-std-breadcrumb">
        <Link to={base} className="cl-std-breadcrumb-link">Claims &amp; Leave</Link>
        <span className="cl-std-breadcrumb-sep">
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
            <path d="M1 1l4 4-4 4" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <Link to={`${base}/claims`} className="cl-std-breadcrumb-link">Claims Center</Link>
        <span className="cl-std-breadcrumb-sep">
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
            <path d="M1 1l4 4-4 4" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span className="cl-std-breadcrumb-current">{variant.claimId}</span>
      </div>

      {/* Page Header */}
      <div className="cl-std-header">
        <div className="cl-std-header-title-row">
          <h1 className="cl-std-title">{variant.title}</h1>
          <span className={'cl-std-pill ' + variant.statusClass}>{variant.status}</span>
        </div>
        <div className="cl-std-header-meta">
          <span className="cl-std-meta-id">{variant.claimId}</span>
          <span className="cl-std-meta-date">Filed {variant.filedDate}</span>
        </div>
      </div>

      {/* Linked claim callout */}
      {variant.linkedClaim && (
        <div className="cl-std-linked-callout">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6.5 3.5h-2a2 2 0 00-2 2v5a2 2 0 002 2h2M9.5 12.5h2a2 2 0 002-2v-5a2 2 0 00-2-2h-2M5 8h6" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="cl-std-linked-callout-text">{variant.linkedClaim.label}</span>
          <Link to={`${base}/${variant.linkedClaim.kind === 'ltd' ? 'ltd' : 'std'}-claim-detail`} className="cl-std-linked-callout-link">
            View {variant.linkedClaim.kind === 'ltd' ? 'LTD' : 'STD'} Claim
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      )}

      {/* Two-column grid */}
      <div className="cl-std-grid">
        {/* Main column */}
        <div className="cl-std-main">
          {/* Payment Timeline */}
          <div className="ldb-card dt-timeline-wrap">
            <div className="ad-section-header">
              <div>
                <h3>Payment Schedule</h3>
                <p>How your disability claim provides income during your leave</p>
              </div>
              <div className="cl-std-paid-total">
                <span className="cl-std-paid-total-label">Total paid to date</span>
                <span className="cl-std-paid-total-value">{variant.totalPaid}</span>
                {variant.remaining && <span className="cl-std-paid-remaining">{variant.remaining}</span>}
              </div>
            </div>

            <p className="ad-section-helper ad-section-helper--desktop">Hover over a row to see details</p>
            <p className="ad-section-helper ad-section-helper--mobile">Tap a row to see details</p>

            <div className="dlp-timeline">
              <div className="ldb-tl-rows-wrap">
              <div className="dlp-tl-rows">
                {variant.timelineRows.map(function (item, idx) {
                  var left = '0%';
                  if (idx > 0) {
                    var offset = 0;
                    for (var j = 0; j < idx; j++) offset += variant.timelineRows[j].width;
                    left = offset + '%';
                  }
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
                        <div className="dlp-tl-seg" style={{ left: left, width: item.width + '%', background: item.accent }} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Desktop: tooltip on hover */}
              {hoveredRow && (function () {
                var allRows = variant.timelineRows;
                var hovered = allRows.find(function (r) { return r.id === hoveredRow; });
                if (!hovered) return null;
                return (
                  <div className="ad-coverage-tooltip">
                    <div className="ad-coverage-tooltip-head">
                      <div className="title">{hovered.name}</div>
                    </div>
                    <div className="ad-coverage-tooltip-grid">
                      <div>
                        <div className="label">Est. Weekly</div>
                        <div className="value">{hovered.paymentValue}</div>
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

              {/* Mobile: detail below rows */}
              {hoveredRow && (function () {
                var allRows = variant.timelineRows;
                var selected = allRows.find(function (r) { return r.id === hoveredRow; });
                if (!selected) return null;
                return (
                  <div className="dlp-tl-mobile-detail">
                    <div className="dlp-tl-mobile-detail-title">{selected.name}</div>
                    <div className="dlp-tl-mobile-detail-grid">
                      <div>
                        <div className="dlp-tl-mobile-detail-label">Est. Weekly</div>
                        <div className="dlp-tl-mobile-detail-value">{selected.paymentValue}</div>
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
                  {Array.from({ length: variant.weekCount }, function (_, i) {
                    return <div key={i} className="dlp-tl-week-tick"><span className="dlp-tl-week-num">{i + 1}</span></div>;
                  })}
                </div>
              </div>
              <div className="dlp-tl-months">
                {variant.months.map(function (m) { return <span key={m}>{m}</span>; })}
              </div>

              <div className="dlp-legend">
                {variant.legend.map(function (item) {
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

          {/* Claim Details Card */}
          <div className="cl-std-card">
            <h2 className="cl-std-card-title">Claim Details</h2>

            <div className="cl-std-details-subcard">
              <div className="cl-std-details-grid">
                <div className="cl-std-field">
                  <span className="cl-std-field-label">Claim Number</span>
                  <span className="cl-std-field-value">{variant.claimNumber}</span>
                </div>
                <div className="cl-std-field">
                  <span className="cl-std-field-label">Policy</span>
                  <span className="cl-std-field-value">{variant.policy}</span>
                </div>
                <div className="cl-std-field">
                  <span className="cl-std-field-label">Diagnosis</span>
                  <span className="cl-std-field-value">{variant.diagnosis}</span>
                </div>
                <div className="cl-std-field">
                  <span className="cl-std-field-label">Leave Start</span>
                  <span className="cl-std-field-value">{variant.leaveStart}</span>
                </div>
                <div className="cl-std-field">
                  <span className="cl-std-field-label">Benefits Begin</span>
                  <span className="cl-std-field-value">{variant.benefitsBegin}</span>
                </div>
                <div className="cl-std-field">
                  <span className="cl-std-field-label">Expected RTW</span>
                  <span className="cl-std-field-value">{variant.expectedRTW}</span>
                </div>
                <div className="cl-std-field cl-std-field--border-bottom">
                  <span className="cl-std-field-label">Max Benefit Duration</span>
                  <span className="cl-std-field-value">{variant.maxDuration}</span>
                </div>
                <div className="cl-std-field cl-std-field--border-bottom">
                  <span className="cl-std-field-label">Weeks Remaining</span>
                  <span className="cl-std-field-value">{variant.weeksRemaining}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Associated Payments Card */}
          <div className="cl-std-card">
            <h2 className="cl-std-card-title">Associated Payments</h2>
            <p className="cl-std-card-subtitle">Bi-weekly payments via direct deposit. Net of federal &amp; state tax withholding.</p>

            <div className="cl-std-payments-grid">
              <div className="cl-std-field">
                <span className="cl-std-field-label">Most Recent Payment</span>
                <span className="cl-std-field-value">$1,036.59</span>
              </div>
              <div className="cl-std-field">
                <span className="cl-std-field-label">Total Paid to Date</span>
                <span className="cl-std-field-value">$6,219.51</span>
              </div>
              <div className="cl-std-field">
                <span className="cl-std-field-label">Expected Next Payment</span>
                <span className="cl-std-field-value">Jul 26, 2024</span>
              </div>
              <div className="cl-std-field">
                <span className="cl-std-field-label">Expected Weekly Benefit</span>
                <span className="cl-std-field-value">$1,036.59</span>
              </div>
            </div>

            <div className="cl-std-card-action">
              <Link to={`${base}/payments`} className="cl-std-btn-primary">View All Payments</Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="cl-std-sidebar">
          {/* Items Requiring Action */}
          <div className="cl-std-sidebar-card cl-std-sidebar-card--action">
            <div className="cl-std-sidebar-header">
              <h2 className="cl-std-sidebar-title">Items Requiring Action</h2>
              <span className="cl-std-needed-count">1 Needed</span>
            </div>

            <div className="cl-std-action-item">
              <div className="cl-std-action-item-row">
                <svg className="cl-std-action-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#dc2626"/>
                  <path d="M12 8v4M12 16h.01" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <div className="cl-std-action-text">
                  <span className="cl-std-action-title">Upload Medical Certification</span>
                  <span className="cl-std-action-desc">Due Jul 25 &middot; Required to continue benefits past Aug 3</span>
                </div>
                <button className="cl-std-btn-upload">Upload</button>
              </div>
            </div>

            <button
              className="cl-std-completed-toggle"
              onClick={() => setCompletedExpanded(!completedExpanded)}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: completedExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
                <path d="M4 2l4 4-4 4" stroke="#105fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              +2 Completed
            </button>

            {completedExpanded && (
              <div className="cl-std-completed-list">
                <div className="cl-std-completed-item">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" fill="#1fa668"/>
                    <path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Initial medical documentation submitted</span>
                </div>
                <div className="cl-std-completed-item">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" fill="#1fa668"/>
                    <path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Employer verification received</span>
                </div>
              </div>
            )}
          </div>

          {/* Claim Status */}
          <div className="cl-std-sidebar-card">
            <div className="cl-std-sidebar-header">
              <h2 className="cl-std-sidebar-title">Claim Status</h2>
              <span className="cl-std-pill cl-std-pill--approved">
                <span className="cl-std-pill-dot cl-std-pill-dot--green"></span>
                Approved
              </span>
            </div>
            <p className="cl-std-status-since">Since May 10, 2024</p>

            <div className="cl-std-status-list">
              <div className="cl-std-status-item">
                <svg className="cl-std-status-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#1fa668"/>
                  <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="cl-std-status-text">
                  <span className="cl-std-status-title">Claim Filed</span>
                  <span className="cl-std-status-date">May 4, 2024</span>
                </div>
              </div>
              <div className="cl-std-status-item">
                <svg className="cl-std-status-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#1fa668"/>
                  <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="cl-std-status-text">
                  <span className="cl-std-status-title">Documentation Received</span>
                  <span className="cl-std-status-date">May 7, 2024</span>
                </div>
              </div>
              <div className="cl-std-status-item">
                <svg className="cl-std-status-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#1fa668"/>
                  <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="cl-std-status-text">
                  <span className="cl-std-status-title">Claim Approved</span>
                  <span className="cl-std-status-date">May 10, 2024</span>
                  <span className="cl-std-status-note">7-day elimination period waived.</span>
                </div>
              </div>
              <div className="cl-std-status-item">
                <svg className="cl-std-status-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#1fa668"/>
                  <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="cl-std-status-text">
                  <span className="cl-std-status-title">Benefits In Payment</span>
                  <span className="cl-std-status-date">Since May 11, 2024</span>
                  <span className="cl-std-status-note">Next payment Jul 26.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Documents & EOBs */}
          <div className="cl-std-sidebar-card cl-std-sidebar-card--docs">
            <h2 className="cl-std-sidebar-title">Documents &amp; EOBs</h2>

            <div className="cl-std-doc-list">
              <div className="cl-std-doc-item">
                <div className="cl-std-doc-info">
                  <span className="cl-std-doc-name">Explanation of Benefits — Jul 12</span>
                  <span className="cl-std-doc-meta">PDF &middot; Generated Jul 12, 2024</span>
                </div>
                <button className="cl-std-doc-download">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v8M8 10l-3-3M8 10l3-3" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 13h10" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <div className="cl-std-doc-item">
                <div className="cl-std-doc-info">
                  <span className="cl-std-doc-name">Explanation of Benefits — Jun 28</span>
                  <span className="cl-std-doc-meta">PDF &middot; Generated Jun 28, 2024</span>
                </div>
                <button className="cl-std-doc-download">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v8M8 10l-3-3M8 10l3-3" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 13h10" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <div className="cl-std-doc-item">
                <div className="cl-std-doc-info">
                  <span className="cl-std-doc-name">Explanation of Benefits — Jun 14</span>
                  <span className="cl-std-doc-meta">PDF &middot; Generated Jun 14, 2024</span>
                </div>
                <button className="cl-std-doc-download">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v8M8 10l-3-3M8 10l3-3" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 13h10" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
