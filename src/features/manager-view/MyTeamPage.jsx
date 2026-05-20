import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const today = new Date(2026, 4, 20);

const teamData = [
  { id: 'chris-jones', name: 'Chris Jones', leaveType: 'Continuous', startDate: '2026-05-01', endDate: '2026-06-05', returnDate: '2026-06-06', requiredActions: 'None' },
  { id: 'morgan-lee', name: 'Morgan Lee', leaveType: 'Intermittent', startDate: '2026-04-15', endDate: '2026-06-15', returnDate: null, requiredActions: 'None', ada: true },
  { id: 'michael-chen', name: 'Michael Chen', leaveType: 'Reduced Schedule', startDate: '2026-03-10', endDate: null, returnDate: null, requiredActions: 'None' },
  { id: 'kathrine-anderson', name: 'Katherine Anderson', leaveType: 'Intermittent', startDate: '2026-04-01', endDate: '2026-06-30', returnDate: null, requiredActions: 'None', ada: true },
  { id: 'amy-smith', name: 'Amy Smith', leaveType: 'Continuous', startDate: '2026-05-19', endDate: '2026-06-12', returnDate: '2026-06-13', requiredActions: 'Confirm Return to Work' },
  { id: 'david-park', name: 'David Park', leaveType: 'Continuous', startDate: '2026-05-12', endDate: '2026-06-09', returnDate: '2026-06-10', requiredActions: 'Confirm Return to Work' },
  { id: 'lisa-nguyen', name: 'Lisa Nguyen', leaveType: 'Intermittent', startDate: '2026-04-20', endDate: '2026-06-20', returnDate: null, requiredActions: 'None' },
  { id: 'james-wilson', name: 'James Wilson', leaveType: 'Continuous', startDate: '2026-05-01', endDate: '2026-05-20', returnDate: '2026-05-21', requiredActions: 'Confirm Return to Work' },
  { id: 'sarah-martinez', name: 'Sarah Martinez', leaveType: 'Reduced Schedule', startDate: '2026-04-01', endDate: '2026-06-30', returnDate: null, requiredActions: 'None', ada: true },
  { id: 'evan-blue', name: 'Evan Blue', leaveType: 'Continuous', startDate: '2026-05-13', endDate: '2026-06-07', returnDate: '2026-06-08', requiredActions: 'None' },
  { id: 'rachel-kim', name: 'Rachel Kim', leaveType: 'Continuous', startDate: '2026-06-01', endDate: '2026-06-20', returnDate: '2026-06-21', requiredActions: 'None' },
  { id: 'tom-harris', name: 'Tom Harris', leaveType: 'Intermittent', startDate: '2026-05-28', endDate: '2026-07-15', returnDate: null, requiredActions: 'None' },
  { id: 'nina-patel', name: 'Nina Patel', leaveType: 'Continuous', startDate: '2026-06-10', endDate: '2026-06-24', returnDate: '2026-06-25', requiredActions: 'None' },
];

const adaData = [
  { id: 'kathrine-anderson', name: 'Katherine Anderson', adaType: 'Work from Home', startDate: '2026-04-01', endDate: '2026-06-30', requiredActions: 'None' },
  { id: 'morgan-lee', name: 'Morgan Lee', adaType: 'Reduced Schedule', startDate: '2026-04-15', endDate: '2026-06-15', requiredActions: 'None' },
  { id: 'sarah-martinez', name: 'Sarah Martinez', adaType: 'Modified Duties', startDate: '2026-04-01', endDate: '2026-06-30', requiredActions: 'Review Accommodation' },
];

function parseDate(str) {
  if (!str) return null;
  return new Date(str + 'T00:00:00');
}

function isCurrentlyOnLeave(emp) {
  const start = parseDate(emp.startDate);
  const end = parseDate(emp.endDate);
  if (!start) return false;
  if (start > today) return false;
  if (!end) return true;
  return end >= today;
}

function isUpcoming(emp) {
  const start = parseDate(emp.startDate);
  if (!start) return false;
  return start > today;
}

function formatDate(str) {
  if (!str) return 'N/A';
  const d = parseDate(str);
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}

export default function MyTeamPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [leaveTypeFilter, setLeaveTypeFilter] = useState('');

  const currentLeave = teamData.filter(isCurrentlyOnLeave);
  const upcoming = teamData.filter(isUpcoming);

  const tabs = [
    { key: 'all', label: 'All Leave', count: teamData.length },
    { key: 'current', label: 'Currently on Leave', count: currentLeave.length },
    { key: 'upcoming', label: 'Upcoming', count: upcoming.length },
    { key: 'ada', label: 'ADA Accommodations', count: adaData.length },
  ];

  function getFilteredData() {
    let data;
    if (activeTab === 'current') data = currentLeave;
    else if (activeTab === 'upcoming') data = upcoming;
    else data = teamData;

    return data.filter(emp => {
      if (searchTerm && !emp.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (leaveTypeFilter && emp.leaveType !== leaveTypeFilter) return false;
      return true;
    });
  }

  const filteredTeam = getFilteredData();

  const filteredAda = adaData.filter(emp => {
    if (searchTerm && !emp.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="mgr-page">
      <h1 className="mgr-page-title">My Team</h1>
      <p className="mgr-page-subtitle">View team members currently on leave, with upcoming leaves, and ADA accommodations.</p>

      <div className="mgr-card">
        <div className="mgr-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`mgr-tab${activeTab === tab.key ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
              <span className="mgr-tab-badge">{tab.count}</span>
            </button>
          ))}
        </div>

        <div className="mgr-filters">
          <div className="mgr-filter-group">
            <span className="mgr-filter-label">Search by name</span>
            <input
              className="mgr-filter-input"
              placeholder="Employee name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {activeTab !== 'ada' && (
            <div className="mgr-filter-group">
              <span className="mgr-filter-label">Leave Type</span>
              <select className="mgr-filter-select" value={leaveTypeFilter} onChange={(e) => setLeaveTypeFilter(e.target.value)}>
                <option value="">Select</option>
                <option value="Continuous">Continuous</option>
                <option value="Intermittent">Intermittent</option>
                <option value="Reduced Schedule">Reduced Schedule</option>
              </select>
            </div>
          )}
          <button className="mgr-filter-clear" onClick={() => { setSearchTerm(''); setLeaveTypeFilter(''); }}>Clear</button>
        </div>

        {activeTab !== 'ada' ? (
          <>
            <div className="mgr-table-wrap">
              <table className="mgr-table">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Leave Type</th>
                    <th>Start Date &darr;</th>
                    <th>End Date &darr;</th>
                    <th>Return Date &darr;</th>
                    <th>Required Actions</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeam.map((emp) => (
                    <tr key={emp.id}>
                      <td>{emp.name}</td>
                      <td>{emp.leaveType}</td>
                      <td>{formatDate(emp.startDate)}</td>
                      <td>{formatDate(emp.endDate)}</td>
                      <td>{formatDate(emp.returnDate)}</td>
                      <td>
                        {emp.requiredActions !== 'None' ? (
                          <button className="mgr-table-link" onClick={() => navigate(`/manager/return-to-work?employee=${emp.id}`)}>{emp.requiredActions}</button>
                        ) : 'None'}
                      </td>
                      <td>
                        <button className="mgr-btn mgr-btn-outline mgr-btn-sm" onClick={() => navigate(`/manager/my-team/${emp.id}`)}>View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mgr-pagination">
                <span className="mgr-pagination-info">Showing 1 to {filteredTeam.length} of {filteredTeam.length} entries</span>
                <button className="mgr-pagination-btn active">1</button>
              </div>
            </div>

            {/* Mobile card list */}
            <div className="mgr-team-mobile-list">
              <div className="mgr-team-mobile-header">
                <span className="mgr-team-mobile-header-count">{filteredTeam.length} entries</span>
              </div>
              {filteredTeam.map((emp, i) => (
                <div className="mgr-team-mobile-entry" key={emp.id}>
                  <div className="mgr-team-mobile-entry-top">
                    <span className="mgr-team-mobile-entry-name">{emp.name}</span>
                    <span className="mgr-team-mobile-entry-pill">{emp.leaveType}</span>
                  </div>
                  <div className="mgr-team-mobile-entry-row">
                    <span className="mgr-team-mobile-entry-label">Start Date</span>
                    <span className="mgr-team-mobile-entry-value">{formatDate(emp.startDate)}</span>
                  </div>
                  <div className="mgr-team-mobile-entry-row">
                    <span className="mgr-team-mobile-entry-label">End Date</span>
                    <span className="mgr-team-mobile-entry-value">{formatDate(emp.endDate)}</span>
                  </div>
                  <div className="mgr-team-mobile-entry-row">
                    <span className="mgr-team-mobile-entry-label">Return Date</span>
                    <span className="mgr-team-mobile-entry-value">{formatDate(emp.returnDate)}</span>
                  </div>
                  <div className="mgr-team-mobile-entry-row">
                    <span className="mgr-team-mobile-entry-label">Required Actions</span>
                    <span className="mgr-team-mobile-entry-value">
                      {emp.requiredActions !== 'None' ? (
                        <button className="mgr-table-link" onClick={() => navigate(`/manager/return-to-work?employee=${emp.id}`)}>{emp.requiredActions}</button>
                      ) : 'None'}
                    </span>
                  </div>
                  <div className="mgr-team-mobile-entry-action">
                    <button className="mgr-team-mobile-entry-link" onClick={() => navigate(`/manager/my-team/${emp.id}`)}>
                      View Details
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 1h8v8M11 1L1 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                  {i < filteredTeam.length - 1 && <div className="mgr-team-mobile-entry-divider" />}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mgr-table-wrap">
              <table className="mgr-table">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>ADA Accommodation Type</th>
                    <th>Start Date &darr;</th>
                    <th>End Date &darr;</th>
                    <th>Required Actions</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAda.map((emp) => (
                    <tr key={emp.id}>
                      <td>{emp.name}</td>
                      <td>{emp.adaType}</td>
                      <td>{formatDate(emp.startDate)}</td>
                      <td>{formatDate(emp.endDate)}</td>
                      <td>
                        {emp.requiredActions !== 'None' ? (
                          <button className="mgr-table-link" onClick={() => navigate(`/manager/return-to-work?employee=${emp.id}`)}>{emp.requiredActions}</button>
                        ) : 'None'}
                      </td>
                      <td>
                        <button className="mgr-btn mgr-btn-outline mgr-btn-sm" onClick={() => navigate(`/manager/my-team/${emp.id}`)}>View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mgr-pagination">
                <span className="mgr-pagination-info">Showing 1 to {filteredAda.length} of {filteredAda.length} entries</span>
                <button className="mgr-pagination-btn active">1</button>
              </div>
            </div>

            {/* Mobile card list */}
            <div className="mgr-team-mobile-list">
              <div className="mgr-team-mobile-header">
                <span className="mgr-team-mobile-header-count">{filteredAda.length} entries</span>
              </div>
              {filteredAda.map((emp, i) => (
                <div className="mgr-team-mobile-entry" key={emp.id}>
                  <div className="mgr-team-mobile-entry-top">
                    <span className="mgr-team-mobile-entry-name">{emp.name}</span>
                    <span className="mgr-team-mobile-entry-pill">{emp.adaType}</span>
                  </div>
                  <div className="mgr-team-mobile-entry-row">
                    <span className="mgr-team-mobile-entry-label">Start Date</span>
                    <span className="mgr-team-mobile-entry-value">{formatDate(emp.startDate)}</span>
                  </div>
                  <div className="mgr-team-mobile-entry-row">
                    <span className="mgr-team-mobile-entry-label">End Date</span>
                    <span className="mgr-team-mobile-entry-value">{formatDate(emp.endDate)}</span>
                  </div>
                  <div className="mgr-team-mobile-entry-row">
                    <span className="mgr-team-mobile-entry-label">Required Actions</span>
                    <span className="mgr-team-mobile-entry-value">
                      {emp.requiredActions !== 'None' ? (
                        <button className="mgr-table-link" onClick={() => navigate(`/manager/return-to-work?employee=${emp.id}`)}>{emp.requiredActions}</button>
                      ) : 'None'}
                    </span>
                  </div>
                  <div className="mgr-team-mobile-entry-action">
                    <button className="mgr-team-mobile-entry-link" onClick={() => navigate(`/manager/my-team/${emp.id}`)}>
                      View Details
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 1h8v8M11 1L1 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                  {i < filteredAda.length - 1 && <div className="mgr-team-mobile-entry-divider" />}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
