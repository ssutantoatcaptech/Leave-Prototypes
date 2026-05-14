import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useBasePath from './useBasePath';

const leavesData = [
  {
    type: 'Birthing Parent (Continuous)',
    id: 'CLM #12345',
    lastUpdate: '04 / 28 / 2026',
    status: 'Under Review',
    requiredActions: 'Return to Work',
    actionType: 'view',

  },
  {
    type: 'Non-Birthing Parent (Continuous)',
    id: 'CLM #12290',
    lastUpdate: '04 / 15 / 2026',
    status: 'Decisioned',
    requiredActions: 'N/A',
    actionType: 'view',

  },
  {
    type: 'Cared for Sick Family (Reduced Hours)',
    id: 'CLM #12188',
    lastUpdate: '03 / 30 / 2026',
    status: 'Saved',
    requiredActions: 'N/A',
    actionType: 'saved',

  },
  {
    type: 'Birthing Parent (Continuous)',
    id: 'CLM #11950',
    lastUpdate: '03 / 12 / 2026',
    status: 'Closed',
    requiredActions: 'N/A',
    actionType: 'view',

  },
  {
    type: 'Birthing Parent (Continuous)',
    id: 'CLM #11802',
    lastUpdate: '02 / 28 / 2026',
    status: 'Under Review',
    requiredActions: 'Upload Documents',
    actionType: 'view',

  },
  {
    type: 'Non-Birthing Parent (Continuous)',
    id: 'CLM #11750',
    lastUpdate: '02 / 14 / 2026',
    status: 'Decisioned',
    requiredActions: 'N/A',
    actionType: 'view',

  },
  {
    type: 'Cared for Sick Family (Reduced Hours)',
    id: 'CLM #11698',
    lastUpdate: '01 / 30 / 2026',
    status: 'Closed',
    requiredActions: 'N/A',
    actionType: 'view',

  },
  {
    type: 'Cared for Sick Family (Reduced Hours)',
    id: 'CLM #11550',
    lastUpdate: '01 / 15 / 2026',
    status: 'Decisioned',
    requiredActions: 'N/A',
    actionType: 'view',
  },
  {
    type: 'Birthing Parent (Continuous)',
    id: 'CLM #11400',
    lastUpdate: '12 / 20 / 2025',
    status: 'Closed',
    requiredActions: 'N/A',
    actionType: 'view',
  },
  {
    type: 'Non-Birthing Parent (Continuous)',
    id: 'CLM #11320',
    lastUpdate: '12 / 05 / 2025',
    status: 'Under Review',
    requiredActions: 'N/A',
    actionType: 'view',
  },
  {
    type: 'Cared for Sick Family (Reduced Hours)',
    id: 'CLM #11200',
    lastUpdate: '11 / 22 / 2025',
    status: 'Saved',
    requiredActions: 'N/A',
    actionType: 'saved',
  },
  {
    type: 'Birthing Parent (Continuous)',
    id: 'CLM #11100',
    lastUpdate: '11 / 10 / 2025',
    status: 'Decisioned',
    requiredActions: 'N/A',
    actionType: 'view',
  },
  {
    type: 'Birthing Parent (Continuous)',
    id: 'CLM #10980',
    lastUpdate: '10 / 28 / 2025',
    status: 'Closed',
    requiredActions: 'N/A',
    actionType: 'view',
  },
  {
    type: 'Non-Birthing Parent (Continuous)',
    id: 'CLM #10850',
    lastUpdate: '10 / 12 / 2025',
    status: 'Decisioned',
    requiredActions: 'N/A',
    actionType: 'view',
  },
  {
    type: 'Cared for Sick Family (Reduced Hours)',
    id: 'CLM #10720',
    lastUpdate: '09 / 28 / 2025',
    status: 'Closed',
    requiredActions: 'N/A',
    actionType: 'view',
  },
  {
    type: 'Cared for Sick Family (Reduced Hours)',
    id: 'CLM #10600',
    lastUpdate: '09 / 15 / 2025',
    status: 'Under Review',
    requiredActions: 'Return to Work',
    actionType: 'view',
  },
  {
    type: 'Birthing Parent (Continuous)',
    id: 'CLM #10480',
    lastUpdate: '09 / 01 / 2025',
    status: 'Saved',
    requiredActions: 'N/A',
    actionType: 'saved',
  },
  {
    type: 'Non-Birthing Parent (Continuous)',
    id: 'CLM #10350',
    lastUpdate: '08 / 18 / 2025',
    status: 'Decisioned',
    requiredActions: 'N/A',
    actionType: 'view',
  },
  {
    type: 'Cared for Sick Family (Reduced Hours)',
    id: 'CLM #10220',
    lastUpdate: '08 / 04 / 2025',
    status: 'Closed',
    requiredActions: 'N/A',
    actionType: 'view',
  },
  {
    type: 'Birthing Parent (Continuous)',
    id: 'CLM #10100',
    lastUpdate: '07 / 20 / 2025',
    status: 'Decisioned',
    requiredActions: 'N/A',
    actionType: 'view',
  },
  {
    type: 'Birthing Parent (Continuous)',
    id: 'CLM #09980',
    lastUpdate: '07 / 05 / 2025',
    status: 'Under Review',
    requiredActions: 'Upload Documents',
    actionType: 'view',
  },
  {
    type: 'Non-Birthing Parent (Continuous)',
    id: 'CLM #09850',
    lastUpdate: '06 / 22 / 2025',
    status: 'Closed',
    requiredActions: 'N/A',
    actionType: 'view',
  },
  {
    type: 'Cared for Sick Family (Reduced Hours)',
    id: 'CLM #09720',
    lastUpdate: '06 / 08 / 2025',
    status: 'Decisioned',
    requiredActions: 'N/A',
    actionType: 'view',
  },
  {
    type: 'Cared for Sick Family (Reduced Hours)',
    id: 'CLM #09600',
    lastUpdate: '05 / 25 / 2025',
    status: 'Closed',
    requiredActions: 'N/A',
    actionType: 'view',
  },
];

const PAGE_SIZE = 5;

function getDetailPath(type) {
  if (type === 'Birthing Parent (Continuous)') return '/case-detail-pregnancy';
  if (type === 'Non-Birthing Parent (Continuous)') return '/case-detail';
  if (type === 'Cared for Sick Family (Reduced Hours)') return '/case-detail-caregiver';
  return '/case-detail';
}

export default function MyLeavesPage() {
  const base = useBasePath();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  // Filter data
  const filteredData = leavesData.filter((row) => {
    const statusMatch = statusFilter === 'All' || row.status === statusFilter;
    const typeMatch = typeFilter === 'All' || row.type === typeFilter;
    return statusMatch && typeMatch;
  });

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = Math.min(startIdx + PAGE_SIZE, totalEntries);
  const pageData = filteredData.slice(startIdx, endIdx);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="cl-page cl-ml-page" style={{ position: 'relative', overflow: 'clip' }}>
      {/* Breadcrumb */}
      <div className="cl-ml-breadcrumb">
        <Link to={base} className="cl-ml-breadcrumb-link">Claims &amp; Leave</Link>
        <span className="cl-ml-breadcrumb-sep">&gt;</span>
        <span className="cl-ml-breadcrumb-current">My Leave</span>
      </div>

      {/* Page Header */}
      <div className="cl-ml-header">
        <div className="cl-ml-header-text">
          <h1 className="cl-ml-title">My Leaves</h1>
          <p className="cl-ml-subtitle">Manage your active, saved, and historical leave requests.</p>
        </div>
        <div className="cl-ml-header-action">
          <button className="cl-ml-btn-new">Request New Leave</button>
        </div>
      </div>

      {/* Table Card */}
      <div className="cl-ml-table-card">
        {/* Filter Toolbar */}
        <div className="cl-ml-filters">
          <div className="cl-ml-filter-group">
            <label className="cl-ml-filter-label">Status</label>
            <select
              className="cl-ml-filter-select"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="All">All Statuses</option>
              <option value="Under Review">Under Review</option>
              <option value="Decisioned">Decisioned</option>
              <option value="Saved">Saved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="cl-ml-filter-group">
            <label className="cl-ml-filter-label">Leave Type</label>
            <select
              className="cl-ml-filter-select"
              value={typeFilter}
              onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="All">All Types</option>
              <option value="Birthing Parent (Continuous)">Birthing Parent (Continuous)</option>
              <option value="Cared for Sick Family (Reduced Hours)">Cared for Sick Family (Reduced Hours)</option>
              <option value="Non-Birthing Parent (Continuous)">Non-Birthing Parent (Continuous)</option>
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

        {/* Table — hidden on mobile */}
        <table className="cl-ml-table">
          <thead>
            <tr>
              <th className="cl-ml-th-first">
                <span className="cl-ml-th-sortable">
                  Leave Type &amp; ID
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </th>
              <th>Last Update</th>
              <th>Status</th>
              <th>Required Actions</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, i) => (
              <tr key={startIdx + i} className="cl-ml-row">
                <td className="cl-ml-td-first">
                  <div className="cl-ml-cell-stacked">
                    <span className="cl-ml-cell-type">{row.type}</span>
                    <span className="cl-ml-cell-id">{row.id}</span>
                  </div>
                </td>
                <td className="cl-ml-td">{row.lastUpdate}</td>
                <td className="cl-ml-td">
                  <span className="cl-ml-status-pill">{row.status}</span>
                </td>
                <td className="cl-ml-td">{row.requiredActions}</td>
                <td className="cl-ml-td">
                  {row.actionType === 'saved' ? (
                    <div className="cl-ml-action-group">
                      <button className="cl-ml-action-delete">Delete</button>
                      <span className="cl-ml-action-link" onClick={() => navigate(base + getDetailPath(row.type))}>
                        Resume
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" style={{ marginLeft: '4px' }}><path d="M1 1l4 4 4-4" stroke="#105fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    </div>
                  ) : (
                    <span className="cl-ml-action-link" onClick={() => navigate(base + getDetailPath(row.type))}>
                      View Details
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" style={{ marginLeft: '4px' }}><path d="M1 1l4 4 4-4" stroke="#105fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="cl-ml-pagination">
          <div className="cl-ml-pagination-controls">
            <button
              className="cl-ml-page-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path d="M6 1L1 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {getPageNumbers().map((page) => {
              if (page <= 3 || page === totalPages) {
                return (
                  <button
                    key={page}
                    className={`cl-ml-page-btn${page === currentPage ? ' cl-ml-page-num--active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                );
              } else if (page === 4) {
                return <span key="ellipsis" className="cl-ml-page-ellipsis">...</span>;
              }
              return null;
            })}
            <button
              className="cl-ml-page-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <p className="cl-ml-pagination-info">
            Showing {startIdx + 1} to {endIdx} of {totalEntries} entries
          </p>
        </div>
      </div>

      {/* Mobile card view — outside table card */}
      <div className="cl-ml-cards-mobile">
        {pageData.map((row, i) => (
          <div key={startIdx + i} className="cl-ml-card-mobile">
            <div>
              <div className="cl-ml-card-mobile__type">{row.type}</div>
              <div className="cl-ml-card-mobile__id">{row.id}</div>
            </div>
            <div className="cl-ml-card-mobile__row">
              <span className="cl-ml-card-mobile__label">Last Update</span>
              <span className="cl-ml-card-mobile__value">{row.lastUpdate}</span>
            </div>
            <div className="cl-ml-card-mobile__row">
              <span className="cl-ml-card-mobile__label">Status</span>
              <span className="cl-ml-card-mobile__value">
                <span className="cl-ml-status-pill">{row.status}</span>
              </span>
            </div>
            <div className="cl-ml-card-mobile__row">
              <span className="cl-ml-card-mobile__label">Required Actions</span>
              <span className="cl-ml-card-mobile__value">{row.requiredActions}</span>
            </div>
            <div className="cl-ml-card-mobile__actions">
              {row.actionType === 'saved' ? (
                <>
                  <button className="cl-ml-card-mobile__action-delete">Delete</button>
                  <button className="cl-ml-card-mobile__action-link" onClick={() => navigate(base + getDetailPath(row.type))}>Resume ›</button>
                </>
              ) : (
                <button className="cl-ml-card-mobile__action-link" onClick={() => navigate(base + getDetailPath(row.type))}>View Details ›</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
