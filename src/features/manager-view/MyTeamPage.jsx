import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const teamData = [
  { id: 'amy-smith', name: 'Amy Smith', leaveType: 'Continuous', startDate: 'Jan 01, 2026', endDate: 'Jan 11, 2026', returnDate: 'Jan 12, 2026', requiredActions: 'Confirm Return to Work' },
  { id: 'chris-jones', name: 'Chris Jones', leaveType: 'Continuous', startDate: 'Jan 01, 2026', endDate: 'Jan 31, 2026', returnDate: 'Feb 03, 2026', requiredActions: 'None' },
  { id: 'morgan-lee', name: 'Morgan Lee', leaveType: 'Intermittent', startDate: 'Dec 04, 2025', endDate: 'Feb 04, 2026', returnDate: 'N/A', requiredActions: 'None' },
  { id: 'kathrine-anderson', name: 'Kathrine Anderson', leaveType: 'Intermittent', startDate: 'Nov 15, 2025', endDate: 'Jan 31, 2026', returnDate: 'N/A', requiredActions: 'None' },
  { id: 'michael-chen', name: 'Michael Chen', leaveType: 'Reduced Schedule', startDate: 'Oct 30, 2025', endDate: 'None', returnDate: 'N/A', requiredActions: 'None' },
  { id: 'david-park', name: 'David Park', leaveType: 'Continuous', startDate: 'Jan 06, 2026', endDate: 'Jan 20, 2026', returnDate: 'Jan 21, 2026', requiredActions: 'Confirm Return to Work' },
  { id: 'lisa-nguyen', name: 'Lisa Nguyen', leaveType: 'Intermittent', startDate: 'Dec 15, 2025', endDate: 'Feb 15, 2026', returnDate: 'N/A', requiredActions: 'None' },
  { id: 'james-wilson', name: 'James Wilson', leaveType: 'Continuous', startDate: 'Jan 08, 2026', endDate: 'Jan 22, 2026', returnDate: 'Jan 23, 2026', requiredActions: 'None' },
  { id: 'sarah-martinez', name: 'Sarah Martinez', leaveType: 'Reduced Schedule', startDate: 'Jan 02, 2026', endDate: 'Jan 31, 2026', returnDate: 'N/A', requiredActions: 'None' },
  { id: 'evan-blue', name: 'Evan Blue', leaveType: 'Continuous', startDate: 'Jan 10, 2026', endDate: 'Jan 24, 2026', returnDate: 'Jan 25, 2026', requiredActions: 'None' },
];

const adaData = [
  { id: 'kathrine-anderson', name: 'Kathrine Anderson', adaType: 'Work from Home', startDate: 'Nov 15, 2025', endDate: 'Jan 31, 2026', requiredActions: 'None' },
  { id: 'morgan-lee', name: 'Morgan Lee', adaType: 'Reduced Schedule', startDate: 'Oct 30, 2025', endDate: 'None', requiredActions: 'None' },
];

export default function MyTeamPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [leaveTypeFilter, setLeaveTypeFilter] = useState('');

  const tabs = [
    { key: 'all', label: 'All Leave', count: 10 },
    { key: 'current', label: 'Currently on Leave', count: 5 },
    { key: 'upcoming', label: 'Upcoming', count: 3 },
    { key: 'ada', label: 'ADA Accommodations', count: 2 },
  ];

  const filteredTeam = teamData.filter(emp => {
    if (searchTerm && !emp.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (leaveTypeFilter && emp.leaveType !== leaveTypeFilter) return false;
    return true;
  });

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
          <div className="mgr-filter-group">
            <span className="mgr-filter-label">Leave Type</span>
            <select className="mgr-filter-select" value={leaveTypeFilter} onChange={(e) => setLeaveTypeFilter(e.target.value)}>
              <option value="">Select</option>
              <option value="Continuous">Continuous</option>
              <option value="Intermittent">Intermittent</option>
              <option value="Reduced Schedule">Reduced Schedule</option>
            </select>
          </div>
          <button className="mgr-filter-clear" onClick={() => { setSearchTerm(''); setLeaveTypeFilter(''); }}>Clear</button>
        </div>

        {activeTab !== 'ada' ? (
          <>
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
                    <td>{emp.startDate}</td>
                    <td>{emp.endDate}</td>
                    <td>{emp.returnDate}</td>
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
          </>
        ) : (
          <>
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
                {filteredAda.map((emp, i) => (
                  <tr key={i}>
                    <td>{emp.name}</td>
                    <td>{emp.adaType}</td>
                    <td>{emp.startDate}</td>
                    <td>{emp.endDate}</td>
                    <td>{emp.requiredActions}</td>
                    <td>
                      <button className="mgr-btn mgr-btn-outline mgr-btn-sm" onClick={() => navigate(`/manager/my-team/${emp.id}`)}>View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mgr-pagination">
              <span className="mgr-pagination-info">Showing 1 to 2 of 2 entries</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
