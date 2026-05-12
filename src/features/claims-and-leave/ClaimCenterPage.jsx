import { useState, useMemo } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import useBasePath from './useBasePath';

const claimsData = [
  {
    leaveType: 'Birthing parent pregnancy',
    caseId: 'CLM #12345',
    lastUpdate: '04 / 28 / 2026',
    status: 'Pending',
    statusColor: 'amber',
    requiredActions: 'Return to Work',
    actions: ['View Details'],
    link: 'std-claim-detail',
  },
  {
    leaveType: 'Illness or Injury',
    caseId: '#CLM #12345',
    lastUpdate: '05 / 01 / 2026',
    status: 'Decisioned',
    statusColor: 'gray',
    requiredActions: 'N/A',
    actions: ['View Details'],
    link: 'std-claim-detail',
  },
  {
    leaveType: 'Caring for family member',
    caseId: 'N/A',
    lastUpdate: '03 / 22 / 2026',
    status: 'Saved',
    statusColor: 'gray',
    requiredActions: 'N/A',
    actions: ['Delete', 'Resume'],
    link: null,
  },
  {
    leaveType: 'Military-related',
    caseId: 'NTN #09881',
    lastUpdate: '04 / 30 / 2026',
    status: 'Decisioned',
    statusColor: 'gray',
    requiredActions: 'N/A',
    actions: ['View Details'],
    link: 'std-claim-detail',
  },
  {
    leaveType: 'Military-related',
    caseId: 'NTN #098331',
    lastUpdate: '01 / 10 / 2026',
    status: 'Closed',
    statusColor: 'gray',
    requiredActions: 'N/A',
    actions: ['View Details'],
    link: 'std-claim-detail',
  },
];

const PAGE_SIZE = 5;
const TOTAL_ENTRIES = 24;

export default function ClaimCenterPage() {
  const base = useBasePath();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    return claimsData.filter((row) => {
      if (statusFilter !== 'All' && row.status !== statusFilter) return false;
      if (typeFilter !== 'All' && row.leaveType !== typeFilter) return false;
      return true;
    });
  }, [statusFilter, typeFilter]);

  const totalPages = 5;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="cl-claims-page">
      <div className="cl-claims-breadcrumb">
        <Link to={base} className="cl-claims-breadcrumb-link">Claims &amp; Leave</Link>
        <span className="cl-claims-breadcrumb-sep">&gt;</span>
        <span className="cl-claims-breadcrumb-current">My Leave</span>
      </div>

      <div className="cl-claims-header">
        <div className="cl-claims-header-text">
          <h1 className="cl-claims-title">My Leaves</h1>
          <p className="cl-claims-subtitle">Manage your active, saved, and historical leave requests.</p>
        </div>
        <button className="cl-claims-new-btn">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Request New Leave
        </button>
      </div>

      {/* Filter bar + Table card */}
      <div className="cl-claims-card">
        <div className="cl-claims-filter-bar">
          <div className="cl-claims-filter-group">
            <label className="cl-claims-filter-label">STATUS</label>
            <select className="cl-claims-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Decisioned">Decisioned</option>
              <option value="Saved">Saved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="cl-claims-filter-group">
            <label className="cl-claims-filter-label">LEAVE TYPE</label>
            <select className="cl-claims-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Birthing parent pregnancy">Birthing parent pregnancy</option>
              <option value="Illness or Injury">Illness or Injury</option>
              <option value="Caring for family member">Caring for family member</option>
              <option value="Military-related">Military-related</option>
            </select>
          </div>
        </div>

        {/* Claims table */}
        <div className="cl-claims-table-wrap">
          <table className="cl-claims-table">
            <thead>
              <tr>
                <th>Leave Type & ID</th>
                <th>Last Update</th>
                <th>Status</th>
                <th>Required Actions</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '32px 16px', color: '#6b7280' }}>No leaves match your filters.</td></tr>
              )}
              {filtered.map((row, i) => (
                <tr key={i}>
                  <td>
                    <div className="cl-claims-type-cell">
                      <span className="cl-claims-type-name">{row.leaveType}</span>
                      <span className="cl-claims-type-id">{row.caseId}</span>
                    </div>
                  </td>
                  <td>{row.lastUpdate}</td>
                  <td>
                    <span className="cl-claims-pill">
                      <span className={'cl-claims-pill-dot cl-claims-pill-dot--' + row.statusColor}></span>
                      {row.status}
                    </span>
                  </td>
                  <td>{row.requiredActions}</td>
                  <td>
                    <div className="cl-claims-actions">
                      {row.actions.map((action, j) => (
                        <button
                          key={j}
                          className={'cl-claims-action-btn' + (action === 'Delete' ? ' cl-claims-action-btn--delete' : '')}
                          onClick={() => { if (row.link) navigate(`${base}/${row.link}`); }}
                        >
                          {action}{action !== 'Delete' && (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <path d="M3 1.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="cl-claims-pagination">
          <div className="cl-claims-pagination-buttons">
            <button
              className="cl-claims-page-btn"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &lt;
            </button>
            <button
              className={`cl-claims-page-btn ${currentPage === 1 ? 'cl-claims-page-btn--active' : ''}`}
              onClick={() => handlePageChange(1)}
            >
              1
            </button>
            <button
              className={`cl-claims-page-btn ${currentPage === 2 ? 'cl-claims-page-btn--active' : ''}`}
              onClick={() => handlePageChange(2)}
            >
              2
            </button>
            <button
              className={`cl-claims-page-btn ${currentPage === 3 ? 'cl-claims-page-btn--active' : ''}`}
              onClick={() => handlePageChange(3)}
            >
              3
            </button>
            <span className="cl-claims-page-ellipsis">...</span>
            <button
              className={`cl-claims-page-btn ${currentPage === 5 ? 'cl-claims-page-btn--active' : ''}`}
              onClick={() => handlePageChange(5)}
            >
              5
            </button>
            <button
              className="cl-claims-page-btn"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &gt;
            </button>
          </div>
          <div className="cl-claims-pagination-info">
            Showing 1 to {PAGE_SIZE} of {TOTAL_ENTRIES} entries
          </div>
        </div>
      </div>

      {/* Mobile card view */}
      <div className="cl-claims-cards-mobile">
        {filtered.length === 0 && (
          <div className="cl-claims-card-empty">No leaves match your filters.</div>
        )}
        {filtered.map((row, i) => (
          <div key={i} className="cl-claims-card-mobile">
            <div className="cl-claims-card-mobile-header">
              <span className="cl-claims-card-mobile-type">{row.leaveType}</span>
              <span className="cl-claims-pill">
                <span className={'cl-claims-pill-dot cl-claims-pill-dot--' + row.statusColor}></span>
                {row.status}
              </span>
            </div>
            <span className="cl-claims-card-mobile-id">{row.caseId}</span>
            <div className="cl-claims-card-mobile-details">
              <div className="cl-claims-card-mobile-field">
                <span className="cl-claims-card-mobile-label">Last Update</span>
                <span className="cl-claims-card-mobile-value">{row.lastUpdate}</span>
              </div>
              <div className="cl-claims-card-mobile-field">
                <span className="cl-claims-card-mobile-label">Required Actions</span>
                <span className="cl-claims-card-mobile-value">{row.requiredActions}</span>
              </div>
            </div>
            <div className="cl-claims-card-mobile-actions">
              {row.actions.map((action, j) => (
                <button
                  key={j}
                  className={'cl-claims-action-btn' + (action === 'Delete' ? ' cl-claims-action-btn--delete' : '')}
                  onClick={() => { if (row.link) navigate(`${base}/${row.link}`); }}
                >
                  {action}{action !== 'Delete' && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M3 1.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
