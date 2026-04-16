import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { absenceDetailCases, absenceHistoryAbsences } from '../../data/overviewData';
import '../overview/overview-react.css';
import './absence-history-react.css';

function formatDate(isoDate) {
  if (!isoDate) return 'TBD';
  const d = new Date(`${isoDate}T00:00:00`);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function statusClass(status) {
  if (status === 'APPROVED') return 'st-approved';
  if (status === 'COMPLETED') return 'st-completed';
  return 'st-pending';
}

function SiteNav() {
  return (
    <div className="top-nav">
      <div className="nav-main">
        <div className="nav-main-left">
          <div className="nav-brand">my<span>Mutual</span></div>
          <nav className="nav-links">
            <button className="nav-link" type="button">Dashboard</button>
            <button className="nav-link" type="button">My Coverages <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            <button className="nav-link" type="button">Claims</button>
            <button className="nav-link active" type="button">Absences</button>
            <button className="nav-link" type="button">Support</button>
          </nav>
        </div>
        <div className="nav-utilities">
          <button className="nav-util" type="button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 9h12M6 13h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Find ID Card
          </button>
          <button className="nav-util" type="button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Messages
          </button>
          <button className="nav-bell" type="button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3C8.69 3 6 5.69 6 9v4l-2 3h16l-2-3V9c0-3.31-2.69-6-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 21a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span className="nav-bell-dot"/>
          </button>
          <div className="nav-avatar">
            <div className="nav-avatar-circle">SJ</div>
            <span className="nav-avatar-name">Sarah Johnson</span>
          </div>
        </div>
      </div>
      <div className="nav-secondary">
        <button className="nav-tab" type="button">Overview</button>
        <button className="nav-tab" type="button">Plan &amp; Request Absence</button>
        <button className="nav-tab active" type="button">My Absences</button>
      </div>
    </div>
  );
}

export default function AbsenceHistoryReactPage() {
  const [statusFilter, setStatusFilter] = useState('ALL');

  const visibleRows = useMemo(() => {
    const sorted = [...absenceHistoryAbsences].sort((a, b) => (a.startDate < b.startDate ? 1 : -1));
    if (statusFilter === 'ALL') return sorted;
    return sorted.filter((row) => row.status === statusFilter);
  }, [statusFilter]);

  return (
    <div className="ah-page-shell">
      <SiteNav />

      <div className="overview-page">
        <div className="ah-header-row">
          <div className="ah-header-copy">
            <h1>Absence History</h1>
            <p>Review your current and prior absence cases, including status, dates, and submitted coverage.</p>
          </div>
          <Link className="ah-back-link" to="/overview-react">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to Overview
          </Link>
        </div>

        <div className="ah-filter-row">
          <span className="ah-filter-label">Status</span>
          <div className="ah-filter-group">
            {['ALL', 'PENDING', 'APPROVED', 'COMPLETED'].map((status) => (
              <button
                key={status}
                className={`ah-filter-btn ${statusFilter === status ? 'active' : ''}`}
                type="button"
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="ah-table-wrap">
          <table className="ah-table">
            <thead>
              <tr>
                <th>Case</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Leave Dates</th>
                <th>Duration</th>
                <th>Benefits</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row) => {
                const hasDetailRoute = Boolean(absenceDetailCases[row.id]);
                return (
                  <tr key={row.id}>
                    <td>
                      <div className="ah-case-title">{row.title}</div>
                      <div className="ah-case-meta">{row.id} · {row.frequency}</div>
                    </td>
                    <td>
                      <span className={`ov-history-status ${statusClass(row.status)}`}>
                        <span className="dot" />
                        {row.status}
                      </span>
                    </td>
                    <td>{formatDate(row.submittedAt)}</td>
                    <td>{formatDate(row.startDate)} - {formatDate(row.endDate)}</td>
                    <td>{row.duration}</td>
                    <td>{row.benefits}</td>
                    <td>
                      {hasDetailRoute ? (
                        <Link className="ah-action-link" to={`/absence-details/${row.id}`}>View Details</Link>
                      ) : (
                        <span className="ah-action-disabled">No React detail yet</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}