import { useState } from 'react';
import { Link } from 'react-router-dom';

var LEAVE_CASES = [
  { id: 'CL-975542', label: 'CL-975542 — Paid Family & Medical Leave (Intermittent)', balance: 112 },
  { id: 'CL-981204', label: 'CL-981204 — FMLA Caregiving (Intermittent)', balance: 84 },
  { id: 'CL-990017', label: 'CL-990017 — NJ FLI Bonding Leave (Continuous)', balance: 480 },
];

var REASONS = [
  { value: 'Episode', description: 'An unexpected flare-up or symptom occurrence related to your condition.' },
  { value: 'Treatment', description: 'A scheduled medical appointment, therapy, or procedure.' },
];

function parseTime(str) {
  var match = str.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  var h = parseInt(match[1], 10);
  var m = parseInt(match[2], 10);
  var period = match[3].toUpperCase();
  if (period === 'PM' && h !== 12) h += 12;
  if (period === 'AM' && h === 12) h = 0;
  return h * 60 + m;
}

function calcHours(start, end) {
  var s = parseTime(start);
  var e = parseTime(end);
  if (s === null || e === null || e <= s) return '0.0';
  return ((e - s) / 60).toFixed(1);
}

function formatDateDisplay(year, month, day) {
  var d = new Date(year, month, day);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateKey(year, month, day) {
  return year + '-' + String(month + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
}

function buildCalendarDays(year, month) {
  var firstDay = new Date(year, month, 1).getDay();
  var daysInMonth = new Date(year, month + 1, 0).getDate();
  var prevMonthDays = new Date(year, month, 0).getDate();
  var days = [];
  for (var i = firstDay - 1; i >= 0; i--) {
    days.push({ day: prevMonthDays - i, overflow: true });
  }
  for (var d = 1; d <= daysInMonth; d++) {
    days.push({ day: d, overflow: false });
  }
  return days;
}

var MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function EnterMyTimePage() {
  var today = new Date();
  var todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  var [selectedCase, setSelectedCase] = useState(LEAVE_CASES[0]);
  var [caseOpen, setCaseOpen] = useState(false);
  var [calYear, setCalYear] = useState(today.getFullYear());
  var [calMonth, setCalMonth] = useState(today.getMonth());
  var [selectedDay, setSelectedDay] = useState(today.getDate());
  var [startTime, setStartTime] = useState('08:00 AM');
  var [endTime, setEndTime] = useState('12:00 PM');
  var [reason, setReason] = useState('Episode');
  var [reasonOpen, setReasonOpen] = useState(false);
  var [absences, setAbsences] = useState([
    { date: 'May 2, 2025', dateKey: '2025-05-02', startTime: '8:00 AM', endTime: '12:00 PM', hours: '4.0', reason: 'Episode', reasonColor: 'amber', addedOn: 'May 2, 2025', caseId: 'CL-975542' },
    { date: 'Apr 28, 2025', dateKey: '2025-04-28', startTime: '8:00 AM', endTime: '4:00 PM', hours: '8.0', reason: 'Treatment', reasonColor: 'blue', addedOn: 'Apr 28, 2025', caseId: 'CL-975542' },
    { date: 'Apr 21, 2025', dateKey: '2025-04-21', startTime: '1:00 PM', endTime: '3:30 PM', hours: '2.5', reason: 'Episode', reasonColor: 'amber', addedOn: 'Apr 21, 2025', caseId: 'CL-975542' },
    { date: 'Apr 14, 2025', dateKey: '2025-04-14', startTime: '9:00 AM', endTime: '11:00 AM', hours: '2.0', reason: 'Treatment', reasonColor: 'blue', addedOn: 'Apr 14, 2025', caseId: 'CL-981204' },
    { date: 'Apr 7, 2025', dateKey: '2025-04-07', startTime: '8:00 AM', endTime: '12:00 PM', hours: '4.0', reason: 'Episode', reasonColor: 'amber', addedOn: 'Apr 7, 2025', caseId: 'CL-975542' },
  ]);
  var [balance, setBalance] = useState(selectedCase.balance);
  var [submitted, setSubmitted] = useState(false);

  var calendarDays = buildCalendarDays(calYear, calMonth);
  var hours = calcHours(startTime, endTime);
  var displayDate = formatDateDisplay(calYear, calMonth, selectedDay);

  var loggedDateKeys = {};
  absences.forEach(function (a) {
    if (a.caseId === selectedCase.id) loggedDateKeys[a.dateKey] = a.reason;
  });

  var filteredAbsences = absences.filter(function (a) { return a.caseId === selectedCase.id; });

  function getReasonColor(r) {
    if (r === 'Episode') return 'amber';
    if (r === 'Treatment') return 'blue';
    return 'gray';
  }

  function handlePrevMonth() {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else { setCalMonth(calMonth - 1); }
    setSelectedDay(1);
  }

  function handleNextMonth() {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else { setCalMonth(calMonth + 1); }
    setSelectedDay(1);
  }

  function handleCaseSelect(c) {
    setSelectedCase(c);
    setBalance(c.balance);
    setCaseOpen(false);
  }

  function handleSubmit() {
    var h = parseFloat(hours);
    if (h <= 0) return;
    var todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    var newEntry = {
      date: displayDate,
      dateKey: formatDateKey(calYear, calMonth, selectedDay),
      startTime: startTime,
      endTime: endTime,
      hours: hours,
      reason: reason,
      reasonColor: getReasonColor(reason),
      addedOn: todayStr,
      caseId: selectedCase.id,
    };
    setAbsences([newEntry].concat(absences));
    setBalance(Math.max(0, balance - h));
    setSubmitted(true);
    setTimeout(function () { setSubmitted(false); }, 3000);
  }

  function handleCancel() {
    setStartTime('08:00 AM');
    setEndTime('12:00 PM');
    setReason('Episode');
    setSelectedDay(today.getDate());
    setCalMonth(today.getMonth());
    setCalYear(today.getFullYear());
  }

  var selectedReasonData = REASONS.find(function (r) { return r.value === reason; });

  return (
    <div className="cl-page">
      <div className="cl-breadcrumb">
        <Link to="/claims-and-leave" className="cl-breadcrumb-link">Claims &amp; Leave</Link>
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
          <span className="cl-balance-value">{balance} Hours Remaining</span>
        </div>
      </div>

      <div className="cl-ma-layout">
        {/* Main content column */}
        <div className="cl-ma-main">
          {/* Success banner */}
          {submitted && (
            <div className="cl-ma-success-banner">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#10b981"/><path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>Absence submitted successfully — {hours} hours logged for {displayDate}.</span>
            </div>
          )}

          {/* Form card */}
          <div className="cl-ma-form-card">
            <div className="cl-ma-form-grid">
              {/* Left: Case selector + Calendar */}
              <div className="cl-ma-form-left">
                <div className="cl-ma-field" style={{ position: 'relative' }}>
                  <label className="cl-ma-label">Select Approved Leave Case</label>
                  <button
                    type="button"
                    className="cl-ma-case-select"
                    onClick={function () { setCaseOpen(!caseOpen); }}
                  >
                    <span>{selectedCase.label}</span>
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 1l6 6 6-6" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  {caseOpen && (
                    <div className="cl-ma-dropdown-menu cl-ma-case-menu">
                      {LEAVE_CASES.map(function (c) {
                        return (
                          <button
                            key={c.id}
                            type="button"
                            className={'cl-ma-dropdown-item' + (c.id === selectedCase.id ? ' cl-ma-dropdown-item--active' : '')}
                            onClick={function () { handleCaseSelect(c); }}
                          >
                            <span>{c.label}</span>
                            <span className="cl-ma-case-balance">{c.balance}h remaining</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="cl-ma-field">
                  <label className="cl-ma-label">Select Date</label>
                  <div className="cl-ma-calendar">
                    <div className="cl-ma-cal-header">
                      <button className="cl-ma-cal-nav" type="button" onClick={handlePrevMonth}>&lsaquo;</button>
                      <span className="cl-ma-cal-month">{MONTH_NAMES[calMonth]} {calYear}</span>
                      <button className="cl-ma-cal-nav" type="button" onClick={handleNextMonth}>&rsaquo;</button>
                    </div>
                    <div className="cl-ma-cal-grid">
                      <span className="cl-ma-cal-dow">Su</span>
                      <span className="cl-ma-cal-dow">Mo</span>
                      <span className="cl-ma-cal-dow">Tu</span>
                      <span className="cl-ma-cal-dow">We</span>
                      <span className="cl-ma-cal-dow">Th</span>
                      <span className="cl-ma-cal-dow">Fr</span>
                      <span className="cl-ma-cal-dow">Sa</span>
                      {calendarDays.map(function (d, i) {
                        var isSelected = d.day === selectedDay && !d.overflow;
                        var dayKey = !d.overflow ? formatDateKey(calYear, calMonth, d.day) : '';
                        var isToday = dayKey === todayKey;
                        var isLogged = !d.overflow && loggedDateKeys[dayKey];
                        var loggedReason = isLogged ? loggedDateKeys[dayKey] : null;
                        return (
                          <button
                            key={i}
                            type="button"
                            className={
                              'cl-ma-cal-day'
                              + (d.overflow ? ' cl-ma-cal-day--overflow' : '')
                              + (isSelected ? ' cl-ma-cal-day--selected' : '')
                              + (isToday && !isSelected ? ' cl-ma-cal-day--today' : '')
                              + (isLogged ? ' cl-ma-cal-day--logged' : '')
                              + (loggedReason === 'Episode' ? ' cl-ma-cal-day--episode' : '')
                              + (loggedReason === 'Treatment' ? ' cl-ma-cal-day--treatment' : '')
                            }
                            onClick={function () {
                              if (d.overflow) {
                                handlePrevMonth();
                              } else {
                                setSelectedDay(d.day);
                              }
                            }}
                          >
                            {d.day}
                          </button>
                        );
                      })}
                    </div>
                    <div className="cl-ma-cal-legend">
                      <span className="cl-ma-cal-legend-item"><span className="cl-ma-cal-legend-dot cl-ma-cal-legend-dot--today" />Today</span>
                      <span className="cl-ma-cal-legend-item"><span className="cl-ma-cal-legend-dot cl-ma-cal-legend-dot--episode" />Episode</span>
                      <span className="cl-ma-cal-legend-item"><span className="cl-ma-cal-legend-dot cl-ma-cal-legend-dot--treatment" />Treatment</span>
                    </div>

                    {/* Logged absences for current month */}
                    {(function () {
                      var monthAbsences = filteredAbsences.filter(function (a) {
                        var prefix = calYear + '-' + String(calMonth + 1).padStart(2, '0');
                        return a.dateKey && a.dateKey.startsWith(prefix);
                      });
                      if (monthAbsences.length === 0) return null;
                      return (
                        <div className="cl-ma-cal-logged">
                          <div className="cl-ma-cal-logged-title">Logged this month ({monthAbsences.length})</div>
                          <div className="cl-ma-cal-logged-list">
                            {monthAbsences.map(function (a, idx) {
                              return (
                                <div key={idx} className="cl-ma-cal-logged-row">
                                  <span className={'cl-ma-cal-logged-dot cl-ma-cal-logged-dot--' + a.reasonColor} />
                                  <span className="cl-ma-cal-logged-date">{a.date}</span>
                                  <span className="cl-ma-cal-logged-hours">{a.hours}h</span>
                                  <span className={'cl-ma-reason-badge cl-ma-reason-badge--' + a.reasonColor}>{a.reason}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* Right: Hours, warning, date, times, reason */}
              <div className="cl-ma-form-right">
                <div className="cl-ma-field">
                  <label className="cl-ma-label cl-ma-label--upper">Hours Logged</label>
                  <div className={'cl-ma-hours-input' + (parseFloat(hours) > 0 ? '' : ' cl-ma-hours-input--zero')}>
                    <span className="cl-ma-hours-value">{hours}</span>
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
                  <div className="cl-ma-readonly-field">{displayDate}</div>
                </div>

                <div className="cl-ma-time-row">
                  <div className="cl-ma-field cl-ma-field--half">
                    <label className="cl-ma-label">Start Time</label>
                    <input
                      type="text"
                      className="cl-ma-time-input"
                      value={startTime}
                      onChange={function (e) { setStartTime(e.target.value); }}
                    />
                  </div>
                  <div className="cl-ma-field cl-ma-field--half">
                    <label className="cl-ma-label">End Time</label>
                    <input
                      type="text"
                      className="cl-ma-time-input"
                      value={endTime}
                      onChange={function (e) { setEndTime(e.target.value); }}
                    />
                  </div>
                </div>

                <div className="cl-ma-field" style={{ position: 'relative' }}>
                  <label className="cl-ma-label">Reason</label>
                  <button
                    type="button"
                    className="cl-ma-dropdown"
                    onClick={function () { setReasonOpen(!reasonOpen); }}
                  >
                    <span>{reason}</span>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  {reasonOpen && (
                    <div className="cl-ma-dropdown-menu">
                      {REASONS.map(function (r) {
                        return (
                          <button
                            key={r.value}
                            type="button"
                            className={'cl-ma-dropdown-item' + (r.value === reason ? ' cl-ma-dropdown-item--active' : '')}
                            onClick={function () { setReason(r.value); setReasonOpen(false); }}
                          >
                            {r.value}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {selectedReasonData && (
                    <p className="cl-ma-reason-helper">{selectedReasonData.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="cl-ma-form-footer">
              <p className="cl-ma-disclaimer">By submitting, you certify that this absence is related to your approved claim.</p>
              <div className="cl-ma-form-actions">
                <button className="cl-ma-btn-cancel" type="button" onClick={handleCancel}>Cancel</button>
                <button className="cl-ma-btn-submit" type="button" onClick={handleSubmit} disabled={parseFloat(hours) <= 0}>Submit Absence</button>
              </div>
            </div>
          </div>

          {/* Recent Logged Absences */}
          <div className="cl-ma-recent-card">
            <div className="cl-ma-recent-header">
              <h2 className="cl-ma-recent-title">Recent Logged Absences</h2>
              <span className="cl-ma-recent-count">{filteredAbsences.length} entries for {selectedCase.id}</span>
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
                  {filteredAbsences.length === 0 && (
                    <tr><td colSpan="7" style={{ textAlign: 'center', padding: 24, color: '#9ca3af' }}>No absences logged for this case yet.</td></tr>
                  )}
                  {filteredAbsences.map(function (row, i) {
                    return (
                      <tr key={i}>
                        <td className="cl-ma-cell-bold">{row.date}</td>
                        <td>{row.startTime}</td>
                        <td>{row.endTime}</td>
                        <td className="cl-ma-cell-bold">{row.hours}</td>
                        <td>
                          <span className={'cl-ma-reason-badge cl-ma-reason-badge--' + row.reasonColor}>
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
                    );
                  })}
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
