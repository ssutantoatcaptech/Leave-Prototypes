import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function MyCasesPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const casesData = [
    {
      type: 'Illness or Injury',
      id: 'CLM #12345',
      lastUpdate: 'XX / XX / XXXX',
      status: 'Saved',
      statusColor: 'amber',
      required: null,
      actions: ['View Details'],
      link: '/claims-and-leave/case-detail',
    },
    {
      type: 'Birthing parent pregnancy',
      id: 'CLM #12890',
      lastUpdate: '05 / 01 / 2025',
      status: 'Approved',
      statusColor: 'green',
      required: null,
      actions: ['View Details'],
      link: '/claims-and-leave/case-detail-pregnancy',
    },
    {
      type: 'Illness or Injury',
      id: 'NTN #12554',
      lastUpdate: 'XX / XX / XXXX',
      status: 'Decisioned',
      statusColor: 'green',
      required: null,
      actions: ['View Details'],
      link: '/claims-and-leave/case-detail',
    },
    {
      type: 'Caring for family member',
      id: 'CLM #13201',
      lastUpdate: '04 / 30 / 2025',
      status: 'Approved',
      statusColor: 'green',
      required: null,
      actions: ['View Details'],
      link: '/claims-and-leave/case-detail-caregiver',
    },
    {
      type: 'Military-related',
      id: 'NTN #09881',
      lastUpdate: 'XX / XX / XXXX',
      status: 'Closed',
      statusColor: 'gray',
      required: null,
      actions: ['View Details'],
      link: null,
    },
  ];

  const filtered = useMemo(() => {
    return casesData.filter((row) => {
      if (statusFilter !== 'All' && row.status !== statusFilter) return false;
      if (typeFilter !== 'All' && row.type !== typeFilter) return false;
      return true;
    });
  }, [statusFilter, typeFilter]);

  return (
    <div className="cl-page">
      <div className="cl-breadcrumb">
        <Link to="/claims-and-leave" className="cl-breadcrumb-link">Claims &amp; Leave</Link>
        <span className="cl-breadcrumb-sep">&gt;</span>
        <span>My Cases</span>
      </div>

      <div className="cl-page-header">
        <div>
          <h1 className="cl-page-title">My Cases</h1>
          <p className="cl-page-desc">Manage your active, saved, and historical leave and claim cases.</p>
        </div>
        <div className="cl-page-actions">
          <button className="cl-btn cl-btn--dark">+ Request New Leave/Claim</button>
        </div>
      </div>

      {/* Filters */}
      <div className="cl-filter-bar">
        <div className="cl-filters-left">
          <select className="cl-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">Status: All Leaves</option>
            <option value="Saved">Saved</option>
            <option value="Approved">Approved</option>
            <option value="Decisioned">Decisioned</option>
            <option value="Closed">Closed</option>
          </select>
          <select className="cl-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="All">Leave Type</option>
            <option value="Illness or Injury">Illness or Injury</option>
            <option value="Birthing parent pregnancy">Birthing Parent Pregnancy</option>
            <option value="Caring for family member">Caring for Family Member</option>
            <option value="Military-related">Military-related</option>
          </select>
        </div>
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
              <th className="cl-th-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '32px 16px', color: '#6b7280' }}>No cases match your filters.</td></tr>
            )}
            {filtered.map((row, i) => (
              <tr key={i}>
                <td>
                  <div className="cl-cell-stacked">
                    <span className="cl-cell-primary">{row.type}</span>
                    <span className="cl-cell-secondary">{row.id}</span>
                  </div>
                </td>
                <td className="cl-cell-muted">{row.lastUpdate}</td>
                <td>
                  <span className={`cl-badge cl-badge--${row.statusColor}`}>{row.status}</span>
                </td>
                <td>
                  {row.required && (
                    <span className="cl-required-action">{row.required}</span>
                  )}
                </td>
                <td className="cl-td-right">
                  <div className="cl-action-links">
                    {row.actions.map((action, j) => (
                      <span key={j}>
                        <button
                          className="cl-link-btn"
                          onClick={() => {
                            if (action === 'View Details' && row.link) {
                              navigate(row.link);
                            }
                          }}
                        >
                          {action}
                        </button>
                        {j < row.actions.length - 1 && <span className="cl-action-sep">|</span>}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
