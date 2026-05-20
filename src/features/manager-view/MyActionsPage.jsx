import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const actions = [
  { id: 1, type: 'Confirm Return to Work Details', employee: 'Amy Smith', employeeId: 'amy-smith', received: 'Jan 10, 2026', due: 'Jan 13, 2026', buttonLabel: 'Confirm Return to Work Details', action: 'rtw' },
  { id: 2, type: 'Update Contact Details', employee: 'Evan Blue', employeeId: 'evan-blue', received: 'Jan 10, 2026', due: 'Jan 13, 2026', buttonLabel: 'Update Contact Information', action: 'contact' },
  { id: 3, type: 'Confirm Return to Work Details', employee: 'Karen New', employeeId: 'karen-new', received: 'Jan 10, 2026', due: 'Jan 13, 2026', buttonLabel: 'Confirm Return to Work Details', action: 'rtw' },
];

export default function MyActionsPage() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('next30');
  const [typeFilter, setTypeFilter] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState('');

  const filteredActions = actions.filter(a => {
    if (typeFilter && !a.type.toLowerCase().includes(typeFilter.toLowerCase())) return false;
    if (employeeFilter && !a.employee.toLowerCase().includes(employeeFilter.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="mgr-page">
      <h1 className="mgr-page-title">My Actions</h1>

      <div className="mgr-card">
        <div className="mgr-filters">
          <div className="mgr-filter-group">
            <span className="mgr-filter-label">Date Range</span>
            <select className="mgr-filter-select" value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
              <option value="next30">Next 30 Days</option>
              <option value="next60">Next 60 Days</option>
              <option value="all">All</option>
            </select>
          </div>
          <div className="mgr-filter-group">
            <span className="mgr-filter-label">Type</span>
            <select className="mgr-filter-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="">Select</option>
              <option value="Return to Work">Return to Work</option>
              <option value="Contact">Contact Details</option>
            </select>
          </div>
          <div className="mgr-filter-group">
            <span className="mgr-filter-label">Employee</span>
            <select className="mgr-filter-select" value={employeeFilter} onChange={(e) => setEmployeeFilter(e.target.value)}>
              <option value="">Select</option>
              <option value="Amy Smith">Amy Smith</option>
              <option value="Evan Blue">Evan Blue</option>
              <option value="Karen New">Karen New</option>
            </select>
          </div>
        </div>
      </div>

      {filteredActions.map((action) => (
        <div className="mgr-action-card" key={action.id}>
          <div className="mgr-action-card-left">
            <div className="mgr-action-required">Action Required</div>
            <div className="mgr-action-title">
              {action.type} | <a href="#" onClick={(e) => { e.preventDefault(); navigate(`/manager/my-team/${action.employeeId}`); }}>{action.employee}</a>
            </div>
            <div className="mgr-action-meta">Received: {action.received} &nbsp; Due: {action.due}</div>
          </div>
          <button
            className="mgr-btn mgr-btn-outline"
            onClick={() => {
              if (action.action === 'rtw') {
                navigate(`/manager/return-to-work?employee=${action.employeeId}`);
              }
            }}
          >
            {action.buttonLabel}
          </button>
        </div>
      ))}
    </div>
  );
}
