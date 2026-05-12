import { useState } from 'react';
import { Link } from 'react-router-dom';
import useBasePath from './useBasePath';

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

function formatDateKeyToDisplay(key) {
  var parts = key.split('-');
  var d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function formatDateKeyToShort(key) {
  var parts = key.split('-');
  var d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
  const base = useBasePath();
  var today = new Date();
  var todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  var [selectedCase, setSelectedCase] = useState(LEAVE_CASES[0]);
  var [caseOpen, setCaseOpen] = useState(false);
  var [calYear, setCalYear] = useState(today.getFullYear());
  var [calMonth, setCalMonth] = useState(today.getMonth());
  var [selectedDates, setSelectedDates] = useState([]);
  var [startTime, setStartTime] = useState('08:00 AM');
  var [endTime, setEndTime] = useState('12:00 PM');
  var [reason, setReason] = useState('Episode');
  var [reasonOpen, setReasonOpen] = useState(false);
  var [absences, setAbsences] = useState([
    { date: 'May 2, 2026', dateKey: '2026-05-02', startTime: '8:00 AM', endTime: '12:00 PM', hours: '4.0', reason: 'Episode', reasonColor: 'amber', addedOn: 'May 2, 2026', caseId: 'CL-975542' },
    { date: 'Apr 28, 2026', dateKey: '2026-04-28', startTime: '8:00 AM', endTime: '4:00 PM', hours: '8.0', reason: 'Treatment', reasonColor: 'blue', addedOn: 'Apr 28, 2026', caseId: 'CL-975542' },
    { date: 'Apr 21, 2026', dateKey: '2026-04-21', startTime: '1:00 PM', endTime: '3:30 PM', hours: '2.5', reason: 'Episode', reasonColor: 'amber', addedOn: 'Apr 21, 2026', caseId: 'CL-975542' },
    { date: 'Apr 14, 2026', dateKey: '2026-04-14', startTime: '9:00 AM', endTime: '11:00 AM', hours: '2.0', reason: 'Treatment', reasonColor: 'blue', addedOn: 'Apr 14, 2026', caseId: 'CL-981204' },
    { date: 'Apr 7, 2026', dateKey: '2026-04-07', startTime: '8:00 AM', endTime: '12:00 PM', hours: '4.0', reason: 'Episode', reasonColor: 'amber', addedOn: 'Apr 7, 2026', caseId: 'CL-975542' },
  ]);
  var [balance, setBalance] = useState(selectedCase.balance);
  var [submitted, setSubmitted] = useState(false);
  var [submittedCount, setSubmittedCount] = useState(0);
  var [submittedHours, setSubmittedHours] = useState('0');
  var [newEntryKey, setNewEntryKey] = useState(null);
  var [editingIndex, setEditingIndex] = useState(null);
  var [editForm, setEditForm] = useState({ startTime: '', endTime: '', reason: '' });
  var [showPreview, setShowPreview] = useState(false);
  var [perDayEdits, setPerDayEdits] = useState({});

  var calendarDays = buildCalendarDays(calYear, calMonth);
  var hours = calcHours(startTime, endTime);

  var loggedDateKeys = {};
  absences.forEach(function (a) {
    if (a.caseId === selectedCase.id) loggedDateKeys[a.dateKey] = a.reason;
  });

  var filteredAbsences = absences.filter(function (a) { return a.caseId === selectedCase.id; });

  var isBulkMode = selectedDates.length > 1;

  var totalBulkHours = (function () {
    if (!isBulkMode) return parseFloat(hours);
    var total = 0;
    selectedDates.forEach(function (dk) {
      if (perDayEdits[dk]) {
        total += parseFloat(calcHours(perDayEdits[dk].startTime, perDayEdits[dk].endTime));
      } else {
        total += parseFloat(hours);
      }
    });
    return total;
  })();

  function getReasonColor(r) {
    if (r === 'Episode') return 'amber';
    if (r === 'Treatment') return 'blue';
    return 'gray';
  }

  function handlePrevMonth() {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else { setCalMonth(calMonth - 1); }
  }

  function handleNextMonth() {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else { setCalMonth(calMonth + 1); }
  }

  function handleCaseSelect(c) {
    setSelectedCase(c);
    setBalance(c.balance);
    setCaseOpen(false);
  }

  function handleDayClick(day, overflow) {
    if (overflow) {
      handlePrevMonth();
      return;
    }
    var key = formatDateKey(calYear, calMonth, day);
    if (selectedDates.includes(key)) {
      setSelectedDates(selectedDates.filter(function (d) { return d !== key; }));
      var newEdits = Object.assign({}, perDayEdits);
      delete newEdits[key];
      setPerDayEdits(newEdits);
    } else {
      setSelectedDates(selectedDates.concat([key]).sort());
    }
  }

  function clearSelection() {
    setSelectedDates([]);
    setPerDayEdits({});
    setShowPreview(false);
  }

  function handleSubmit() {
    var h = parseFloat(hours);
    if (selectedDates.length === 0 || h <= 0) return;

    if (isBulkMode && !showPreview) {
      setShowPreview(true);
      return;
    }

    var todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    var entryKey = Date.now().toString();
    var newEntries = [];
    var totalH = 0;

    selectedDates.forEach(function (dk, idx) {
      var dayData = perDayEdits[dk] || { startTime: startTime, endTime: endTime, reason: reason };
      var dayReason = dayData.reason || reason;
      var dayHours = calcHours(dayData.startTime, dayData.endTime);
      totalH += parseFloat(dayHours);
      newEntries.push({
        date: formatDateKeyToShort(dk),
        dateKey: dk,
        startTime: dayData.startTime,
        endTime: dayData.endTime,
        hours: dayHours,
        reason: dayReason,
        reasonColor: getReasonColor(dayReason),
        addedOn: todayStr,
        caseId: selectedCase.id,
        entryKey: entryKey + '-' + idx,
      });
    });

    setAbsences(newEntries.concat(absences));
    setBalance(Math.max(0, balance - totalH));
    setSubmitted(true);
    setSubmittedCount(selectedDates.length);
    setSubmittedHours(totalH.toFixed(1));
    setNewEntryKey(entryKey);
    setSelectedDates([]);
    setPerDayEdits({});
    setShowPreview(false);
    setTimeout(function () { setSubmitted(false); }, 4000);
    setTimeout(function () { setNewEntryKey(null); }, 8000);
  }

  function handleCancel() {
    setStartTime('08:00 AM');
    setEndTime('12:00 PM');
    setReason('Episode');
    setSelectedDates([]);
    setPerDayEdits({});
    setShowPreview(false);
  }

  function startEdit(idx) {
    var entry = filteredAbsences[idx];
    setEditForm({ startTime: entry.startTime, endTime: entry.endTime, reason: entry.reason });
    setEditingIndex(idx);
  }

  function saveEdit(idx) {
    var entry = filteredAbsences[idx];
    var absIdx = absences.indexOf(entry);
    if (absIdx === -1) { setEditingIndex(null); return; }
    var updated = absences.slice();
    var h = calcHours(editForm.startTime, editForm.endTime);
    updated[absIdx] = Object.assign({}, entry, {
      startTime: editForm.startTime,
      endTime: editForm.endTime,
      hours: h,
      reason: editForm.reason,
      reasonColor: getReasonColor(editForm.reason),
    });
    setAbsences(updated);
    setEditingIndex(null);
  }

  function cancelEdit() {
    setEditingIndex(null);
  }

  function updatePerDayEdit(dk, field, value) {
    var existing = perDayEdits[dk] || { startTime: startTime, endTime: endTime, reason: reason };
    var updated = Object.assign({}, existing);
    updated[field] = value;
    setPerDayEdits(Object.assign({}, perDayEdits, { [dk]: updated }));
  }

  var selectedReasonData = REASONS.find(function (r) { return r.value === reason; });

  return (
    <div className="cl-page">
      <div className="cl-breadcrumb">
        <Link to={base} className="cl-breadcrumb-link">Claims &amp; Leave</Link>
        <span className="cl-breadcrumb-sep">&gt;</span>
        <span>Enter My Time</span>
      </div>

      <div className="cl-page-header">
        <div>
          <h1 className="cl-page-title">Enter My Time</h1>
          <p className="cl-page-desc">Record your intermittent leave hours or days for existing claims.</p>
        </div>
      </div>

      <div className="cl-ma-layout">
        {/* Main content column */}
        <div className="cl-ma-main">
          {/* Success banner */}
          {submitted && (
            <div className="cl-ma-success-banner">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#10b981"/><path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>
                {submittedCount > 1
                  ? submittedCount + ' entries submitted — ' + submittedHours + ' hours logged across ' + submittedCount + ' days.'
                  : 'Absence submitted successfully — ' + submittedHours + ' hours logged.'
                }
              </span>
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
                    <div className="cl-ma-label-row">
                      <label className="cl-ma-label">Select Date{isBulkMode ? 's' : ''}</label>
                      {selectedDates.length > 0 && (
                        <button className="cl-ma-clear-dates" type="button" onClick={clearSelection}>
                          Clear ({selectedDates.length})
                        </button>
                      )}
                    </div>
                    <div className="cl-ma-calendar">
                      <div className="cl-ma-cal-header">
                        <button className="cl-ma-cal-nav" type="button" onClick={handlePrevMonth}>&lsaquo;</button>
                        <span className="cl-ma-cal-month">{MONTH_NAMES[calMonth]} {calYear}</span>
                        <button className="cl-ma-cal-nav" type="button" onClick={handleNextMonth}>&rsaquo;</button>
                      </div>

                      {/* Multi-select hint */}
                      <div className="cl-ma-cal-hint">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#6b7280" strokeWidth="1"/><path d="M7 4v3M7 9h.01" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round"/></svg>
                        Click multiple dates to log the same hours across several days
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
                          var dayKey = !d.overflow ? formatDateKey(calYear, calMonth, d.day) : '';
                          var isSelected = selectedDates.includes(dayKey);
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
                                + (isLogged && !isSelected ? ' cl-ma-cal-day--logged' : '')
                                + (loggedReason === 'Episode' && !isSelected ? ' cl-ma-cal-day--episode' : '')
                                + (loggedReason === 'Treatment' && !isSelected ? ' cl-ma-cal-day--treatment' : '')
                              }
                              onClick={function () { handleDayClick(d.day, d.overflow); }}
                            >
                              {d.day}
                              {isSelected && selectedDates.length > 1 && (
                                <span className="cl-ma-cal-day-check">
                                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                      <div className="cl-ma-cal-legend">
                        <span className="cl-ma-cal-legend-item"><span className="cl-ma-cal-legend-dot cl-ma-cal-legend-dot--today" />Today</span>
                        <span className="cl-ma-cal-legend-item"><span className="cl-ma-cal-legend-dot cl-ma-cal-legend-dot--selected" />Selected</span>
                        <span className="cl-ma-cal-legend-item"><span className="cl-ma-cal-legend-dot cl-ma-cal-legend-dot--episode" />Episode</span>
                        <span className="cl-ma-cal-legend-item"><span className="cl-ma-cal-legend-dot cl-ma-cal-legend-dot--treatment" />Treatment</span>
                      </div>

                      {/* Selected dates summary (when multi) */}
                      {isBulkMode && (
                        <div className="cl-ma-selected-dates">
                          <div className="cl-ma-selected-dates-title">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="2.5" width="11" height="9" rx="1.5" stroke="#0033a0" strokeWidth="1.2"/><path d="M1.5 5h11" stroke="#0033a0" strokeWidth="1.2"/><path d="M4.5 1v3M9.5 1v3" stroke="#0033a0" strokeWidth="1.2" strokeLinecap="round"/></svg>
                            {selectedDates.length} days selected
                          </div>
                          <div className="cl-ma-selected-dates-chips">
                            {selectedDates.map(function (dk) {
                              return (
                                <span className="cl-ma-date-chip" key={dk}>
                                  {formatDateKeyToDisplay(dk)}
                                  <button type="button" className="cl-ma-date-chip-remove" onClick={function () {
                                    setSelectedDates(selectedDates.filter(function (d) { return d !== dk; }));
                                    var newEdits = Object.assign({}, perDayEdits);
                                    delete newEdits[dk];
                                    setPerDayEdits(newEdits);
                                  }}>×</button>
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                </div>

                {/* Right: Hours, warning, times, reason */}
                <div className="cl-ma-form-right">
                  <div className="cl-ma-field">
                    <label className="cl-ma-label cl-ma-label--upper">
                      {isBulkMode ? 'Total Hours (' + selectedDates.length + ' days)' : 'Hours Logged'}
                    </label>
                    <div className={'cl-ma-hours-input' + (totalBulkHours > 0 ? '' : ' cl-ma-hours-input--zero')}>
                      <span className="cl-ma-hours-value">{isBulkMode ? totalBulkHours.toFixed(1) : hours}</span>
                      <span className="cl-ma-hours-unit">Hours</span>
                    </div>
                  </div>

                  {isBulkMode && (
                    <div className="cl-ma-bulk-badge">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="2" stroke="#0033a0" strokeWidth="1.2"/><path d="M2 6h12" stroke="#0033a0" strokeWidth="1.2"/><path d="M5 1v4M11 1v4" stroke="#0033a0" strokeWidth="1.2" strokeLinecap="round"/></svg>
                      <span>Bulk entry mode — same hours applied to all {selectedDates.length} selected dates</span>
                    </div>
                  )}

                  <div className="cl-ma-warning">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1l7 14H1L8 1z" fill="#f59e0b"/>
                      <path d="M8 6v4M8 12h.01" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span>Intermittent leave must be reported within 48 hours of the absence occurring to ensure timely payment.</span>
                  </div>

                  {selectedDates.length === 1 && (
                    <div className="cl-ma-field">
                      <label className="cl-ma-label">Date</label>
                      <div className="cl-ma-readonly-field">{formatDateKeyToShort(selectedDates[0])}</div>
                    </div>
                  )}

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

                  {isBulkMode && (
                    <p className="cl-ma-bulk-note">These times will apply to all selected dates. You can adjust individual days in the review step.</p>
                  )}

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
                <p className="cl-ma-disclaimer">By submitting, you certify that {isBulkMode ? 'these absences are' : 'this absence is'} related to your approved claim.</p>
                <div className="cl-ma-form-actions">
                  <button
                    className="cl-ma-btn-submit"
                    type="button"
                    onClick={handleSubmit}
                    disabled={selectedDates.length === 0 || parseFloat(hours) <= 0}
                  >
                    {isBulkMode ? 'Review ' + selectedDates.length + ' Entries' : 'Submit Time Entry'}
                  </button>
                  <button className="cl-ma-btn-cancel" type="button" onClick={handleCancel}>Cancel</button>
                </div>
              </div>
          </div>

          {/* Recent Time Entries */}
          <div className="cl-ma-recent-card">
            <div className="cl-ma-recent-header">
              <h2 className="cl-ma-recent-title">Recent Time Entries</h2>
              <span className="cl-ma-recent-count">{filteredAbsences.length} entries for {selectedCase.id}</span>
            </div>
            <div className="cl-table-wrap" style={{ border: 'none', borderRadius: 0 }}>
              <table className="cl-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Hours</th>
                    <th>Reason</th>
                    <th>Added On</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAbsences.length === 0 && (
                    <tr><td colSpan="7" style={{ textAlign: 'center', padding: 24, color: '#9ca3af' }}>No absences logged for this case yet.</td></tr>
                  )}
                  {filteredAbsences.map(function (row, i) {
                    var isNew = row.entryKey && newEntryKey && row.entryKey.startsWith(newEntryKey);
                    if (editingIndex === i) {
                      return (
                        <tr key={i} className="cl-ma-row--editing">
                          <td className="cl-ma-cell-bold">{row.date}</td>
                          <td><input type="text" className="cl-ma-inline-input" value={editForm.startTime} onChange={function (e) { setEditForm(Object.assign({}, editForm, { startTime: e.target.value })); }} /></td>
                          <td><input type="text" className="cl-ma-inline-input" value={editForm.endTime} onChange={function (e) { setEditForm(Object.assign({}, editForm, { endTime: e.target.value })); }} /></td>
                          <td className="cl-ma-cell-bold">{calcHours(editForm.startTime, editForm.endTime)}</td>
                          <td>
                            <select className="cl-ma-inline-select" value={editForm.reason} onChange={function (e) { setEditForm(Object.assign({}, editForm, { reason: e.target.value })); }}>
                              {REASONS.map(function (r) { return <option key={r.value} value={r.value}>{r.value}</option>; })}
                            </select>
                          </td>
                          <td>{row.addedOn}</td>
                          <td>
                            <div className="cl-ma-inline-actions">
                              <button type="button" className="cl-ma-inline-save" onClick={function () { saveEdit(i); }}>Save</button>
                              <button type="button" className="cl-ma-inline-cancel" onClick={cancelEdit}>Cancel</button>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                    return (
                      <tr key={i} className={isNew ? 'cl-ma-row--new' : ''}>
                        <td className="cl-ma-cell-bold">
                          {row.date}
                          {isNew && <span className="cl-ma-new-badge">New</span>}
                        </td>
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
                          <button className="cl-ma-edit-btn" aria-label="Edit" onClick={function () { startEdit(i); }}>
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
            {/* Mobile card view */}
            <div className="cl-ma-recent-cards-mobile">
              {filteredAbsences.length === 0 && (
                <div className="cl-ma-recent-card-empty">No absences logged for this case yet.</div>
              )}
              {filteredAbsences.map(function (row, i) {
                if (editingIndex === i) {
                  return (
                    <div key={i} className="cl-ma-entry-card cl-ma-entry-card--editing">
                      <div className="cl-ma-entry-card-top">
                        <span className="cl-ma-entry-card-date">{row.date}</span>
                        <span className="cl-ma-entry-editing-label">Editing</span>
                      </div>
                      <div className="cl-ma-entry-edit-fields">
                        <div className="cl-ma-entry-edit-row">
                          <label className="cl-ma-entry-edit-label">Start</label>
                          <input type="text" className="cl-ma-entry-edit-input" value={editForm.startTime} onChange={function (e) { setEditForm(Object.assign({}, editForm, { startTime: e.target.value })); }} />
                        </div>
                        <div className="cl-ma-entry-edit-row">
                          <label className="cl-ma-entry-edit-label">End</label>
                          <input type="text" className="cl-ma-entry-edit-input" value={editForm.endTime} onChange={function (e) { setEditForm(Object.assign({}, editForm, { endTime: e.target.value })); }} />
                        </div>
                        <div className="cl-ma-entry-edit-row">
                          <label className="cl-ma-entry-edit-label">Reason</label>
                          <select className="cl-ma-entry-edit-input" value={editForm.reason} onChange={function (e) { setEditForm(Object.assign({}, editForm, { reason: e.target.value })); }}>
                            {REASONS.map(function (r) { return <option key={r.value} value={r.value}>{r.value}</option>; })}
                          </select>
                        </div>
                      </div>
                      <div className="cl-ma-entry-edit-actions">
                        <button type="button" className="cl-ma-entry-edit-save" onClick={function () { saveEdit(i); }}>Save</button>
                        <button type="button" className="cl-ma-entry-edit-cancel" onClick={cancelEdit}>Cancel</button>
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={i} className="cl-ma-entry-card">
                    <div className="cl-ma-entry-card-top">
                      <span className="cl-ma-entry-card-date">{row.date}</span>
                      <div className="cl-ma-entry-card-top-right">
                        <span className={'cl-ma-reason-badge cl-ma-reason-badge--' + row.reasonColor}>{row.reason}</span>
                        <button className="cl-ma-entry-edit-btn" type="button" aria-label="Edit entry" onClick={function () { startEdit(i); }}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10.08 1.92a1.5 1.5 0 012.12 0l.88.88a1.5 1.5 0 010 2.12L5.5 12.5 2 13l.5-3.5 7.58-7.58z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                        </button>
                      </div>
                    </div>
                    <div className="cl-ma-entry-card-details">
                      <div className="cl-ma-entry-card-field">
                        <span className="cl-ma-entry-card-label">Time</span>
                        <span className="cl-ma-entry-card-value">{row.startTime} – {row.endTime}</span>
                      </div>
                      <div className="cl-ma-entry-card-field">
                        <span className="cl-ma-entry-card-label">Hours</span>
                        <span className="cl-ma-entry-card-value cl-ma-entry-card-value--bold">{row.hours}h</span>
                      </div>
                    </div>
                  </div>
                );
              })}
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
                <span>Select multiple dates on the calendar to log the same hours across several days at once.</span>
              </li>
              <li>
                <span className="cl-ma-guidance-dot"></span>
                <span>Partial days should be reported in 15-minute or 0.25 hour increments.</span>
              </li>
              <li>
                <span className="cl-ma-guidance-dot"></span>
                <span>You can adjust individual day times in the review step before confirming.</span>
              </li>
              <li>
                <span className="cl-ma-guidance-dot"></span>
                <span>Keep any related medical notes as you may be asked to provide them for audit.</span>
              </li>
            </ul>
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

        </div>
      </div>

      {/* Batch Review Modal */}
      {showPreview && (
        <div className="cl-ma-modal-overlay" onClick={function () { setShowPreview(false); }}>
          <div className="cl-ma-modal" onClick={function (e) { e.stopPropagation(); }}>
            <div className="cl-ma-modal-header">
              <div className="cl-ma-modal-header-left">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="16" height="14" rx="2" stroke="#0033a0" strokeWidth="1.5"/><path d="M2 7h16" stroke="#0033a0" strokeWidth="1.5"/><path d="M6 1v4M14 1v4" stroke="#0033a0" strokeWidth="1.5" strokeLinecap="round"/></svg>
                <h3 className="cl-ma-modal-title">Review Batch Entry</h3>
                <span className="cl-ma-preview-count">{selectedDates.length} days · {totalBulkHours.toFixed(1)} hours total</span>
              </div>
              <button className="cl-ma-modal-close" type="button" onClick={function () { setShowPreview(false); }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>

            <div className="cl-ma-modal-body">
              <table className="cl-ma-preview-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Hours</th>
                    <th>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedDates.map(function (dk) {
                    var dayData = perDayEdits[dk] || { startTime: startTime, endTime: endTime, reason: reason };
                    var dayReason = dayData.reason || reason;
                    var dayHours = calcHours(dayData.startTime, dayData.endTime);
                    return (
                      <tr key={dk}>
                        <td className="cl-ma-cell-bold">{formatDateKeyToDisplay(dk)}</td>
                        <td>
                          <input
                            type="text"
                            className="cl-ma-preview-input"
                            value={dayData.startTime}
                            onChange={function (e) { updatePerDayEdit(dk, 'startTime', e.target.value); }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="cl-ma-preview-input"
                            value={dayData.endTime}
                            onChange={function (e) { updatePerDayEdit(dk, 'endTime', e.target.value); }}
                          />
                        </td>
                        <td className="cl-ma-cell-bold">{dayHours}h</td>
                        <td>
                          <select
                            className="cl-ma-preview-select"
                            value={dayReason}
                            onChange={function (e) { updatePerDayEdit(dk, 'reason', e.target.value); }}
                          >
                            {REASONS.map(function (r) { return <option key={r.value} value={r.value}>{r.value}</option>; })}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="cl-ma-modal-footer">
              <div className="cl-ma-preview-summary">
                <div className="cl-ma-preview-stat">
                  <span className="cl-ma-preview-stat-label">Total Hours</span>
                  <span className="cl-ma-preview-stat-value">{totalBulkHours.toFixed(1)}</span>
                </div>
                <div className="cl-ma-preview-stat">
                  <span className="cl-ma-preview-stat-label">Remaining Balance</span>
                  <span className="cl-ma-preview-stat-value">{Math.max(0, balance - totalBulkHours).toFixed(1)}h</span>
                </div>
              </div>
              <div className="cl-ma-preview-actions">
                <button className="cl-ma-btn-cancel" type="button" onClick={function () { setShowPreview(false); }}>
                  Back to Edit
                </button>
                <button className="cl-ma-btn-submit" type="button" onClick={handleSubmit}>
                  Confirm &amp; Submit All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
