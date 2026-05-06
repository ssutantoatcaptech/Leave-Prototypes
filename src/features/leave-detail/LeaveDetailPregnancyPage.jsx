import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './leave-detail-b.css';
import '../absence-details/absence-details-react.css';

export default function LeaveDetailPregnancyPage() {
  var navigate = useNavigate();
  var [timelineView, setTimelineView] = useState('protection');
  var [hoveredRow, setHoveredRow] = useState(null);
  var [expandedClaims, setExpandedClaims] = useState({ absence: true, stateleave: false });
  var [paymentsOpen, setPaymentsOpen] = useState(true);
  var [showAllTasks, setShowAllTasks] = useState(false);
  var [editingSection, setEditingSection] = useState(null);
  var [detailsForm, setDetailsForm] = useState({
    reason: 'Pregnancy, delivery, and postpartum recovery',
    duration: 'Up to 22 weeks (8 wks recovery + 12 wks bonding)',
    provider: 'Dr. Chen (OB/GYN)',
    facility: 'Morristown Medical Center',
    providerPhone: '(973) 555-3400',
    providerFax: '(973) 555-3401',
    providerAddress: '100 Madison Ave, Morristown, NJ 07960',
    email: 'jessica.martinez@company.com',
    phone: '(201) 555-0294',
    address: '58 Elm Street, Montclair, NJ 07042',
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
          <Link to="/claims-and-leave">Claims &amp; Leave</Link>
          <svg className="ldb-bc-sep" width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <Link to="/claims-and-leave/my-cases">My Cases</Link>
          <svg className="ldb-bc-sep" width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>CLM #12890</span>
        </div>

        {/* Title Card */}
        <div className="ldb-title-card">
          <div className="ldb-title-left">
            <div className="ldb-title-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 21c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" stroke="#fff" strokeWidth="1.8"/><path d="M12 8c-1.1 0-2 .9-2 2v2a2 2 0 004 0v-2c0-1.1-.9-2-2-2z" stroke="#fff" strokeWidth="1.8"/><path d="M9 16c0-1.66 1.34-3 3-3s3 1.34 3 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            <div>
              <h1 className="ldb-title">Birthing Parent — Pregnancy <span className="ldb-status-badge" style={{ fontSize: 12, marginLeft: 12, verticalAlign: 'middle', background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' }}>Approved</span></h1>
              <div className="ldb-title-meta">
                <span style={{ fontSize: 14, color: '#525252', fontWeight: 600 }}>NTN - 4501</span>
                <span style={{ fontSize: 13, color: '#737373', marginLeft: 12 }}>Jun 16 – Nov 3, 2025 · Continuous</span>
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
                    <p>How your claims provide protection and income during maternity leave</p>
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
                      { id: 'std', label: 'STD', width: 36, accent: '#2563eb', name: 'Group Disability Claim (STD)', weeks: '8 weeks', range: 'Jun 16 – Aug 11, 2025', pay: '60% salary (delivery recovery)', status: 'Approved', paymentValue: '~$1,923/wk' },
                      { id: 'njtdi', label: 'NJ TDI', width: 36, accent: '#818cf8', name: 'NJ Temporary Disability Insurance', weeks: '8 weeks', range: 'Jun 16 – Aug 11, 2025', pay: '85% salary (state program)', status: 'Approved', paymentValue: '~$1,048/wk' },
                      { id: 'njfli', label: 'NJ FLI', width: 54, accent: '#0d9488', name: 'NJ Family Leave Insurance (Bonding)', weeks: '12 weeks', range: 'Aug 11 – Nov 3, 2025', pay: '85% AWW up to max', status: 'Approved', paymentValue: '~$1,048/wk' },
                    ] : [
                      { id: 'fmla', label: 'FMLA', width: 100, accent: '#0033a0', name: 'Leave Case — FMLA Protection', weeks: '12 weeks', range: 'Jun 16 – Sep 8, 2025', pay: 'Job protection (unpaid)', status: 'Approved' },
                      { id: 'std', label: 'STD', width: 36, accent: '#2563eb', name: 'Group Disability Claim (STD)', weeks: '8 weeks', range: 'Jun 16 – Aug 11, 2025', pay: '60% salary (delivery recovery)', status: 'Approved' },
                      { id: 'njtdi', label: 'NJ TDI', width: 36, accent: '#818cf8', name: 'NJ Temporary Disability Insurance', weeks: '8 weeks', range: 'Jun 16 – Aug 11, 2025', pay: '85% salary (state program)', status: 'Approved' },
                      { id: 'njfli', label: 'NJ FLI', width: 54, accent: '#0d9488', name: 'NJ Family Leave Insurance (Bonding)', weeks: '12 weeks', range: 'Aug 11 – Nov 3, 2025', pay: '85% AWW up to max', status: 'Approved' },
                    ]).map(function (item) {
                      var left = item.id === 'njfli' ? '36%' : '0%';
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
                            <div className="dlp-tl-seg" style={{ left: left, width: item.width + '%', background: item.accent }} />
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {hoveredRow && (function () {
                    var allRows = timelineView === 'payment' ? [
                      { id: 'std', name: 'Group Disability Claim (STD)', weeks: '8 weeks', range: 'Jun 16 – Aug 11, 2025', pay: '60% salary (delivery recovery)', status: 'Approved', paymentValue: '~$1,923/wk' },
                      { id: 'njtdi', name: 'NJ Temporary Disability Insurance', weeks: '8 weeks', range: 'Jun 16 – Aug 11, 2025', pay: '85% salary (state program)', status: 'Approved', paymentValue: '~$1,048/wk' },
                      { id: 'njfli', name: 'NJ Family Leave Insurance (Bonding)', weeks: '12 weeks', range: 'Aug 11 – Nov 3, 2025', pay: '85% AWW up to max', status: 'Approved', paymentValue: '~$1,048/wk' },
                    ] : [
                      { id: 'fmla', name: 'Leave Case — FMLA Protection', weeks: '12 weeks', range: 'Jun 16 – Sep 8, 2025', pay: 'Job protection (unpaid)', status: 'Approved' },
                      { id: 'std', name: 'Group Disability Claim (STD)', weeks: '8 weeks', range: 'Jun 16 – Aug 11, 2025', pay: '60% salary (delivery recovery)', status: 'Approved' },
                      { id: 'njtdi', name: 'NJ Temporary Disability Insurance', weeks: '8 weeks', range: 'Jun 16 – Aug 11, 2025', pay: '85% salary (state program)', status: 'Approved' },
                      { id: 'njfli', name: 'NJ Family Leave Insurance (Bonding)', weeks: '12 weeks', range: 'Aug 11 – Nov 3, 2025', pay: '85% AWW up to max', status: 'Approved' },
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
                    {Array.from({ length: 22 }, function (_, i) {
                      return <div key={i} className="dlp-tl-week-tick"><span className="dlp-tl-week-num">{(i + 1) % 2 === 1 ? 'Wk ' + (i + 1) : ''}</span></div>;
                    })}
                  </div>
                  <div className="dlp-tl-months">
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                    <span>Nov</span>
                  </div>

                  <div className="dlp-legend">
                    {(timelineView === 'payment' ? [
                      { id: 'std-pay', label: 'STD (60%)', accent: '#2563eb' },
                      { id: 'state-tdi', label: 'NJ TDI (85%)', accent: '#818cf8' },
                      { id: 'state-fli', label: 'NJ FLI Bonding (85%)', accent: '#0d9488' },
                      { id: 'unpaid', label: 'Unpaid', accent: '#cbd5e1' },
                    ] : [
                      { id: 'fmla', label: 'FMLA Protection', accent: '#0033a0' },
                      { id: 'std', label: 'STD Recovery', accent: '#2563eb' },
                      { id: 'state-tdi', label: 'NJ TDI (Disability)', accent: '#818cf8' },
                      { id: 'state-fli', label: 'NJ FLI (Bonding)', accent: '#0d9488' },
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
                      <div className="dt-payment-summary-value">$36,152</div>
                      <div className="dt-payment-summary-note">STD ($15,384) + NJ TDI ($8,384) + NJ FLI ($12,576) · Based on current salary · Actual amounts may vary</div>
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
                      <div className="ldb-claim-accordion-title">Leave Case — Maternity</div>
                      <div className="ldb-claim-accordion-sub">NTN-4501-ABS-10 · FMLA designation, pregnancy disability + bonding</div>
                    </div>
                  </div>
                  <span className="ldb-claim-status" style={{ background: '#f0fdf4', color: '#166534' }}>Approved</span>
                </button>
                {expandedClaims.absence && (
                  <div className="ldb-claim-accordion-body">
                    <div className="dt-info-grid">
                      <div>
                        <div className="dt-info-field-label">Claim ID</div>
                        <div className="dt-info-field-value">NTN-4501-ABS-10</div>
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
                        <div className="dt-info-field-value">0 weeks (leave not yet started)</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Job Protection</div>
                        <div className="dt-info-field-value">Active through Sep 8, 2025</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Leave Phases</div>
                        <div className="dt-info-field-value">Delivery recovery (8 wks) + Bonding (12 wks)</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Expected Delivery</div>
                        <div className="dt-info-field-value">Jun 16, 2025</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">RTW Date (Est.)</div>
                        <div className="dt-info-field-value">Nov 3, 2025</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 16, padding: '12px 16px', background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0', fontSize: 13, color: '#166534' }}>
                      <strong>Note:</strong> Your maternity leave combines delivery recovery (covered by STD) and bonding time (covered by NJ FLI). FMLA provides 12 weeks of job protection; additional bonding time beyond FMLA is protected under NJ state law.
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
                      <div className="ldb-claim-accordion-title">Group Disability Claim — Delivery Recovery</div>
                      <div className="ldb-claim-accordion-sub">NTN-4501-GDC-10 · STD Benefit — 8 weeks for cesarean delivery recovery</div>
                    </div>
                  </div>
                  <span className="ldb-claim-status" style={{ background: '#f0fdf4', color: '#166534' }}>Approved</span>
                </button>
                {expandedClaims.disability && (
                  <div className="ldb-claim-accordion-body">
                    <div className="dt-info-grid">
                      <div>
                        <div className="dt-info-field-label">Claim ID</div>
                        <div className="dt-info-field-value">NTN-4501-GDC-10</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Benefit Type</div>
                        <div className="dt-info-field-value">Short-Term Disability (STD)</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Delivery Type</div>
                        <div className="dt-info-field-value">Cesarean section (C-section)</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Benefit %</div>
                        <div className="dt-info-field-value">60% of pre-disability earnings</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Elimination Period</div>
                        <div className="dt-info-field-value">0 days (pregnancy waiver)</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Benefit Duration</div>
                        <div className="dt-info-field-value">8 weeks (cesarean delivery)</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Weekly Benefit</div>
                        <div className="dt-info-field-value" style={{ fontWeight: 700 }}>$1,923.00</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Benefits Start</div>
                        <div className="dt-info-field-value">Jun 16, 2025</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Benefits End</div>
                        <div className="dt-info-field-value">Aug 11, 2025</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Payment Method</div>
                        <div className="dt-info-field-value">Direct Deposit ****7291</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 16, padding: '12px 16px', background: '#eff6ff', borderRadius: 8, border: '1px solid #bfdbfe', fontSize: 13, color: '#1e40af' }}>
                      <strong>Note:</strong> STD covers the medically necessary recovery period following delivery. For a cesarean birth, the standard recovery is 8 weeks. After medical clearance, bonding leave begins under NJ FLI.
                    </div>
                  </div>
                )}
              </div>

              {/* NJ TDI Claim */}
              <div className="ldb-claim-accordion">
                <button type="button" className={'ldb-claim-accordion-header' + (expandedClaims.njtdi ? ' expanded' : '')} onClick={function () { toggleClaim('njtdi'); }}>
                  <div className="ldb-claim-accordion-left">
                    <svg className="ldb-claim-accordion-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <div>
                      <div className="ldb-claim-accordion-title">State Paid Leave — NJ TDI</div>
                      <div className="ldb-claim-accordion-sub">NTN-4501-STL-11 · NJ Temporary Disability — delivery recovery period</div>
                    </div>
                  </div>
                  <span className="ldb-claim-status" style={{ background: '#eef2ff', color: '#6366f1' }}>Approved</span>
                </button>
                {expandedClaims.njtdi && (
                  <div className="ldb-claim-accordion-body">
                    <div className="dt-info-grid">
                      <div>
                        <div className="dt-info-field-label">Claim ID</div>
                        <div className="dt-info-field-value">NTN-4501-STL-11</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Program</div>
                        <div className="dt-info-field-value">NJ Temporary Disability Insurance (TDI)</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Covers</div>
                        <div className="dt-info-field-value">Physical recovery from childbirth</div>
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
                        <div className="dt-info-field-value">Up to 8 weeks (delivery recovery)</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Benefits Start</div>
                        <div className="dt-info-field-value">Jun 16, 2025</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Benefits End</div>
                        <div className="dt-info-field-value">Aug 11, 2025</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Work State</div>
                        <div className="dt-info-field-value">New Jersey</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Payment Method</div>
                        <div className="dt-info-field-value">Direct Deposit ****7291</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 16, padding: '12px 16px', background: '#eef2ff', borderRadius: 8, border: '1px solid #e0e7ff', fontSize: 13, color: '#3730a3' }}>
                      <strong>Note:</strong> NJ TDI covers the disability period (physical recovery from childbirth). Once medically cleared, you transition to NJ Family Leave Insurance for bonding time.
                    </div>
                  </div>
                )}
              </div>

              {/* NJ FLI Bonding Claim */}
              <div className="ldb-claim-accordion">
                <button type="button" className={'ldb-claim-accordion-header' + (expandedClaims.stateleave ? ' expanded' : '')} onClick={function () { toggleClaim('stateleave'); }}>
                  <div className="ldb-claim-accordion-left">
                    <svg className="ldb-claim-accordion-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <div>
                      <div className="ldb-claim-accordion-title">State Paid Leave — NJ FLI (Bonding)</div>
                      <div className="ldb-claim-accordion-sub">NTN-4501-FLI-12 · NJ Family Leave Insurance — newborn bonding period</div>
                    </div>
                  </div>
                  <span className="ldb-claim-status" style={{ background: '#f0fdfa', color: '#115e59' }}>Approved</span>
                </button>
                {expandedClaims.stateleave && (
                  <div className="ldb-claim-accordion-body">
                    <div className="dt-info-grid">
                      <div>
                        <div className="dt-info-field-label">Claim ID</div>
                        <div className="dt-info-field-value">NTN-4501-FLI-12</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Program</div>
                        <div className="dt-info-field-value">NJ Family Leave Insurance (FLI)</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Covers</div>
                        <div className="dt-info-field-value">Bonding with newborn child</div>
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
                        <div className="dt-info-field-value">12 consecutive weeks</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Benefits Start</div>
                        <div className="dt-info-field-value">Aug 11, 2025</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Benefits End</div>
                        <div className="dt-info-field-value">Nov 3, 2025</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Work State</div>
                        <div className="dt-info-field-value">New Jersey</div>
                      </div>
                      <div>
                        <div className="dt-info-field-label">Payment Method</div>
                        <div className="dt-info-field-value">Direct Deposit ****7291</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 16, padding: '12px 16px', background: '#f0fdfa', borderRadius: 8, border: '1px solid #ccfbf1', fontSize: 13, color: '#115e59' }}>
                      <strong>Note:</strong> NJ FLI provides up to 12 weeks of paid bonding time after your medical recovery. This runs consecutively after your TDI disability period ends. You must use this within 12 months of the child's birth.
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
                  <p className="ldb-card-context">Payments from STD (recovery) and NJ FLI (bonding). Both paid via direct deposit.</p>
                  <div className="ldb-payments-grid">
                    <div className="ldb-payment-item">
                      <span className="ldb-payment-label">Total Paid to Date</span>
                      <span className="ldb-payment-value">$0.00</span>
                    </div>
                    <div className="ldb-payment-item">
                      <span className="ldb-payment-label">First Expected Payment</span>
                      <span className="ldb-payment-value">Jun 23, 2025</span>
                    </div>
                    <div className="ldb-payment-item">
                      <span className="ldb-payment-label">Est. Weekly (Recovery)</span>
                      <span className="ldb-payment-value">$1,923.00</span>
                    </div>
                    <div className="ldb-payment-item">
                      <span className="ldb-payment-label">Payment Method</span>
                      <span className="ldb-payment-value">Direct Deposit ****7291</span>
                    </div>
                  </div>
                  <div style={{ marginTop: 16, padding: '12px 16px', background: '#fffbeb', borderRadius: 8, border: '1px solid #fef3c7', fontSize: 13, color: '#92400e' }}>
                    <strong>Upcoming:</strong> Payments begin after your leave start date (Jun 16). STD payments will arrive weekly during the 8-week recovery period, then transition to NJ FLI bonding payments.
                  </div>
                  <Link to="/claims-and-leave/payments?claim=NTN-4501-GDC-10&case=NTN-4501" className="ldb-payments-view-btn" style={{ textDecoration: 'none' }}>
                    VIEW ALL PAYMENTS
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                </>
              )}
            </div>

            {/* About This Leave — Collapsible + Editable */}
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
                    <div className="ldb-action-title">Birth Certificate or Hospital Record</div>
                    <div className="ldb-action-meta">Due within 30 days of delivery · Required for NJ FLI</div>
                  </div>
                  <button type="button" className="ldb-btn-upload-inline">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 12V4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M4.5 6.5L8 3l3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 13h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    Upload
                  </button>
                </div>
                <div className="ldb-action-item">
                  <div className="ldb-action-dot" />
                  <div className="ldb-action-content">
                    <div className="ldb-action-title">Confirm Return to Work Date</div>
                    <div className="ldb-action-meta">Due by Oct 20 · 2 weeks before RTW</div>
                  </div>
                  <button type="button" className="ldb-btn-upload-inline" onClick={function () { navigate('/claims-and-leave/case-detail-pregnancy/return-to-work'); }}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 13l3-3M13 3l-3 3M10 3H13v3M6 13H3v-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Schedule
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
                <div className="ldb-tasks-done-section">
                  <div className="ldb-tasks-done-label">Completed</div>
                  <div className="ldb-action-list">
                    <div className="ldb-action-item done">
                      <div className="ldb-action-dot done" />
                      <div className="ldb-action-content">
                        <div className="ldb-action-title">FMLA Eligibility Confirmed</div>
                        <div className="ldb-action-meta">Completed Apr 2 · Leave Case</div>
                      </div>
                    </div>
                    <div className="ldb-action-item done">
                      <div className="ldb-action-dot done" />
                      <div className="ldb-action-content">
                        <div className="ldb-action-title">Prenatal Certification Submitted</div>
                        <div className="ldb-action-meta">Completed Apr 10 · OB/GYN certification</div>
                      </div>
                    </div>
                    <div className="ldb-action-item done">
                      <div className="ldb-action-dot done" />
                      <div className="ldb-action-content">
                        <div className="ldb-action-title">STD Claim Pre-Approved</div>
                        <div className="ldb-action-meta">Completed Apr 15 · Pending delivery</div>
                      </div>
                    </div>
                    <div className="ldb-action-item done">
                      <div className="ldb-action-dot done" />
                      <div className="ldb-action-content">
                        <div className="ldb-action-title">NJ TDI/FLI Application Filed</div>
                        <div className="ldb-action-meta">Completed Apr 18 · State programs</div>
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
                <button type="button" className="ldb-quick-action-item" onClick={function () { navigate('/claims-and-leave/case-detail-pregnancy/return-to-work'); }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 13l3-3M13 3l-3 3M10 3H13v3M6 13H3v-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span>Manage Return to Work</span>
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="ldb-quick-action-chevron"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button type="button" className="ldb-quick-action-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" stroke="currentColor" strokeWidth="1.2"/><path d="M5 8h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  <span>Extend Bonding Leave</span>
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="ldb-quick-action-chevron"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button type="button" className="ldb-quick-action-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span>Request Part-Time Return</span>
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
                  <div className="ldb-snapshot-date-label">Due Date</div>
                  <div className="ldb-snapshot-date-value">June 16, 2025</div>
                </div>
                <div className="ldb-snapshot-date-card">
                  <div className="ldb-snapshot-date-label">Leave Start</div>
                  <div className="ldb-snapshot-date-value">June 16, 2025</div>
                </div>
              </div>
              <div className="ldb-snapshot-dates-row">
                <div className="ldb-snapshot-date-card">
                  <div className="ldb-snapshot-date-label">Recovery Ends</div>
                  <div className="ldb-snapshot-date-value">Aug 11, 2025</div>
                </div>
                <div className="ldb-snapshot-date-card">
                  <div className="ldb-snapshot-date-label">Bonding Ends</div>
                  <div className="ldb-snapshot-date-value">Nov 3, 2025</div>
                </div>
              </div>
              <div className="ldb-snapshot-date-card ldb-snapshot-date-card--full">
                <div className="ldb-snapshot-date-label">Return to Work Date</div>
                <div className="ldb-snapshot-date-value">November 4, 2025</div>
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
                    <div className="ldb-doc-name">Prenatal_Certification.pdf</div>
                    <div className="ldb-doc-meta">Uploaded on Apr 10, 2025</div>
                  </div>
                  <button type="button" className="ldb-doc-download-btn" aria-label="Download">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 4v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M4.5 9.5L8 13l3.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  </button>
                </div>
                <div className="ldb-doc-item">
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">NJ_TDI_FLI_Application.pdf</div>
                    <div className="ldb-doc-meta">Uploaded on Apr 18, 2025</div>
                  </div>
                  <button type="button" className="ldb-doc-download-btn" aria-label="Download">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 4v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M4.5 9.5L8 13l3.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  </button>
                </div>
                <div className="ldb-doc-item">
                  <div className="ldb-doc-info">
                    <div className="ldb-doc-name">Maternity_Leave_Plan.pdf</div>
                    <div className="ldb-doc-meta">Uploaded on May 1, 2025</div>
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
