import { useState, useMemo } from 'react';
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
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');

  const filtered = useMemo(() => {
    return claimsData.filter((row) => {
      if (statusFilter !== 'All' && row.status !== statusFilter) return false;
      if (typeFilter !== 'All') {
        if (typeFilter === 'AD&D' && row.type !== 'Accidental Death & Dismemberment') return false;
        if (typeFilter !== 'AD&D' && row.type !== typeFilter) return false;
      }
      if (dateFilter !== 'All') {
        const d = new Date(row.date);
        const now = new Date('2024-10-20');
        const diff = (now - d) / (1000 * 60 * 60 * 24);
        if (dateFilter === 'Last 30 Days' && diff > 30) return false;
        if (dateFilter === 'Last 90 Days' && diff > 90) return false;
        if (dateFilter === 'Last Year' && diff > 365) return false;
      }
      return true;
    });
  }, [statusFilter, typeFilter, dateFilter]);

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
        <select className="cl-select" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setExpandedRow(-1); }}>
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Info Required">Info Required</option>
          <option value="Closed">Closed</option>
        </select>
        <select className="cl-select" value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setExpandedRow(-1); }}>
          <option value="All">All Types</option>
          <option value="Short-Term Disability">Short-Term Disability</option>
          <option value="Long-Term Disability">Long-Term Disability</option>
          <option value="AD&D">AD&D</option>
        </select>
        <select className="cl-select" value={dateFilter} onChange={(e) => { setDateFilter(e.target.value); setExpandedRow(-1); }}>
          <option value="All">Date Range</option>
          <option value="Last 30 Days">Last 30 Days</option>
          <option value="Last 90 Days">Last 90 Days</option>
          <option value="Last Year">Last Year</option>
        </select>
        <button className="cl-btn cl-btn--outline">Export History (CSV)</button>
      </div>

      <div className="cl-pagination-info">Showing {filtered.length} of {claimsData.length} claims</div>

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
            {filtered.length === 0 && (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '32px 16px', color: '#6b7280' }}>No claims match your filters.</td></tr>
            )}
            {filtered.map((row, i) => (
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
