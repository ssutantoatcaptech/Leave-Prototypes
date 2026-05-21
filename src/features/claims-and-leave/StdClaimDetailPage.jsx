import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useBasePath from './useBasePath';
import '../leave-detail/leave-detail-b.css';
import '../absence-details/absence-details-react.css';

var CLAIM_VARIANTS = {
  std: {
    title: 'Short-Term Disability (STD) Claim',
    status: 'Pending',
    statusClass: 'cl-std-pill--pending',
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
  const [detailTab, setDetailTab] = useState('status');

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

      {/* Tabbed layout */}
      <div className="ldb-v2-layout">
        <div className="ldb-v2-main">
          {/* Tabs (desktop) + Dropdown (mobile) */}
          <div className="ldb-detail-tabs-wrapper">
            <div className="ldb-detail-tabs">
              <button type="button" className={'ldb-detail-tab' + (detailTab === 'status' ? ' active' : '')} onClick={function () { setDetailTab('status'); }}>Status Tracker</button>
              <button type="button" className={'ldb-detail-tab' + (detailTab === 'coverage' ? ' active' : '')} onClick={function () { setDetailTab('coverage'); }}>Coverage & Benefits</button>
              <button type="button" className={'ldb-detail-tab' + (detailTab === 'details' ? ' active' : '')} onClick={function () { setDetailTab('details'); }}>Claim Details</button>
              <button type="button" className={'ldb-detail-tab' + (detailTab === 'activity' ? ' active' : '')} onClick={function () { setDetailTab('activity'); }}>Communications & Activity</button>
            </div>
            <div className="ldb-detail-dropdown-mobile">
              <select
                value={detailTab}
                onChange={function (e) { setDetailTab(e.target.value); }}
                style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 14, fontWeight: 600, color: '#1e293b', padding: '10px 36px 10px 14px', border: '1px solid #d1d5db', borderRadius: 8, background: '#fff url("data:image/svg+xml,%3Csvg width=\'12\' height=\'8\' viewBox=\'0 0 12 8\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1.5L6 6.5L11 1.5\' stroke=\'%236b7280\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E") no-repeat right 12px center', appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer', width: '100%' }}
              >
                <option value="status">Status Tracker</option>
                <option value="coverage">Coverage & Benefits</option>
                <option value="details">Claim Details</option>
                <option value="activity">Communications & Activity</option>
              </select>
            </div>
          </div>

          {/* Tab: Status Tracker */}
          {detailTab === 'status' && (
            <div className="ldb-card ldb-status-tracker">
              <div className="ldb-st-header">
                <h2 className="ldb-card-title" style={{ marginBottom: 0 }}>Status Tracker</h2>
                <span className="ldb-st-attention-badge">1 item needs attention</span>
              </div>

              <div className="cl-std-stepper">
                <div className="cl-std-step cl-std-step--completed">
                  <div className="cl-std-step-icon">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="#1fa668"/><path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div className="cl-std-step-content">
                    <span className="cl-std-step-title">Claim Filed</span>
                    <span className="cl-std-step-desc">{variant.filedDate}</span>
                  </div>
                </div>
                <div className="cl-std-step cl-std-step--completed">
                  <div className="cl-std-step-icon">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="#1fa668"/><path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div className="cl-std-step-content">
                    <span className="cl-std-step-title">Employer Verification</span>
                    <span className="cl-std-step-desc">Received and confirmed</span>
                  </div>
                </div>
                <div className="cl-std-step cl-std-step--active">
                  <div className="cl-std-step-icon">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="#dc2626"/><path d="M7 4.5v3M7 9.5h.01" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                  <div className="cl-std-step-content">
                    <span className="cl-std-step-title">Upload Medical Certification</span>
                    <span className="cl-std-step-desc">Due Jul 25 &middot; Required to continue benefits past Aug 3</span>
                    <button className="cl-std-btn-upload" style={{ marginTop: 8 }}>Upload Document</button>
                  </div>
                </div>
                <div className="cl-std-step cl-std-step--upcoming">
                  <div className="cl-std-step-icon">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#d1d5db" strokeWidth="1.5" fill="none"/></svg>
                  </div>
                  <div className="cl-std-step-content">
                    <span className="cl-std-step-title">Claim Decision</span>
                    <span className="cl-std-step-desc">Pending medical review</span>
                  </div>
                </div>
                <div className="cl-std-step cl-std-step--upcoming">
                  <div className="cl-std-step-icon">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#d1d5db" strokeWidth="1.5" fill="none"/></svg>
                  </div>
                  <div className="cl-std-step-content">
                    <span className="cl-std-step-title">Return to Work</span>
                    <span className="cl-std-step-desc">Expected {variant.expectedRTW}</span>
                  </div>
                </div>
              </div>

              {/* Completed items */}
              <button
                className="cl-std-completed-toggle"
                onClick={() => setCompletedExpanded(!completedExpanded)}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: completedExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
                  <path d="M4 2l4 4-4 4" stroke="#105fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                +2 Completed items
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
          )}

          {/* Tab: Coverage & Benefits */}
          {detailTab === 'coverage' && (
            <div className="ldb-card dt-timeline-wrap">
              <div className="ad-section-header">
                <div>
                  <h3>Payment Schedule</h3>
                  <p>How your disability claim provides income during your leave</p>
                </div>
              </div>

              <div className="cl-std-payment-summary-mobile">
                <div className="cl-std-payment-summary-item cl-std-payment-summary-item--green">
                  <div className="cl-std-payment-summary-label">Total Paid</div>
                  <div className="cl-std-payment-summary-value cl-std-payment-summary-value--green">{variant.totalPaid}</div>
                </div>
                <div className="cl-std-payment-summary-item">
                  <div className="cl-std-payment-summary-label">{variant.remaining ? 'Remaining' : 'Status'}</div>
                  <div className="cl-std-payment-summary-value">{variant.remaining || 'Exhausted'}</div>
                </div>
              </div>

              <div className="cl-std-v3-timeline-cards">
                {variant.timelineRows.map(function (item) {
                  var isExpanded = hoveredRow === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={function () { setHoveredRow(isExpanded ? null : item.id); }}
                      className={'cl-std-v3-card' + (isExpanded ? ' cl-std-v3-card--expanded' : '')}
                      style={{ borderColor: isExpanded ? item.accent : undefined }}
                      aria-expanded={isExpanded}
                    >
                      <div className="cl-std-v3-card-top">
                        <div className="cl-std-v3-card-name-row">
                          <span className="cl-std-v3-card-dot" style={{ background: item.accent }} />
                          <span className="cl-std-v3-card-name">{item.name}</span>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', flexShrink: 0 }}><path d="M4 6l4 4 4-4" stroke="#737373" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <div className="cl-std-v3-card-bar">
                        <div className="cl-std-v3-card-bar-fill" style={{ width: item.width + '%', background: item.accent }} />
                      </div>
                      <span className="cl-std-v3-card-meta">{item.weeks} &middot; {item.range}</span>
                      {isExpanded && (
                        <div className="cl-std-v3-card-details">
                          <div className="cl-std-v3-card-detail-field">
                            <span className="cl-std-v3-card-detail-label">Est. Weekly</span>
                            <span className="cl-std-v3-card-detail-value">{item.paymentValue}</span>
                          </div>
                          <div className="cl-std-v3-card-detail-field">
                            <span className="cl-std-v3-card-detail-label">Duration</span>
                            <span className="cl-std-v3-card-detail-value">{item.weeks}</span>
                          </div>
                          <div className="cl-std-v3-card-detail-field cl-std-v3-card-detail-field--full">
                            <span className="cl-std-v3-card-detail-label">Pay</span>
                            <span className="cl-std-v3-card-detail-value">{item.pay}</span>
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="cl-std-card" style={{ marginTop: 24 }}>
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
          )}

          {/* Tab: Claim Details */}
          {detailTab === 'details' && (
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
                  <div className="cl-std-field">
                    <span className="cl-std-field-label">Max Benefit Duration</span>
                    <span className="cl-std-field-value">{variant.maxDuration}</span>
                  </div>
                  <div className="cl-std-field">
                    <span className="cl-std-field-label">Weeks Remaining</span>
                    <span className="cl-std-field-value">{variant.weeksRemaining}</span>
                  </div>
                </div>
              </div>

              <div className="cl-std-details-subcard" style={{ marginTop: 20 }}>
                <h3 className="cl-std-card-title" style={{ fontSize: 15, marginBottom: 12 }}>Key Contacts</h3>
                <div className="cl-std-details-grid">
                  <div className="cl-std-field">
                    <span className="cl-std-field-label">Claims Examiner</span>
                    <span className="cl-std-field-value">Sarah Mitchell</span>
                  </div>
                  <div className="cl-std-field">
                    <span className="cl-std-field-label">Phone</span>
                    <span className="cl-std-field-value">1-800-555-0142</span>
                  </div>
                  <div className="cl-std-field">
                    <span className="cl-std-field-label">Email</span>
                    <span className="cl-std-field-value">s.mitchell@benefits.com</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Communications & Activity */}
          {detailTab === 'activity' && (
            <div className="ldb-card">
              <h2 className="ldb-card-title">Communications & Activity</h2>

              <div className="cl-std-activity-timeline">
                <div className="cl-std-activity-item">
                  <div className="cl-std-activity-dot cl-std-activity-dot--info" />
                  <div className="cl-std-activity-content">
                    <span className="cl-std-activity-date">May 15, 2026</span>
                    <span className="cl-std-activity-text">Reminder sent: Medical certification due Jul 25</span>
                  </div>
                </div>
                <div className="cl-std-activity-item">
                  <div className="cl-std-activity-dot cl-std-activity-dot--success" />
                  <div className="cl-std-activity-content">
                    <span className="cl-std-activity-date">Mar 20, 2026</span>
                    <span className="cl-std-activity-text">Payment issued — $1,036.59 via direct deposit</span>
                  </div>
                </div>
                <div className="cl-std-activity-item">
                  <div className="cl-std-activity-dot cl-std-activity-dot--success" />
                  <div className="cl-std-activity-content">
                    <span className="cl-std-activity-date">Mar 06, 2026</span>
                    <span className="cl-std-activity-text">Payment issued — $1,036.59 via direct deposit</span>
                  </div>
                </div>
                <div className="cl-std-activity-item">
                  <div className="cl-std-activity-dot cl-std-activity-dot--success" />
                  <div className="cl-std-activity-content">
                    <span className="cl-std-activity-date">Feb 20, 2026</span>
                    <span className="cl-std-activity-text">Employer verification received and confirmed</span>
                  </div>
                </div>
                <div className="cl-std-activity-item">
                  <div className="cl-std-activity-dot" />
                  <div className="cl-std-activity-content">
                    <span className="cl-std-activity-date">Feb 12, 2026</span>
                    <span className="cl-std-activity-text">Initial medical documentation submitted</span>
                  </div>
                </div>
                <div className="cl-std-activity-item">
                  <div className="cl-std-activity-dot" />
                  <div className="cl-std-activity-content">
                    <span className="cl-std-activity-date">{variant.filedDate}</span>
                    <span className="cl-std-activity-text">Claim filed — {variant.claimId}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
