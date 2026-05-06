import { useState } from 'react';

const recentAbsences = [
  { date: 'Oct 21, 2024', startTime: '8:00 AM', endTime: '12:00 PM', hours: '4.0', reason: 'Episode', reasonColor: 'amber', addedOn: 'Oct 21, 2024' },
  { date: 'Oct 18, 2024', startTime: '8:00 AM', endTime: '4:00 PM', hours: '8.0', reason: 'Treatment', reasonColor: 'blue', addedOn: 'Oct 18, 2024' },
  { date: 'Oct 15, 2024', startTime: '1:00 PM', endTime: '3:30 PM', hours: '2.5', reason: 'Episode', reasonColor: 'amber', addedOn: 'Oct 16, 2024' },
];

const calendarDays = [
  { day: 29, disabled: true }, { day: 30, disabled: true },
  { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 },
  { day: 6 }, { day: 7 }, { day: 8 }, { day: 9 }, { day: 10 }, { day: 11 }, { day: 12 },
  { day: 13 }, { day: 14 }, { day: 15 }, { day: 16 }, { day: 17 }, { day: 18 }, { day: 19 },
  { day: 20 }, { day: 21 }, { day: 22 }, { day: 23 }, { day: 24, selected: true }, { day: 25 }, { day: 26 },
  { day: 27 }, { day: 28 }, { day: 29 }, { day: 30 }, { day: 31 },
];

export default function EnterMyTimePage() {
  const [selectedDay] = useState(24);

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
          <p className="cl-page-desc">Record your intermittent leave hours or days for existing claims.</p>
        </div>
        <div className="cl-balance-badge">
          <span className="cl-balance-label">CURRENT BALANCE</span>
          <span className="cl-balance-value">112 Hours Remaining</span>
        </div>
      </div>

      <div className="cl-ma-layout">
        {/* Main content column */}
        <div className="cl-ma-main">
          {/* Form card */}
          <div className="cl-ma-form-card">
            <div className="cl-ma-form-grid">
              {/* Left: Case selector + Calendar */}
              <div className="cl-ma-form-left">
                <div className="cl-ma-field">
                  <label className="cl-ma-label">Select Approved Leave Case</label>
                  <div className="cl-ma-case-select">
                    <span>CL-975542 — Paid Family &amp; Medical Leave (Intermittent)</span>
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 1l6 6 6-6" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>

                <div className="cl-ma-field">
                  <label className="cl-ma-label">Select Date</label>
                  <div className="cl-ma-calendar">
                    <div className="cl-ma-cal-header">
                      <button className="cl-ma-cal-nav">&lsaquo;</button>
                      <span className="cl-ma-cal-month">October 2024</span>
                      <button className="cl-ma-cal-nav">&rsaquo;</button>
                    </div>
                    <div className="cl-ma-cal-grid">
                      <span className="cl-ma-cal-dow">Su</span>
                      <span className="cl-ma-cal-dow">Mo</span>
                      <span className="cl-ma-cal-dow">Tu</span>
                      <span className="cl-ma-cal-dow">We</span>
                      <span className="cl-ma-cal-dow">Th</span>
                      <span className="cl-ma-cal-dow">Fr</span>
                      <span className="cl-ma-cal-dow">Sa</span>
                      {calendarDays.map((d, i) => (
                        <span
                          key={i}
                          className={`cl-ma-cal-day${d.disabled ? ' cl-ma-cal-day--disabled' : ''}${d.day === selectedDay && !d.disabled ? ' cl-ma-cal-day--selected' : ''}`}
                        >
                          {d.day}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Hours, warning, date, times, reason */}
              <div className="cl-ma-form-right">
                <div className="cl-ma-field">
                  <label className="cl-ma-label cl-ma-label--upper">Hours Logged</label>
                  <div className="cl-ma-hours-input">
                    <span className="cl-ma-hours-value">4.0</span>
                    <span className="cl-ma-hours-unit">Hours</span>
                  </div>
                </div>

                <div className="cl-ma-warning">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1l7 14H1L8 1z" fill="#f59e0b"/>
                    <path d="M8 6v4M8 12h.01" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>Intermittent leave must be reported within 48 hours of the absence occurring to ensure timely payment.</span>
                </div>

                <div className="cl-ma-field">
                  <label className="cl-ma-label">Date</label>
                  <div className="cl-ma-readonly-field">Oct 24, 2024</div>
                </div>

                <div className="cl-ma-time-row">
                  <div className="cl-ma-field cl-ma-field--half">
                    <label className="cl-ma-label">Start Time</label>
                    <div className="cl-ma-time-input">08:00 AM</div>
                  </div>
                  <div className="cl-ma-field cl-ma-field--half">
                    <label className="cl-ma-label">End Time</label>
                    <div className="cl-ma-time-input">12:00 PM</div>
                  </div>
                </div>

                <div className="cl-ma-field">
                  <label className="cl-ma-label">Reason</label>
                  <div className="cl-ma-dropdown">
                    <span>Episode</span>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="cl-ma-form-footer">
              <p className="cl-ma-disclaimer">By submitting, you certify that this absence is related to your approved claim.</p>
              <div className="cl-ma-form-actions">
                <button className="cl-ma-btn-cancel">Cancel</button>
                <button className="cl-ma-btn-submit">Submit Absence</button>
              </div>
            </div>
          </div>

          {/* Recent Logged Absences */}
          <div className="cl-ma-recent-card">
            <div className="cl-ma-recent-header">
              <h2 className="cl-ma-recent-title">Recent Logged Absences</h2>
              <button className="cl-link-btn">View All History</button>
            </div>
            <div className="cl-table-wrap" style={{ border: 'none', borderRadius: 0 }}>
              <table className="cl-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Missed Hours</th>
                    <th>Reason</th>
                    <th>Added On</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAbsences.map((row, i) => (
                    <tr key={i}>
                      <td className="cl-ma-cell-bold">{row.date}</td>
                      <td>{row.startTime}</td>
                      <td>{row.endTime}</td>
                      <td className="cl-ma-cell-bold">{row.hours}</td>
                      <td>
                        <span className={`cl-ma-reason-badge cl-ma-reason-badge--${row.reasonColor}`}>
                          {row.reason}
                        </span>
                      </td>
                      <td>{row.addedOn}</td>
                      <td>
                        <button className="cl-ma-edit-btn" aria-label="Edit">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M10.5 1.5l2 2-8 8H2.5v-2l8-8z" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="cl-ma-sidebar">
          {/* Reporting Guidance */}
          <div className="cl-ma-guidance-card">
            <div className="cl-ma-guidance-header">
              <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                <circle cx="6" cy="6" r="5.5" stroke="#002b7f" strokeWidth="1"/>
                <path d="M6 4v4M6 10h.01" stroke="#002b7f" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <h3 className="cl-ma-guidance-title">Reporting Guidance</h3>
            </div>
            <ul className="cl-ma-guidance-list">
              <li>
                <span className="cl-ma-guidance-dot"></span>
                <span>Ensure you log each day separately if your absence spans multiple dates.</span>
              </li>
              <li>
                <span className="cl-ma-guidance-dot"></span>
                <span>Partial days should be reported in 15-minute or 0.25 hour increments.</span>
              </li>
              <li>
                <span className="cl-ma-guidance-dot"></span>
                <span>Keep any related medical notes as you may be asked to provide them for audit.</span>
              </li>
            </ul>
            <button className="cl-ma-guidance-btn">View Reporting Policy</button>
          </div>

          {/* Need Help */}
          <div className="cl-ma-help-card">
            <h3 className="cl-ma-help-title">Need Help Logging?</h3>
            <div className="cl-ma-help-contact">
              <div className="cl-ma-help-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3.5 1.5h3l1.5 3.5-2 1.5a8 8 0 003.5 3.5l1.5-2 3.5 1.5v3a1 1 0 01-1 1A12 12 0 012.5 2.5a1 1 0 011-1z" stroke="#4b5563" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="cl-ma-help-info">
                <span className="cl-ma-help-label">LEAVE SPECIALIST</span>
                <span className="cl-ma-help-phone">1-800-555-0199</span>
              </div>
            </div>
            <button className="cl-ma-message-btn">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M10.5 1.5l2 2-8 8H2.5v-2l8-8z" stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Message Specialist
            </button>
          </div>

          {/* Helpful Forms */}
          <div className="cl-ma-forms-card">
            <h3 className="cl-ma-forms-title">Helpful Forms</h3>
            <div className="cl-ma-forms-list">
              <a href="#" className="cl-ma-form-link">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="3" y="1" width="10" height="14" rx="1" stroke="#ef4444" strokeWidth="1.2"/>
                  <path d="M6 5h4M6 8h4M6 11h2" stroke="#ef4444" strokeWidth="1" strokeLinecap="round"/>
                </svg>
                <span>Intermittent Leave Log</span>
                <svg className="cl-ma-download-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 2v6M3.5 6L6 8.5 8.5 6M2 10h8" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#" className="cl-ma-form-link">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="3" y="1" width="10" height="14" rx="1" stroke="#ef4444" strokeWidth="1.2"/>
                  <path d="M6 5h4M6 8h4M6 11h2" stroke="#ef4444" strokeWidth="1" strokeLinecap="round"/>
                </svg>
                <span>Medical Recertification Form</span>
                <svg className="cl-ma-download-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 2v6M3.5 6L6 8.5 8.5 6M2 10h8" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
