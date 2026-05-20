import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const employeeData = {
  'amy-smith': {
    name: 'Amy Smith',
    subtitle: 'Continuous Leave · Approved',
    leaveType: 'Continuous',
    leaveDates: 'Jan 1 - Jan 11',
    returnDate: 'Jan 12',
    openActions: 1,
    status: 'Approved',
    overview: { reason: 'Medical', startDate: 'Jan 01, 2026', endDate: 'Jan 12, 2026', returnDate: 'Jan 12, 2026', caseStatus: 'Approved', caseNumber: 'LOA-2026-0012' },
    absences: [
      { date: 'Jan 03, 2026', hours: '8 hrs', time: '9am - 5pm', reason: 'Continuous Leave', status: 'Approved' },
      { date: 'Jan 07, 2026', hours: '8 hrs', time: '9am - 5pm', reason: 'Continuous Leave', status: 'Approved' },
      { date: 'Jan 08, 2026', hours: '8 hrs', time: '9am - 5pm', reason: 'Continuous Leave', status: 'Approved' },
      { date: 'Jan 09, 2026', hours: '8 hrs', time: '9am - 5pm', reason: 'Continuous Leave', status: 'Approved' },
      { date: 'Jan 13, 2026', hours: '8 hrs', time: '9am - 5pm', reason: 'Continuous Leave', status: 'Approved' },
    ],
    accommodations: [],
    actionItems: [{ title: 'Confirm Return to Work Details', date: 'Jan 10, 2026', due: 'Jan 13, 2026' }],
  },
  'chris-jones': {
    name: 'Chris Jones',
    subtitle: 'Continuous Leave · Approved',
    leaveType: 'Continuous',
    leaveDates: 'Jan 1 - Jan 30',
    returnDate: 'Feb 3',
    openActions: 0,
    status: 'Approved',
    overview: { reason: 'Medical', startDate: 'Jan 01, 2026', endDate: 'Jan 30, 2026', returnDate: 'Feb 03, 2026', caseStatus: 'Approved', caseNumber: 'LOA-2026-0015' },
    absences: [
      { date: 'Jan 02, 2026', hours: '8 hrs', time: '9am - 5pm', reason: 'Continuous Leave', status: 'Approved' },
      { date: 'Jan 03, 2026', hours: '8 hrs', time: '9am - 5pm', reason: 'Continuous Leave', status: 'Approved' },
    ],
    accommodations: [],
    actionItems: [],
  },
  'morgan-lee': {
    name: 'Morgan Lee',
    subtitle: 'Intermittent Leave · Approved',
    leaveType: 'Intermittent',
    leaveDates: 'Dec 4 - Feb 4',
    returnDate: 'N/A',
    openActions: 0,
    status: 'Approved',
    overview: { reason: 'Medical', startDate: 'Dec 04, 2025', endDate: 'Feb 04, 2026', returnDate: 'N/A', caseStatus: 'Approved', caseNumber: 'LOA-2025-0098' },
    absences: [],
    accommodations: [],
    actionItems: [],
  },
  'kathrine-anderson': {
    name: 'Katherine Anderson',
    subtitle: 'Continuous Leave · Approved',
    leaveType: 'Intermittent',
    leaveDates: 'Nov 15 - Jan 31',
    returnDate: 'N/A',
    openActions: 0,
    status: 'Approved',
    overview: { reason: 'Medical', startDate: 'Nov 15, 2025', endDate: 'Jan 31, 2026', returnDate: 'N/A', caseStatus: 'Approved', caseNumber: 'LOA-2025-0087' },
    absences: [],
    accommodations: [
      { type: 'Work from Home', startDate: 'Nov 15, 2025', endDate: 'Jan 31, 2026' },
      { type: 'Physical Accommodation', startDate: 'Nov 15, 2025', endDate: 'Jan 31, 2026' },
    ],
    actionItems: [],
  },
  'michael-chen': {
    name: 'Michael Chen',
    subtitle: 'Reduced Schedule Leave · Approved',
    leaveType: 'Reduced Schedule',
    leaveDates: 'Oct 30 - N/A',
    returnDate: 'N/A',
    openActions: 0,
    status: 'Approved',
    overview: { reason: 'Medical', startDate: 'Oct 30, 2025', endDate: 'None', returnDate: 'N/A', caseStatus: 'Approved', caseNumber: 'LOA-2025-0072' },
    absences: [],
    accommodations: [],
    actionItems: [],
  },
};

export default function EmployeeDetailPage() {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const emp = employeeData[employeeId] || employeeData['amy-smith'];
  const tabs = ['Overview', 'Absences', 'Accommodations', 'Actions'];

  return (
    <div className="mgr-page">
      <div className="mgr-detail-header">
        <button className="mgr-detail-back" onClick={() => navigate('/manager/my-team')}>
          &larr; Back
        </button>
        <h1 className="mgr-detail-name">{emp.name}</h1>
        <p className="mgr-detail-subtitle">{emp.subtitle}</p>
      </div>

      <div className="mgr-detail-stats">
        <div className="mgr-detail-stat">
          <div className="mgr-detail-stat-label">Leave Type</div>
          <div className="mgr-detail-stat-value">
            {emp.leaveType}
            <span className="mgr-badge mgr-badge-approved">{emp.status}</span>
          </div>
        </div>
        <div className="mgr-detail-stat">
          <div className="mgr-detail-stat-label">Leave Dates</div>
          <div className="mgr-detail-stat-value">{emp.leaveDates}</div>
        </div>
        <div className="mgr-detail-stat">
          <div className="mgr-detail-stat-label">Return Date</div>
          <div className="mgr-detail-stat-value">{emp.returnDate}</div>
        </div>
        <div className="mgr-detail-stat">
          <div className="mgr-detail-stat-label">Open Actions</div>
          <div className="mgr-detail-stat-value">{emp.openActions}</div>
        </div>
      </div>

      <div className="mgr-card" style={{ padding: 0 }}>
        <div className="mgr-tabs" style={{ padding: '0 24px' }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`mgr-tab${activeTab === tab.toLowerCase() ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ padding: 24 }}>
          {activeTab === 'overview' && (
            <div className="mgr-overview-columns">
              <div className="mgr-overview-main">
                {/* Desktop table view */}
                <div className="mgr-detail-desktop-view">
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Leave Details</h3>
                  <div className="mgr-leave-details-grid">
                    <div className="mgr-leave-details-row">
                      <span className="mgr-leave-details-label">Leave Type</span>
                      <span className="mgr-leave-details-value"><span className="mgr-badge mgr-badge-approved" style={{ fontSize: 11 }}>{emp.leaveType}</span></span>
                    </div>
                    <div className="mgr-leave-details-row">
                      <span className="mgr-leave-details-label">Reason</span>
                      <span className="mgr-leave-details-value">{emp.overview.reason}</span>
                    </div>
                    <div className="mgr-leave-details-row">
                      <span className="mgr-leave-details-label">Start Date</span>
                      <span className="mgr-leave-details-value">{emp.overview.startDate}</span>
                    </div>
                    <div className="mgr-leave-details-row">
                      <span className="mgr-leave-details-label">End Date</span>
                      <span className="mgr-leave-details-value">{emp.overview.endDate}</span>
                    </div>
                    <div className="mgr-leave-details-row">
                      <span className="mgr-leave-details-label">Return Date</span>
                      <span className="mgr-leave-details-value">{emp.overview.returnDate}</span>
                    </div>
                    <div className="mgr-leave-details-row">
                      <span className="mgr-leave-details-label">Case Status</span>
                      <span className="mgr-leave-details-value"><span className="mgr-badge mgr-badge-approved">{emp.overview.caseStatus}</span></span>
                    </div>
                    <div className="mgr-leave-details-row">
                      <span className="mgr-leave-details-label">Case #</span>
                      <span className="mgr-leave-details-value">{emp.overview.caseNumber}</span>
                    </div>
                  </div>
                </div>

                {/* Mobile card view */}
                <div className="mgr-detail-mobile-view">
                  <div className="mgr-detail-mobile-card">
                    <div className="mgr-detail-mobile-card-title">Leave Details</div>
                    <div className="mgr-detail-mobile-row">
                      <span className="mgr-detail-mobile-label">Leave Type</span>
                      <span className="mgr-detail-mobile-value">{emp.leaveType}</span>
                    </div>
                    <div className="mgr-detail-mobile-row">
                      <span className="mgr-detail-mobile-label">Reason</span>
                      <span className="mgr-detail-mobile-value">{emp.overview.reason}</span>
                    </div>
                    <div className="mgr-detail-mobile-row">
                      <span className="mgr-detail-mobile-label">Start Date</span>
                      <span className="mgr-detail-mobile-value">{emp.overview.startDate}</span>
                    </div>
                    <div className="mgr-detail-mobile-row">
                      <span className="mgr-detail-mobile-label">End Date</span>
                      <span className="mgr-detail-mobile-value">{emp.overview.endDate}</span>
                    </div>
                    <div className="mgr-detail-mobile-row">
                      <span className="mgr-detail-mobile-label">Return Date</span>
                      <span className="mgr-detail-mobile-value">{emp.overview.returnDate}</span>
                    </div>
                    <div className="mgr-detail-mobile-row">
                      <span className="mgr-detail-mobile-label">Case Status</span>
                      <span className="mgr-detail-mobile-value"><span className="mgr-badge mgr-badge-approved">{emp.overview.caseStatus}</span></span>
                    </div>
                    <div className="mgr-detail-mobile-row">
                      <span className="mgr-detail-mobile-label">Case #</span>
                      <span className="mgr-detail-mobile-value">{emp.overview.caseNumber}</span>
                    </div>
                  </div>
                </div>
              </div>

              {emp.openActions > 0 && (
                <div className="mgr-overview-sidebar">
                  <div className="mgr-open-action-card">
                    <h4>Open Actions</h4>
                    <div className="mgr-open-action-inner">
                      <h5>
                        Confirm RTW Date
                        <span style={{ color: '#d32f2f', fontSize: 12, fontWeight: 600 }}>&#9679; Action Required</span>
                      </h5>
                      <p>Employee estimated return is May 30. Confirm return to work date and schedule.</p>
                      <div className="mgr-open-action-due">Due 2025-05-30</div>
                      <button className="mgr-btn mgr-btn-outline" onClick={() => navigate(`/manager/return-to-work?employee=${employeeId}`)}>
                        Confirm Return to Work Details
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'absences' && (
            <>
              {emp.actionItems.length > 0 && (
                <div className="mgr-action-card" style={{ marginBottom: 24 }}>
                  <div className="mgr-action-card-left">
                    <div className="mgr-action-required">Action Required</div>
                    <div className="mgr-action-title">{emp.actionItems[0].title}</div>
                    <div className="mgr-action-meta">{emp.actionItems[0].date} &nbsp; Due: {emp.actionItems[0].due}</div>
                  </div>
                  <button className="mgr-btn mgr-btn-outline" onClick={() => navigate(`/manager/return-to-work?employee=${employeeId}`)}>
                    Confirm Return to Work Details
                  </button>
                </div>
              )}
              {emp.absences.length > 0 ? (
                <>
                  {/* Desktop table */}
                  <div className="mgr-detail-desktop-view">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 700 }}>Absence Log</h3>
                      <span style={{ fontSize: 13, color: '#555' }}>Total hours missed: <strong>32:00</strong> | Total entries: <strong>{emp.absences.length}</strong></span>
                    </div>
                    <table className="mgr-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Hours Missed</th>
                          <th>Time Missed</th>
                          <th>Reason</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {emp.absences.map((a, i) => (
                          <tr key={i}>
                            <td>{a.date}</td>
                            <td>{a.hours}</td>
                            <td>{a.time}</td>
                            <td>{a.reason}</td>
                            <td><span className="mgr-badge mgr-badge-approved">{a.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mgr-pagination">
                      <span className="mgr-pagination-info">Showing 1 to {emp.absences.length} of {emp.absences.length} entries</span>
                    </div>
                  </div>

                  {/* Mobile cards */}
                  <div className="mgr-detail-mobile-view">
                    <div className="mgr-detail-mobile-card-title">Absence Log · {emp.absences.length} entries</div>
                    {emp.absences.map((a, i) => (
                      <div className="mgr-detail-mobile-card" key={i}>
                        <div className="mgr-detail-mobile-row">
                          <span className="mgr-detail-mobile-label">Date</span>
                          <span className="mgr-detail-mobile-value">{a.date}</span>
                        </div>
                        <div className="mgr-detail-mobile-row">
                          <span className="mgr-detail-mobile-label">Hours Missed</span>
                          <span className="mgr-detail-mobile-value">{a.hours}</span>
                        </div>
                        <div className="mgr-detail-mobile-row">
                          <span className="mgr-detail-mobile-label">Time Missed</span>
                          <span className="mgr-detail-mobile-value">{a.time}</span>
                        </div>
                        <div className="mgr-detail-mobile-row">
                          <span className="mgr-detail-mobile-label">Reason</span>
                          <span className="mgr-detail-mobile-value">{a.reason}</span>
                        </div>
                        <div className="mgr-detail-mobile-row">
                          <span className="mgr-detail-mobile-label">Status</span>
                          <span className="mgr-detail-mobile-value"><span className="mgr-badge mgr-badge-approved">{a.status}</span></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="mgr-empty-state">No absence records available.</div>
              )}
            </>
          )}

          {activeTab === 'accommodations' && (
            <>
              {emp.accommodations.length > 0 ? (
                <>
                  {/* Desktop table — nested card matching Figma */}
                  <div className="mgr-detail-desktop-view">
                    <div className="mgr-accom-card">
                      <div className="mgr-accom-card-header">
                        <h3 className="mgr-accom-card-title">Employee ADA Accommodations</h3>
                        <span className="mgr-accom-card-count"><strong>{emp.accommodations.length}</strong> Active Accommodation{emp.accommodations.length > 1 ? 's' : ''}</span>
                      </div>
                      <table className="mgr-table mgr-table--inner">
                        <thead>
                          <tr>
                            <th>ADA Accommodation Type</th>
                            <th>Start Date &darr;</th>
                            <th>End Date &darr;</th>
                          </tr>
                        </thead>
                        <tbody>
                          {emp.accommodations.map((a, i) => (
                            <tr key={i}>
                              <td>{a.type}</td>
                              <td>{a.startDate}</td>
                              <td>{a.endDate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="mgr-accom-card-footer">
                        <span className="mgr-pagination-info">Showing 1 to {emp.accommodations.length} of {emp.accommodations.length} entries</span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile cards */}
                  <div className="mgr-detail-mobile-view">
                    <div className="mgr-accom-card">
                      <div className="mgr-accom-card-header">
                        <h3 className="mgr-accom-card-title">Employee ADA Accommodations</h3>
                        <span className="mgr-accom-card-count"><strong>{emp.accommodations.length}</strong> Active</span>
                      </div>
                      {emp.accommodations.map((a, i) => (
                        <div className="mgr-detail-mobile-card" key={i}>
                          <div className="mgr-detail-mobile-row">
                            <span className="mgr-detail-mobile-label">Type</span>
                            <span className="mgr-detail-mobile-value">{a.type}</span>
                          </div>
                          <div className="mgr-detail-mobile-row">
                            <span className="mgr-detail-mobile-label">Start Date</span>
                            <span className="mgr-detail-mobile-value">{a.startDate}</span>
                          </div>
                          <div className="mgr-detail-mobile-row">
                            <span className="mgr-detail-mobile-label">End Date</span>
                            <span className="mgr-detail-mobile-value">{a.endDate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="mgr-empty-state">This employee has no active ADA accommodations.</div>
              )}
            </>
          )}

          {activeTab === 'actions' && (
            <>
              {emp.actionItems.length > 0 ? (
                emp.actionItems.map((a, i) => (
                  <div className="mgr-action-card" key={i}>
                    <div className="mgr-action-card-left">
                      <div className="mgr-action-required">Action Required</div>
                      <div className="mgr-action-title">{a.title}</div>
                      <div className="mgr-action-meta">{a.date} &nbsp; Due: {a.due}</div>
                    </div>
                    <button className="mgr-btn mgr-btn-outline" onClick={() => navigate(`/manager/return-to-work?employee=${employeeId}`)}>
                      Confirm Return to Work Details
                    </button>
                  </div>
                ))
              ) : (
                <div className="mgr-empty-state">No pending actions for this employee.</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
