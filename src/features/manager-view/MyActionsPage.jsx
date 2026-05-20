import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const actionItems = [
  { id: 1, title: 'Confirm Return to Work Details', tag: 'Leave', description: 'Amy Smith is scheduled to return. Please confirm return to work details.', date: 'May 18, 2026', employeeId: 'amy-smith', action: 'rtw' },
  { id: 2, title: 'Confirm Return to Work Details', tag: 'Leave', description: 'David Park is scheduled to return. Please confirm return to work details.', date: 'May 18, 2026', employeeId: 'david-park', action: 'rtw' },
  { id: 3, title: 'Confirm Return to Work Details', tag: 'Leave', description: 'James Wilson has returned. Please confirm return to work details.', date: 'May 15, 2026', employeeId: 'james-wilson', action: 'rtw' },
];

const recentActivity = [
  { id: 4, title: 'Leave Approved', tag: 'Leave', description: 'Chris Jones’ continuous leave has been approved.', date: 'May 14, 2026', employeeId: 'chris-jones' },
  { id: 5, title: 'New Accommodation Request', tag: 'ADA', description: 'Sarah Martinez has submitted a new accommodation request for review.', date: 'May 12, 2026', employeeId: 'sarah-martinez' },
];

export default function MyActionsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('actions');
  const [topicFilter, setTopicFilter] = useState('');
  const [sortBy, setSortBy] = useState('priority');

  const tabs = [
    { key: 'actions', label: 'Action Required', count: actionItems.length },
    { key: 'recent', label: 'Recent Activity', count: recentActivity.length },
  ];

  const currentItems = activeTab === 'actions' ? actionItems : recentActivity;

  const filteredItems = currentItems.filter(item => {
    if (topicFilter && item.tag.toLowerCase() !== topicFilter.toLowerCase()) return false;
    return true;
  });

  return (
    <div className="mgr-page">
      <h1 className="mgr-page-title">Tasks and Notifications</h1>
      <p className="mgr-page-subtitle">Stay updated on your team's benefits and required actions.</p>

      <div className="mgr-card mgr-tasks-card">
        <div className="mgr-tasks-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`mgr-tasks-tab${activeTab === tab.key ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <div className="mgr-tasks-filters">
          <div className="mgr-filter-group">
            <span className="mgr-filter-label">Notification Topic</span>
            <select className="mgr-filter-select" value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)}>
              <option value="">All Topics</option>
              <option value="Leave">Leave</option>
              <option value="ADA">ADA</option>
            </select>
          </div>
          <div className="mgr-filter-group">
            <span className="mgr-filter-label">Sort By</span>
            <select className="mgr-filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="date">Date</option>
            </select>
          </div>
        </div>

        <div className="mgr-tasks-list">
          {filteredItems.map((item) => (
            <div className="mgr-tasks-item" key={item.id}>
              <div className="mgr-tasks-item-content">
                <div className="mgr-tasks-item-header">
                  <span className="mgr-tasks-item-title">{item.title}</span>
                  <span className="mgr-tasks-item-tag">{item.tag}</span>
                </div>
                <p className="mgr-tasks-item-desc">{item.description}</p>
                <span className="mgr-tasks-item-date">{item.date}</span>
              </div>
              <button
                className="mgr-btn mgr-btn-outline mgr-btn-sm"
                onClick={() => {
                  if (item.action === 'rtw') {
                    navigate(`/manager/return-to-work?employee=${item.employeeId}`);
                  } else {
                    navigate(`/manager/my-team/${item.employeeId}`);
                  }
                }}
              >
                View
              </button>
            </div>
          ))}
        </div>

        <div className="mgr-tasks-pagination">
          <div className="mgr-tasks-pagination-pages">
            <button className="mgr-tasks-page-btn" disabled>&lsaquo;</button>
            <button className="mgr-tasks-page-btn active">1</button>
            <button className="mgr-tasks-page-btn">&rsaquo;</button>
          </div>
          <span className="mgr-tasks-pagination-info">Showing 1 to {filteredItems.length} of {filteredItems.length} entries</span>
        </div>
      </div>
    </div>
  );
}
