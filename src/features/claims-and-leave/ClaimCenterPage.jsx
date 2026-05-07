import { useState, useMemo } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import useBasePath from './useBasePath';

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
    link: 'std-claim-detail',
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
    link: 'std-claim-detail',
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
    link: 'std-claim-detail',
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
  const base = useBasePath();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Leave and Disability');
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
        <Link to={base} className="cl-breadcrumb-link">Claims &amp; Leave</Link>
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

      {/* Category dropdown (mobile) */}
      <div className="cl-category-dropdown-wrap">
        <select
          className="cl-category-dropdown"
          value={activeCategory}
          onChange={(e) => {
            setActiveCategory(e.target.value);
            if (e.target.value === 'Dental') navigate(`${base}/dental`);
          }}
        >
          {categoryTabs.map((tab) => (
            <option key={tab} value={tab}>{tab}</option>
          ))}
        </select>
      </div>

      {/* Category tabs (desktop) */}
      <div className="cl-category-tabs">
        {categoryTabs.map((tab) => (
          <NavLink
            key={tab}
            to={tab === 'Dental' ? `${base}/dental` : '#'}
            className={`cl-category-tab${tab === activeCategory ? ' cl-category-tab--active' : ''}`}
            onClick={(e) => { if (tab !== 'Dental') e.preventDefault(); setActiveCategory(tab); }}
          >
            {tab}
          </NavLink>
        ))}
      </div>

      {/* Filter bar */}
      <div className="cl-filter-bar">
        <select className="cl-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Info Required">Info Required</option>
          <option value="Closed">Closed</option>
        </select>
        <select className="cl-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="All">All Types</option>
          <option value="Short-Term Disability">Short-Term Disability</option>
          <option value="Long-Term Disability">Long-Term Disability</option>
          <option value="AD&D">AD&D</option>
        </select>
        <select className="cl-select" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
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
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '32px 16px', color: '#6b7280' }}>No claims match your filters.</td></tr>
            )}
            {filtered.map((row, i) => (
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
                  <button className="cl-link-btn" onClick={() => { if (row.link) navigate(`${base}/${row.link}`); }}>{row.actions}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="cl-cards-mobile">
        {filtered.length === 0 && (
          <div className="cl-card-empty-mobile">No claims match your filters.</div>
        )}
        {filtered.map((row, i) => (
          <div key={i} className="cl-card-mobile">
            <div className="cl-card-mobile-header">
              <span className="cl-card-mobile-primary">{row.claimNum}</span>
              <span className={`cl-badge cl-badge--${row.statusColor}`}>{row.status}</span>
            </div>
            <span className="cl-card-mobile-type">{row.type}</span>
            <div className="cl-card-mobile-details">
              <div className="cl-card-mobile-field">
                <span className="cl-card-mobile-label">Member</span>
                <span className="cl-card-mobile-value">{row.member}</span>
              </div>
              <div className="cl-card-mobile-field">
                <span className="cl-card-mobile-label">Date</span>
                <span className="cl-card-mobile-value">{row.date}</span>
              </div>
              <div className="cl-card-mobile-field">
                <span className="cl-card-mobile-label">Payment</span>
                <span className="cl-card-mobile-value">{row.payment}</span>
              </div>
            </div>
            <button className="cl-card-mobile-action" onClick={() => { if (row.link) navigate(`${base}/${row.link}`); }}>{row.actions}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
