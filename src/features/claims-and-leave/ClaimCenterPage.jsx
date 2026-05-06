import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const claimsData = [
  {
    date: 'Oct 15, 2024',
    claimNum: 'CLM-2024-08941',
    type: 'Short-Term Disability',
    member: 'Sarah Johnson',
    status: 'Pending',
    statusColor: 'blue',
    payment: '—',
    actions: 'View Details',
    detail: {
      benefitType: 'Short-Term Disability (STD)',
      benefitPct: '60% of pre-disability earnings',
      weeklyBenefit: '$1,923.00',
      eliminationPeriod: '7 calendar days',
      filedDate: 'Oct 15, 2024',
      condition: 'Lower back injury',
      provider: 'Dr. Patel — Orthopedic Surgery',
      nextStep: 'Awaiting medical certification from provider',
    },
  },
  {
    date: 'Oct 8, 2024',
    claimNum: 'CLM-2024-08832',
    type: 'Long-Term Disability',
    member: 'Sarah Johnson',
    status: 'Approved',
    statusColor: 'green',
    payment: '$2,450.00',
    actions: 'View Details',
    detail: {
      benefitType: 'Long-Term Disability (LTD)',
      benefitPct: '60% of pre-disability earnings',
      weeklyBenefit: '$2,450.00 (bi-weekly)',
      eliminationPeriod: '90 days (satisfied)',
      filedDate: 'Jul 2, 2024',
      condition: 'Chronic condition — ongoing',
      provider: 'Dr. Williams — Internal Medicine',
      nextStep: 'Next recertification due Jan 8, 2025',
    },
  },
  {
    date: 'Sep 22, 2024',
    claimNum: 'CLM-2024-08510',
    type: 'Short-Term Disability',
    member: 'Michael Johnson',
    status: 'Info Required',
    statusColor: 'amber',
    payment: '—',
    actions: 'Upload Documents',
    detail: {
      benefitType: 'Short-Term Disability (STD)',
      benefitPct: '60% of pre-disability earnings',
      weeklyBenefit: '$1,650.00',
      eliminationPeriod: '7 calendar days',
      filedDate: 'Sep 22, 2024',
      condition: 'Post-surgical recovery',
      provider: 'Dr. Chen — General Surgery',
      nextStep: 'Upload attending physician statement to proceed',
    },
  },
  {
    date: 'Aug 30, 2024',
    claimNum: 'CLM-2024-07994',
    type: 'Accidental Death & Dismemberment',
    member: 'Sarah Johnson',
    status: 'Closed',
    statusColor: 'gray',
    payment: '$15,000.00',
    actions: 'View Details',
    detail: {
      benefitType: 'AD&D — Accidental Injury',
      benefitPct: 'Lump sum per schedule',
      weeklyBenefit: '$15,000.00 (one-time)',
      eliminationPeriod: 'N/A',
      filedDate: 'Aug 30, 2024',
      condition: 'Accidental fracture',
      provider: 'Valley Hospital ER',
      nextStep: 'Claim closed — benefit paid in full',
    },
  },
];

const categoryTabs = ['Dental', 'Vision', 'Supplemental', 'Leave and Disability', 'Life'];

export default function ClaimCenterPage() {
  const [expandedRow, setExpandedRow] = useState(-1);

  return (
    <div className="cl-page">
      <div className="cl-breadcrumb">
        <span>Claims &amp; Leave</span>
        <span className="cl-breadcrumb-sep">&gt;</span>
        <span>Claims Center</span>
      </div>

      <div className="cl-page-header">
        <div>
          <h1 className="cl-page-title">Claims Center</h1>
          <p className="cl-page-desc">Track and manage your insurance claims.</p>
        </div>
        <button className="cl-btn cl-btn--dark">+ Start a New Claim</button>
      </div>

      {/* Category tabs */}
      <div className="cl-category-tabs">
        {categoryTabs.map((tab) => (
          <NavLink
            key={tab}
            to={tab === 'Dental' ? '/claims-and-leave/dental' : '#'}
            className={`cl-category-tab${tab === 'Leave and Disability' ? ' cl-category-tab--active' : ''}`}
          >
            {tab}
          </NavLink>
        ))}
      </div>

      {/* Filter bar */}
      <div className="cl-filter-bar">
        <select className="cl-select">
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Info Required</option>
          <option>Closed</option>
        </select>
        <select className="cl-select">
          <option>All Types</option>
          <option>Short-Term Disability</option>
          <option>Long-Term Disability</option>
          <option>AD&D</option>
        </select>
        <select className="cl-select">
          <option>Date Range</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>Last Year</option>
        </select>
        <button className="cl-btn cl-btn--outline">Export History (CSV)</button>
      </div>

      {/* Claims table */}
      <div className="cl-table-wrap">
        <table className="cl-table">
          <thead>
            <tr>
              <th></th>
              <th>Submission Date</th>
              <th>Claim # &amp; Type</th>
              <th>Member Name</th>
              <th>Status</th>
              <th>Payment / Benefit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {claimsData.map((row, i) => (
              <>
                <tr key={i} className={expandedRow === i ? 'cl-table-row--expanded' : ''}>
                  <td>
                    <button
                      className="cl-expand-btn"
                      onClick={() => setExpandedRow(expandedRow === i ? -1 : i)}
                      aria-label="Expand row"
                    >
                      {expandedRow === i ? '−' : '+'}
                    </button>
                  </td>
                  <td>{row.date}</td>
                  <td>
                    <div className="cl-cell-stacked">
                      <span className="cl-cell-primary">{row.claimNum}</span>
                      <span className="cl-cell-secondary">{row.type}</span>
                    </div>
                  </td>
                  <td>{row.member}</td>
                  <td>
                    <span className={`cl-badge cl-badge--${row.statusColor}`}>{row.status}</span>
                  </td>
                  <td>{row.payment}</td>
                  <td>
                    <button className="cl-link-btn">{row.actions}</button>
                  </td>
                </tr>
                {expandedRow === i && (
                  <tr key={`${i}-detail`} className="cl-detail-row">
                    <td colSpan="7">
                      <div className="cl-payment-detail">
                        <h4 className="cl-detail-title">Claim Details</h4>
                        <div className="cl-payment-breakdown">
                          <div className="cl-breakdown-row">
                            <span>Benefit Type</span>
                            <span>{row.detail.benefitType}</span>
                          </div>
                          <div className="cl-breakdown-row">
                            <span>Benefit %</span>
                            <span>{row.detail.benefitPct}</span>
                          </div>
                          <div className="cl-breakdown-row">
                            <span>Benefit Amount</span>
                            <span style={{ fontWeight: 700 }}>{row.detail.weeklyBenefit}</span>
                          </div>
                          <div className="cl-breakdown-row">
                            <span>Elimination Period</span>
                            <span>{row.detail.eliminationPeriod}</span>
                          </div>
                          <div className="cl-breakdown-row">
                            <span>Filed Date</span>
                            <span>{row.detail.filedDate}</span>
                          </div>
                          <div className="cl-breakdown-row">
                            <span>Condition</span>
                            <span>{row.detail.condition}</span>
                          </div>
                          <div className="cl-breakdown-row">
                            <span>Provider</span>
                            <span>{row.detail.provider}</span>
                          </div>
                          <div className="cl-breakdown-row cl-breakdown-row--method">
                            <span>Next Step</span>
                            <span>{row.detail.nextStep}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
