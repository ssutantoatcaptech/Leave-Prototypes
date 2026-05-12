import { useState, useMemo } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import useBasePath from './useBasePath';

const claimsData = [
  {
    date: 'Oct 15, 2026',
    claimNum: 'CLM-2026-08941',
    type: 'Short-Term Disability',
    member: 'Sarah Johnson',
    status: 'Pending',
    statusColor: 'blue',
    payment: '—',
    actions: 'View Details',
    link: 'std-claim-detail',
  },
  {
    date: 'Oct 8, 2026',
    claimNum: 'CLM-2026-08832',
    type: 'Long-Term Disability',
    member: 'Sarah Johnson',
    status: 'Approved',
    statusColor: 'green',
    payment: '$2,450.00',
    actions: 'View Details',
    link: 'std-claim-detail',
  },
  {
    date: 'Sep 22, 2026',
    claimNum: 'CLM-2026-08510',
    type: 'Short-Term Disability',
    member: 'Michael Johnson',
    status: 'Info Required',
    statusColor: 'amber',
    payment: '—',
    actions: 'Upload Documents',
    link: 'std-claim-detail',
  },
  {
    date: 'Aug 30, 2026',
    claimNum: 'CLM-2026-07994',
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
        const now = new Date('2026-10-20');
        const diff = (now - d) / (1000 * 60 * 60 * 24);
        if (dateFilter === 'Last 30 Days' && diff > 30) return false;
        if (dateFilter === 'Last 90 Days' && diff > 90) return false;
        if (dateFilter === 'Last Year' && diff > 365) return false;
      }
      return true;
    });
  }, [statusFilter, typeFilter, dateFilter]);

  return (
    <div className="cl-page cl-ml-page" style={{ position: 'relative', overflow: 'clip' }}>
      {/* Background decorative icon */}
      <div className="cl-bg-icon" aria-hidden="true">
        <svg width="388" height="388" viewBox="0 0 388 388" fill="none">
          <rect x="20" y="52" width="348" height="316" rx="32" fill="url(#cal-bg-grad-cc)" opacity="0.45"/>
          <rect x="44" y="120" width="300" height="228" rx="16" fill="white" opacity="0.5"/>
          <rect x="120" y="8" width="28" height="64" rx="14" fill="url(#cal-bg-grad-cc)" opacity="0.45"/>
          <rect x="240" y="8" width="28" height="64" rx="14" fill="url(#cal-bg-grad-cc)" opacity="0.45"/>
          <rect x="80" y="164" width="52" height="44" rx="10" fill="url(#cal-bg-grad-cc)" opacity="0.35"/>
          <rect x="156" y="164" width="52" height="44" rx="10" fill="url(#cal-bg-grad-cc)" opacity="0.35"/>
          <rect x="232" y="164" width="52" height="44" rx="10" fill="url(#cal-bg-grad-cc)" opacity="0.35"/>
          <rect x="80" y="232" width="52" height="44" rx="10" fill="url(#cal-bg-grad-cc)" opacity="0.35"/>
          <rect x="156" y="232" width="52" height="44" rx="10" fill="url(#cal-bg-grad-cc)" opacity="0.35"/>
          <rect x="232" y="232" width="52" height="44" rx="10" fill="url(#cal-bg-grad-cc)" opacity="0.35"/>
          <defs>
            <linearGradient id="cal-bg-grad-cc" x1="0" y1="0" x2="388" y2="388" gradientUnits="userSpaceOnUse">
              <stop stopColor="#105fa8" stopOpacity="0.15"/>
              <stop offset="1" stopColor="#0a9b8c" stopOpacity="0.12"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Breadcrumb */}
      <div className="cl-ml-breadcrumb">
        <Link to={base} className="cl-ml-breadcrumb-link">Claims &amp; Leave</Link>
        <span className="cl-ml-breadcrumb-sep">&gt;</span>
        <span className="cl-ml-breadcrumb-current">Claims Center</span>
      </div>

      {/* Page Header */}
      <div className="cl-ml-header">
        <div className="cl-ml-header-text">
          <h1 className="cl-ml-title">Claims Center</h1>
          <p className="cl-ml-subtitle">Track and manage your insurance claims.</p>
        </div>
        <div className="cl-ml-header-action">
          <button className="cl-ml-btn-new">+ Start a New Claim</button>
        </div>
      </div>

      {/* Table Card */}
      <div className="cl-ml-table-card">
        {/* Category tabs */}
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

        {/* Filter Toolbar */}
        <div className="cl-ml-filters">
          <div className="cl-ml-filter-group">
            <label className="cl-ml-filter-label">STATUS</label>
            <select
              className="cl-ml-filter-select"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); }}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Info Required">Info Required</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="cl-ml-filter-group">
            <label className="cl-ml-filter-label">CLAIM TYPE</label>
            <select
              className="cl-ml-filter-select"
              value={typeFilter}
              onChange={(e) => { setTypeFilter(e.target.value); }}
            >
              <option value="All">All Types</option>
              <option value="Short-Term Disability">Short-Term Disability</option>
              <option value="Long-Term Disability">Long-Term Disability</option>
              <option value="AD&D">AD&D</option>
            </select>
          </div>
          <div className="cl-ml-filter-group">
            <label className="cl-ml-filter-label">DATE RANGE</label>
            <select
              className="cl-ml-filter-select"
              value={dateFilter}
              onChange={(e) => { setDateFilter(e.target.value); }}
            >
              <option value="All">All Dates</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 90 Days">Last 90 Days</option>
              <option value="Last Year">Last Year</option>
            </select>
          </div>
        </div>

        {/* Claims table */}
        <table className="cl-ml-table">
          <thead>
            <tr>
              <th className="cl-ml-th-first">Submission Date</th>
              <th>Claim # &amp; Type</th>
              <th>Member Name</th>
              <th>Status</th>
              <th>Payment / Benefit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '32px 16px', color: '#5d5d5d' }}>No claims match your filters.</td></tr>
            )}
            {filtered.map((row, i) => (
              <tr key={i} className="cl-ml-row">
                <td className="cl-ml-td-first">
                  <span style={{ fontSize: '14px', color: '#222' }}>{row.date}</span>
                </td>
                <td className="cl-ml-td">
                  <div className="cl-ml-cell-stacked">
                    <span className="cl-ml-cell-type">{row.claimNum}</span>
                    <span className="cl-ml-cell-id">{row.type}</span>
                  </div>
                </td>
                <td className="cl-ml-td">{row.member}</td>
                <td className="cl-ml-td">
                  <span className="cl-ml-status-pill">{row.status}</span>
                </td>
                <td className="cl-ml-td">{row.payment}</td>
                <td className="cl-ml-td">
                  <span
                    className="cl-ml-action-link"
                    onClick={() => { if (row.link) navigate(`${base}/${row.link}`); }}
                  >{row.actions} ›</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination info */}
        <div className="cl-ml-pagination">
          <p className="cl-ml-pagination-info">
            Showing {filtered.length} of {claimsData.length} claims
          </p>
        </div>
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
              <span className="cl-ml-status-pill">{row.status}</span>
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
