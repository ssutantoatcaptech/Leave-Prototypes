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
  },
];

const categoryTabs = ['Dental', 'Vision', 'Supplemental', 'Leave and Disability', 'Life'];

export default function ClaimCenterPage() {
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
          <option>All Statuses</option>
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
              <tr key={i}>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
