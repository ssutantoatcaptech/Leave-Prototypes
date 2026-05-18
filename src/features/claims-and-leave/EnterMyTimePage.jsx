import { useState } from 'react';
import { Link } from 'react-router-dom';
import useBasePath from './useBasePath';

var LEAVE_CASES = [
  { id: 'CL-975542', label: 'CL-975542 — Paid Family & Medical Leave (Intermittent)', balance: 87 },
  { id: 'CL-981204', label: 'CL-981204 — FMLA Caregiving (Intermittent)', balance: 38 },
  { id: 'CL-990017', label: 'CL-990017 — NJ FLI Bonding Leave (Continuous)', balance: 320 },
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
var DAY_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var DAY_FULL = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function getWeekStart(dateStr) {
  var d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() - d.getDay());
  return d;
}

function buildWeekDays(weekStart) {
  var days = [];
  for (var i = 0; i < 7; i++) {
    var d = new Date(weekStart.getTime() + i * 86400000);
    days.push({
      day: d.getDate(),
      month: d.getMonth(),
      year: d.getFullYear(),
      dow: d.getDay(),
      dateKey: d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0')
    });
  }
  return days;
}

function formatWeekRange(weekStart) {
  var end = new Date(weekStart.getTime() + 6 * 86400000);
  var startMonth = MONTH_NAMES[weekStart.getMonth()];
  var endMonth = MONTH_NAMES[end.getMonth()];
  if (weekStart.getMonth() === end.getMonth()) {
    return startMonth + ' ' + weekStart.getDate() + ' – ' + end.getDate() + ', ' + weekStart.getFullYear();
  }
  return startMonth + ' ' + weekStart.getDate() + ' – ' + endMonth + ' ' + end.getDate() + ', ' + end.getFullYear();
}

var TIME_SLOTS = ['7:00 AM','8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM'];

export default function EnterMyTimePage() {
  const base = useBasePath();
  var todayKey = '2026-05-12';

  var [selectedCase, setSelectedCase] = useState(LEAVE_CASES[0]);
  var [caseOpen, setCaseOpen] = useState(false);
  var [calView, setCalView] = useState('month');
  var [calYear, setCalYear] = useState(2026);
  var [calMonth, setCalMonth] = useState(4);
  var [calWeekStart, setCalWeekStart] = useState(getWeekStart('2026-05-11'));
  var [calDay, setCalDay] = useState(new Date('2026-05-12T00:00:00'));
  var [selectedDates, setSelectedDates] = useState([]);
  var [startTime, setStartTime] = useState('08:00 AM');
  var [endTime, setEndTime] = useState('12:00 PM');
  var [reason, setReason] = useState('Episode');
  var [reasonOpen, setReasonOpen] = useState(false);
  var [absences, setAbsences] = useState([
    { date: 'May 9, 2026', dateKey: '2026-05-09', startTime: '8:00 AM', endTime: '11:30 AM', hours: '3.5', reason: 'Episode', reasonColor: 'amber', addedOn: 'May 9, 2026', caseId: 'CL-975542' },
    { date: 'May 5, 2026', dateKey: '2026-05-05', startTime: '9:00 AM', endTime: '12:00 PM', hours: '3.0', reason: 'Treatment', reasonColor: 'blue', addedOn: 'May 5, 2026', caseId: 'CL-975542' },
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
  var NOW_TS = Date.now();
  var [editingIndex, setEditingIndex] = useState(null);
  var [editForm, setEditForm] = useState({ startTime: '', endTime: '', reason: '' });
  var [showPreview, setShowPreview] = useState(false);
  var [perDayEdits, setPerDayEdits] = useState({});
  var [showEntryModal, setShowEntryModal] = useState(false);
  var [modalEntries, setModalEntries] = useState([]);
  var [calTooltip, setCalTooltip] = useState(null);
  var [calTooltipEdit, setCalTooltipEdit] = useState(null);

  var calendarDays = buildCalendarDays(calYear, calMonth);
  var hours = calcHours(startTime, endTime);

  var loggedDateKeys = {};
  absences.forEach(function (a, idx) {
    if (a.caseId === selectedCase.id) {
      loggedDateKeys[a.dateKey] = { reason: a.reason, hours: a.hours, startTime: a.startTime, endTime: a.endTime, absIdx: idx };
    }
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

  function handlePrevWeek() {
    setCalWeekStart(new Date(calWeekStart.getTime() - 7 * 86400000));
  }
  function handleNextWeek() {
    setCalWeekStart(new Date(calWeekStart.getTime() + 7 * 86400000));
  }
  function handlePrevDay() {
    setCalDay(new Date(calDay.getTime() - 86400000));
  }
  function handleNextDay() {
    setCalDay(new Date(calDay.getTime() + 86400000));
  }

  function handleCalPrev() {
    if (calView === 'month') handlePrevMonth();
    else if (calView === 'week') handlePrevWeek();
    else handlePrevDay();
  }
  function handleCalNext() {
    if (calView === 'month') handleNextMonth();
    else if (calView === 'week') handleNextWeek();
    else handleNextDay();
  }

  function switchCalView(view) {
    if (view === calView) return;
    if (view === 'week' && calView === 'month') {
      setCalWeekStart(getWeekStart(calYear + '-' + String(calMonth + 1).padStart(2, '0') + '-15'));
    } else if (view === 'day' && calView === 'month') {
      var dayDate = todayKey.startsWith(calYear + '-' + String(calMonth + 1).padStart(2, '0'))
        ? new Date(todayKey + 'T00:00:00')
        : new Date(calYear, calMonth, 15);
      setCalDay(dayDate);
    } else if (view === 'week' && calView === 'day') {
      setCalWeekStart(getWeekStart(calDay.getFullYear() + '-' + String(calDay.getMonth() + 1).padStart(2, '0') + '-' + String(calDay.getDate()).padStart(2, '0')));
    } else if (view === 'day' && calView === 'week') {
      setCalDay(new Date(calWeekStart.getTime()));
    } else if (view === 'month' && calView === 'week') {
      setCalMonth(calWeekStart.getMonth());
      setCalYear(calWeekStart.getFullYear());
    } else if (view === 'month' && calView === 'day') {
      setCalMonth(calDay.getMonth());
      setCalYear(calDay.getFullYear());
    }
    setCalView(view);
  }

  function handleDateSelect(dateKey) {
    if (selectedDates.includes(dateKey)) {
      setSelectedDates(selectedDates.filter(function (d) { return d !== dateKey; }));
      var newEdits = Object.assign({}, perDayEdits);
      delete newEdits[dateKey];
      setPerDayEdits(newEdits);
    } else {
      setSelectedDates(selectedDates.concat([dateKey]).sort());
    }
  }

  var weekDays = buildWeekDays(calWeekStart);
  var calDayKey = calDay.getFullYear() + '-' + String(calDay.getMonth() + 1).padStart(2, '0') + '-' + String(calDay.getDate()).padStart(2, '0');

  var calHeaderLabel = calView === 'month'
    ? MONTH_NAMES[calMonth] + ' ' + calYear
    : calView === 'week'
      ? formatWeekRange(calWeekStart)
      : DAY_FULL[calDay.getDay()] + ', ' + MONTH_NAMES[calDay.getMonth()] + ' ' + calDay.getDate() + ', ' + calDay.getFullYear();

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
        submittedAt: Date.now(),
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

  function openEntryModal() {
    var dates = selectedDates.length > 0 ? selectedDates : [todayKey];
    var entries = dates.map(function (dk) {
      return { dateKey: dk, startTime: '08:00 AM', endTime: '12:00 PM', reason: 'Episode' };
    });
    setModalEntries(entries);
    setShowEntryModal(true);
  }

  function updateModalEntry(idx, field, value) {
    var updated = modalEntries.slice();
    updated[idx] = Object.assign({}, updated[idx], { [field]: value });
    setModalEntries(updated);
  }

  function addModalEntry() {
    setModalEntries(modalEntries.concat([{ dateKey: '', startTime: '08:00 AM', endTime: '12:00 PM', reason: 'Episode' }]));
  }

  function removeModalEntry(idx) {
    if (modalEntries.length <= 1) return;
    setModalEntries(modalEntries.filter(function (_, i) { return i !== idx; }));
  }

  function submitModal() {
    var todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    var entryKey = Date.now().toString();
    var newEntries = [];
    var totalH = 0;
    modalEntries.forEach(function (entry, idx) {
      if (!entry.dateKey) return;
      var dayHours = calcHours(entry.startTime, entry.endTime);
      totalH += parseFloat(dayHours);
      newEntries.push({
        date: formatDateKeyToShort(entry.dateKey),
        dateKey: entry.dateKey,
        startTime: entry.startTime,
        endTime: entry.endTime,
        hours: dayHours,
        reason: entry.reason,
        reasonColor: getReasonColor(entry.reason),
        addedOn: todayStr,
        caseId: selectedCase.id,
        entryKey: entryKey + '-' + idx,
        submittedAt: Date.now(),
      });
    });
    if (newEntries.length === 0) return;
    setAbsences(newEntries.concat(absences));
    setBalance(Math.max(0, balance - totalH));
    setSubmitted(true);
    setSubmittedCount(newEntries.length);
    setSubmittedHours(totalH.toFixed(1));
    setNewEntryKey(entryKey);
    setSelectedDates([]);
    setShowEntryModal(false);
    setTimeout(function () { setSubmitted(false); }, 4000);
    setTimeout(function () { setNewEntryKey(null); }, 8000);
  }

  var modalTotalHours = modalEntries.reduce(function (sum, e) {
    return sum + parseFloat(calcHours(e.startTime, e.endTime));
  }, 0);

  function openCalTooltip(dayKey, e) {
    e.stopPropagation();
    var data = loggedDateKeys[dayKey];
    if (!data) return;
    setCalTooltip({ dateKey: dayKey, data: data });
    setCalTooltipEdit(null);
  }

  function startCalTooltipEdit() {
    if (!calTooltip) return;
    setCalTooltipEdit({ startTime: calTooltip.data.startTime, endTime: calTooltip.data.endTime, reason: calTooltip.data.reason });
  }

  function saveCalTooltipEdit() {
    if (!calTooltip || !calTooltipEdit) return;
    var idx = calTooltip.data.absIdx;
    var updated = absences.slice();
    var h = calcHours(calTooltipEdit.startTime, calTooltipEdit.endTime);
    updated[idx] = Object.assign({}, updated[idx], {
      startTime: calTooltipEdit.startTime,
      endTime: calTooltipEdit.endTime,
      hours: h,
      reason: calTooltipEdit.reason,
      reasonColor: getReasonColor(calTooltipEdit.reason),
    });
    setAbsences(updated);
    setCalTooltip(null);
    setCalTooltipEdit(null);
  }

  var selectedReasonData = REASONS.find(function (r) { return r.value === reason; });

  return (
    <div className="cl-page cl-ml-page" style={{ position: 'relative', overflow: 'clip' }}>
      {/* Background decorative icon */}
      <div className="cl-bg-icon" aria-hidden="true">
        <svg width="388" height="388" viewBox="0 0 388 388" fill="none">
          <rect x="20" y="52" width="348" height="316" rx="32" fill="url(#cal-bg-grad)" opacity="0.45"/>
          <rect x="44" y="120" width="300" height="228" rx="16" fill="white" opacity="0.5"/>
          <rect x="120" y="8" width="28" height="64" rx="14" fill="url(#cal-bg-grad)" opacity="0.45"/>
          <rect x="240" y="8" width="28" height="64" rx="14" fill="url(#cal-bg-grad)" opacity="0.45"/>
          <rect x="80" y="164" width="52" height="44" rx="10" fill="url(#cal-bg-grad)" opacity="0.35"/>
          <rect x="156" y="164" width="52" height="44" rx="10" fill="url(#cal-bg-grad)" opacity="0.35"/>
          <rect x="232" y="164" width="52" height="44" rx="10" fill="url(#cal-bg-grad)" opacity="0.35"/>
          <rect x="80" y="232" width="52" height="44" rx="10" fill="url(#cal-bg-grad)" opacity="0.35"/>
          <rect x="156" y="232" width="52" height="44" rx="10" fill="url(#cal-bg-grad)" opacity="0.35"/>
          <rect x="232" y="232" width="52" height="44" rx="10" fill="url(#cal-bg-grad)" opacity="0.35"/>
          <defs>
            <linearGradient id="cal-bg-grad" x1="0" y1="0" x2="388" y2="388" gradientUnits="userSpaceOnUse">
              <stop stopColor="#105fa8" stopOpacity="0.15"/>
              <stop offset="1" stopColor="#0a9b8c" stopOpacity="0.12"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="cl-ml-breadcrumb">
        <Link to={base} className="cl-ml-breadcrumb-link">Claims &amp; Leave</Link>
        <span className="cl-ml-breadcrumb-sep">&gt;</span>
        <span className="cl-ml-breadcrumb-current">Enter Missed Time</span>
      </div>

      <div className="cl-ml-header">
        <div className="cl-ml-header-text">
          <h1 className="cl-ml-title">Enter Missed Time</h1>
          <p className="cl-ml-subtitle">Select one or more dates on the calendar, then submit your missed time.</p>
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

          {/* Mobile-only: Approved Leave Case above calendar */}
          <div className="cl-ma-case-mobile">
            <div className="cl-ma-field" style={{ position: 'relative' }}>
              <label className="cl-ma-sidebar-cta__hours-label">Approved Leave Case</label>
              <button
                type="button"
                className="cl-ma-case-pill cl-ma-case-pill--sidebar"
                onClick={function () { setCaseOpen(!caseOpen); }}
              >
                <span className="cl-ma-case-pill__id">{selectedCase.id}</span>
                <span className="cl-ma-case-pill__label">{selectedCase.label.split(' — ')[1]}</span>
                <svg className="cl-ma-case-pill__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
            <div className="cl-ma-sidebar-cta__hours">
              <span className="cl-ma-sidebar-cta__hours-label">Balance Remaining</span>
              <span className="cl-ma-sidebar-cta__hours-value">{balance}h</span>
            </div>
            <button
              className="cl-ma-btn-submit-lg"
              type="button"
              onClick={openEntryModal}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              {selectedDates.length > 0
                ? 'Submit ' + selectedDates.length + ' Date' + (selectedDates.length > 1 ? 's' : '')
                : 'Submit Missed Time'}
              {selectedDates.length > 0 && (
                <span className="cl-ma-btn-submit-lg__badge">{selectedDates.length}</span>
              )}
            </button>
          </div>

          {/* Form card */}
          <div className="cl-ma-form-card cl-ma-form-card--v2">
              <div className="cl-ma-form-grid">
                {/* Left: Calendar */}
                <div className="cl-ma-form-left">
                  <div className="cl-ma-field">
                    <div className="cl-ma-calendar">
                      <div className="cl-ma-cal-header">
                        <span className="cl-ma-cal-month">{calHeaderLabel}</span>
                        <div className="cl-ma-view-toggle">
                          <button type="button" className={'cl-ma-view-toggle__btn' + (calView === 'month' ? ' cl-ma-view-toggle__btn--active' : '')} onClick={function () { switchCalView('month'); }}>Month</button>
                          <button type="button" className={'cl-ma-view-toggle__btn' + (calView === 'week' ? ' cl-ma-view-toggle__btn--active' : '')} onClick={function () { switchCalView('week'); }}>Week</button>
                          <button type="button" className={'cl-ma-view-toggle__btn' + (calView === 'day' ? ' cl-ma-view-toggle__btn--active' : '')} onClick={function () { switchCalView('day'); }}>Day</button>
                        </div>
                        <div className="cl-ma-cal-header__nav">
                          <button className="cl-ma-cal-nav" type="button" onClick={handleCalPrev}>&lsaquo;</button>
                          <button className="cl-ma-cal-nav" type="button" onClick={handleCalNext}>&rsaquo;</button>
                        </div>
                      </div>

                      {calView === 'month' && (
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
                          var loggedData = !d.overflow && loggedDateKeys[dayKey] ? loggedDateKeys[dayKey] : null;
                          var isLogged = !!loggedData;
                          var loggedReason = isLogged ? loggedData.reason : null;
                          var caseName = selectedCase.label.split(' — ')[1] || '';
                          var eventLabel = isLogged ? caseName.split('(')[0].trim() + ', ' + loggedReason : '';
                          return (
                            <button
                              key={i}
                              type="button"
                              className={
                                'cl-ma-cal-day'
                                + ' cl-ma-cal-day--v2'
                                + (d.overflow ? ' cl-ma-cal-day--overflow' : '')
                                + (isSelected ? ' cl-ma-cal-day--selected' : '')
                                + (isToday && !isSelected ? ' cl-ma-cal-day--today' : '')
                                + (isLogged && !isSelected ? ' cl-ma-cal-day--logged' : '')
                                + (loggedReason === 'Episode' && !isSelected ? ' cl-ma-cal-day--episode' : '')
                                + (loggedReason === 'Treatment' && !isSelected ? ' cl-ma-cal-day--treatment' : '')
                              }
                              onClick={function () { handleDayClick(d.day, d.overflow); }}
                              title={isLogged ? eventLabel + ' (' + loggedData.hours + 'h)' : ''}
                            >
                              <span className="cl-ma-cal-day-num">{d.day}</span>
                              {isLogged && !isSelected && (
                                <span
                                  className={'cl-ma-cal-event-bar cl-ma-cal-event-bar--' + loggedReason.toLowerCase()}
                                  title={eventLabel + ' (' + loggedData.hours + 'h)'}
                                  onClick={function (e) { openCalTooltip(dayKey, e); }}
                                >
                                  {eventLabel}
                                </span>
                              )}
                              {isSelected && selectedDates.length > 1 && (
                                <span className="cl-ma-cal-day-check">
                                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                      )}

                      {calView === 'week' && (
                      <div className="cl-ma-cal-week">
                        {weekDays.map(function (wd) {
                          var isSelected = selectedDates.includes(wd.dateKey);
                          var isToday = wd.dateKey === todayKey;
                          var loggedData = loggedDateKeys[wd.dateKey] || null;
                          var caseName = selectedCase.label.split(' — ')[1] || '';
                          var eventLabel = loggedData ? caseName.split('(')[0].trim() + ', ' + loggedData.reason : '';
                          return (
                            <div
                              key={wd.dateKey}
                              className={'cl-ma-week-day' + (isSelected ? ' cl-ma-week-day--selected' : '') + (isToday ? ' cl-ma-week-day--today' : '')}
                              onClick={function () { handleDateSelect(wd.dateKey); }}
                            >
                              <div className="cl-ma-week-day__header">
                                <span className="cl-ma-week-day__name">{DAY_SHORT[wd.dow]}</span>
                                <span className="cl-ma-week-day__num">{wd.day}</span>
                              </div>
                              <div className="cl-ma-week-day__events">
                                {loggedData && (
                                  <span
                                    className={'cl-ma-cal-event-bar cl-ma-cal-event-bar--' + loggedData.reason.toLowerCase()}
                                    onClick={function (e) { e.stopPropagation(); openCalTooltip(wd.dateKey, e); }}
                                  >
                                    {eventLabel} ({loggedData.hours}h)
                                  </span>
                                )}
                              </div>
                              {isSelected && (
                                <span className="cl-ma-week-day__check">
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3L10 3" stroke="#105fa8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      )}

                      {calView === 'day' && (function () {
                        var dayLoggedData = loggedDateKeys[calDayKey] || null;
                        var isDaySelected = selectedDates.includes(calDayKey);
                        var caseName = selectedCase.label.split(' — ')[1] || '';
                        var dayEventLabel = dayLoggedData ? caseName.split('(')[0].trim() + ', ' + dayLoggedData.reason : '';
                        return (
                      <div className="cl-ma-cal-dayview">
                        <div className="cl-ma-dayview__date-badge">
                          <span className="cl-ma-dayview__date-num">{calDay.getDate()}</span>
                          <span className="cl-ma-dayview__date-day">{DAY_FULL[calDay.getDay()]}</span>
                        </div>
                        <div className="cl-ma-dayview__timeline">
                          {TIME_SLOTS.map(function (slot) {
                            var slotHour = parseInt(slot);
                            if (slot.includes('PM') && slotHour !== 12) slotHour += 12;
                            if (slot.includes('AM') && slotHour === 12) slotHour = 0;
                            var hasEvent = false;
                            if (dayLoggedData) {
                              var startMatch = dayLoggedData.startTime.match(/(\d+):.*?(AM|PM)/i);
                              var endMatch = dayLoggedData.endTime.match(/(\d+):.*?(AM|PM)/i);
                              if (startMatch && endMatch) {
                                var startH = parseInt(startMatch[1]);
                                if (startMatch[2].toUpperCase() === 'PM' && startH !== 12) startH += 12;
                                if (startMatch[2].toUpperCase() === 'AM' && startH === 12) startH = 0;
                                var endH = parseInt(endMatch[1]);
                                if (endMatch[2].toUpperCase() === 'PM' && endH !== 12) endH += 12;
                                if (endMatch[2].toUpperCase() === 'AM' && endH === 12) endH = 0;
                                hasEvent = slotHour >= startH && slotHour < endH;
                              }
                            }
                            return (
                              <div key={slot} className={'cl-ma-dayview__slot' + (hasEvent ? ' cl-ma-dayview__slot--active' : '')}>
                                <span className="cl-ma-dayview__slot-label">{slot}</span>
                                <div className="cl-ma-dayview__slot-content">
                                  {hasEvent && (
                                    <span
                                      className={'cl-ma-cal-event-bar cl-ma-cal-event-bar--' + dayLoggedData.reason.toLowerCase()}
                                      onClick={function (e) { openCalTooltip(calDayKey, e); }}
                                    >
                                      {dayEventLabel} ({dayLoggedData.hours}h)
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <button
                          type="button"
                          className={'cl-ma-dayview__select-btn' + (isDaySelected ? ' cl-ma-dayview__select-btn--active' : '')}
                          onClick={function () { handleDateSelect(calDayKey); }}
                        >
                          {isDaySelected ? 'Deselect This Day' : 'Select This Day'}
                        </button>
                      </div>
                        );
                      })()}

                      {/* Calendar tooltip popover */}
                      {calTooltip && (
                        <div className="cl-ma-cal-tooltip-overlay" onClick={function () { setCalTooltip(null); setCalTooltipEdit(null); }}>
                          <div className="cl-ma-cal-tooltip" onClick={function (e) { e.stopPropagation(); }}>
                            <div className="cl-ma-cal-tooltip__header">
                              <span className="cl-ma-cal-tooltip__date">{formatDateKeyToDisplay(calTooltip.dateKey)}</span>
                              <button className="cl-ma-cal-tooltip__close" onClick={function () { setCalTooltip(null); setCalTooltipEdit(null); }}>×</button>
                            </div>
                            {!calTooltipEdit ? (
                              <div className="cl-ma-cal-tooltip__body">
                                <div className="cl-ma-cal-tooltip__row">
                                  <span className="cl-ma-cal-tooltip__label">Time</span>
                                  <span className="cl-ma-cal-tooltip__value">{calTooltip.data.startTime} – {calTooltip.data.endTime}</span>
                                </div>
                                <div className="cl-ma-cal-tooltip__row">
                                  <span className="cl-ma-cal-tooltip__label">Hours</span>
                                  <span className="cl-ma-cal-tooltip__value">{calTooltip.data.hours}h</span>
                                </div>
                                <div className="cl-ma-cal-tooltip__row">
                                  <span className="cl-ma-cal-tooltip__label">Reason</span>
                                  <span className="cl-ma-cal-tooltip__value">{calTooltip.data.reason}</span>
                                </div>
                                <button className="cl-ma-cal-tooltip__edit-btn" onClick={startCalTooltipEdit}>Edit Entry</button>
                              </div>
                            ) : (
                              <div className="cl-ma-cal-tooltip__body">
                                <div className="cl-ma-cal-tooltip__field">
                                  <span className="cl-ma-cal-tooltip__label">Start</span>
                                  <input type="text" className="cl-ma-cal-tooltip__input" value={calTooltipEdit.startTime} onChange={function (e) { setCalTooltipEdit(Object.assign({}, calTooltipEdit, { startTime: e.target.value })); }} />
                                </div>
                                <div className="cl-ma-cal-tooltip__field">
                                  <span className="cl-ma-cal-tooltip__label">End</span>
                                  <input type="text" className="cl-ma-cal-tooltip__input" value={calTooltipEdit.endTime} onChange={function (e) { setCalTooltipEdit(Object.assign({}, calTooltipEdit, { endTime: e.target.value })); }} />
                                </div>
                                <div className="cl-ma-cal-tooltip__field">
                                  <span className="cl-ma-cal-tooltip__label">Reason</span>
                                  <select className="cl-ma-cal-tooltip__input" value={calTooltipEdit.reason} onChange={function (e) { setCalTooltipEdit(Object.assign({}, calTooltipEdit, { reason: e.target.value })); }}>
                                    {REASONS.map(function (r) { return <option key={r.value} value={r.value}>{r.value}</option>; })}
                                  </select>
                                </div>
                                <div className="cl-ma-cal-tooltip__actions">
                                  <button className="cl-ma-cal-tooltip__save-btn" onClick={saveCalTooltipEdit}>Save</button>
                                  <button className="cl-ma-cal-tooltip__cancel-btn" onClick={function () { setCalTooltipEdit(null); }}>Cancel</button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="cl-ma-cal-legend cl-ma-cal-legend--v2">
                        <span className="cl-ma-cal-legend-item"><span className="cl-ma-cal-legend-stripe cl-ma-cal-legend-stripe--today" />Today</span>
                        <span className="cl-ma-cal-legend-item"><span className="cl-ma-cal-legend-stripe cl-ma-cal-legend-stripe--selected" />Selected</span>
                        <span className="cl-ma-cal-legend-item"><span className="cl-ma-cal-legend-stripe cl-ma-cal-legend-stripe--episode" />Episode</span>
                        <span className="cl-ma-cal-legend-item"><span className="cl-ma-cal-legend-stripe cl-ma-cal-legend-stripe--treatment" />Treatment</span>
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

                {/* Right: Hours, warning, times, reason (hidden in v2 — moved to sidebar) */}
              </div>
          </div>

          {/* Recent Time Entries */}
          <div className="cl-ma-recent-card">
            <div className="cl-ma-recent-header">
              <h2 className="cl-ma-recent-title"><span className="cl-ma-recent-title-desktop">Recent Time Entries</span><span className="cl-ma-recent-title-mobile">Recent time entries</span></h2>
              <span className="cl-ma-recent-count">{filteredAbsences.length} entries for {selectedCase.id}</span>
            </div>
            <div className="cl-table-wrap" style={{ border: 'none', borderRadius: 0 }}>
              <table className="cl-table">
                <thead>
                  <tr>
                    <th>Submitted Date</th>
                    <th>Start of Missed Time</th>
                    <th>End of Missed Time</th>
                    <th>Missed Hours</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAbsences.length === 0 && (
                    <tr><td colSpan="7" style={{ textAlign: 'center', padding: 24, color: '#9ca3af' }}>No absences logged for this case yet.</td></tr>
                  )}
                  {filteredAbsences.map(function (row, i) {
                    var isNew = row.submittedAt && (NOW_TS - row.submittedAt) < 86400000;
                    var rowStatus = isNew ? 'Submitted' : 'Approved';
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
                          <td>{rowStatus}</td>
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
                        <td>{row.reason}</td>
                        <td>{rowStatus}</td>
                        <td>
                          <button className="cl-ma-edit-btn" onClick={function () { startEdit(i); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Source Sans Pro', sans-serif", fontSize: '14px', color: '#222' }}>
                            {isNew ? 'Edit' : 'View'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Mobile card view */}
            <div className="cl-ml-cards-mobile">
              {filteredAbsences.length === 0 && (
                <div style={{ textAlign: 'center', padding: '32px 16px', color: '#5d5d5d' }}>No absences logged for this case yet.</div>
              )}
              {filteredAbsences.map(function (row, i) {
                var isNew = row.submittedAt && (NOW_TS - row.submittedAt) < 86400000;
                if (editingIndex === i) {
                  return (
                    <div key={i} className="cl-ml-card-mobile" style={{ borderColor: '#105fa8', background: '#f8faff' }}>
                      <div>
                        <div className="cl-ml-card-mobile__type">{row.date}</div>
                        <div className="cl-ml-card-mobile__id" style={{ color: '#105fa8', fontWeight: 600 }}>Editing</div>
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
                      <div className="cl-ml-card-mobile__actions">
                        <button className="cl-ml-card-mobile__action-link" type="button" onClick={function () { saveEdit(i); }}>Save</button>
                        <button className="cl-ml-card-mobile__action-delete" type="button" onClick={cancelEdit}>Cancel</button>
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={i} className="cl-ml-card-mobile">
                    <div className="cl-ml-card-mobile__top-row">
                      <div>
                        <div className="cl-ml-card-mobile__type">{row.date}{isNew ? ' — New' : ''}</div>
                      </div>
                      <span className="cl-ml-status-pill">{isNew ? 'Submitted' : 'Approved'}</span>
                    </div>
                    <div className="cl-ml-card-mobile__row">
                      <span className="cl-ml-card-mobile__label">Start of missed time</span>
                      <span className="cl-ml-card-mobile__value">{row.startTime}</span>
                    </div>
                    <div className="cl-ml-card-mobile__row">
                      <span className="cl-ml-card-mobile__label">End of missed time</span>
                      <span className="cl-ml-card-mobile__value">{row.endTime}</span>
                    </div>
                    <div className="cl-ml-card-mobile__row">
                      <span className="cl-ml-card-mobile__label">Missed hours</span>
                      <span className="cl-ml-card-mobile__value">{row.hours}h</span>
                    </div>
                    <div className="cl-ml-card-mobile__actions">
                      <button className="cl-ml-card-mobile__action-link" type="button" onClick={function () { startEdit(i); }}>{isNew ? 'Edit' : 'View'} ›</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="cl-ma-sidebar">
            <div className="cl-ma-sidebar-cta">
              <div className="cl-ma-field" style={{ position: 'relative' }}>
                <label className="cl-ma-sidebar-cta__hours-label">Approved Leave Case</label>
                <button
                  type="button"
                  className="cl-ma-case-pill cl-ma-case-pill--sidebar"
                  onClick={function () { setCaseOpen(!caseOpen); }}
                >
                  <span className="cl-ma-case-pill__id">{selectedCase.id}</span>
                  <span className="cl-ma-case-pill__label">{selectedCase.label.split(' — ')[1]}</span>
                  <svg className="cl-ma-case-pill__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
              <div className="cl-ma-sidebar-cta__hours">
                <span className="cl-ma-sidebar-cta__hours-label">Balance Remaining</span>
                <span className="cl-ma-sidebar-cta__hours-value">{balance}h</span>
              </div>
              <button
                className="cl-ma-btn-submit-lg"
                type="button"
                onClick={openEntryModal}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                {selectedDates.length > 0
                  ? 'Submit ' + selectedDates.length + ' Date' + (selectedDates.length > 1 ? 's' : '')
                  : 'Submit Missed Time'}
                {selectedDates.length > 0 && (
                  <span className="cl-ma-btn-submit-lg__badge">{selectedDates.length}</span>
                )}
              </button>
            </div>

          {/* Reporting Guidance */}
          <div className="cl-ma-guidance-card">
            <h3 className="cl-ma-guidance-title">Reporting Guidance</h3>
            <div className="cl-ma-guidance-list">
              <div className="cl-ma-guidance-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#003a70" strokeWidth="1.5"/><path d="M6 10l3 3 5-5" stroke="#003a70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>Select multiple dates on the calendar to log the same hours across several days at once.</span>
              </div>
              <div className="cl-ma-guidance-divider"></div>
              <div className="cl-ma-guidance-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#003a70" strokeWidth="1.5"/><path d="M6 10l3 3 5-5" stroke="#003a70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>Partial days should be reported in 15-minute or 0.25 hour increments.</span>
              </div>
              <div className="cl-ma-guidance-divider"></div>
              <div className="cl-ma-guidance-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#003a70" strokeWidth="1.5"/><path d="M6 10l3 3 5-5" stroke="#003a70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>You can adjust individual day times in the review step before confirming.</span>
              </div>
              <div className="cl-ma-guidance-divider"></div>
              <div className="cl-ma-guidance-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#003a70" strokeWidth="1.5"/><path d="M6 10l3 3 5-5" stroke="#003a70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>Keep any related medical notes as you may be asked to provide them for audit.</span>
              </div>
            </div>
          </div>

          {/* Need Help */}
          <div className="cl-ma-help-card">
            <div className="cl-ma-help-header">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#003a70" strokeWidth="1.5"/><path d="M7.5 7.5a2.5 2.5 0 014.87.83c0 1.67-2.5 2.5-2.5 2.5M10 14h.01" stroke="#003a70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <h3 className="cl-ma-help-title">Need Help Logging?</h3>
            </div>
            <div className="cl-ma-help-contact">
              <span className="cl-ma-help-label">LEAVE SPECIALIST</span>
              <span className="cl-ma-help-phone">1-800-555-0199</span>
            </div>
            <button className="cl-ma-message-btn">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M13 1L6.5 7.5M13 1l-4 12-2.5-5.5L1 9l12-4v-4z" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
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

      {/* V2 Entry Modal */}
      {showEntryModal && (
        <div className="cl-ma-entry-modal-overlay" onClick={function () { setShowEntryModal(false); }}>
          <div className="cl-ma-entry-modal" onClick={function (e) { e.stopPropagation(); }}>
            <div className="cl-ma-entry-modal__header">
              <div>
                <h3 className="cl-ma-entry-modal__title">Submit Missed Time</h3>
                <p className="cl-ma-entry-modal__subtitle">{selectedCase.id} — {modalEntries.length} {modalEntries.length === 1 ? 'entry' : 'entries'}</p>
              </div>
              <button className="cl-ma-entry-modal__close" type="button" onClick={function () { setShowEntryModal(false); }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>

            <div className="cl-ma-entry-modal__body">
              {modalEntries.map(function (entry, idx) {
                var entryHours = calcHours(entry.startTime, entry.endTime);
                return (
                  <div key={idx} className="cl-ma-entry-modal__row">
                    <div className="cl-ma-entry-modal__row-date">
                      {entry.dateKey ? formatDateKeyToDisplay(entry.dateKey) : 'Select date'}
                      {modalEntries.length > 1 && (
                        <button type="button" style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: '16px' }} onClick={function () { removeModalEntry(idx); }}>×</button>
                      )}
                    </div>
                    <div className="cl-ma-entry-modal__field">
                      <span className="cl-ma-entry-modal__field-label">Start</span>
                      <input
                        type="text"
                        className="cl-ma-entry-modal__field-input"
                        value={entry.startTime}
                        onChange={function (e) { updateModalEntry(idx, 'startTime', e.target.value); }}
                      />
                    </div>
                    <div className="cl-ma-entry-modal__field">
                      <span className="cl-ma-entry-modal__field-label">End</span>
                      <input
                        type="text"
                        className="cl-ma-entry-modal__field-input"
                        value={entry.endTime}
                        onChange={function (e) { updateModalEntry(idx, 'endTime', e.target.value); }}
                      />
                    </div>
                    <div className="cl-ma-entry-modal__field">
                      <span className="cl-ma-entry-modal__field-label">Reason</span>
                      <select
                        className="cl-ma-entry-modal__field-input"
                        value={entry.reason}
                        onChange={function (e) { updateModalEntry(idx, 'reason', e.target.value); }}
                      >
                        {REASONS.map(function (r) { return <option key={r.value} value={r.value}>{r.value}</option>; })}
                      </select>
                    </div>
                    <div className="cl-ma-entry-modal__hours-display">{entryHours}h</div>
                  </div>
                );
              })}
              <button type="button" style={{ alignSelf: 'flex-start', background: 'none', border: '1px dashed #c8ddf2', borderRadius: '8px', padding: '10px 16px', color: '#105fa8', fontFamily: "'Source Sans Pro', sans-serif", fontSize: '13px', fontWeight: 600, cursor: 'pointer' }} onClick={addModalEntry}>
                + Add Missed Time
              </button>
            </div>

            <div className="cl-ma-entry-modal__footer">
              <div className="cl-ma-entry-modal__total">
                <span className="cl-ma-entry-modal__total-label">Total Hours</span>
                <span className="cl-ma-entry-modal__total-value">{modalTotalHours.toFixed(1)}h</span>
              </div>
              <div className="cl-ma-entry-modal__actions">
                <button className="cl-ma-btn-cancel" type="button" onClick={function () { setShowEntryModal(false); }}>Cancel</button>
                <button className="cl-ma-btn-submit" type="button" onClick={submitModal}>Submit {modalEntries.length > 1 ? 'All' : 'Entry'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
