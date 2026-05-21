import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './leave-detail-b.css';

export default function LeaveDetailPregnancyPage() {
  var location = useLocation();
  var isMobile = location.pathname.startsWith('/claims-and-leave-mobile');
  var base = isMobile ? '/claims-and-leave-mobile' : '/claims-and-leave';
  var navigate = useNavigate();
  var [activeTab, setActiveTab] = useState('status');
  var [timelineView, setTimelineView] = useState('payment');
  var [hoveredRow, setHoveredRow] = useState(null);
  var [expandedClaims, setExpandedClaims] = useState({ absence: true });

  function toggleClaim(key) {
    setExpandedClaims(function (prev) {
      var next = Object.assign({}, prev);
      next[key] = !next[key];
      return next;
    });
  }

  var tabs = [
    { key: 'status', label: 'Status' },
    { key: 'claims', label: 'Claims & Benefits' },
    { key: 'payments', label: 'Payments' },
    { key: 'details', label: 'Case Details' },
    { key: 'activity', label: 'Communications Activity' },
  ];

  function renderSidebar() {
    return (
      <div className="ldb-sidebar">
        <div className="ldb-side-card ldb-side-card--shadow">
          <h3 className="ldb-side-title">Quick Links</h3>
          <div className="ldb-quick-actions-list">
            <button type="button" className="ldb-quick-action-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>Enter Time</span>
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="ldb-quick-action-chevron"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button type="button" className="ldb-quick-action-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.2"/><path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              <span>Request ADA Accommodation</span>
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="ldb-quick-action-chevron"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button type="button" className="ldb-quick-action-item" onClick={function () { navigate(base + '/case-detail-pregnancy/return-to-work'); }}>
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
              <span>Message Claims Specialist</span>
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="ldb-quick-action-chevron"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>

        <div className="ldb-side-card">
          <h3 className="ldb-side-title">Leave Snapshot</h3>
          <div className="ldb-snapshot-fields">
            <div className="ldb-snapshot-field">
              <div className="ldb-snapshot-field-label">START DATE</div>
              <div className="ldb-snapshot-field-value">March 1, 2025</div>
            </div>
            <div className="ldb-snapshot-field">
              <div className="ldb-snapshot-field-label">END DATE</div>
              <div className="ldb-snapshot-field-value">April 25, 2025</div>
            </div>
            <div className="ldb-snapshot-field">
              <div className="ldb-snapshot-field-label">RETURN DATE</div>
              <div className="ldb-snapshot-field-value">April 26, 2025</div>
            </div>
          </div>
        </div>

        <div className="ldb-side-card">
          <h3 className="ldb-side-title">Uploaded Documents</h3>
          <div className="ldb-doc-list">
            <div className="ldb-doc-item">
              <div className="ldb-doc-info">
                <div className="ldb-doc-name">Medical_Certification.pdf</div>
                <div className="ldb-doc-meta">Uploaded on Jul 29, 2024</div>
              </div>
              <button type="button" className="ldb-doc-download-btn" aria-label="Download">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 4v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M4.5 9.5L8 13l3.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div className="ldb-doc-item">
              <div className="ldb-doc-info">
                <div className="ldb-doc-name">Attending_Physician_Statement.pdf</div>
                <div className="ldb-doc-meta">Uploaded on Jul 29, 2024</div>
              </div>
              <button type="button" className="ldb-doc-download-btn" aria-label="Download">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 4v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M4.5 9.5L8 13l3.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderStatusTab() {
    return (
      <div className="ldb-card ldb-status-card">
        <div className="ldb-status-card-header">
          <h2 className="ldb-card-title">Status Tracker</h2>
          <span className="ldb-status-remaining-badge">5 Task Results Remaining</span>
        </div>
        <div className="ldb-status-tracker">
          {/* Step 1: Complete */}
          <div className="ldb-status-step ldb-status-step--complete">
            <div className="ldb-status-step-line-wrap">
              <div className="ldb-status-step-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" fill="#105fa8"/><path d="M7 12l3.5 3.5 6.5-6.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="ldb-status-step-line ldb-status-step-line--filled"></div>
            </div>
            <div className="ldb-status-step-content">
              <div className="ldb-status-step-header">
                <span className="ldb-status-step-title">Leave Request Submitted — Case NTN 17892</span>
                <span className="ldb-status-step-date">Completed: Jul 15, 2024</span>
              </div>
              <p className="ldb-status-step-desc">You have successfully submitted a new leave request to Mutual of Omaha. Associated claims will be filed.</p>
              <div className="ldb-status-step-meta">File closed NTN 87M 500 43.10</div>
              <div className="ldb-status-step-meta">STD Benefit NTN 5747 500 42.12</div>
            </div>
          </div>

          {/* Step 2: Active */}
          <div className="ldb-status-step ldb-status-step--active">
            <div className="ldb-status-step-line-wrap">
              <div className="ldb-status-step-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10.5" stroke="#105fa8" strokeWidth="1.5" fill="#fff"/><circle cx="12" cy="12" r="5" fill="#105fa8"/></svg>
              </div>
              <div className="ldb-status-step-line"></div>
            </div>
            <div className="ldb-status-step-content">
              <div className="ldb-status-step-header">
                <span className="ldb-status-step-title">Complete Medical Certification</span>
                <span className="ldb-status-step-date">Due Jul 30, 2024</span>
              </div>
              <p className="ldb-status-step-desc">Have your healthcare provider complete the required medical certification form.</p>
              <div className="ldb-status-step-actions">
                <button type="button" className="ldb-status-action-btn ldb-status-action-btn--outline">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 12V4M8 4l-3.5 3.5M8 4l3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  Download
                </button>
                <button type="button" className="ldb-status-action-btn ldb-status-action-btn--primary">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 4v8M8 4l-3.5 3.5M8 4l3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  Upload
                </button>
              </div>
              <div className="ldb-status-step-upload-hint">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 4v8M8 4l-3 3M8 4l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Upload completed form
              </div>
            </div>
          </div>

          {/* Step 3: Pending */}
          <div className="ldb-status-step ldb-status-step--pending">
            <div className="ldb-status-step-line-wrap">
              <div className="ldb-status-step-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10.5" stroke="#d4d4d8" strokeWidth="1.5" fill="#fff"/></svg>
              </div>
              <div className="ldb-status-step-line"></div>
            </div>
            <div className="ldb-status-step-content">
              <div className="ldb-status-step-header">
                <span className="ldb-status-step-title">Confirm Child&rsquo;s Arrival</span>
                <span className="ldb-status-step-date-muted">Confirm birth date</span>
              </div>
              <p className="ldb-status-step-desc">Notify us when your child is born to activate the bonding portion of your leave.</p>
            </div>
          </div>

          {/* Step 4: Pending */}
          <div className="ldb-status-step ldb-status-step--pending">
            <div className="ldb-status-step-line-wrap">
              <div className="ldb-status-step-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10.5" stroke="#d4d4d8" strokeWidth="1.5" fill="#fff"/></svg>
              </div>
              <div className="ldb-status-step-line"></div>
            </div>
            <div className="ldb-status-step-content">
              <div className="ldb-status-step-header">
                <span className="ldb-status-step-title">File your California EDD bonding claim</span>
                <span className="ldb-status-step-date-muted">Start EDD</span>
              </div>
              <p className="ldb-status-step-desc">Apply to file your own your EDD bonding claim.</p>
              <div className="ldb-status-step-sub-card">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 2h10v10M14 2L2 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>California Benefit Portal</span>
              </div>
            </div>
          </div>

          {/* Step 5: Pending */}
          <div className="ldb-status-step ldb-status-step--pending ldb-status-step--last">
            <div className="ldb-status-step-line-wrap">
              <div className="ldb-status-step-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10.5" stroke="#d4d4d8" strokeWidth="1.5" fill="#fff"/></svg>
              </div>
            </div>
            <div className="ldb-status-step-content">
              <div className="ldb-status-step-header">
                <span className="ldb-status-step-title">Confirm Return to Work Date</span>
              </div>
              <p className="ldb-status-step-desc">Notify us when your child is born to activate the bonding portion of your leave.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderClaimsBenefitsTab() {
    return (
      <>
        <div className="ldb-card dt-timeline-wrap">
          <h2 className="ldb-card-title" style={{ marginBottom: 4 }}>Benefit Timeline</h2>
          <p style={{ fontSize: 14, color: '#525252', margin: '0 0 20px' }}>How your claims provide protection and income over time.<br/>Hover over a benefit to see details.</p>
          <div className="dt-tl-toggle">
            <button type="button" className={timelineView === 'payment' ? 'active' : ''} onClick={function () { setTimelineView('payment'); }}>Payment</button>
            <button type="button" className={timelineView === 'protection' ? 'active' : ''} onClick={function () { setTimelineView('protection'); }}>Protection</button>
          </div>

          <div className="dlp-timeline">
            <div className="dlp-tl-header-row">
              <span className="dlp-tl-header-label">COVERAGE</span>
              <div className="dlp-tl-header-months">
                <span>APR</span>
                <span>MAY</span>
                <span>JUN</span>
                <span>JUL</span>
              </div>
            </div>
            <div className="ldb-tl-rows-wrap">
              <div className="dlp-tl-rows">
                {(timelineView === 'payment' ? [
                  { id: 'std', label: 'STD', width: 50, accent: '#105fa8', name: 'Group Disability Claim (STD)', weeks: '8 weeks', range: 'Mar 1 – Apr 25, 2025', pay: '60% salary', status: 'Approved', paymentValue: '~$1,923/wk' },
                ] : [
                  { id: 'fmla', label: 'FMLA', width: 85, accent: '#003a70', name: 'Leave Case — FMLA (Intermittent)', weeks: '12 weeks', range: 'Mar 1 – Jun 30, 2025', pay: 'Job protection (unpaid)', status: 'Approved' },
                  { id: 'std', label: 'STD', width: 50, accent: '#105fa8', name: 'Group Disability Claim (STD)', weeks: '8 weeks', range: 'Mar 1 – Apr 25, 2025', pay: '60% salary', status: 'Approved' },
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
                        <div className="dlp-tl-seg" style={{ left: '0%', width: item.width + '%', background: item.accent }}>
                          <span>{item.label}</span>
                          <span className="dlp-tl-weeks">{item.weeks}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {hoveredRow && (function () {
                var allRows = timelineView === 'payment' ? [
                  { id: 'std', name: 'Group Disability Claim (STD)', weeks: '8 weeks', range: 'Mar 1 – Apr 25, 2025', pay: '60% salary', status: 'Approved', paymentValue: '~$1,923/wk' },
                ] : [
                  { id: 'fmla', name: 'Leave Case — FMLA (Intermittent)', weeks: '12 weeks', range: 'Mar 1 – Jun 30, 2025', pay: 'Job protection (unpaid)', status: 'Approved' },
                  { id: 'std', name: 'Group Disability Claim (STD)', weeks: '8 weeks', range: 'Mar 1 – Apr 25, 2025', pay: '60% salary', status: 'Approved' },
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
                { id: 'std-pay', label: 'STD (60%)', accent: '#105fa8' },
                { id: 'unpaid', label: 'Unpaid', accent: '#cbd5e1' },
              ] : [
                { id: 'fmla', label: 'FMLA Protection', accent: '#003a70' },
                { id: 'std', label: 'STD Recovery', accent: '#105fa8' },
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
                <div className="dt-payment-summary-title">ESTIMATED TOTAL INCOME DURING LEAVE</div>
                <div className="dt-payment-summary-value">$21,003</div>
                <div className="dt-payment-summary-note">STD ($15,533,000) · Based on current salary · Actual amounts may vary</div>
              </div>
            )}
          </div>
        </div>

        <div className="ldb-card">
          <h2 className="ldb-card-title" style={{ marginBottom: 20 }}>Associated Claims</h2>

          <div className="ldb-claim-accordion">
            <button type="button" className={'ldb-claim-accordion-header' + (expandedClaims.absence ? ' expanded' : '')} onClick={function () { toggleClaim('absence'); }}>
              <div className="ldb-claim-accordion-left">
                <svg className="ldb-claim-accordion-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div>
                  <div className="ldb-claim-accordion-title-wrap">
                    <span className="ldb-claim-accordion-title">Leave Case — FMLA (Intermittent)</span>
                    <span className="ldb-claim-status ldb-claim-status--inline" style={{ background: '#f0fdf4', color: '#166534' }}>Approved</span>
                  </div>
                  <div className="ldb-claim-accordion-sub">CLM 12345-ABS · Intermittent FMLA — job protection &amp; RTW tracking</div>
                </div>
              </div>
              <span className="ldb-claim-status ldb-claim-status--end" style={{ background: '#f0fdf4', color: '#166534' }}>Approved</span>
            </button>
            {expandedClaims.absence && (
              <div className="ldb-claim-accordion-body">
                <div className="dt-info-grid">
                  <div>
                    <div className="dt-info-field-label">CLAIM ID</div>
                    <div className="dt-info-field-value">CLM 12345-ABS</div>
                  </div>
                  <div>
                    <div className="dt-info-field-label">LEAVE TYPE</div>
                    <div className="dt-info-field-value">Intermittent</div>
                  </div>
                  <div>
                    <div className="dt-info-field-label">FMLA ELIGIBLE</div>
                    <div className="dt-info-field-value">Yes — 12 weeks approved</div>
                  </div>
                  <div>
                    <div className="dt-info-field-label">FMLA USED</div>
                    <div className="dt-info-field-value">6 weeks, 3 days</div>
                  </div>
                  <div>
                    <div className="dt-info-field-label">JOB PROTECTION</div>
                    <div className="dt-info-field-value">Active through Jul 08, 2025</div>
                  </div>
                  <div>
                    <div className="dt-info-field-label">RTW DATE</div>
                    <div className="dt-info-field-value">July 5, 2025</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="ldb-claim-accordion">
            <button type="button" className={'ldb-claim-accordion-header' + (expandedClaims.disability ? ' expanded' : '')} onClick={function () { toggleClaim('disability'); }}>
              <div className="ldb-claim-accordion-left">
                <svg className="ldb-claim-accordion-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div>
                  <div className="ldb-claim-accordion-title-wrap">
                    <span className="ldb-claim-accordion-title">Group Disability Claim</span>
                    <span className="ldb-claim-status ldb-claim-status--inline" style={{ background: '#f0fdf4', color: '#166534' }}>Approved</span>
                  </div>
                  <div className="ldb-claim-accordion-sub">CLM 12345-GDC · STD Benefit — Income replacement at 60% of earnings</div>
                </div>
              </div>
              <span className="ldb-claim-status ldb-claim-status--end" style={{ background: '#f0fdf4', color: '#166534' }}>Approved</span>
            </button>
            {expandedClaims.disability && (
              <div className="ldb-claim-accordion-body">
                <div className="dt-info-grid">
                  <div>
                    <div className="dt-info-field-label">Claim ID</div>
                    <div className="dt-info-field-value">CLM 12345-GDC</div>
                  </div>
                  <div>
                    <div className="dt-info-field-label">Benefit Type</div>
                    <div className="dt-info-field-value">Short-Term Disability (STD)</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="ldb-claim-accordion">
            <button type="button" className={'ldb-claim-accordion-header' + (expandedClaims.supplemental ? ' expanded' : '')} onClick={function () { toggleClaim('supplemental'); }}>
              <div className="ldb-claim-accordion-left">
                <svg className="ldb-claim-accordion-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div>
                  <div className="ldb-claim-accordion-title-wrap">
                    <span className="ldb-claim-accordion-title">Supplemental Health Claim</span>
                    <span className="ldb-claim-status ldb-claim-status--inline" style={{ background: '#fef3c7', color: '#92400e' }}>Pending</span>
                  </div>
                  <div className="ldb-claim-accordion-sub">NTN 5511 SC 63 · Hospital Indemnity — Flat cash benefit for inpatient stays</div>
                </div>
              </div>
              <span className="ldb-claim-status ldb-claim-status--end" style={{ background: '#fef3c7', color: '#92400e' }}>Under Review</span>
            </button>
            {expandedClaims.supplemental && (
              <div className="ldb-claim-accordion-body">
                <div className="dt-info-grid">
                  <div>
                    <div className="dt-info-field-label">Claim ID</div>
                    <div className="dt-info-field-value">NTN 5511 SC 63</div>
                  </div>
                  <div>
                    <div className="dt-info-field-label">Benefit Type</div>
                    <div className="dt-info-field-value">Hospital Indemnity</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="ldb-claim-accordion">
            <button type="button" className={'ldb-claim-accordion-header' + (expandedClaims.stateleave ? ' expanded' : '')} onClick={function () { toggleClaim('stateleave'); }}>
              <div className="ldb-claim-accordion-left">
                <svg className="ldb-claim-accordion-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div>
                  <div className="ldb-claim-accordion-title-wrap">
                    <span className="ldb-claim-accordion-title">State Paid Leave — NJ TDI</span>
                    <span className="ldb-claim-status ldb-claim-status--inline" style={{ background: '#ecfdf5', color: '#065f46' }}>Active</span>
                  </div>
                  <div className="ldb-claim-accordion-sub">NTN 5511 STL 83 · NJ Temporary Disability Insurance — state-funded income replacement</div>
                </div>
              </div>
              <span className="ldb-claim-status ldb-claim-status--end" style={{ background: '#ecfdf5', color: '#065f46' }}>Active</span>
            </button>
            {expandedClaims.stateleave && (
              <div className="ldb-claim-accordion-body">
                <div className="dt-info-grid">
                  <div>
                    <div className="dt-info-field-label">Claim ID</div>
                    <div className="dt-info-field-value">NTN 5511 STL 83</div>
                  </div>
                  <div>
                    <div className="dt-info-field-label">Program</div>
                    <div className="dt-info-field-value">NJ Temporary Disability Insurance (TDI)</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="ldb-card ldb-additional-benefits">
          <h2 className="ldb-card-title">Additional Benefits</h2>
          <div className="ldb-additional-info">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#105fa8" strokeWidth="1.2"/><path d="M8 7v4M8 5v.5" stroke="#105fa8" strokeWidth="1.3" strokeLinecap="round"/></svg>
            <span>You may still need to apply for state benefits on your state site.</span>
          </div>
          <div className="ldb-additional-benefit-item">
            <div>
              <div className="ldb-additional-benefit-title">CA State Disability Insurance</div>
              <div className="ldb-additional-benefit-desc">Apply through your state benefits portal to determine eligibility.</div>
            </div>
            <div className="ldb-additional-benefit-action">
              <span className="ldb-additional-benefit-source">Potential Payment Source</span>
              <button type="button" className="ldb-additional-benefit-btn">Learn More
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 2h10v10M14 2L2 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
          <div className="ldb-additional-benefit-item">
            <div>
              <div className="ldb-additional-benefit-title">CA State Disability Insurance</div>
              <div className="ldb-additional-benefit-desc">May provide wage replacement during family care or bonding time.</div>
            </div>
            <div className="ldb-additional-benefit-action">
              <span className="ldb-additional-benefit-source">Potential Payment Source</span>
              <button type="button" className="ldb-additional-benefit-btn">Learn More
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 2h10v10M14 2L2 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  function renderPaymentsTab() {
    var payments = [
      { date: 'Feb Apr 5, 2025', period: 'Mar 20 – Apr 4, 2025', amount: '$2,456.89' },
      { date: 'Feb Mar 26, 2025', period: 'Mar 6 – Mar 19, 2025', amount: '$1,380' },
      { date: 'Feb Mar 12, 2025', period: 'Feb 20 – Mar 5, 2025', amount: '$1,380' },
      { date: 'Feb Feb 27, 2025', period: 'Feb 6 – Feb 19, 2025', amount: '$1,380' },
    ];

    return (
      <div className="ldb-card">
        <div className="ldb-payments-header">
          <h2 className="ldb-card-title">Payments</h2>
          <button type="button" className="ldb-payments-all-btn">See All Payments</button>
        </div>

        {payments.map(function (pmt, i) {
          return (
            <div key={i} className="ldb-payment-row">
              <div className="ldb-payment-row-left">
                <div className="ldb-payment-row-date">{pmt.date}</div>
                <div className="ldb-payment-row-period">{pmt.period}</div>
              </div>
              <div className="ldb-payment-row-right">
                <span className="ldb-payment-row-amount">{pmt.amount}</span>
                <button type="button" className="ldb-payment-row-btn">View Breakdown &rsaquo;</button>
              </div>
            </div>
          );
        })}

        {/* Payment Breakdown for first payment */}
        <div className="ldb-payment-breakdown">
          <h4 className="ldb-payment-breakdown-title">Payment Breakdown</h4>
          <p className="ldb-payment-breakdown-sub">Gross Pay: Bi-weekly benefit</p>
          <div className="ldb-payment-breakdown-line"><span>Gross pay for following</span><span>$2,812.52</span></div>
          <div className="ldb-payment-breakdown-line"><span>Federal tax Withholding</span><span>($83.75)</span></div>
          <div className="ldb-payment-breakdown-line"><span>State Tax Withholding</span><span>($79.28)</span></div>
          <div className="ldb-payment-breakdown-line"><span>Offset</span><span>$0.00</span></div>
          <div className="ldb-payment-breakdown-line"><span>Withholding/Deductions</span><span>$0.00</span></div>
          <div className="ldb-payment-breakdown-line ldb-payment-breakdown-total"><span>Net Amount</span><span>$2,456</span></div>
        </div>
      </div>
    );
  }

  function renderCaseDetailsTab() {
    return (
      <div className="ldb-card">
        <h2 className="ldb-card-title" style={{ marginBottom: 24 }}>Leave Details</h2>

        <div className="dt-info-block">
          <div className="dt-info-block-header">
            <h4>Contact Information</h4>
          </div>
          <div className="dt-info-grid">
            <div>
              <div className="dt-info-field-label">EMAIL</div>
              <div className="dt-info-field-value">john@email.com</div>
            </div>
            <div>
              <div className="dt-info-field-label">PHONE</div>
              <div className="dt-info-field-value">(212) 555-0167</div>
            </div>
            <div>
              <div className="dt-info-field-label">ADDRESS</div>
              <div className="dt-info-field-value">421 Oak St, Apt 3b, Suite 200, Los Gatos, CA 945450</div>
            </div>
          </div>
        </div>

        <div className="dt-info-block">
          <div className="dt-info-block-header">
            <h4>Leave Details</h4>
          </div>
          <div className="dt-info-grid">
            <div>
              <div className="dt-info-field-label">LEAVE TYPE</div>
              <div className="dt-info-field-value">Continuous</div>
            </div>
            <div>
              <div className="dt-info-field-label">LEAVE REASON</div>
              <div className="dt-info-field-value">Pregnancy</div>
            </div>
            <div>
              <div className="dt-info-field-label">START DATE</div>
              <div className="dt-info-field-value">March 1, 2025</div>
            </div>
            <div>
              <div className="dt-info-field-label">END DATE</div>
              <div className="dt-info-field-value">April 25, 2025</div>
            </div>
          </div>
        </div>

        <div className="dt-info-block">
          <div className="dt-info-block-header">
            <h4>Healthcare Provider</h4>
          </div>
          <div className="dt-info-grid">
            <div>
              <div className="dt-info-field-label">PHYSICIAN</div>
              <div className="dt-info-field-value">Dr. Smith</div>
            </div>
            <div>
              <div className="dt-info-field-label">FACILITY</div>
              <div className="dt-info-field-value">St. Luke&rsquo;s Medical Center</div>
            </div>
            <div>
              <div className="dt-info-field-label">PHONE</div>
              <div className="dt-info-field-value">(415) 555-0134</div>
            </div>
            <div>
              <div className="dt-info-field-label">ADDRESS</div>
              <div className="dt-info-field-value">1200 Healthcare Street, Unit 308, Los Gatos, CA 945450</div>
            </div>
          </div>
        </div>

        <div className="dt-info-block">
          <div className="dt-info-block-header">
            <h4>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginRight: 6, verticalAlign: 'middle' }}><circle cx="8" cy="8" r="7" stroke="#f59e0b" strokeWidth="1.2"/><path d="M8 5v3M8 10.5v.5" stroke="#f59e0b" strokeWidth="1.3" strokeLinecap="round"/></svg>
              Employer Information
            </h4>
          </div>
          <p style={{ fontSize: 13, color: '#525252', margin: '0 0 16px' }}>This information is provided by your employer. Contact your employer to make changes.</p>
          <div className="dt-info-grid">
            <div>
              <div className="dt-info-field-label">NAME</div>
              <div className="dt-info-field-value">Mark Jefferson</div>
            </div>
            <div>
              <div className="dt-info-field-label">EMP HIRE DATE</div>
              <div className="dt-info-field-value">DAP-0012-0101</div>
            </div>
            <div>
              <div className="dt-info-field-label">EMPLOYER</div>
              <div className="dt-info-field-value">Safetrust/Legal Inc.</div>
            </div>
            <div>
              <div className="dt-info-field-label">JOB TITLE</div>
              <div className="dt-info-field-value">Senior Marketing Manager</div>
            </div>
            <div>
              <div className="dt-info-field-label">WORK STATE</div>
              <div className="dt-info-field-value">New York, NY</div>
            </div>
            <div>
              <div className="dt-info-field-label">HIRE DATE</div>
              <div className="dt-info-field-value">January 15, 2022</div>
            </div>
            <div>
              <div className="dt-info-field-label">WORK ADDRESS</div>
              <div className="dt-info-field-value">160 5th Avenue, New York, NY 10451</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderCommunicationsTab() {
    var activities = [
      { date: '04/18/2016', activity: 'Employee Update', desc: 'Employee provided updated return-to-work date.', completedBy: 'Sarah Johnson', role: 'Employee' },
      { date: '04/17/2016', activity: 'Eligibility Determination', desc: 'Mutual of Omaha assessed the employee\'s hours worked with employer to determine FMLA eligibility.', completedBy: 'Mutual of Omaha', role: '' },
      { date: '04/16/2016', activity: 'Provider Outreach', desc: 'Mutual of Omaha contacted provider to verify treatment dates.', completedBy: 'Mutual of Omaha', role: '' },
      { date: '04/15/2016', activity: 'Insurance Verification', desc: 'Medical eligibility confirmed', completedBy: 'Mutual of Omaha', role: '' },
      { date: '04/15/2016', activity: 'Letter Sent', desc: 'Mutual of Omaha sent the initial leave rights and responsibilities letter to the employee.', completedBy: 'Mutual of Omaha', role: '', link: 'View responsibilities letter' },
    ];

    return (
      <div className="ldb-card">
        <table className="ldb-activity-table">
          <thead>
            <tr>
              <th>Date &amp; Time</th>
              <th>Activity</th>
              <th>Completed By</th>
            </tr>
          </thead>
          <tbody>
            {activities.map(function (act, i) {
              return (
                <tr key={i}>
                  <td className="ldb-activity-date">{act.date}</td>
                  <td>
                    <div className="ldb-activity-name">{act.activity}</div>
                    <div className="ldb-activity-desc">{act.desc}</div>
                    {act.link && <a href="#" className="ldb-activity-link">{act.link}</a>}
                  </td>
                  <td>
                    <div className="ldb-activity-completed">{act.completedBy}</div>
                    {act.role && <div className="ldb-activity-role">{act.role}</div>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  function renderActiveTab() {
    switch (activeTab) {
      case 'status': return renderStatusTab();
      case 'claims': return renderClaimsBenefitsTab();
      case 'payments': return renderPaymentsTab();
      case 'details': return renderCaseDetailsTab();
      case 'activity': return renderCommunicationsTab();
      default: return renderStatusTab();
    }
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
          <span>NTN - 2334</span>
        </div>

        {/* Title Section */}
        <div className="ldb-detail-title-section">
          <div className="ldb-detail-title-row">
            <h1 className="ldb-detail-title">Pregnancy, Birth &amp; Bonding</h1>
            <span className="ldb-detail-status-badge">Pending</span>
          </div>
          <div className="ldb-detail-meta">
            <span className="ldb-detail-meta-id">NTN - 2334</span>
            <span className="ldb-detail-meta-dates">Apr 13 – May 15, 2026</span>
            <span className="ldb-detail-meta-sep">|</span>
            <span className="ldb-detail-meta-type">Continuous</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="ldb-detail-tabs">
          {tabs.map(function (tab) {
            return (
              <button
                key={tab.key}
                type="button"
                className={'ldb-detail-tab' + (activeTab === tab.key ? ' active' : '')}
                onClick={function () { setActiveTab(tab.key); }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Layout */}
        <div className="ldb-v2-layout">
          <div className="ldb-v2-main">
            {renderActiveTab()}
          </div>
          {renderSidebar()}
        </div>
      </div>
    </div>
  );
}
