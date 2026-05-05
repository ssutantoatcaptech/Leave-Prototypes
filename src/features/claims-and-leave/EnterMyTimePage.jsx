import { useState } from 'react';

const recentAbsences = [
  { date: 'Oct 11, 2024', type: 'Full Day', hours: '8.0', status: 'Confirmed' },
  { date: 'Oct 10, 2024', type: 'Full Day', hours: '8.0', status: 'Confirmed' },
  { date: 'Oct 9, 2024', type: 'Partial Day', hours: '4.0', status: 'Pending' },
  { date: 'Oct 4, 2024', type: 'Full Day', hours: '8.0', status: 'Confirmed' },
];

export default function EnterMyTimePage() {
  const [dayType, setDayType] = useState('full');
  const [hours, setHours] = useState('8.0');

  return (
    <div className="cl-page">
      <div className="cl-breadcrumb">
        <span>Claims &amp; Leave</span>
        <span className="cl-breadcrumb-sep">&gt;</span>
        <span>Manage Absences</span>
      </div>

      <div className="cl-page-header">
        <div>
          <h1 className="cl-page-title">Manage Absences</h1>
        </div>
        <div className="cl-balance-badge">
          <span className="cl-balance-label">Current Balance</span>
          <span className="cl-balance-value">112 Hours Remaining</span>
        </div>
      </div>

      <div className="cl-time-layout">
        {/* Left column — form */}
        <div className="cl-time-form">
          <div className="cl-form-section">
            <label className="cl-form-label">Select Approved Leave Case</label>
            <select className="cl-select cl-select--full">
              <option>LV-2024-00287 — Illness or Injury (Intermittent)</option>
              <option>LV-2024-00312 — Birthing Parent / Pregnancy</option>
            </select>
          </div>

          <div className="cl-form-section">
            <label className="cl-form-label">Select Date(s)</label>
            <div className="cl-calendar">
              <div className="cl-calendar-header">
                <button className="cl-calendar-nav">&lsaquo;</button>
                <span className="cl-calendar-month">October 2024</span>
                <button className="cl-calendar-nav">&rsaquo;</button>
              </div>
              <div className="cl-calendar-grid">
                <span className="cl-cal-day-label">Su</span>
                <span className="cl-cal-day-label">Mo</span>
                <span className="cl-cal-day-label">Tu</span>
                <span className="cl-cal-day-label">We</span>
                <span className="cl-cal-day-label">Th</span>
                <span className="cl-cal-day-label">Fr</span>
                <span className="cl-cal-day-label">Sa</span>
                {/* Week 1 */}
                <span className="cl-cal-day cl-cal-day--empty"></span>
                <span className="cl-cal-day cl-cal-day--empty"></span>
                <span className="cl-cal-day">1</span>
                <span className="cl-cal-day">2</span>
                <span className="cl-cal-day">3</span>
                <span className="cl-cal-day">4</span>
                <span className="cl-cal-day">5</span>
                {/* Week 2 */}
                <span className="cl-cal-day">6</span>
                <span className="cl-cal-day">7</span>
                <span className="cl-cal-day">8</span>
                <span className="cl-cal-day cl-cal-day--logged">9</span>
                <span className="cl-cal-day cl-cal-day--logged">10</span>
                <span className="cl-cal-day cl-cal-day--logged">11</span>
                <span className="cl-cal-day">12</span>
                {/* Week 3 */}
                <span className="cl-cal-day">13</span>
                <span className="cl-cal-day cl-cal-day--selected">14</span>
                <span className="cl-cal-day">15</span>
                <span className="cl-cal-day">16</span>
                <span className="cl-cal-day">17</span>
                <span className="cl-cal-day">18</span>
                <span className="cl-cal-day">19</span>
                {/* Week 4 */}
                <span className="cl-cal-day">20</span>
                <span className="cl-cal-day">21</span>
                <span className="cl-cal-day">22</span>
                <span className="cl-cal-day">23</span>
                <span className="cl-cal-day">24</span>
                <span className="cl-cal-day">25</span>
                <span className="cl-cal-day">26</span>
                {/* Week 5 */}
                <span className="cl-cal-day">27</span>
                <span className="cl-cal-day">28</span>
                <span className="cl-cal-day">29</span>
                <span className="cl-cal-day">30</span>
                <span className="cl-cal-day">31</span>
                <span className="cl-cal-day cl-cal-day--empty"></span>
                <span className="cl-cal-day cl-cal-day--empty"></span>
              </div>
            </div>
          </div>

          <div className="cl-form-section">
            <label className="cl-form-label">Absence Amount</label>
            <div className="cl-toggle-group">
              <button
                className={`cl-toggle-btn${dayType === 'partial' ? ' cl-toggle-btn--active' : ''}`}
                onClick={() => { setDayType('partial'); setHours('4.0'); }}
              >
                Partial Day
              </button>
              <button
                className={`cl-toggle-btn${dayType === 'full' ? ' cl-toggle-btn--active' : ''}`}
                onClick={() => { setDayType('full'); setHours('8.0'); }}
              >
                Full Day
              </button>
            </div>
          </div>

          <div className="cl-form-section">
            <label className="cl-form-label">Hours Logged</label>
            <input
              type="text"
              className="cl-input"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>

          <div className="cl-warning-box">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1l7 14H1L8 1z" fill="#f59e0b"/>
              <path d="M8 6v4M8 12h.01" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Please report absences within 48 hours of occurrence for timely processing.</span>
          </div>

          <div className="cl-form-actions">
            <button className="cl-btn cl-btn--primary">Submit</button>
            <button className="cl-btn cl-btn--ghost">Cancel</button>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="cl-time-sidebar">
          <div className="cl-sidebar-card">
            <h3 className="cl-sidebar-card-title">Reporting Guidance</h3>
            <p className="cl-sidebar-card-text">
              For intermittent leaves, report each absence as it occurs. For continuous leaves, your time is automatically tracked based on your approved schedule.
            </p>
          </div>

          <div className="cl-sidebar-card">
            <h3 className="cl-sidebar-card-title">Need Help Logging?</h3>
            <p className="cl-sidebar-card-text">
              Contact your leave specialist for assistance with time reporting.
            </p>
            <p className="cl-sidebar-card-phone">1-800-555-0142</p>
          </div>

          <div className="cl-sidebar-card">
            <h3 className="cl-sidebar-card-title">Helpful Forms</h3>
            <ul className="cl-sidebar-links">
              <li><a href="#">Absence Reporting Form (PDF)</a></li>
              <li><a href="#">Time Correction Request</a></li>
              <li><a href="#">Leave Schedule Modification</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recent logged absences */}
      <div className="cl-recent-section">
        <div className="cl-recent-header">
          <h3 className="cl-recent-title">Recent Logged Absences</h3>
          <button className="cl-link-btn">View All History</button>
        </div>
        <div className="cl-table-wrap">
          <table className="cl-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAbsences.map((row, i) => (
                <tr key={i}>
                  <td>{row.date}</td>
                  <td>{row.type}</td>
                  <td>{row.hours}</td>
                  <td>
                    <span className={`cl-badge cl-badge--${row.status === 'Confirmed' ? 'green' : 'blue'}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
