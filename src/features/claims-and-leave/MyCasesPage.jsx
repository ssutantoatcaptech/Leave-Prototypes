import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useBasePath from './useBasePath';

var initialCases = [
  {
    type: 'Illness or Injury',
    id: 'CLM #12345',
    lastUpdate: '04 / 15 / 2026',
    status: 'Saved',
    statusColor: 'amber',
    required: null,
    actions: ['View Details'],
    linkPath: '/case-detail',
  },
  {
    type: 'Birthing parent pregnancy',
    id: 'CLM #12890',
    lastUpdate: '05 / 01 / 2026',
    status: 'Approved',
    statusColor: 'green',
    required: null,
    actions: ['View Details'],
    linkPath: '/case-detail-pregnancy',
  },
  {
    type: 'Illness or Injury',
    id: 'NTN #12554',
    lastUpdate: '03 / 22 / 2026',
    status: 'Decisioned',
    statusColor: 'green',
    required: null,
    actions: ['View Details'],
    linkPath: '/case-detail',
  },
  {
    type: 'Caring for family member',
    id: 'CLM #13201',
    lastUpdate: '04 / 30 / 2026',
    status: 'Approved',
    statusColor: 'green',
    required: null,
    actions: ['View Details'],
    linkPath: '/case-detail-caregiver',
  },
  {
    type: 'Military-related',
    id: 'NTN #09881',
    lastUpdate: '01 / 10 / 2026',
    status: 'Closed',
    statusColor: 'gray',
    required: null,
    actions: ['View Details'],
    linkPath: null,
  },
];

export default function MyCasesPage() {
  var base = useBasePath();
  var navigate = useNavigate();
  var [statusFilter, setStatusFilter] = useState('All');
  var [typeFilter, setTypeFilter] = useState('All');
  var [hiddenIds, setHiddenIds] = useState([]);
  var [deleteTarget, setDeleteTarget] = useState(null);

  var casesData = initialCases.filter(function (c) { return hiddenIds.indexOf(c.id) === -1; });

  var filtered = useMemo(function () {
    return casesData.filter(function (row) {
      if (statusFilter !== 'All' && row.status !== statusFilter) return false;
      if (typeFilter !== 'All' && row.type !== typeFilter) return false;
      return true;
    });
  }, [statusFilter, typeFilter, hiddenIds]);

  function confirmDelete() {
    if (deleteTarget) {
      setHiddenIds(function (prev) { return prev.concat(deleteTarget.id); });
    }
    setDeleteTarget(null);
  }

  return (
    <div className="cl-page">
      <div className="cl-breadcrumb">
        <Link to={base} className="cl-breadcrumb-link">Claims &amp; Leave</Link>
        <span className="cl-breadcrumb-sep">&gt;</span>
        <span>My Cases</span>
      </div>

      <div className="cl-page-header">
        <div>
          <h1 className="cl-page-title">My Cases</h1>
          <p className="cl-page-desc">Manage your active, saved, and historical leave and claim cases.</p>
        </div>
        <div className="cl-page-actions">
          <button className="cl-btn cl-btn--dark" onClick={function () { navigate(base + '/file-claim'); }}>+ Request New Leave/Claim</button>
        </div>
      </div>

      {/* Filters */}
      <div className="cl-filter-bar">
        <select className="cl-select" value={statusFilter} onChange={function (e) { setStatusFilter(e.target.value); }}>
          <option value="All">Status: All Leaves</option>
          <option value="Saved">Saved</option>
          <option value="Approved">Approved</option>
          <option value="Decisioned">Decisioned</option>
          <option value="Closed">Closed</option>
        </select>
        <select className="cl-select" value={typeFilter} onChange={function (e) { setTypeFilter(e.target.value); }}>
          <option value="All">Leave Type</option>
          <option value="Illness or Injury">Illness or Injury</option>
          <option value="Birthing parent pregnancy">Birthing Parent Pregnancy</option>
          <option value="Caring for family member">Caring for Family Member</option>
          <option value="Military-related">Military-related</option>
        </select>
        <span className="cl-filter-count">Showing {filtered.length} leaves</span>
      </div>

      {/* Table */}
      <div className="cl-table-wrap">
        <table className="cl-table">
          <thead>
            <tr>
              <th>Type &amp; ID</th>
              <th>Last Update</th>
              <th>Status</th>
              <th>Required Actions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '32px 16px', color: '#6b7280' }}>No cases match your filters.</td></tr>
            )}
            {filtered.map(function (row, i) {
              return (
                <tr key={i}>
                  <td>
                    <div className="cl-cell-stacked">
                      <span className="cl-cell-primary">{row.type}</span>
                      <span className="cl-cell-secondary">{row.id}</span>
                    </div>
                  </td>
                  <td className="cl-cell-muted">{row.lastUpdate}</td>
                  <td>
                    <span className={'cl-badge cl-badge--' + row.statusColor}>{row.status}</span>
                  </td>
                  <td>
                    {row.required && (
                      <span className="cl-required-action">{row.required}</span>
                    )}
                  </td>
                  <td>
                    <div className="cl-action-links">
                      {row.actions.map(function (action, j) {
                        return (
                          <span key={j}>
                            <button
                              className="cl-btn cl-btn--outline"
                              onClick={function () {
                                if (action === 'View Details' && row.linkPath) {
                                  navigate(base + row.linkPath);
                                }
                              }}
                            >
                              {action}
                            </button>
                            {j < row.actions.length - 1 && <span className="cl-action-sep">|</span>}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="cl-cards-mobile">
        {filtered.length === 0 && (
          <div className="cl-card-empty-mobile">No cases match your filters.</div>
        )}
        {filtered.map(function (row, i) {
          var canDelete = row.status !== 'Closed' && row.status !== 'Decisioned';
          return (
            <div key={i} className="cl-card-mobile">
              <div className="cl-card-mobile-header">
                <span className="cl-card-mobile-primary">{row.type}</span>
                <span className={'cl-badge cl-badge--' + row.statusColor}>{row.status}</span>
              </div>
              <span className="cl-card-mobile-type">{row.id}</span>
              <div className="cl-card-mobile-details">
                <div className="cl-card-mobile-field">
                  <span className="cl-card-mobile-label">Last Update</span>
                  <span className="cl-card-mobile-value">{row.lastUpdate}</span>
                </div>
                {row.required && (
                  <div className="cl-card-mobile-field">
                    <span className="cl-card-mobile-label">Required</span>
                    <span className="cl-card-mobile-value cl-required-action">{row.required}</span>
                  </div>
                )}
              </div>
              <button
                className="cl-card-mobile-action"
                onClick={function () { if (row.linkPath) navigate(base + row.linkPath); }}
              >
                View Details
              </button>
              {canDelete && (
                <button
                  className="cl-card-mobile-delete-text"
                  onClick={function () { setDeleteTarget(row); }}
                >
                  Delete Case
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="cl-delete-modal-backdrop" onClick={function () { setDeleteTarget(null); }}>
          <div className="cl-delete-modal" onClick={function (e) { e.stopPropagation(); }}>
            <div className="cl-delete-modal-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 9v4" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="#dc2626"/><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="cl-delete-modal-title">Are you sure?</h3>
            <p className="cl-delete-modal-desc">
              This will remove <strong>{deleteTarget.type}</strong> ({deleteTarget.id}) from your cases. It will reappear when you refresh the page.
            </p>
            <div className="cl-delete-modal-actions">
              <button className="cl-delete-modal-btn cl-delete-modal-btn--keep" onClick={function () { setDeleteTarget(null); }}>Keep Case</button>
              <button className="cl-delete-modal-btn cl-delete-modal-btn--discard" onClick={confirmDelete}>Discard Case</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
