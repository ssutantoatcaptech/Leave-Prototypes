import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useBasePath from './useBasePath';

var initialCases = [
  {
    date: 'Nov 15, 2026',
    type: 'Pregnancy, Birth & Bonding',
    id: 'CLM #12345',
    leaveType: 'Leave',
    status: 'Pending',
    associatedClaims: 'Short Term Disability',
    requiredActions: 'Upload Medical Certification',
    linkPath: '/case-detail-pregnancy',
  },
  {
    date: 'Oct 14, 2026',
    type: 'Injury or Illness',
    id: 'CLM #12345',
    leaveType: 'Leave',
    status: 'Approved',
    associatedClaims: 'N/A',
    requiredActions: 'N/A',
    linkPath: '/case-detail',
  },
  {
    date: 'Sep 26, 2025',
    type: 'Ergonomic Assessment &',
    id: 'ADA MODIFICATION',
    leaveType: 'Accommodation',
    status: 'Approved leave',
    associatedClaims: 'N/A',
    requiredActions: 'N/A',
    linkPath: '/case-detail',
    actionLabel: 'Resume',
  },
  {
    date: 'Aug 15, 2025',
    type: 'Injury or Illness',
    id: 'CLM #12345',
    leaveType: 'Leave',
    status: 'Approved',
    associatedClaims: 'Short Term Disability',
    requiredActions: 'N/A',
    linkPath: '/case-detail',
  },
  {
    date: 'Aug 15, 2025',
    type: 'Injury or Illness',
    id: 'CLM #12345',
    leaveType: 'Leave',
    status: 'Closed',
    associatedClaims: 'Short Term Disability',
    requiredActions: 'N/A',
    linkPath: null,
  },
];

var PAGE_SIZE = 5;

export default function MyCasesPage() {
  var base = useBasePath();
  var navigate = useNavigate();
  var [currentPage, setCurrentPage] = useState(1);
  var [statusFilter, setStatusFilter] = useState('All');
  var [typeFilter, setTypeFilter] = useState('All');
  var [hiddenIds, setHiddenIds] = useState([]);
  var [deleteTarget, setDeleteTarget] = useState(null);
  var [mobileVisibleCount, setMobileVisibleCount] = useState(5);

  var submittedLeaves = useMemo(function () {
    try { return JSON.parse(localStorage.getItem('submittedLeaves') || '[]'); } catch (e) { return []; }
  }, []);

  var casesData = submittedLeaves.concat(initialCases).filter(function (c) { return hiddenIds.indexOf(c.id) === -1; });

  var filtered = useMemo(function () {
    return casesData.filter(function (row) {
      if (statusFilter !== 'All' && row.status !== statusFilter) return false;
      if (typeFilter !== 'All' && row.leaveType !== typeFilter) return false;
      return true;
    });
  }, [statusFilter, typeFilter, hiddenIds]);

  var totalEntries = filtered.length;
  var totalPages = Math.max(1, Math.ceil(totalEntries / PAGE_SIZE));
  var startIdx = (currentPage - 1) * PAGE_SIZE;
  var endIdx = Math.min(startIdx + PAGE_SIZE, totalEntries);
  var pageData = filtered.slice(startIdx, endIdx);

  function handlePageChange(page) {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }

  function getPageNumbers() {
    var pages = [];
    for (var i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  function confirmDelete() {
    if (deleteTarget) {
      setHiddenIds(function (prev) { return prev.concat(deleteTarget.id); });
    }
    setDeleteTarget(null);
  }

  return (
    <div className="cl-page cl-ml-page" style={{ position: 'relative', overflow: 'clip' }}>
      {/* Background decorative icon */}
      <div className="cl-bg-icon" aria-hidden="true">
        <svg width="388" height="388" viewBox="0 0 388 388" fill="none">
          <rect x="20" y="52" width="348" height="316" rx="32" fill="url(#cal-bg-grad-mc)" opacity="0.45"/>
          <rect x="44" y="120" width="300" height="228" rx="16" fill="white" opacity="0.5"/>
          <rect x="120" y="8" width="28" height="64" rx="14" fill="url(#cal-bg-grad-mc)" opacity="0.45"/>
          <rect x="240" y="8" width="28" height="64" rx="14" fill="url(#cal-bg-grad-mc)" opacity="0.45"/>
          <rect x="80" y="164" width="52" height="44" rx="10" fill="url(#cal-bg-grad-mc)" opacity="0.35"/>
          <rect x="156" y="164" width="52" height="44" rx="10" fill="url(#cal-bg-grad-mc)" opacity="0.35"/>
          <rect x="232" y="164" width="52" height="44" rx="10" fill="url(#cal-bg-grad-mc)" opacity="0.35"/>
          <rect x="80" y="232" width="52" height="44" rx="10" fill="url(#cal-bg-grad-mc)" opacity="0.35"/>
          <rect x="156" y="232" width="52" height="44" rx="10" fill="url(#cal-bg-grad-mc)" opacity="0.35"/>
          <rect x="232" y="232" width="52" height="44" rx="10" fill="url(#cal-bg-grad-mc)" opacity="0.35"/>
          <defs>
            <linearGradient id="cal-bg-grad-mc" x1="0" y1="0" x2="388" y2="388" gradientUnits="userSpaceOnUse">
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
        <span className="cl-ml-breadcrumb-current">My Cases</span>
      </div>

      {/* Page Header */}
      <div className="cl-ml-header">
        <div className="cl-ml-header-text">
          <h1 className="cl-ml-title">My Cases</h1>
          <p className="cl-ml-subtitle">Manage your active, saved, and historical leave requests.</p>
        </div>
        <div className="cl-ml-header-action">
          <button className="cl-ml-btn-new" onClick={function () { navigate(base + '/file-claim'); }}>+ Request New Leave or Claim</button>
        </div>
      </div>

      {/* Request New Leave button (mobile) */}
      <button className="cl-ml-btn-new cl-ml-btn-new--mobile" onClick={function () { navigate(base + '/file-claim'); }}>+ Request New Leave or Claim</button>

      {/* Table Card */}
      <div className="cl-ml-table-card">
        {/* Filter Toolbar */}
        <div className="cl-ml-filters">
          <div className="cl-ml-filter-group">
            <label className="cl-ml-filter-label">STATUS</label>
            <select
              className="cl-ml-filter-select"
              value={statusFilter}
              onChange={function (e) { setStatusFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="cl-ml-filter-group">
            <label className="cl-ml-filter-label">LEAVE TYPE</label>
            <select
              className="cl-ml-filter-select"
              value={typeFilter}
              onChange={function (e) { setTypeFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="All">All</option>
              <option value="Leave">Leave</option>
              <option value="Accommodation">Accommodation</option>
            </select>
          </div>
        </div>

        {/* Table — hidden on mobile */}
        <table className="cl-ml-table">
          <thead>
            <tr>
              <th>Date</th>
              <th className="cl-ml-th-first">Case &amp; Type</th>
              <th>Leave Type</th>
              <th>Status</th>
              <th>Associated Claims</th>
              <th>Required Actions</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 && (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '32px 16px', color: '#5d5d5d' }}>No cases match your filters.</td></tr>
            )}
            {pageData.map(function (row, i) {
              return (
                <tr key={startIdx + i} className="cl-ml-row">
                  <td className="cl-ml-td">{row.date || row.lastUpdate}</td>
                  <td className="cl-ml-td-first">
                    <div className="cl-ml-cell-stacked">
                      <span className="cl-ml-cell-type">{row.type}</span>
                      <span className="cl-ml-cell-id">{row.id}</span>
                    </div>
                  </td>
                  <td className="cl-ml-td">{row.leaveType || 'Leave'}</td>
                  <td className="cl-ml-td">
                    <span className="cl-ml-status-pill">{row.status}</span>
                  </td>
                  <td className="cl-ml-td">{row.associatedClaims || 'N/A'}</td>
                  <td className="cl-ml-td">
                    {row.requiredActions && row.requiredActions !== 'N/A' ? (
                      <span className="cl-ml-action-link" onClick={function () {
                        if (row.linkPath) {
                          sessionStorage.setItem('viewingCase', JSON.stringify(row));
                          navigate(base + row.linkPath);
                        }
                      }}>{row.requiredActions}</span>
                    ) : 'N/A'}
                  </td>
                  <td className="cl-ml-td">
                    {row.status === 'Saved' ? (
                      <div className="cl-ml-action-group">
                        <button className="cl-ml-action-delete" onClick={function () { setDeleteTarget(row); }}>Delete</button>
                        <span
                          className="cl-ml-action-link"
                          onClick={function () {
                            if (row.linkPath) {
                              sessionStorage.setItem('viewingCase', JSON.stringify(row));
                              navigate(base + row.linkPath);
                            }
                          }}
                        >Resume &rsaquo;</span>
                      </div>
                    ) : row.actionLabel === 'Resume' ? (
                      <span
                        className="cl-ml-action-link"
                        onClick={function () {
                          if (row.linkPath) {
                            sessionStorage.setItem('viewingCase', JSON.stringify(row));
                            navigate(base + row.linkPath);
                          }
                        }}
                      >Resume &rsaquo;</span>
                    ) : (
                      <span
                        className="cl-ml-action-link"
                        onClick={function () {
                          if (row.linkPath) {
                            sessionStorage.setItem('viewingCase', JSON.stringify(row));
                            navigate(base + row.linkPath);
                          }
                        }}
                      >View Details &rsaquo;</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination (desktop) */}
        <div className="cl-ml-pagination">
          <div className="cl-ml-pagination-controls">
            <button
              className="cl-ml-page-btn"
              onClick={function () { handlePageChange(currentPage - 1); }}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path d="M6 1L1 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {getPageNumbers().map(function (page) {
              return (
                <button
                  key={page}
                  className={'cl-ml-page-btn cl-ml-page-num' + (page === currentPage ? ' cl-ml-page-num--active' : '')}
                  onClick={function () { handlePageChange(page); }}
                >
                  {page}
                </button>
              );
            })}
            <button
              className="cl-ml-page-btn"
              onClick={function () { handlePageChange(currentPage + 1); }}
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
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '32px 16px', color: '#5d5d5d' }}>No cases match your filters.</div>
        )}
        {filtered.slice(0, mobileVisibleCount).map(function (row, i) {
          return (
            <div key={i} className="cl-ml-card-mobile">
              <div>
                <div className="cl-ml-card-mobile__type">{row.type}</div>
                <div className="cl-ml-card-mobile__id">{row.id}</div>
              </div>
              <div className="cl-ml-card-mobile__row">
                <span className="cl-ml-card-mobile__label">Date</span>
                <span className="cl-ml-card-mobile__value">{row.date || row.lastUpdate}</span>
              </div>
              <div className="cl-ml-card-mobile__row">
                <span className="cl-ml-card-mobile__label">Leave Type</span>
                <span className="cl-ml-card-mobile__value">{row.leaveType || 'Leave'}</span>
              </div>
              <div className="cl-ml-card-mobile__row">
                <span className="cl-ml-card-mobile__label">Status</span>
                <span className="cl-ml-card-mobile__value">
                  <span className="cl-ml-status-pill">{row.status}</span>
                </span>
              </div>
              <div className="cl-ml-card-mobile__row">
                <span className="cl-ml-card-mobile__label">Associated Claims</span>
                <span className="cl-ml-card-mobile__value">{row.associatedClaims || 'N/A'}</span>
              </div>
              <div className="cl-ml-card-mobile__row">
                <span className="cl-ml-card-mobile__label">Required Actions</span>
                <span className="cl-ml-card-mobile__value">{row.requiredActions || 'N/A'}</span>
              </div>
              <div className="cl-ml-card-mobile__actions">
                {row.status === 'Saved' ? (
                  <>
                    <button className="cl-ml-card-mobile__action-delete" onClick={function () { setDeleteTarget(row); }}>Delete</button>
                    <button
                      className="cl-ml-card-mobile__action-link"
                      onClick={function () {
                        if (row.linkPath) {
                          sessionStorage.setItem('viewingCase', JSON.stringify(row));
                          navigate(base + row.linkPath);
                        }
                      }}
                    >Resume &rsaquo;</button>
                  </>
                ) : (
                  <button
                    className="cl-ml-card-mobile__action-link"
                    onClick={function () {
                      if (row.linkPath) {
                        sessionStorage.setItem('viewingCase', JSON.stringify(row));
                        navigate(base + row.linkPath);
                      }
                    }}
                  >View Details &rsaquo;</button>
                )}
              </div>
            </div>
          );
        })}
        {mobileVisibleCount < filtered.length && (
          <div className="cl-ml-load-more">
            <button className="cl-ml-load-more-btn" onClick={function () { setMobileVisibleCount(function (c) { return c + 5; }); }}>
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="cl-ma-modal-overlay" onClick={function () { setDeleteTarget(null); }}>
          <div className="cl-ma-modal" onClick={function (e) { e.stopPropagation(); }} style={{ maxWidth: '420px', padding: '32px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 9v4" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="#dc2626"/><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#222', margin: '0 0 8px' }}>Are you sure?</h3>
              <p style={{ fontSize: '14px', color: '#5d5d5d', margin: '0 0 24px', lineHeight: 1.5 }}>
                This will remove <strong>{deleteTarget.type}</strong> ({deleteTarget.id}) from your cases.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button className="cl-ml-btn-new" style={{ background: '#fff', color: '#222', border: '1.5px solid #e4e4e4' }} onClick={function () { setDeleteTarget(null); }}>Keep Case</button>
                <button className="cl-ml-btn-new" style={{ background: '#dc2626' }} onClick={confirmDelete}>Discard Case</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
