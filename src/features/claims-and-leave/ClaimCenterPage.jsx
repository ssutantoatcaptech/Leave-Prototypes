import { useState, useMemo } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import useBasePath from './useBasePath';

const claimsData = [
  {
    date: 'Feb 23, 2026',
    claimType: 'CLM-98234',
    member: 'Sarah Johnson',
    provider: 'Dr. Guy Smith',
    billedAmount: '$250.00',
    memberPays: '$50.00',
    status: 'Processed',
    link: 'std-claim-detail',
  },
  {
    date: 'Dec 08, 2025',
    claimType: 'CLM-98234',
    member: 'Sarah Johnson',
    provider: 'DDS Dentistry',
    billedAmount: '$64.00',
    memberPays: 'Pending',
    status: 'Pending',
    link: 'std-claim-detail',
  },
  {
    date: 'Aug 15, 2025',
    claimType: 'CLM-98234',
    member: 'Jack Johnson',
    provider: 'Dr. Guy Smith',
    billedAmount: '$145.00',
    memberPays: 'Pending',
    status: 'Pending',
    link: 'std-claim-detail',
  },
  {
    date: 'May 02, 2025',
    claimType: 'CLM-98234',
    member: 'Jimmy Johnson',
    provider: 'Dr. Guy Smith',
    billedAmount: '$128.00',
    memberPays: '$46.00',
    status: 'Reprocessed',
    link: 'std-claim-detail',
  },
  {
    date: 'Nov 08, 2024',
    claimType: 'CLM-98234',
    member: 'Sarah Johnson',
    provider: 'Orthodontics United',
    billedAmount: '$324.00',
    memberPays: '$162.00',
    status: 'Processed',
    link: 'std-claim-detail',
  },
];

const categoryTabs = ['Dental', 'Vision', 'Supplemental', 'Leave and Disability', 'Life'];

const ITEMS_PER_PAGE = 5;
const TOTAL_ENTRIES = 24;
const TOTAL_PAGES = Math.ceil(TOTAL_ENTRIES / ITEMS_PER_PAGE);

export default function ClaimCenterPage() {
  const base = useBasePath();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Dental');
  const [memberFilter, setMemberFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    return claimsData.filter((row) => {
      if (memberFilter !== 'All' && row.member !== memberFilter) return false;
      if (dateFilter !== 'All') {
        const d = new Date(row.date);
        const now = new Date('2026-03-01');
        const diff = (now - d) / (1000 * 60 * 60 * 24);
        if (dateFilter === 'Last 30 Days' && diff > 30) return false;
        if (dateFilter === 'Last 90 Days' && diff > 90) return false;
        if (dateFilter === 'Last Year' && diff > 365) return false;
      }
      return true;
    });
  }, [memberFilter, dateFilter]);

  const renderPaginationButtons = () => {
    const buttons = [];
    buttons.push(
      <button
        key="prev"
        className="cl-ml-page-btn"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        aria-label="Previous page"
      >
        <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M6 1L1 6l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    );

    for (let i = 1; i <= TOTAL_PAGES; i++) {
      if (i <= 3 || i === TOTAL_PAGES) {
        buttons.push(
          <button
            key={i}
            className={`cl-ml-page-btn${i === currentPage ? ' cl-ml-page-num--active' : ''}`}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </button>
        );
      } else if (i === 4) {
        buttons.push(<span key="ellipsis" className="cl-ml-page-ellipsis">...</span>);
      }
    }

    buttons.push(
      <button
        key="next"
        className="cl-ml-page-btn"
        disabled={currentPage === TOTAL_PAGES}
        onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
        aria-label="Next page"
      >
        <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    );

    return buttons;
  };

  return (
    <div className="cl-page cl-ml-page" style={{ position: 'relative', overflow: 'clip' }}>
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
          <button className="cl-ml-btn-new">Start a New Claim</button>
        </div>
      </div>

      {/* Table Card */}
      <div className="cl-ml-table-card">
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

        {/* Category dropdown (mobile) */}
        <div className="cl-category-dropdown-mobile">
          <label className="cl-ml-filter-label">CATEGORY</label>
          <select
            className="cl-ml-filter-select"
            value={activeCategory}
            onChange={(e) => { setActiveCategory(e.target.value); if (e.target.value === 'Dental') navigate(`${base}/dental`); }}
          >
            {categoryTabs.map((tab) => (
              <option key={tab} value={tab}>{tab}</option>
            ))}
          </select>
        </div>

        {/* Filter Toolbar */}
        <div className="cl-ml-filters">
          <div className="cl-ml-filter-group">
            <label className="cl-ml-filter-label">Select Member</label>
            <select
              className="cl-ml-filter-select"
              value={memberFilter}
              onChange={(e) => { setMemberFilter(e.target.value); }}
            >
              <option value="All">All Members</option>
              <option value="Sarah Johnson">Sarah Johnson</option>
              <option value="Jack Johnson">Jack Johnson</option>
              <option value="Jimmy Johnson">Jimmy Johnson</option>
            </select>
          </div>
          <div className="cl-ml-filter-group">
            <label className="cl-ml-filter-label">Date Range</label>
            <select
              className="cl-ml-filter-select"
              value={dateFilter}
              onChange={(e) => { setDateFilter(e.target.value); }}
            >
              <option value="All">All</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 90 Days">Last 90 Days</option>
              <option value="Last Year">Last Year</option>
            </select>
          </div>
          <div className="cl-ml-filter-group cl-ml-filter-group--export">
            <button className="cl-ml-btn-export">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 10v3a1 1 0 001 1h10a1 1 0 001-1v-3M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Export History (CSV)
            </button>
          </div>
        </div>

        {/* Claims table */}
        <table className="cl-ml-table">
          <thead>
            <tr>
              <th className="cl-ml-th-first">
                <span className="cl-ml-th-sortable">
                  Date
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </th>
              <th>Claim Type</th>
              <th>Member Name</th>
              <th>Provider</th>
              <th>Billed Amount</th>
              <th>Member Pays</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan="8" style={{ textAlign: 'center', padding: '32px 16px', color: '#5d5d5d' }}>No claims match your filters.</td></tr>
            )}
            {filtered.map((row, i) => (
              <tr key={i} className="cl-ml-row">
                <td className="cl-ml-td-first">
                  <span style={{ fontSize: '14px', color: '#222' }}>{row.date}</span>
                </td>
                <td className="cl-ml-td">{row.claimType}</td>
                <td className="cl-ml-td">{row.member}</td>
                <td className="cl-ml-td">{row.provider}</td>
                <td className="cl-ml-td">{row.billedAmount}</td>
                <td className="cl-ml-td">{row.memberPays}</td>
                <td className="cl-ml-td">
                  <span className="cl-ml-status-pill">{row.status}</span>
                </td>
                <td className="cl-ml-td">
                  <span
                    className="cl-ml-action-link"
                    onClick={() => { if (row.link) navigate(`${base}/${row.link}`); }}
                  >
                    View Details
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" style={{ marginLeft: '4px' }}><path d="M1 1l4 4 4-4" stroke="#105fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="cl-ml-pagination">
          <div className="cl-ml-pagination-controls">
            {renderPaginationButtons()}
          </div>
          <p className="cl-ml-pagination-info">
            Showing 1 to {filtered.length} of {TOTAL_ENTRIES} entries
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
              <span className="cl-card-mobile-primary">{row.claimType}</span>
              <span className="cl-ml-status-pill">{row.status}</span>
            </div>
            <span className="cl-card-mobile-type">{row.provider}</span>
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
                <span className="cl-card-mobile-label">Billed</span>
                <span className="cl-card-mobile-value">{row.billedAmount}</span>
              </div>
              <div className="cl-card-mobile-field">
                <span className="cl-card-mobile-label">Member Pays</span>
                <span className="cl-card-mobile-value">{row.memberPays}</span>
              </div>
            </div>
            <button className="cl-card-mobile-action" onClick={() => { if (row.link) navigate(`${base}/${row.link}`); }}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}
