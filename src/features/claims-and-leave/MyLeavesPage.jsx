import { NavLink, Link } from 'react-router-dom';
import useBasePath from './useBasePath';

const leavesData = [
  {
    type: 'Birthing Parent / Pregnancy',
    id: 'LV-2026-00312',
    status: 'Under Review',
    statusColor: 'blue',
    schedule: 'Continuous',
    startDate: 'Nov 4, 2026',
    endDate: 'Feb 2, 2026',
    claims: 'CLM-2026-08941',
    actions: ['View', 'Edit'],
  },
  {
    type: 'Illness or Injury (Self)',
    id: 'LV-2026-00287',
    status: 'Decisioned',
    statusColor: 'green',
    schedule: 'Intermittent',
    startDate: 'Sep 1, 2026',
    endDate: 'Dec 31, 2026',
    claims: 'CLM-2026-08832',
    actions: ['View', 'Log Time'],
  },
  {
    type: 'Caring for a Family Member',
    id: 'LV-2026-00250',
    status: 'Saved',
    statusColor: 'amber',
    schedule: 'Reduced Schedule',
    startDate: '—',
    endDate: '—',
    claims: '—',
    actions: ['Resume', 'Delete'],
  },
  {
    type: 'Military-Related Leave',
    id: 'LV-2026-00198',
    status: 'Closed',
    statusColor: 'gray',
    schedule: 'Continuous',
    startDate: 'Mar 15, 2026',
    endDate: 'Jun 14, 2026',
    claims: 'CLM-2026-05120',
    actions: ['View'],
  },
];

export default function MyLeavesPage() {
  const base = useBasePath();
  return (
    <div className="cl-page">
      <div className="cl-breadcrumb">
        <Link to={base} className="cl-breadcrumb-link">Claims &amp; Leave</Link>
        <span className="cl-breadcrumb-sep">&gt;</span>
        <span>My Leaves</span>
      </div>

      <div className="cl-page-header">
        <div>
          <h1 className="cl-page-title">My Leaves</h1>
          <p className="cl-page-desc">Manage your active, saved, and historical leave requests.</p>
        </div>
        <div className="cl-page-header-actions">
          <NavLink to={`${base}/leave-planning`} className="cl-btn cl-btn--outline">Leave Planning Tool</NavLink>
          <button className="cl-btn cl-btn--dark">+ Request New Leave</button>
        </div>
      </div>

      {/* Filters */}
      <div className="cl-filter-bar">
        <select className="cl-select">
          <option>Status: All Leaves</option>
          <option>Under Review</option>
          <option>Decisioned</option>
          <option>Saved</option>
          <option>Closed</option>
        </select>
        <select className="cl-select">
          <option>Leave Type</option>
          <option>Birthing Parent</option>
          <option>Illness or Injury</option>
          <option>Caring for Family</option>
          <option>Military-Related</option>
        </select>
        <span className="cl-filter-count">Showing 4 leaves</span>
      </div>

      {/* Table */}
      <div className="cl-table-wrap">
        <table className="cl-table">
          <thead>
            <tr>
              <th>Leave Type &amp; ID</th>
              <th>Status</th>
              <th>Schedule</th>
              <th>Dates (Start – End)</th>
              <th>Associated Claims</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leavesData.map((row, i) => (
              <tr key={i}>
                <td>
                  <div className="cl-cell-stacked">
                    <span className="cl-cell-primary">{row.type}</span>
                    <span className="cl-cell-secondary">{row.id}</span>
                  </div>
                </td>
                <td>
                  <span className={`cl-badge cl-badge--${row.statusColor}`}>{row.status}</span>
                </td>
                <td>{row.schedule}</td>
                <td>{row.startDate} – {row.endDate}</td>
                <td className="cl-cell-mono">{row.claims}</td>
                <td>
                  <div className="cl-action-links">
                    {row.actions.map((action, j) => (
                      <button key={j} className="cl-link-btn">{action}</button>
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
